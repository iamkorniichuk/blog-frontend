import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  ViewChild,
  afterEveryRender,
} from '@angular/core';

import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';

import { CopyIconComponent } from '../icons/copy-icon';

export type FileType =
  | 'css'
  | 'csv'
  | 'bash'
  | 'html'
  | 'javascript'
  | 'json'
  | 'markdown'
  | 'shell'
  | 'sql'
  | 'typescript'
  | 'txt'
  | 'yaml';

@Component({
  selector: 'app-code-block',
  imports: [CopyIconComponent, NgTemplateOutlet],
  templateUrl: './code-block.html',
  host: { ngSkipHydration: 'true' },
})
export class CodeBlockComponent {
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLBaseElement>;
  private platformId = inject(PLATFORM_ID);

  code = input.required<string>();
  fileName = input<string>();
  fileType = input<FileType>('txt');
  isMultiline = input<boolean>(true);

  constructor() {
    afterEveryRender({
      mixedReadWrite: () => {
        Prism.highlightElement(this.codeBlock.nativeElement);
      },
    });
  }

  copyCode() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.code());
  }
}
