import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [NgTemplateOutlet],
  templateUrl: './heading.html',
})
export class Heading {
  class = input<string>();
  id = input<string>();
  level = input.required<number>();
}
