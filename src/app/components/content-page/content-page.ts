import { Component, inject } from '@angular/core';

import { ScreenSizeService } from '../../services/screen-size';

@Component({
  selector: 'app-content-page',
  templateUrl: './content-page.html',
})
export class ContentPageComponent {
  private screenSizeService = inject(ScreenSizeService);
  screenSize = this.screenSizeService.screenSize;
}
