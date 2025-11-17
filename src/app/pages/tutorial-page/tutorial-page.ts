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
import { ImageComponent } from '../../components/elements/image/image';

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
    ImageComponent,
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

    const jpegImage = this.tutorial().image.images['image/jpeg']?.[0].src;
    const pngImage = this.tutorial().image.images['image/png']?.[0].src;
    const imageUrl = jpegImage !== undefined ? jpegImage : pngImage;

    const imageAlt = this.tutorial().image.alt;
    const createdAt = this.tutorial().createdAt;
    const modifiedAt = this.tutorial().modifiedAt;
    const tags = this.tutorial().tags;
    this.metaService.setRouteMeta({
      title,
      description,
      imageUrl,
      imageAlt,
      createdAt,
      modifiedAt,
      tags,
    });
  }

  togglePopupVisibility() {
    this.isPopupVisible.update((current) => !current);
  }
}
