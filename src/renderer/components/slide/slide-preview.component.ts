import {Component} from 'angular2/core';
import {Slide} from './slide.component';

@Component({
  selector: 'slide-preview',
  template: `
    <div class="slide-preview">
     <div class="inner">
       <div class="content">
         <slide [text]="text"></slide>
       </div>
     </div>
   </div>
  `,
  styles: [`
    .inner {
      overflow: hidden;
    }
    .content {
      width: 100%;
      height: calc(50vw * 3/4);
    }
    `
  ],
  inputs: ['text'],
  directives: [Slide]
})
export class SlidePreview {
  private text: string;
  private slideWidth: number;
}
