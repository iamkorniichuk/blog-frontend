import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import Prism from 'prismjs';

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
})
export class CodeBlockComponent implements AfterViewInit {
  @ViewChild('codeBlock') codeBlock!: ElementRef<HTMLBaseElement>;
  private platformId = inject(PLATFORM_ID);

  code = input.required<string>();
  fileName = input<string>();
  fileType = input<FileType>('txt');
  isMultiline = input<boolean>(true);

  copyCode() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.code());
  }

  ngAfterViewInit() {
    Prism.highlightAllUnder(this.codeBlock.nativeElement);
  }
}
