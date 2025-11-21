import { Component, inject, input, model, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { NewsTickerComponent } from '../../components/news-ticker/news-ticker';
import { Tool } from '../../services/tool-api';
import { MetaService } from '../../services/meta';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { IconComponent } from '../../components/icon/icon';
import { ListPageComponent } from '../../components/list-page/list-page';

@Component({
  selector: 'app-text-replace-page',
  imports: [
    FormsModule,
    ListPageComponent,
    BreadcrumbsComponent,
    NewsTickerComponent,
    NgTemplateOutlet,
    MarkdownAstPipe,
    MarkdownComponent,
    IconComponent,
  ],
  templateUrl: './text-replace-page.html',
})
export class TextReplacePageComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private metaService = inject(MetaService);
  tool = input.required<Tool>();
  results = signal<string>('');

  textInput = model('');
  findInput = model('');
  replaceInput = model('');

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

  setFindToSymbol(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const select = event.target as HTMLSelectElement;
    const value = select.value;
    const input = select.previousElementSibling as HTMLInputElement | null;

    if (input === null) return;

    input.value = value;
    select.value = '';

    input.dispatchEvent(new Event('input'));
  }

  processText() {
    if (!isPlatformBrowser(this.platformId)) return;

    const find = this.findInput();
    const replace = this.replaceInput();
    const text = this.textInput();

    const result = text.replace(new RegExp(find, 'g'), replace);
    const parsedResult = this.unescapeString(result);
    this.results.set(parsedResult);
  }

  unescapeString(value: string): string {
    return value.replace(/\\(\\|n|r|t|b|f)/g, (match, sequence) => {
      switch (sequence) {
        case 'n':
          return '\n';
        case 'r':
          return '\r';
        case 't':
          return '\t';
        case 'b':
          return '\b';
        case 'f':
          return '\f';
        case '\\':
          return '\\';
        default:
          return sequence;
      }
    });
  }

  copyResult() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.results());
  }
}
