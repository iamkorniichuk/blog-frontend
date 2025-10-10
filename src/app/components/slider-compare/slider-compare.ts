import { NgTemplateOutlet } from '@angular/common';
import { Component, input, signal, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-slider-compare',
  imports: [NgTemplateOutlet],
  templateUrl: './slider-compare.html',
})
export class SliderCompareComponent {
  first = input.required<TemplateRef<unknown>>();
  second = input.required<TemplateRef<unknown>>();
  dividerPosition = signal<number>(70);

  dragDivider(event: MouseEvent | TouchEvent) {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const clientX = event instanceof TouchEvent ? event.touches[0].clientX : event.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    this.dividerPosition.set(Math.max(0, Math.min(100, x)));
  }
}
