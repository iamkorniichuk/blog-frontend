import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { SliderCompareComponent } from '../slider-compare/slider-compare';
import { ProgressBarComponent } from '../progress-bar/progress-bar';

export type State = 'nostate' | 'queued' | 'inprogress' | 'done';

@Component({
  selector: 'app-process-progress',
  imports: [SliderCompareComponent, NgTemplateOutlet, ProgressBarComponent],
  templateUrl: './process-progress.html',
})
export class ProcessProgressComponent {
  state = input.required<State>();
  progress = input.required<number>();
}
