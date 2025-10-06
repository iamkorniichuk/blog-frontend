import { Component, input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGfm from 'remark-gfm';
import { RootContent, Root } from 'mdast';

import { CodeBlockComponent } from '../code-block/code-block';
import { Heading } from '../elements/heading/heading';

@Component({
  selector: 'app-markdown',
  imports: [NgTemplateOutlet, CodeBlockComponent, Heading],
  templateUrl: './markdown.html',
  host: { ngSkipHydration: 'true' },
})
export class MarkdownComponent implements OnChanges {
  private parser = unified().use(remarkParse).use(remarkRehype).use(remarkGfm);
  data = input.required<string>();
  ast!: Root;

  @ViewChild('paragraph', { static: true }) paragraph!: TemplateRef<unknown>;
  @ViewChild('heading', { static: true }) heading!: TemplateRef<unknown>;
  @ViewChild('text', { static: true }) text!: TemplateRef<unknown>;

  @ViewChild('code', { static: true }) code!: TemplateRef<unknown>;
  @ViewChild('inlineCode', { static: true }) inlineCode!: TemplateRef<unknown>;

  @ViewChild('image', { static: true }) image!: TemplateRef<unknown>;
  @ViewChild('link', { static: true }) link!: TemplateRef<unknown>;

  @ViewChild('list', { static: true }) list!: TemplateRef<unknown>;
  @ViewChild('listItem', { static: true }) listItem!: TemplateRef<unknown>;
  @ViewChild('blockQuote', { static: true }) blockQuote!: TemplateRef<unknown>;
  @ViewChild('thematicBreak', { static: true }) thematicBreak!: TemplateRef<unknown>;

  @ViewChild('italic', { static: true }) italic!: TemplateRef<unknown>;
  @ViewChild('bold', { static: true }) bold!: TemplateRef<unknown>;
  @ViewChild('strikethrough', { static: true }) strikethrough!: TemplateRef<unknown>;

  @ViewChild('table', { static: true }) table!: TemplateRef<unknown>;
  @ViewChild('tableRow', { static: true }) tableRow!: TemplateRef<unknown>;
  @ViewChild('tableCell', { static: true }) tableCell!: TemplateRef<unknown>;

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

      case 'link':
        return this.link;
      case 'image':
        return this.image;

      case 'list':
        return this.list;
      case 'listItem':
        return this.listItem;
      case 'blockquote':
        return this.blockQuote;
      case 'thematicBreak':
        return this.thematicBreak;

      case 'emphasis':
        return this.italic;
      case 'strong':
        return this.bold;
      case 'delete':
        return this.strikethrough;

      case 'table':
        return this.table;
      case 'tableRow':
        return this.tableRow;
      case 'tableCell':
        return this.tableCell;

      default:
        return this.text;
    }
  }
}
