import { Component, input, output, signal } from '@angular/core';

import { IconComponent } from '../../icon/icon';

@Component({
  selector: 'app-input-file',
  imports: [IconComponent],
  templateUrl: './input-file.html',
})
export class InputFileComponent {
  disabled = input<boolean>(false);
  accept = input<string>('*');
  multiple = input<boolean>(false);
  onchange = output<FileList>();
  isDraggedOver = signal<boolean>(false);

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files) return;
    this.onchange.emit(files);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (this.disabled()) return;
    this.isDraggedOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDraggedOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (this.disabled()) return;
    this.isDraggedOver.set(false);

    const files = event.dataTransfer?.files;
    if (!files) return;

    const validFiles = this.filterByMime(files, this.accept());
    this.onchange.emit(validFiles);
  }

  private filterByMime(files: FileList, accept: string): FileList {
    if (!accept || accept === '*') return files;

    const acceptedTypes = accept
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const dataTransfer = new DataTransfer();
    for (const file of Array.from(files)) {
      for (const type of acceptedTypes) {
        if (type === '*') {
          dataTransfer.items.add(file);
          break;
        }

        if (type.endsWith('/*')) {
          const prefix = type.slice(0, -1);
          if (file.type.startsWith(prefix)) {
            dataTransfer.items.add(file);
            break;
          }
        }

        if (type === file.type) {
          dataTransfer.items.add(file);
          break;
        }
      }
    }

    return dataTransfer.files;
  }
}
