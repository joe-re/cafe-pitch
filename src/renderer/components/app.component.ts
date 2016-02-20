import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {SlideList} from './slide-list/slide-list.component';
import {MarkdownViewer} from './markdown-viewer/markdown-viewer.component';
const ipc = require('ipc');

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
      border: black solid 1px;
    }
    .center {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    editor, markdown-viewer {
      height: 50%;
      position: relative;
    }
    slide-list {
      height: 100%;
      width: 200px;
      position: relative;
    }
    .style-editor {
      width: 400px;
    }
  `],
  template: `
    <div class="contents">
      <div class="actions">
        <button (click)="clickStartButton()">Start</button>
      </div>
      <div class="inner-contents">
        <slide-list></slide-list>
        <div class="center">
          <editor [text]="enteredText" (changeText)="changeText($event)"></editor>
          <markdown-viewer [text]="enteredText"></markdown-viewer>
        </div>
        <div class="style-editor">
        </div>
      </div>
    </div>
    `,
  directives: [Editor, MarkdownViewer, SlideList]
})
export class AppComponent {
  enteredText = '';
  changeText(text) {
    this.enteredText = text;
  }
  clickStartButton() {
    ipc.send('RequestCreateNewWindow');
  }
}
