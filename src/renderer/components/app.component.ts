import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {SlidePreview} from './slide/slide-preview.component';
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
  `],
  template: `
    <div class="contents">
      <div class="actions">
        <button (click)="clickStartButton()">Start</button>
      </div>
      <div class="inner-contents">
        <div class="editor-area">
          <editor (changeText)="changeText($event)" (changeSelectedLineNo)="changeSelectedLineNo($event)"></editor>
        </div>
        <div class="slide-preview-area">
          <slide-preview [text]="slideServie.getPageText(page)"></slide-preview>
        </div>
      </div>
    </div>
    `,
  directives: [Editor, SlidePreview],
  providers: [SlideService]
})
export class AppComponent {
  private page = 1;
  constructor(private slideServie: SlideService) { }
  changeText(text: string) {
    this.slideServie.setText(text);
    ipcRenderer.send(EVENTS.MAIN_WINDOW.RENDERER.SEND_CHANGED_TEXT, { text });
  }
  changeSelectedLineNo(selectedLineNo: number) {
    this.page = this.slideServie.getPageNo(selectedLineNo);
  }
  clickStartButton() {
    ipcRenderer.send(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION, { text: this.slideServie.getText() });
  }
}
