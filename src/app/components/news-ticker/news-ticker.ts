import { NgTemplateOutlet } from '@angular/common';
import { Component, input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-news-ticker',
  imports: [NgTemplateOutlet],
  templateUrl: './news-ticker.html',
})
export class NewsTickerComponent {
  template = input.required<TemplateRef<unknown>>();
}
