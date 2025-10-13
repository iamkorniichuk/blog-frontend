import { Component, inject, OnInit } from '@angular/core';

import { MetaService } from '../../services/meta';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';

@Component({
  selector: 'app-about-us-page',
  imports: [BreadcrumbsComponent],
  templateUrl: './about-us-page.html',
})
export class AboutUsPageComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('About Us');
  }
}
