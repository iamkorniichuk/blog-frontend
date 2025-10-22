import { Injectable } from '@angular/core';

export type ImageMatrix = [
  Uint8ClampedArray<ArrayBuffer> | Uint8Array<ArrayBuffer>,
  [number, number, number],
];

@Injectable({
  providedIn: 'root',
})
export class ImageCastService {
  async fileToImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (result === null) reject();

        const image = new Image();
        image.src = result as string;
        image.alt = file.name;
        image.title = file.name;

        image.onload = () => resolve(image);
      };

      reader.readAsDataURL(file);
    });
  }

  imageToMatrix(image: HTMLImageElement): ImageMatrix | null {
    const context = this.createContext(image.width, image.height);
    if (context === null) return null;

    context.drawImage(image, 0, 0);
    const { data } = context.getImageData(0, 0, image.width, image.height);

    const rgb = new Uint8ClampedArray((data.length / 4) * 3);
    for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
      rgb[j] = data[i];
      rgb[j + 1] = data[i + 1];
      rgb[j + 2] = data[i + 2];
    }

    const shape: [number, number, number] = [image.height, image.width, 3];
    return [rgb, shape];
  }

  matrixToImage(matrix: ImageMatrix, mimeType: string): HTMLImageElement | null {
    const [data, shape] = matrix;
    const [height, width] = shape;

    const context = this.createContext(width, height);
    if (context === null) return null;

    const rgba = new Uint8ClampedArray((data.length / 3) * 4);
    for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
      rgba[j] = data[i];
      rgba[j + 1] = data[i + 1];
      rgba[j + 2] = data[i + 2];
      rgba[j + 3] = 255;
    }

    const imageData = new ImageData(rgba, width, height);
    context.putImageData(imageData, 0, 0);

    const image = new Image();
    image.src = context.canvas.toDataURL(mimeType);
    image.width = width;
    image.height = height;

    return image;
  }

  private createContext(width: number, height: number): CanvasRenderingContext2D | null {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  }

  downloadImages(images: HTMLImageElement[]): void {
    if (images.length === 0) {
      return;
    } else {
      for (const obj of images) {
        const a = document.createElement('a');
        a.href = obj.src;
        a.download = obj.title;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }
  }
}
