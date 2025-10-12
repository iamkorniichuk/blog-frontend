import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-news-ticker',
  templateUrl: './news-ticker.html',
})
export class NewsTickerComponent implements AfterViewInit {
  @ViewChild('contentWrap', { static: true }) contentWrap!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const wrap = this.contentWrap.nativeElement;
    const content = Array.from(wrap.children);

    for (const node of content) {
      const clone = node.cloneNode(true);
      wrap.appendChild(clone);
    }
  }
}
