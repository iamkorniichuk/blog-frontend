import { Component, inject, input, OnInit } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

import { Tutorial } from '../../services/tutorial-api';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { ScreenSizeService } from '../../services/screen-size';
import { ArrowScrollComponent } from '../../components/arrow-scroll/arrow-scroll';

@Component({
  selector: 'app-tutorial-page',
  imports: [MarkdownComponent, NgTemplateOutlet, DatePipe, ArrowScrollComponent],
  providers: [DatePipe],
  templateUrl: './tutorial-page.html',
})
export class TutorialPageComponent implements OnInit {
  tutorial = input.required<Tutorial>();
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private screenSizeService = inject(ScreenSizeService);
  private datePipe = inject(DatePipe);
  screenSize = this.screenSizeService.screenSize;

  ngOnInit() {
    const title = this.tutorial().title;
    this.titleService.setTitle(title);

    const description = this.tutorial().description;
    this.setTag('description', { name: 'description', content: description });

    const tags = this.tutorial().tags.join(', ');
    this.setTag('keywords', { name: 'keywords', content: tags });

    const dateScheme = 'dd/MM/yy';
    const date = this.datePipe.transform(this.tutorial().createdAt, dateScheme);
    if (date) this.setTag('date', { name: 'date', content: date, scheme: dateScheme });
  }

  private setTag(name: string, meta: MetaDefinition) {
    const metaTag = this.metaService.getTag(name);
    if (metaTag) metaTag.remove();
    this.metaService.addTag(meta);
  }
}
