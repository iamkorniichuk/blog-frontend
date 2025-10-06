import { Pipe, PipeTransform } from '@angular/core';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import type { Root } from 'mdast';

@Pipe({
  name: 'markdownAst',
})
export class MarkdownAstPipe implements PipeTransform {
  private parser = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSlug as unknown as undefined);

  transform(markdown: string | null | undefined): Root | null {
    if (!markdown) return null;

    const tree = this.parser.parse(markdown);
    this.parser.runSync(tree);
    return tree as Root;
  }
}
