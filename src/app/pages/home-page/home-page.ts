import { Component, inject, OnInit, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { Tutorial, TutorialApiService } from '../../services/tutorial-api';
import { Tool, ToolApiService } from '../../services/tool-api';

@Component({
  selector: 'app-home-page',
  imports: [ContentPageComponent, NgTemplateOutlet, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit {
  private tutorialApiService = inject(TutorialApiService);
  private toolApiService = inject(ToolApiService);
  tutorials = signal<Tutorial[]>([]);
  tools = signal<Tool[]>([]);

  async ngOnInit() {
    const tutorials = await this.tutorialApiService.readAll({ start: 0, end: 10 });
    this.tutorials.set(tutorials);
    const tools = await this.toolApiService.readAll();
    this.tools.set(tools);
  }
}
