import {Component} from 'angular2/core';
import {Slide} from './slide/slide.component';

@Component({
  selector: 'presentation',
  styles: [`
    .contents {
      height: 94%;
      box-sizing: border-box;
    }
    slide {
      position: relative;
    }
  `],
  template: `
    <div class="contents">
      <div class="inner-contents">
        <slide [text]="slideText"></slide>
      </div>
    </div>
    `,
  directives: [Slide]
})
export class PresentationComponent {
  slideText = '#test';
}
