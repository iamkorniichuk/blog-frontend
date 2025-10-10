import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';

export type Icon = 'arrow' | 'close' | 'copy' | 'list' | 'logo' | 'upload';

@Component({
  selector: 'app-icon',
  imports: [NgTemplateOutlet],
  templateUrl: './icon.html',
})
export class IconComponent {
  title = input.required<string>();
  icon = input.required<Icon>();
}
