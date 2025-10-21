import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { ContentPageComponent } from '../../components/content-page/content-page';
import { MarkdownAstPipe } from '../../pipes/markdown-ast-pipe';
import { MarkdownComponent } from '../../components/markdown/markdown';
import { TocMarkdownComponent } from '../../components/toc-markdown/toc-markdown';
import content from '../../../assets/cookies-policy.json';

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
export class CookiesPolicyPageComponent {
  policyContent: string = content;
}
