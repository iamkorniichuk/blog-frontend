import { Component, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { MetaService } from '../../services/meta';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';

@Component({
  selector: 'app-about-us-page',
  imports: [BreadcrumbsComponent, ContentPageComponent, NgTemplateOutlet],
  templateUrl: './about-us-page.html',
})
export class AboutUsPageComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('About');
    this.metaService.deleteCanonical();
  }
}
