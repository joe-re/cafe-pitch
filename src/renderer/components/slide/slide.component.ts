import {Component} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" [innerHTML]="text | markdown"></div>
  `,
  styles: [`
    .slide {
      position: relative;
    }
    `
  ],
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class Slide {
  text: string;
}
