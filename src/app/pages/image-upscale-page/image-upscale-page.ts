import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';

import { Tensor3D } from '@tensorflow/tfjs';

import { TensorImageData, UpscaleFactor, WorkerMessage } from '../../workers/image-upscale.worker';
import { NewsTickerComponent } from '../../components/news-ticker/news-ticker';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { MetaService } from '../../services/meta';
import { InputFileComponent } from '../../components/elements/input-file/input-file';
import { IconComponent } from '../../components/icon/icon';
import { SliderCompareComponent } from '../../components/slider-compare/slider-compare';
import {
  State,
  ProcessProgressComponent,
} from '../../components/process-progress/process-progress';
import { CodeBlockComponent } from '../../components/code-block/code-block';

export interface UpscaledData {
  state: State;
  progress: number;
  image: string | null;
}

@Component({
  selector: 'app-image-upscale-page',
  imports: [
    NewsTickerComponent,
    ContentPageComponent,
    NgTemplateOutlet,
    IconComponent,
    InputFileComponent,
    SliderCompareComponent,
    ProcessProgressComponent,
    CodeBlockComponent,
  ],
  templateUrl: './image-upscale-page.html',
})
export class ImageUpscalePageComponent implements OnInit {
  private metaService = inject(MetaService);
  private platformId = inject(PLATFORM_ID);

  uploadedImages = signal<HTMLImageElement[]>([]);
  upscaleFactor = signal<UpscaleFactor>('x2');
  upscaledData = signal<UpscaledData[]>([]);
  allImagesUpscaled = computed<boolean>(() => {
    if (this.upscaledData().length === 0) return false;

    for (const data of this.upscaledData()) {
      if (data.state !== 'done') return false;
    }
    return true;
  });

  upscaleOptions: UpscaleFactor[] = ['x2', 'x3', 'x4', 'x8'];

  ngOnInit() {
    const title = 'Upscale image';
    this.metaService.setTitle(title);
    this.metaService.setTag({ name: 'og:title', content: title });
    this.metaService.setTag({ name: 'og:type', content: 'website' });

    const description = 'Upscale your images for free without sign up.';
    this.metaService.setTag({ name: 'description', content: description });
    this.metaService.setTag({ name: 'og:description', content: description });

    const tags = 'upscale image, no sign up, free';
    this.metaService.setTag({ name: 'keywords', content: tags });
  }

  onFilesSelected(files: FileList) {
    for (const file of Array.from(files)) {
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

  downloadAll() {
    const images = this.upscaledData();

    images.forEach((data, index) => {
      const src = data.image;
      if (!src) return;

      const ext = this.getExtensionFromDataUrl(src);
      const link = document.createElement('a');
      link.href = src;
      link.download = `image-${index + 1}.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  private getExtensionFromDataUrl(dataUrl: string): string {
    const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,/);
    if (!match) return 'bin';

    const mime = match[1];
    const ext = mime.split('/')[1];

    if (ext === 'jpeg') return 'jpg';
    if (ext === 'svg+xml') return 'svg';
    return ext;
  }

  removeImage(index: number) {
    this.uploadedImages.update((current) => {
      const copy = [...current];
      copy.splice(index, 1);
      return copy;
    });
    this.upscaledData.update((current) => {
      const copy = [...current];
      copy.splice(index, 1);
      return copy;
    });
  }

  async upscaleImages() {
    if (!isPlatformBrowser(this.platformId)) return;

    const tf = (window as unknown as { tf: typeof import('@tensorflow/tfjs') }).tf;

    const worker = new Worker(new URL('../../workers/image-upscale.worker', import.meta.url));

    worker.onmessage = async ({ data }) => {
      for (const i in data) {
        const index = Number(i);
        const { state, progress, imageData } = data[index] as WorkerMessage;

        if (state === 'done' && imageData) {
          const [image, shape] = imageData;
          const [height, width] = shape.slice(0, 2);

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          try {
            const tensor = tf.tensor(image, shape, 'int32') as Tensor3D;
            await tf.browser.toPixels(tensor, canvas);
            tensor.dispose();
          } catch (err) {
            console.error('Error converting returned tensor to pixels:', err);
          }

          const src = canvas.toDataURL('image/png');
          this.upscaledData.update((images) => {
            images[index].image = src;
            return images;
          });
        }

        this.upscaledData.update((images) => {
          const copy = [...images];
          copy[index].state = state;
          copy[index].progress = progress;
          return copy;
        });
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

  changeUpscaleFactor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const factor = target.value as UpscaleFactor;
    this.upscaleFactor.set(factor);
  }
}
