import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';

import { ContentPageComponent } from '../../components/content-page/content-page';
import { SliderCompareComponent } from '../../components/slider-compare/slider-compare';
import { GradientOverlayComponent } from '../../components/gradient-overlay/gradient-overlay';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

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
export class ToolsListPageComponent {}
