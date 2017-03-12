import {Component} from '@angular/core';
import {Slide} from './slide/slide.component';
import {SlideService} from './../services/slide.service';
import SettingsService from './../services/settings.service';
import * as _ from 'lodash';
import { ipcRenderer } from 'electron';
import { EVENTS } from './../../constants/events';
import Settings from './../../types/settings';

@Component({
  selector: 'presentation',
  styles: [`
    .contents {
      height: 100%;
      box-sizing: border-box;
    }
    .inner-contents {
      height: 100%;
      width: 100%;
      min-height: 720px;
      min-width: 940px;
      margin: auto;
    }
    slide {
      height: 100%;
      width: 100%;
    }
  `],
  template: `
    <div class="contents">
      <div class="inner-contents">
        <span *ngFor="let page of pages">
          <slide [text]="slideServie.getPageText(page)" *ngIf="pageNo <= page"></slide>
        </span>
      </div>
    </div>
    `,
  providers: [SlideService, SettingsService]
})
export class PresentationComponent {
  private pageNo = 1;
  private pages: Array<number>;
  private _handleKeyUp: any;
  private settings: Settings;

  constructor(
    private slideServie: SlideService,
    private settingsService: SettingsService
  ) {
    slideServie.setText(ipcRenderer.sendSync(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_MESSAGE));
    this.pages = _.range(1, this.slideServie.getMaxPage(this.settings) + 1);
    this._handleKeyUp = this.handleKeyUp.bind(this);
  }

  ngOnInit() {
    document.addEventListener('keyup', this._handleKeyUp);
    this.settings = this.settingsService.get();
  }

  ngOnDestroy() {
    document.removeEventListener('keyup', this._handleKeyUp);
  }

  private goToNextPage() {
    if (this.slideServie.getMaxPage(this.settings) >= this.pageNo + 1) {
      this.pageNo++;
    }
  }

  private goToPrevPage() {
    if (1 <= this.pageNo - 1) {
      this.pageNo--;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    if (_.includes([13, 32, 39, 40], e.keyCode)) this.goToNextPage();
    else if (_.includes([8, 46, 37, 38], e.keyCode)) this.goToPrevPage();
  }
}
