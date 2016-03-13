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
      height: 720px;
      width: 940px;
    }
    `
  ],
  inputs: ['text'],
  directives: [Slide]
})
export class SlidePreview {
  text: string;
  slideWidth: number;
}
