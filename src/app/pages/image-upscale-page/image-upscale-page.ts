import { Component, signal } from '@angular/core';

import * as tf from '@tensorflow/tfjs';

import {
  State,
  TensorImageData,
  UpscaleFactor,
  WorkerMessage,
} from '../../workers/image-upscale.worker';

export interface UpscaledData {
  state: State;
  progress: number;
  image: string | null;
}

@Component({
  selector: 'app-image-upscale-page',
  imports: [],
  templateUrl: './image-upscale-page.html',
})
export class ImageUpscalePageComponent {
  uploadedImages = signal<HTMLImageElement[]>([]);
  upscaleFactor = signal<string>('4x');
  upscaledData = signal<UpscaledData[]>([]);

  upscaleOptions: UpscaleFactor[] = ['x2', 'x3', 'x4', 'x8'];

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    this.uploadedImages.set([]);
    this.upscaledData.set([]);
    const files = Array.from(input.files);
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.alt = file.name;
        img.src = reader.result as string;
        this.uploadedImages.update((current) => [...current, img]);
        this.upscaledData.update((current) => [
          ...current,
          { state: 'nostate', progress: 0, image: null },
        ]);
      };
      reader.readAsDataURL(file);
    }
  }

  async upscaleImages() {
    const worker = new Worker(new URL('../../workers/image-upscale.worker', import.meta.url));

    worker.onmessage = async ({ data }) => {
      for (const i in data) {
        const index = i as unknown as number;
        const { state, progress, imageData } = data[index] as WorkerMessage;

        if (state === 'inprogress') {
          this.upscaledData.update((images) => {
            images[index].state = state;
            images[index].progress = progress;
            return [...images];
          });
        }

        if (state === 'done' && imageData) {
          const [image, shape] = imageData;
          const [height, width] = shape.slice(0, 2);

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const tensor = tf.tensor(image, shape, 'int32') as tf.Tensor3D;
          await tf.browser.toPixels(tensor, canvas);
          tensor.dispose();

          const src = canvas.toDataURL('image/png');
          this.upscaledData.update((images) => {
            images[index].image = src;
            images[index].state = state;
            images[index].progress = progress;
            return [...images];
          });
        }
      }
    };

    const tensorImages: TensorImageData[] = [];
    for (const image of this.uploadedImages()) {
      const tensor = await tf.browser.fromPixelsAsync(image);
      tensorImages.push([await tensor.data(), tensor.shape]);
      tensor.dispose();
    }

    worker.postMessage({ imagesData: tensorImages, upscaleFactor: this.upscaleFactor() });
  }
}
