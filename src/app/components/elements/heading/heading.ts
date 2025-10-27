import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [NgTemplateOutlet],
  templateUrl: './heading.html',
})
export class HeadingComponent {
  class = input<string>();
  id = input<string>();
  level = input.required<number>();
}
