import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {SlideList} from './slide-list/slide-list.component';
import {SlidePreview} from './slide/slide-preview.component';
const ipc = require('electron').ipcRenderer;

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
    .inner-contents div.editor-area {
      height: 100%;
      width: calc(100% - 940px);
    }
  `],
  template: `
    <div class="contents">
      <div class="actions">
        <button (click)="clickStartButton()">Start</button>
      </div>
      <div class="inner-contents">
        <div class="editor-area">
          <editor (changeText)="changeText($event)" (changePage)="changePage($event)"></editor>
        </div>
        <div>
          <slide-preview [text]="slideText"></slide-preview>
        </div>
      </div>
    </div>
    `,
  directives: [Editor, SlidePreview, SlideList]
})
export class AppComponent {
  enteredText = '';
  slideText = '';
  changeText(text) {
    this.enteredText = text;
  }
  changePage(page: number) {
    this.slideText = this.enteredText.split('===')[page - 1];
  }
  clickStartButton() {
    ipc.send('RequestCreateNewWindow', { text: this.enteredText });
  }
}
