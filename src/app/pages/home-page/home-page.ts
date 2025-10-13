import { Component, inject, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { Tutorial, TutorialApiService } from '../../services/tutorial-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [ContentPageComponent, NgTemplateOutlet, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit {
  private tutorialApiService = inject(TutorialApiService);
  tutorials = signal<Tutorial[]>([]);

  async ngOnInit() {
    const tutorials = await this.tutorialApiService.readAll({ start: 0, end: 10 });
    this.tutorials.set(tutorials);
  }
}
