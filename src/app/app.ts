import { Component, signal } from '@angular/core';

import { CodeBlockComponent } from './components/code-block/code-block';

@Component({
  selector: 'app-root',
  imports: [CodeBlockComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('blog');
  code = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Blog</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <div class="code">
    @if (isMultiline()) {
    <div class="code-header">
        <div class="flex items-center gap-2">
            @if (fileName()) {
            <span class="font-semibold">{{ fileName() }}</span>
            }
            <span class="px-2 py-0.5 text-xs rounded bg-gray-700 uppercase">{{ fileType() }}</span>
        </div>
    </div>
    <div class="code-content relative">
        <button class="btn btn-primary surface absolute top-2 right-2" (click)="copyCode()">Copy</button>
        <pre><code [attr.class]="'language-' + fileType()" class="block">{{ code() }}</code></pre>
    </div>
    } @else {
    <div class="code-content">
        <code [attr.class]="'language-' + fileType()">{{ code() }}</code>
    </div>
    }
  </div>
</body>
</html>`;
}
