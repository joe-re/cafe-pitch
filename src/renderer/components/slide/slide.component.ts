import {Component, ElementRef, ViewEncapsulation} from 'angular2/core';
import {MarkdownPipe} from '../../pipe/markdown.pipe';

@Component({
  selector: 'slide',
  template: `
    <div class="slide" (window:resize)="handleResize($event)">
      <div class="slide-inner">
        <div class="slide-content" [innerHTML]="text | markdown"></div>
      </div>
    </div>
  `,
  styleUrls: [
    './components/slide/slide.css',
    './components/slide/slide-content.css',
    './components/slide/solarize.css',
    './../solarized-light.css'
  ],
  encapsulation: ViewEncapsulation.None,
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class Slide {
  constructor(private el: ElementRef) { }
  handleResize(e: MouseEvent) {
    this.setContentScale();
    this.setContentTop();
  }
  ngAfterViewChecked() {
    this.setContentScale();
    this.setContentTop();
  }
  private setContentScale() {
    const slide = this.el.nativeElement.querySelector('.slide');
    const scale = slide.clientHeight / 720;
    const inner = this.el.nativeElement.querySelector('.slide-inner');
    inner.style.transform = `scale(${scale})`;
    this.setInnnerMargin(scale);
  }
  private setContentTop() {
    const content = this.el.nativeElement.querySelector('.slide-content');
    const contentTop = Math.floor((720 - content.clientHeight) / 2);
    content.style.top = `${contentTop}px`;
  }
  private setInnnerMargin(scale: number) {
    const slide = this.el.nativeElement.querySelector('.slide');
    const inner = this.el.nativeElement.querySelector('.slide-inner');
    inner.style.margin = `
      ${Math.floor((slide.clientHeight - inner.clientHeight * scale) / 2)}px
      ${Math.floor((slide.clientWidth - inner.clientWidth * scale) / 2)}px
    `;
  }
}
