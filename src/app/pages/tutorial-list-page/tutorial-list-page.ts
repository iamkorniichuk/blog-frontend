import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PageFilter, Tutorial, TutorialApiService } from '../../services/tutorial-api';
import { ContentPageComponent } from '../../components/content-page/content-page';

@Component({
  selector: 'app-tutorial-list-page',
  imports: [ContentPageComponent, NgTemplateOutlet, DatePipe, RouterLink],
  templateUrl: './tutorial-list-page.html',
})
export class TutorialListPageComponent implements OnInit {
  private tutorialApiService = inject(TutorialApiService);
  tutorials = signal<Tutorial[]>([]);
  private pageStart = 0;
  private pageSize = 10;
  areAllTutorialsLoaded = signal<boolean>(false);

  async ngOnInit() {
    await this.loadTutorials();
  }

  async loadTutorials() {
    if (this.areAllTutorialsLoaded()) return;

    const pageEnd = this.pageStart + this.pageSize;
    const page: PageFilter = { start: this.pageStart, end: pageEnd };
    const newTutorials = await this.tutorialApiService.readAll(page);
    this.tutorials.update((current) => [...current, ...newTutorials]);
    this.pageStart = pageEnd;

    const length = await this.tutorialApiService.readLength();
    this.areAllTutorialsLoaded.set(pageEnd >= length);
  }
}
