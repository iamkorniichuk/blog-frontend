import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
})
export class ProgressBarComponent {
  progress = input.required<number>();
}
