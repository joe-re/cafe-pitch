import {Component} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'markdown-viewer',
  template: `
    <div class="markdown-viewer" [innerHTML]="text | markdown">  </div>
  `,
  styles: [`
    .markdown-viewer {
      width: 100%;
      background: white;
      height: 100%;
      position: absolute;
    }
    `
  ],
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class MarkdownViewer {
  text: string;
}
