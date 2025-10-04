import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';

import { ArrowIconComponent } from '../icons/arrow-icon';
import { Color, GradientOverlayComponent } from '../gradient-overlay/gradient-overlay';

export type Direction = 'l' | 'r';

@Component({
  selector: 'app-arrow-scroll',
  imports: [ArrowIconComponent, GradientOverlayComponent],
  templateUrl: './arrow-scroll.html',
})
export class ArrowScrollComponent implements AfterViewInit {
  @ViewChild('strip', { static: true }) strip!: ElementRef<HTMLElement>;

  private host = inject(ElementRef<HTMLElement>);
  step = input<number>(100);
  color = input.required<Color>();
  offset = signal<number>(0);
  maxOffset = signal<number>(0);

  ngAfterViewInit() {
    this.updateMaxOffset();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateMaxOffset();
  }

  private updateMaxOffset() {
    const strip = this.strip.nativeElement;
    const containerWidth = this.host.nativeElement.offsetWidth;
    this.maxOffset.set(Math.max(0, strip.scrollWidth - containerWidth));
    this.offset.update((current) => Math.min(current, this.maxOffset()));
  }

  scroll(direction: Direction) {
    const vector = direction === 'l' ? -1 : 1;
    const stepOffset = Math.max(this.offset() + vector * this.step(), 0);
    this.offset.set(Math.min(stepOffset, this.maxOffset()));
  }

  isScrollable(direction: Direction): boolean {
    if (direction === 'l') return this.offset() > 0;
    return this.offset() < this.maxOffset();
  }
}
