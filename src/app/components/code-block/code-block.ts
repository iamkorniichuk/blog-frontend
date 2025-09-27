import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, PLATFORM_ID } from '@angular/core';

import { CopyIconComponent } from '../icons/copy-icon';

export type FileType =
  | 'css'
  | 'csv'
  | 'bash'
  | 'http'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'shell'
  | 'sql'
  | 'txt'
  | 'xml'
  | 'yaml';

@Component({
  selector: 'app-code-block',
  imports: [CopyIconComponent, NgTemplateOutlet],
  templateUrl: './code-block.html',
})
export class CodeBlockComponent {
  private platformId = inject(PLATFORM_ID);

  code = input.required<string>();
  fileName = input<string>();
  fileType = input<FileType>('txt');
  isMultiline = input<boolean>(true);

  copyCode() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.code());
  }
}
