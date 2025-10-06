import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';

import { Tutorial, TutorialApiService } from '../../services/tutorial-api';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { ArrowIconComponent } from '../../components/icons/arrow-icon';

@Component({
  selector: 'app-tutorial-list-page',
  imports: [
    ContentPageComponent,
    NgTemplateOutlet,
    DatePipe,
    RouterLink,
    GradientOverlayComponent,
    ArrowIconComponent,
  ],
  templateUrl: './tutorial-list-page.html',
})
export class TutorialListPageComponent implements OnInit {
  private tutorialApiService = inject(TutorialApiService);
  private route = inject(ActivatedRoute);
  private metaService = inject(Meta);
  tutorials = signal<Tutorial[]>([]);
  allTutorialsLength!: number;
  pageSize = 10;
  currentPage!: number;
  totalPages!: number;

  async ngOnInit() {
    this.allTutorialsLength = await this.tutorialApiService.readLength();
    this.totalPages = Math.ceil(this.allTutorialsLength / this.pageSize);

    this.route.queryParamMap.subscribe(async (params) => {
      const page = Number(params.get('page')) || 1;
      this.currentPage = Math.min(Math.max(page, 1), this.totalPages);

      this.setTags(this.currentPage);
      await this.loadPage(this.currentPage);
    });
  }

  async loadPage(page: number) {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    const newTutorials = await this.tutorialApiService.readAll({ start, end });
    this.tutorials.set(newTutorials);
  }

  private setTags(page: number) {
    this.metaService.removeTag("rel='prev'");
    this.metaService.removeTag("rel='next'");

    if (page > 1) this.metaService.addTag({ rel: 'prev', href: `/tutorials?page=${page - 1}` });

    if (page < this.totalPages)
      this.metaService.addTag({ rel: 'next', href: `/tutorials?page=${page + 1}` });
  }

  get pageNumbers() {
    const neighbors = 2;
    const pages: (number | null)[] = [1];

    const start = Math.max(2, this.currentPage - neighbors);
    const end = Math.min(this.totalPages - 1, this.currentPage + neighbors);

    if (start > 2) pages.push(null);

    for (let i = start; i <= end; i++) pages.push(i);

    if (end < this.totalPages - 1) pages.push(null);

    if (this.totalPages > 1) pages.push(this.totalPages);

    return pages;
  }
}
