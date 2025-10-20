import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { SliderCompareComponent } from '../../components/slider-compare/slider-compare';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { MetaService } from '../../services/meta';

@Component({
  selector: 'app-tools-list-page',
  imports: [
    ContentPageComponent,
    NgTemplateOutlet,
    SliderCompareComponent,
    RouterLink,
    SliderCompareComponent,
    GradientOverlayComponent,
    BreadcrumbsComponent,
  ],
  templateUrl: './tools-list-page.html',
})
export class ToolsListPageComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('Tools');
    this.metaService.deleteCanonical();
  }
}
