import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Tutorial, TutorialApiService } from '../../services/tutorial-api';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { PageNavigationComponent } from '../../components/page-navigation/page-navigation';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { MetaService } from '../../services/meta';
import { ImageComponent } from '../../components/elements/image/image';

@Component({
  selector: 'app-tutorial-list-page',
  imports: [
    ContentPageComponent,
    NgTemplateOutlet,
    DatePipe,
    RouterLink,
    GradientOverlayComponent,
    PageNavigationComponent,
    BreadcrumbsComponent,
    ImageComponent,
  ],
  templateUrl: './tutorial-list-page.html',
})
export class TutorialListPageComponent implements OnInit {
  private tutorialApiService = inject(TutorialApiService);
  private metaService = inject(MetaService);
  tutorials = signal<Tutorial[]>([]);

  allTutorialsLength!: number;
  pageSize = 10;
  totalPages!: number;

  async ngOnInit() {
    this.allTutorialsLength = await this.tutorialApiService.readLength();
    this.totalPages = Math.ceil(this.allTutorialsLength / this.pageSize);

    const lastTutorial = (await this.tutorialApiService.readAll({ start: 0, end: 1 }))[0];
    const jpegImage = lastTutorial.image.images['image/jpeg']?.[0].src;
    const pngImage = lastTutorial.image.images['image/png']?.[0].src;
    const imageUrl = jpegImage !== undefined ? jpegImage : pngImage;
    const imageAlt = lastTutorial.image.alt;
    const modifiedAt = lastTutorial.createdAt;

    this.metaService.setRouteMeta({ imageUrl, imageAlt, modifiedAt });
  }

  async loadPage(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const newTutorials = await this.tutorialApiService.readAll({ start, end });
    this.tutorials.set(newTutorials);
  }
}
