import {Component, ElementRef} from 'angular2/core';
import {Slide} from './slide.component';

@Component({
  selector: 'slide-preview',
  template: `
    <div class="slide-preview" (window:resize)="onResize($event)">
     <div class="inner">
       <slide text="text"></div>
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
    `
  ],
  inputs: ['text'],
  directives: [Slide]
})
export class SlidePreview {
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
    const inner = this.el.nativeElement.querySelector('slide-preview .inner');
    inner.style.width = `${inner.clientHeight * 4 / 3}px`;
    const slide = this.el.nativeElement.querySelector('.slide-preview');
    inner.style.top = `${(slide.clientHeight - inner.clientHeight) / 2}px`;
    inner.style.left = `${(slide.clientWidth - inner.clientWidth) / 2}px`;
  }
  setContentTop() {
    const inner = this.el.nativeElement.querySelector('slide-preview .inner');
    const content = this.el.nativeElement.querySelector('slide-preview .content');
    const contentTop = (inner.clientHeight - content.clientHeight) / 3;
    content.style.top = `${contentTop}px`;
  }
  setContentScale() {
    const inner = this.el.nativeElement.querySelector('slide-preview .inner');
    const scale = inner.clientHeight / 720;
    const content = this.el.nativeElement.querySelector('slide-preview .content');
    content.style.transform = `scale(${scale})`;
  }
}
