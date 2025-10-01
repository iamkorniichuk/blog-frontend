import { Component, input } from '@angular/core';

@Component({
  selector: 'app-heading',
  imports: [],
  template: `
    @switch (level()) {
      @case (1) {
        <h1 [class]="class()">{{ text() }}</h1>
      }
      @case (2) {
        <h2 [class]="class()">{{ text() }}</h2>
      }
      @case (3) {
        <h3 [class]="class()">{{ text() }}</h3>
      }
      @case (4) {
        <h4 [class]="class()">{{ text() }}</h4>
      }
      @case (5) {
        <h5 [class]="class()">{{ text() }}</h5>
      }
      @case (6) {
        <h6 [class]="class()">{{ text() }}</h6>
      }
    }
  `,
})
export class Heading {
  class = input<string>();
  text = input.required<string>();
  level = input.required<number>();
}
