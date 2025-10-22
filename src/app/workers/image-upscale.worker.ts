/// <reference lib="webworker" />
import Upscaler from 'upscaler';
import model from '@upscalerjs/esrgan-legacy/gans';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

import { State } from '../components/process-progress/process-progress';
import { ImageMatrix } from '../services/image-cast';

tf.enableProdMode();
tf.env().set('WEBGL_DELETE_TEXTURE_THRESHOLD', 0);

export interface WorkerMessage {
  state: State;
  progress: number;
  result: ImageMatrix | null;
}

const patchSize = 32;

const upscaler = new Upscaler({ model });
upscaler.warmup(patchSize);

addEventListener('message', async ({ data }) => {
  const images = data as ImageMatrix[];
  const results: WorkerMessage[] = images.map(() => {
    return { state: 'queued', progress: 0, result: null };
  });
  postMessage(results);

  for (const i in images) {
    tf.engine().startScope();

    const index = i as unknown as number;

    const [data, shape] = images[index];
    const tensor = tf.tensor(data as tf.TensorLike, shape) as tf.Tensor3D;

    const result = await upscaler.execute(tensor, {
      awaitNextFrame: true,
      padding: 4,
      patchSize,
      output: 'tensor',
      progress: (amount: number) => {
        const state = 'inprogress';
        const progress = Number((amount * 100).toFixed(2));
        const result = null;
        results[index] = { state, progress, result };
        postMessage(results);
      },
    });

    const state: State = 'done';
    const progress = 100;
    const resultData = (await result.data()) as Uint8Array<ArrayBuffer>;
    const matrix: ImageMatrix = [resultData, result.shape];
    results[index] = { state, progress, result: matrix };
    postMessage(results);

    tf.engine().endScope();
  }
});
