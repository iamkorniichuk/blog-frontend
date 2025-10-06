import { MarkdownAstPipe } from './markdown-ast-pipe';

describe('MarkdownAstPipe', () => {
  it('create an instance', () => {
    const pipe = new MarkdownAstPipe();
    expect(pipe).toBeTruthy();
  });
});
