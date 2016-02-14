import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {MarkdownViewer} from './markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'my-app',
  styles: [`
    .contents {
      display: flex;
      height: 100%;
    }
    editor, markdown-viewer {
      height: 100%;
      width: 50%;
      position: relative;
    }
  `],
  template: `
    <div class="contents">
      <editor [text]="enteredText" (changeText)="changeText($event)"></editor>
      <markdown-viewer [text]="enteredText"></markdown-viewer>
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
