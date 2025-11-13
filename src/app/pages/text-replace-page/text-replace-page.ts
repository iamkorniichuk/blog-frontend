import {
  Component,
  ElementRef,
  inject,
  input,
  model,
  OnInit,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { NewsTickerComponent } from '../../components/news-ticker/news-ticker';
import { Tool } from '../../services/tool-api';
import { MetaService } from '../../services/meta';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { IconComponent } from '../../components/icon/icon';

@Component({
  selector: 'app-text-replace-page',
  imports: [
    FormsModule,
    ContentPageComponent,
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
  findElement = viewChild<ElementRef<HTMLInputElement>>('find');
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

  addSymbolToFind(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const select = event.target as HTMLSelectElement;
    const value = select.value;
    this.findInput.update((text) => (text ?? '') + value);
    select.value = '';
  }

  processText() {
    if (!isPlatformBrowser(this.platformId)) return;

    const find = this.findInput();
    const replace = this.replaceInput();

    const result = this.textInput().replace(new RegExp(find, 'g'), replace);
    this.results.set(result);
  }

  copyResult() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.results());
  }
}
