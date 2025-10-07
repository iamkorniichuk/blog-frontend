import { Component, input } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  imports: [],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      preserveAspectRatio="xMidYMid meet"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <title>{{ title() }}</title>
      <line x1="3" y1="3" x2="21" y2="21" />
      <line x1="21" y1="3" x2="3" y2="21" />
    </svg>
  `,
})
export class CloseIconComponent {
  title = input.required<string>();
}
