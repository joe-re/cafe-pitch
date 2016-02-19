import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {MarkdownViewer} from './markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'my-app',
  styles: [`
    .contents {
      height: 100%;
      box-sizing: border-box;
    }
    .inner-contents {
      display: flex;
      height: 100%;
      border: black solid 1px;
    }
    editor, markdown-viewer {
      height: 100%;
      width: 50%;
      position: relative;
    }
  `],
  template: `
    <div class="contents">
      <div class="actions">
        <button>Start</button>
      </div>
      <div class="inner-contents">
        <editor [text]="enteredText" (changeText)="changeText($event)"></editor>
        <markdown-viewer [text]="enteredText"></markdown-viewer>
      </div>
    </div>
    `,
  directives: [Editor, MarkdownViewer]
})
export class AppComponent {
  enteredText = '';
  changeText(text) {
    this.enteredText = text;
  }
}
