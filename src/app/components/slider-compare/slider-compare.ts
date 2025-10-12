import { Component, signal } from '@angular/core';

import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-slider-compare',
  templateUrl: './slider-compare.html',
  imports: [IconComponent],
})
export class SliderCompareComponent {
  dividerPosition = signal<number>(50);

  dragDivider(event: MouseEvent | TouchEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clientX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    this.dividerPosition.set(Math.max(0, Math.min(100, x)));
  }
}
