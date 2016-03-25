import {Component, ElementRef, ViewEncapsulation} from 'angular2/core';
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
  styleUrls: [
    './components/slide/slide.css',
    './components/slide/slide-content.css',
    './components/slide/solarize.css'
  ],
  encapsulation: ViewEncapsulation.None,
  inputs: ['text'],
  pipes: [MarkdownPipe]
})
export class Slide {
  private text: string;
  constructor(private el: ElementRef) { }
  onResize(e: MouseEvent) {
    this.setContentScale();
    this.setContentTop();
  }
  ngAfterViewChecked() {
    this.setContentScale();
    this.setContentTop();
  }
  setContentScale() {
    const slide = this.el.nativeElement.querySelector('.slide');
    const scale = slide.clientHeight / 720;
    const inner = this.el.nativeElement.querySelector('.slide-inner');
    inner.style.transform = `scale(${scale})`;
  }
  setContentTop() {
    const content = this.el.nativeElement.querySelector('.slide-content');
    const contentTop = (720 - content.clientHeight) / 2;
    content.style.top = `${contentTop}px`;
  }
}
