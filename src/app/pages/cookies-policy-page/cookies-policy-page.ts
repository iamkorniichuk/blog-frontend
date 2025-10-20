import { Component, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { TocMarkdownComponent } from '../../components/toc-markdown/toc-markdown';
import content from '../../../assets/cookies-policy.json';
import { MetaService } from '../../services/meta';

@Component({
  selector: 'app-cookies-policy-page',
  imports: [
    BreadcrumbsComponent,
    ContentPageComponent,
    MarkdownAstPipe,
    MarkdownComponent,
    TocMarkdownComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './cookies-policy-page.html',
})
export class CookiesPolicyPageComponent implements OnInit {
  policyContent: string = content;
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.setTitle('Cookies');
    this.metaService.deleteCanonical();
  }
}
