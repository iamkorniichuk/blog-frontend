import { Component, computed, effect, input, signal } from '@angular/core';

export type Side = 't' | 'r' | 'b' | 'l';
export type Color =
  | 'surface-extra-accent'
  | 'surface-accent'
  | 'surface'
  | 'surface-muted'
  | 'surface-extra-muted';

@Component({
  selector: 'app-gradient-overlay',
  imports: [],
  templateUrl: './gradient-overlay.html',
})
export class GradientOverlayComponent {
  sizePercentage = input.required<number>();
  color = input.required<Color>();
  side = input.required<Side>();

  width = signal<number>(100);
  height = signal<number>(100);

  constructor() {
    effect(() => {
      if (['t', 'b'].includes(this.side())) this.height.set(this.sizePercentage());
      else this.width.set(this.sizePercentage());
    });
  }

  class = computed(() => {
    const positionMap: Record<Side, string> = {
      t: `inset-x-0 top-0 bg-gradient-to-b to-transparent`,
      r: `inset-y-0 right-0 bg-gradient-to-l to-transparent`,
      b: `inset-x-0 bottom-0 bg-gradient-to-t to-transparent`,
      l: `inset-y-0 left-0 bg-gradient-to-r to-transparent`,
    };
    const colorMap: Record<Color, string> = {
      'surface-extra-accent': 'from-surface-extra-accent via-surface-extra-accent',
      'surface-accent': 'from-surface-accent via-surface-accent',
      surface: 'from-surface via-surface',
      'surface-muted': 'from-surface-muted via-surface-muted',
      'surface-extra-muted': 'from-surface-extra-muted via-surface-extra-muted',
    };
    return positionMap[this.side()] + ' ' + colorMap[this.color()];
  });
}
