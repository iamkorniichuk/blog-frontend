import { Component, input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { RootContent, Root } from 'mdast';

import { CodeBlockComponent } from '../code-block/code-block';
import { Heading } from '../elements/heading/heading';

@Component({
  selector: 'app-markdown',
  imports: [NgTemplateOutlet, CodeBlockComponent, Heading],
  templateUrl: './markdown.html',
})
export class MarkdownComponent implements OnChanges {
  private parser = unified().use(remarkParse);
  data = input.required<string>();
  ast!: Root;

  @ViewChild('paragraph', { static: true }) paragraph!: TemplateRef<unknown>;
  @ViewChild('heading', { static: true }) heading!: TemplateRef<unknown>;
  @ViewChild('text', { static: true }) text!: TemplateRef<unknown>;
  @ViewChild('code', { static: true }) code!: TemplateRef<unknown>;
  @ViewChild('inlineCode', { static: true }) inlineCode!: TemplateRef<unknown>;

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.ast = this.parser.parse(this.data());
    }
  }

  renderNode(node: RootContent) {
    switch (node.type) {
      case 'paragraph':
        return this.paragraph;
      case 'heading':
        return this.heading;
      case 'text':
        return this.text;
      case 'code':
        return this.code;
      case 'inlineCode':
        return this.inlineCode;
      default:
        return this.text;
    }
  }
}
