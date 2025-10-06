import { Component, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';

import { Tutorial } from '../../services/tutorial-api';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { ArrowScrollComponent } from '../../components/arrow-scroll/arrow-scroll';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { MetaService } from '../../services/meta';

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
  private metaService = inject(MetaService);
  private datePipe = inject(DatePipe);

  ngOnInit() {
    const title = this.tutorial().title;
    this.metaService.setTitle(title);
    this.metaService.setTag({ name: 'og:title', content: title });
    this.metaService.setTag({ name: 'og:type', content: 'article' });

    const description = this.tutorial().description;
    this.metaService.setTag({ name: 'description', content: description });
    this.metaService.setTag({ name: 'og:description', content: description });

    const cover = this.tutorial().cover;
    this.metaService.setTag({ name: 'og:image', content: cover });

    const tags = this.tutorial().tags.join(', ');
    this.metaService.setTag({ name: 'keywords', content: tags });

    const dateScheme = 'dd/MM/yy';
    const date = this.datePipe.transform(this.tutorial().createdAt, dateScheme);
    if (date) this.metaService.setTag({ name: 'date', content: date, scheme: dateScheme });
  }
}
