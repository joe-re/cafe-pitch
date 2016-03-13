import {Component, ElementRef} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" (window:resize)="onResize($event)">
      <div class="slide-content" [innerHTML]="text | markdown"></div>
    </div>
  `,
  styles: [`
    .slide {
      position: relative;
      background: white;
      font-size: 30px;
      height: 100%;
      width: 100%;
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
    const inner = this.el.nativeElement.querySelector('.slide');
    const scale = inner.clientHeight / 720;
    inner.style.transform = `scale(${scale})`;
    this.setContentTop(scale);
  }
  setContentTop(scale) {
    const content = this.el.nativeElement.querySelector('.slide-content');
    const contentTop = (720 - content.clientHeight) / 2;
    content.style.top = `${contentTop * scale}px`;
  }
}
