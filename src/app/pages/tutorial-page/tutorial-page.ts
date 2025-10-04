import { Component, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { Tutorial } from '../../services/tutorial-api';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { ArrowScrollComponent } from '../../components/arrow-scroll/arrow-scroll';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';

@Component({
  selector: 'app-tutorial-page',
  imports: [
    MarkdownComponent,
    NgTemplateOutlet,
    DatePipe,
    ArrowScrollComponent,
    ContentPageComponent,
    GradientOverlayComponent,
  ],
  providers: [DatePipe],
  templateUrl: './tutorial-page.html',
})
export class TutorialPageComponent implements OnInit {
  tutorial = input.required<Tutorial>();
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private datePipe = inject(DatePipe);

  ngOnInit() {
    const title = this.tutorial().title;
    this.titleService.setTitle(title);
    this.setTag('og:title', { name: 'og:title', content: title });
    this.setTag('og:type', { name: 'og:type', content: 'article' });

    const description = this.tutorial().description;
    this.setTag('description', { name: 'description', content: description });
    this.setTag('og:description', { name: 'og:description', content: description });

    const cover = this.tutorial().cover;
    this.setTag('og:image', { name: 'og:image', content: cover });

    const tags = this.tutorial().tags.join(', ');
    this.setTag('keywords', { name: 'keywords', content: tags });

    const dateScheme = 'dd/MM/yy';
    const date = this.datePipe.transform(this.tutorial().createdAt, dateScheme);
    if (date) this.setTag('date', { name: 'date', content: date, scheme: dateScheme });
  }

  private setTag(name: string, meta: MetaDefinition) {
    const selector = `name='${name}'`;
    const metaTag = this.metaService.getTag(selector);
    if (metaTag) metaTag.remove();
    this.metaService.addTag(meta);
  }
}
