import {Component} from '@angular/core';
import {Slide} from '../slide/slide.component';

@Component({
  selector: 'edit-slide-page',
  template: `
    <div class="edit-slide">
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
export class EditSlidePage { }
