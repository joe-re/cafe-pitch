import {Component} from 'angular2/core';
import {Slide} from './slide/slide.component';
import {SlideService} from './../services/slide.service';
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
        <slide [text]="slideServie.getPageText(page)"></slide>
      </div>
    </div>
    `,
  directives: [Slide],
  providers: [SlideService]
})
export class PresentationComponent {
  private page = 1;
  private _handleKeyUp: any;

  constructor(private slideServie: SlideService) {
    slideServie.setText(ipcRenderer.sendSync('RequestMessage'));
    this._handleKeyUp = this.handleKeyUp.bind(this);
  }

  ngOnInit() {
    document.addEventListener('keyup', this._handleKeyUp);
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  private goToNextPage() {
    if (this.slideServie.getMaxPage() >= this.page + 1) {
      this.page++;
    }
  }

  private goToPrevPage() {
    if (1 <= this.page - 1) {
      this.page--;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (_.includes([13, 32, 39, 40], e.keyCode)) this.goToNextPage()
    else if (_.includes([8, 46, 37, 38], e.keyCode)) this.goToPrevPage();
  }
}
