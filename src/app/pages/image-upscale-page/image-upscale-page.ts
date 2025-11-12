import { Component, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';

import { WorkerMessage } from '../../workers/image-upscale.worker';
import { NewsTickerComponent } from '../../components/news-ticker/news-ticker';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { InputFileComponent } from '../../components/elements/input-file/input-file';
import { IconComponent } from '../../components/icon/icon';
import { SliderCompareComponent } from '../../components/slider-compare/slider-compare';
import {
  State,
  ProcessProgressComponent,
} from '../../components/process-progress/process-progress';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ImageCastService, ImageMatrix } from '../../services/image-cast';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { Tool } from '../../services/tool-api';
import { MetaService } from '../../services/meta';

export interface UpscaledData {
  state: State;
  progress: number;
  image: HTMLImageElement | null;
}
export type UpscalingState = 'idle' | 'inprogress' | 'done';

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
    BreadcrumbsComponent,
    MarkdownComponent,
    MarkdownAstPipe,
  ],
  templateUrl: './image-upscale-page.html',
})
export class ImageUpscalePageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private imageCast = inject(ImageCastService);
  private metaService = inject(MetaService);
  tool = input.required<Tool>();

  uploadedImages = signal<HTMLImageElement[]>([]);
  upscaledData = signal<UpscaledData[]>([]);
  upscaleState = signal<UpscalingState>('idle');

  worker: Worker | null = null;

  ngOnInit() {
    const title = `${this.tool().title} | ReturnsNull;`;
    const description = this.tool().description;

    const jpegImage = this.tool().image.images['image/jpeg']?.[0].src;
    const pngImage = this.tool().image.images['image/png']?.[0].src;
    const imageUrl = jpegImage !== undefined ? jpegImage : pngImage;

    const imageAlt = this.tool().image.alt;
    const createdAt = this.tool().createdAt;
    this.metaService.setRouteMeta({ title, description, imageUrl, imageAlt, createdAt });
  }

  async onFilesSelected(files: FileList) {
    this.resetState();

    for (const obj of Array.from(files)) {
      const image = await this.imageCast.fileToImage(obj);
      if (image === null) continue;

      this.uploadedImages.update((current) => [...current, image]);
      this.upscaledData.update((current) => [
        ...current,
        { state: 'nostate', progress: 0, image: null },
      ]);
    }
  }

  onAbortClick() {
    this.upscaleState.set('idle');
    this.worker?.terminate();
  }

  private resetState() {
    this.uploadedImages.set([]);
    this.upscaledData.set([]);
    this.upscaleState.set('idle');
    this.worker?.terminate();
  }

  downloadAll() {
    const images: HTMLImageElement[] = [];
    this.upscaledData().forEach((data) => {
      if (data.image) images.push(data.image);
    });

    this.imageCast.downloadImages(images);
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

    this.worker = new Worker(new URL('../../workers/image-upscale.worker', import.meta.url));

    this.worker.onmessage = async ({ data }) => {
      let doneNumbers = 0;
      for (const i in data) {
        const index = Number(i);
        const { state, progress, result } = data[index] as WorkerMessage;

        if (state === 'done' && result) {
          ++doneNumbers;
          const image = this.imageCast.matrixToImage(result, 'image/png');
          this.upscaledData.update((current) => {
            current[index].image = image;
            return current;
          });
        }

        this.upscaledData.update((current) => {
          const copy = [...current];
          copy[index].state = state;
          copy[index].progress = progress;
          return copy;
        });
      }

      const allDone = doneNumbers === this.upscaledData().length;
      this.upscaleState.set(allDone ? 'done' : 'inprogress');
    };

    const imagesMatrix: ImageMatrix[] = [];
    this.uploadedImages().forEach((img) => {
      const matrix = this.imageCast.imageToMatrix(img);
      if (matrix) imagesMatrix.push(matrix);
    });

    this.worker.postMessage(imagesMatrix);
  }
}
