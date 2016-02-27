import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {SlideList} from './slide-list/slide-list.component';
import {Slide} from './slide/slide.component';
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
    editor, slide {
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
          <editor (changeText)="changeText($event)" (changePage)="changePage($event)"></editor>
          <slide [text]="slideText"></slide>
        </div>
        <div class="style-editor">
        </div>
      </div>
    </div>
    `,
  directives: [Editor, Slide, SlideList]
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
    ipc.send('RequestCreateNewWindow');
  }
}
