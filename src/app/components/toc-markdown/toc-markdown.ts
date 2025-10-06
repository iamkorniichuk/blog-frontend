import { Component, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { visit } from 'unist-util-visit';

import { Heading, Root } from 'mdast';

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

@Component({
  selector: 'app-toc-markdown',
  imports: [RouterLink],
  templateUrl: './toc-markdown.html',
})
export class TocMarkdownComponent implements OnChanges {
  ast = input.required<Root>();
  items = signal<TocItem[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if ('ast' in changes) {
      this.extractItems(changes['ast'].currentValue);
    }
  }

  private extractItems(ast: Root) {
    const items: TocItem[] = [];

    visit(ast, 'heading', (node: Heading) => {
      const text = node.children
        .filter((child) => child.type === 'text')
        .map((child) => child.value)
        .join();

      if (node.data && 'id' in node.data && typeof node.data.id === 'string') {
        items.push({
          id: node.data.id,
          text,
          depth: node.depth,
        });
      }
    });

    this.items.set(items);
  }
}
