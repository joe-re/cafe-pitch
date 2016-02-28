import {Component, ElementRef} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" (window:resize)="onResize($event)">
     <div class="inner">
       <div class="content" [innerHTML]="text | markdown"></div>
     </div>
   </div>
  `,
  styles: [`
    .slide {
      width: 100%;
      height: 100%;
      font-size: 30px;
    }
    .inner {
      height: 60vh;
      background: white;
      position: absolute;
      text-align: center;
      overflow: hidden;
    }
    .content {
      position: relative;
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
    this.setInnerPosition();
    this.setContentScale();
    this.setContentTop();
  }
  ngAfterViewChecked() {
    this.setContentTop();
  }
  setInnerPosition() {
    const inner = this.el.nativeElement.querySelector('slide .inner');
    inner.style.width = `${inner.clientHeight * 4 / 3}px`;
    const slide = this.el.nativeElement.querySelector('.slide');
    inner.style.top = `${(slide.clientHeight - inner.clientHeight) / 2}px`;
    inner.style.left = `${(slide.clientWidth - inner.clientWidth) / 2}px`;
  }
  setContentTop() {
    const inner = this.el.nativeElement.querySelector('slide .inner');
    const content = this.el.nativeElement.querySelector('slide .content');
    const contentTop = (inner.clientHeight - content.clientHeight) / 3;
    content.style.top = `${contentTop}px`;
  }
  setContentScale() {
    const inner = this.el.nativeElement.querySelector('slide .inner');
    const scale = inner.clientHeight / 720;
    const content = this.el.nativeElement.querySelector('slide .content');
    content.style.transform = `scale(${scale})`;
  }
}
