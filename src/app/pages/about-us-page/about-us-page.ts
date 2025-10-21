import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';

@Component({
  selector: 'app-about-us-page',
  imports: [BreadcrumbsComponent, ContentPageComponent, NgTemplateOutlet],
  templateUrl: './about-us-page.html',
})
export class AboutUsPageComponent {}
