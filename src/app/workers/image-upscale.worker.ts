/// <reference lib="webworker" />
import Upscaler, { ModelDefinition } from 'upscaler';
import * as models from '@upscalerjs/esrgan-thick';
import * as tf from '@tensorflow/tfjs';

tf.enableProdMode();
tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);

export type State = 'nostate' | 'queued' | 'inprogress' | 'done';
export type UpscaleFactor = 'x2' | 'x3' | 'x4' | 'x8';
export type TensorImageData = [
  Float32Array<ArrayBufferLike> | Int32Array<ArrayBufferLike> | Uint8Array<ArrayBufferLike>,
  [number, number, number],
];
export interface WorkerMessage {
  state: State;
  progress: number;
  imageData: TensorImageData | null;
}
const upscaleFactorModels: Record<UpscaleFactor, ModelDefinition> = {
  x2: models.x2,
  x3: models.x3,
  x4: models.x4,
  x8: models.x8,
};

let upscaler: InstanceType<typeof Upscaler> | null = null;
let currentFactor: UpscaleFactor | null = null;

addEventListener('message', async ({ data }) => {
  const upscaleFactor: UpscaleFactor = data['upscaleFactor'];
  if (!upscaler || currentFactor !== upscaleFactor) {
    if (upscaler) await upscaler.dispose();
    upscaler = new Upscaler({ model: upscaleFactorModels[upscaleFactor] });
    currentFactor = upscaleFactor;
  }

  const imagesData: TensorImageData[] = data['imagesData'];
  const results: WorkerMessage[] = imagesData.map(() => {
    return { state: 'queued', progress: 0, imageData: null };
  });

  for (const i in imagesData) {
    tf.engine().startScope();

    const index = i as unknown as number;

    const [data, shape] = imagesData[index];
    const tensor = tf.tensor(data, shape) as tf.Tensor3D;

    const result = await upscaler.execute(tensor, {
      awaitNextFrame: true,
      padding: 4,
      patchSize: 32,
      output: 'tensor',
      progress: (amount: number) => {
        const state = 'inprogress';
        const progress = Number((amount * 100).toFixed(2));
        const imageData = null;
        results[index] = { state, progress, imageData };
        postMessage(results);
      },
    });

    const state: State = 'done';
    const progress = 100;
    const imageData: TensorImageData = [await result.data(), result.shape];
    results[index] = { state, progress, imageData };
    postMessage(results);

    tf.engine().endScope();
  }
});
