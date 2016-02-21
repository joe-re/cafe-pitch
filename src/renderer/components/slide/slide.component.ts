import {Component, ElementRef} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" (window:resize)="onResize($event)">
     <div class="content" [innerHTML]="text | markdown"></div>
   </div>
  `,
  styles: [`
    .slide {
      width: 100%;
      height: 100%;
    }
    .content {
      height: 40vh;
      background: white;
      position: absolute;
    }
    `
  ],
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class Slide {
  text: string;
  slideWidth: number;
  constructor(private el: ElementRef) { }
  onResize(e: MouseEvent) {
    const content = this.el.nativeElement.querySelector('slide .content');
    content.style.width = `${content.clientHeight * 16 / 9}px`;
    const slide = this.el.nativeElement.querySelector('.slide');
    content.style.top = `${(slide.clientHeight - content.clientHeight) / 2}px`;
    content.style.left = `${(slide.clientWidth - content.clientWidth) / 2}px`;
  }
}
