import {Component} from 'angular2/core';
import {Slide} from './slide/slide.component';
const ipcRenderer = require('electron').ipcRenderer;

@Component({
  selector: 'presentation',
  styles: [`
    .contents {
      height: 100%;
      box-sizing: border-box;
    }
    slide {
      position: relative;
    }
    .inner-contents {
      height: 70vh;
      width: calc(70vh * 4 / 3);
      min-height: 720px;
      min-width: 940px;
      margin: 15vh auto;
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
  slideText: string;
  constructor() {
    this.slideText = ipcRenderer.sendSync('RequestMessage');
  }
}
