import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { Tool, ToolApiService } from '../../services/tool-api';
import { MetaService } from '../../services/meta';
import { ImageComponent } from '../../components/elements/image/image';

@Component({
  selector: 'app-tools-list-page',
  imports: [
    ContentPageComponent,
    NgTemplateOutlet,
    RouterLink,
    GradientOverlayComponent,
    BreadcrumbsComponent,
    ImageComponent,
  ],
  templateUrl: './tools-list-page.html',
})
export class ToolsListPageComponent implements OnInit {
  private toolApiService = inject(ToolApiService);
  private metaService = inject(MetaService);
  tools = signal<Tool[]>([]);

  async ngOnInit() {
    const newTools = await this.toolApiService.readAll();
    this.tools.set(newTools);

    const lastTool = newTools.at(-1);
    if (lastTool === undefined) return;
    const jpegImage = lastTool.image.images['image/jpeg']?.[0].src;
    const pngImage = lastTool.image.images['image/png']?.[0].src;
    const imageUrl = jpegImage !== undefined ? jpegImage : pngImage;
    const imageAlt = lastTool.image.alt;
    const modifiedAt = lastTool.createdAt;

    this.metaService.setRouteMeta({ imageUrl, imageAlt, modifiedAt });
  }
}
