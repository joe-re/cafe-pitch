import {Component} from '@angular/core';
import {Editor} from './editor/editor.component';
import {SlidePreview} from './slide/slide_preview.component';
import {SlideService} from './../services/slide.service';
import {ipcRenderer} from 'electron';
import {EVENTS} from './../../constants/events';

@Component({
  selector: 'my-app',
  styles: [`
    .contents {
      height: 94%;
      box-sizing: border-box;
    }
    .inner-contents {
      display: flex;
      height: 100%;
      width: 100%;
      border: black solid 1px;
    }
    .inner-contents div.editor-area,
    .inner-contents div.slide-preview-area {
      height: 100%;
      width: 50%;
    }
    .header {
      padding: 12px;
    }
    .action {
      display: inline-block;
      text-align: center;
    }
    .action-name {
      color: white;
    }
    .attach-balloon {
      position: relative;
    }
    .hello-message {
      width: 200px;
      height: 300px;
    }
  `],
  template: `
    <header class="header">
      <div class="action">
        <button class="btn btn-large btn-default" (click)="clickStartButton()">
          <span class="icon icon-play"></span>
        </button>
        <div class="action-name">Play</div>
      </div>
      <div class="action">
        <balloon>
          <button #attachBalloon class="btn btn-large btn-default" (click)="clickStartButton()">
            <span class="icon icon-play"></span>
          </button>
          <div class="action-name">Download from Qiita</div>
          <balloon-content>
            <div class="hello-message">
              <input />
            </div>
          </balloon-content>
        </balloon>
      </div>
    </header>
    <div class="contents">
      <div class="inner-contents">
        <div class="editor-area">
          <editor (changeText)="changeText($event)" (changeSelectedLineNo)="changeSelectedLineNo($event)" [text]="slideService.getText()"></editor>
        </div>
        <div class="slide-preview-area">
          <slide-preview [text]="slideService.getPageText(page)"></slide-preview>
        </div>
      </div>
    </div>
    `,
  providers: [SlideService]
})
export class AppComponent {
  private page = 1;
  constructor(private slideService: SlideService) { }
  ngOnInit() {
    ipcRenderer.on(EVENTS.MAIN_WINDOW.MAIN.SEND_REFRESHED_TEXT, (ev, text: string) => {
      this.changeText(text);
      this.changeSelectedLineNo(1);
    });
  }

  changeText(text: string) {
    this.slideService.setText(text);
    ipcRenderer.send(EVENTS.MAIN_WINDOW.RENDERER.SEND_CHANGED_TEXT, { text });
  }

  changeSelectedLineNo(selectedLineNo: number) {
    this.page = this.slideService.getPageNo(selectedLineNo);
  }
  clickStartButton() {
    ipcRenderer.send(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION);
  }
}
