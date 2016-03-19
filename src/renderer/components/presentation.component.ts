import {Component} from 'angular2/core';
import {Slide} from './slide/slide.component';
const _ = require('lodash');
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
      margin: auto;
    }
  `],
  template: `
    <div class="contents">
      <div class="inner-contents">
        <slide [text]="slide"></slide>
      </div>
    </div>
    `,
  directives: [Slide]
})
export class PresentationComponent {
  slides: string[];
  slide: string;
  page = 1;
  _handleKeyUp: any;

  constructor() {
    this.slides = ipcRenderer.sendSync('RequestMessage').split('===');
    this.page = 1;
    this.changePage();
    this._handleKeyUp = this.handleKeyUp.bind(this);
  }

  ngAfterContentInit() {
    document.addEventListener('keyup', this._handleKeyUp);
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  private changePage() {
    this.slide = this.slides[this.page - 1];
  }

  private goToNextPage() {
    if (this.slides.length >= this.page + 1) {
      this.page++;
      this.changePage();
    }
  }

  private goToPrevPage() {
    if (1 <= this.page - 1) {
      this.page--;
      this.changePage();
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (_.includes([13, 32, 39, 40], e.keyCode)) this.goToNextPage()
    else if (_.includes([8, 46, 37, 38], e.keyCode)) this.goToPrevPage();
  }
}
