import { Component, inject, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ScreenSizeService } from '../../services/screen-size';

@Component({
  selector: 'app-content-page',
  imports: [NgTemplateOutlet],
  templateUrl: './content-page.html',
})
export class ContentPageComponent {
  private screenSizeService = inject(ScreenSizeService);
  screenSize = this.screenSizeService.screenSize;

  phonePageTemplate = input.required<TemplateRef<unknown>>();
  desktopContentTemplate = input.required<TemplateRef<unknown>>();
  desktopCardTemplates = input<TemplateRef<unknown>[]>([]);
}
