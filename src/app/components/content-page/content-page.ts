import { Component, inject, input } from '@angular/core';

import { ScreenSizeService } from '../../services/screen-size';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.html',
})
export class ContentPageComponent {
  private screenSizeService = inject(ScreenSizeService);
  screenSize = this.screenSizeService.screenSize;

  contentMaxSize = input<string>('896px');
  sidebarMaxSize = input<string>('576px');
}
