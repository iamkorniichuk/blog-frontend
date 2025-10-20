import { Component, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { TocMarkdownComponent } from '../../components/toc-markdown/toc-markdown';
import content from '../../../assets/privacy-policy.json';
import { MetaService } from '../../services/meta';

@Component({
  selector: 'app-privacy-policy-page',
  imports: [
    BreadcrumbsComponent,
    ContentPageComponent,
    MarkdownAstPipe,
    MarkdownComponent,
    TocMarkdownComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './privacy-policy-page.html',
})
export class PrivacyPolicyPageComponent implements OnInit {
  policyContent: string = content;
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('Privacy');
    this.metaService.deleteCanonical();
  }
}
