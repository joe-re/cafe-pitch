import {Component, ElementRef} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" (window:resize)="onResize($event)">
      <div class="slide-inner">
        <div class="slide-content" [innerHTML]="text | markdown"></div>
      </div>
    </div>
  `,
  styles: [`
    .slide {
      height: 100%;
      width: 100%;
    }
    .slide-inner {
      position: relative;
      background: white;
      font-size: 30px;
      height: 720px;
      width: 940px;
      transform-origin: 0 0;
    }
    .slide-content {
      text-align: center;
      position: absolute;
      width: 100%;
    }
    `
  ],
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class Slide {
  text: string;
  constructor(private el: ElementRef) { }
  onResize(e: MouseEvent) {
    this.setContentScale();
  }
  ngAfterViewChecked() {
    this.setContentScale();
  }
  setContentScale() {
    const slide = this.el.nativeElement.querySelector('.slide');
    const scale = slide.clientHeight / 720;
    const content = this.el.nativeElement.querySelector('.slide-content');
    const contentTop = (720 - content.clientHeight) / 2;
    content.style.top = `${contentTop}px`;
    const inner = this.el.nativeElement.querySelector('.slide-inner');
    inner.style.transform = `scale(${scale})`;
  }
}
