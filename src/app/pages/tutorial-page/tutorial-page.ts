import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';

import { Tutorial } from '../../services/tutorial-api';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { ArrowScrollComponent } from '../../components/arrow-scroll/arrow-scroll';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { TocMarkdownComponent } from '../../components/toc-markdown/toc-markdown';
import { IconComponent } from '../../components/icon/icon';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { MetaService } from '../../services/meta';

@Component({
  selector: 'app-tutorial-page',
  imports: [
    DatePipe,
    MarkdownAstPipe,
    NgTemplateOutlet,
    MarkdownComponent,
    ArrowScrollComponent,
    ContentPageComponent,
    GradientOverlayComponent,
    TocMarkdownComponent,
    IconComponent,
    BreadcrumbsComponent,
  ],
  templateUrl: './tutorial-page.html',
})
export class TutorialPageComponent implements OnInit {
  private metaService = inject(MetaService);

  tutorial = input.required<Tutorial>();
  isPopupVisible = signal<boolean>(false);

  ngOnInit() {
    const title = this.tutorial().title;
    const description = this.tutorial().description;
    const imageUrl = this.tutorial().cover;
    const imageAlt = this.tutorial().coverAlt;
    const createdAt = this.tutorial().createdAt;
    const tags = this.tutorial().tags;
    this.metaService.setRouteMeta({ title, description, imageUrl, imageAlt, createdAt, tags });
  }

  togglePopupVisibility() {
    this.isPopupVisible.update((current) => !current);
  }
}
