import { Component, input, signal } from '@angular/core';

export type ImgLoading = 'lazy' | 'eager';
export type ImgDecoding = 'auto' | 'sync' | 'async';

export type ImageFormat = 'image/avif' | 'image/webp' | 'image/jpeg' | 'image/png' | 'image/gif';
type AtLeastOne<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, T[Exclude<keyof T, K>]>>;
}[keyof T];

export interface ImageSize {
  width: number;
  height: number;
}

export interface FixedImage extends ImageSize {
  src: string;
}
export interface ResponsiveImage {
  images: AtLeastOne<Record<ImageFormat, FixedImage[]>>;
  alt: string;
  ratio: ImageSize;
  title?: string;
}

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
})
export class ImageComponent {
  image = input.required<ResponsiveImage>();
  sizes = input<string>('(max-width: 640px) 480px, (max-width: 896px) 768px, 1024px');
  loading = input<ImgLoading>('eager');
  decoding = input<ImgDecoding>('auto');

  isLoaded = signal<boolean>(false);

  protected readonly orderedFormats: ImageFormat[] = [
    'image/avif',
    'image/webp',
    'image/jpeg',
    'image/png',
    'image/gif',
  ];

  buildSrcset(images: FixedImage[]): string {
    const results: string[] = [];
    for (const img of images) {
      results.push(`${img.src} ${img.width}w`);
    }
    return results.join(', ');
  }

  get fallbackImages(): FixedImage[] {
    const available = this.orderedFormats.filter((format) => this.image().images[format]?.length);

    const format = available[available.length - 1];
    return this.image().images[format] as FixedImage[];
  }
}
