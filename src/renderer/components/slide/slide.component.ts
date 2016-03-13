import {Component, ElementRef} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide">
      <div class="slide-content" [innerHTML]="text | markdown"></div>
    </div>
  `,
  styles: [`
    .slide {
      position: relative;
      background: white;
      font-size: 30px;
      height: 100%;
      wight: 100%;
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
    this.setContentTop();
  }
  ngAfterViewChecked() {
    this.setContentTop();
  }
  setContentScale() {
    const inner = this.el.nativeElement.querySelector('.slide-preview .inner');
    const scale = inner.clientHeight < 720 ? inner.clientHeight / 720 : 1;
    const content = this.el.nativeElement.querySelector('.slide-preview .content');
    content.style.transform = `scale(${scale})`;
  }
  setContentTop() {
    const content = this.el.nativeElement.querySelector('.slide-content');
    const contentTop = (720 - content.clientHeight) / 2;
    content.style.top = `${contentTop}px`;
  }
}
