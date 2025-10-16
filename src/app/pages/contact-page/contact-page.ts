import { Component, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { MetaService } from '../../services/meta';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';

@Component({
  selector: 'app-contact-page',
  imports: [BreadcrumbsComponent, ContentPageComponent, NgTemplateOutlet],
  templateUrl: './contact-page.html',
})
export class ContactPageComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('Contact');
  }
}
