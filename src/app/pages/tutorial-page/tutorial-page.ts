import { Component, inject, input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { Tutorial } from '../../services/tutorial-api';
import { MarkdownComponent } from '../../components/markdown/markdown';

@Component({
  selector: 'app-tutorial-page',
  imports: [MarkdownComponent],
  templateUrl: './tutorial-page.html',
})
export class TutorialPageComponent implements OnInit {
  tutorial = input.required<Tutorial>();
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    const title = this.tutorial().title;
    this.titleService.setTitle(title);

    const description = this.tutorial().description;
    const metaTag = this.metaService.getTag('description');
    if (metaTag) metaTag.remove();
    this.metaService.addTag({ name: 'description', content: description });
  }
}
