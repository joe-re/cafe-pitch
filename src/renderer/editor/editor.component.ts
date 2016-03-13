import {Component, ElementRef} from 'angular2/core';
const _ = require('lodash');

@Component({
  selector: 'editor',
  template: `
    <div class="editor" (click)="handleClickEditor()">
      <div class="editor-line-no">
        <div *ngFor="#lineNumber of enteredLineNumbers">
          {{lineNumber}}
        </div>
      </div>
      <div class="editor-contents" contenteditable=true (input)="handleChangeContents()"></div>
    </div>
  `,
  styles: [`
    .editor {
      height: 100%;
      color: #BBB;
      cursor: text;
      display: flex;
      line-height: 24px;
    }
    .editor-line-no {
      margin: 9px;
      width: 12px;
      div { height: 24px; }
    }
    .editor-contents {
      margin: 8px;
      outline: 0;
    }
    `
  ]
})
export class Editor {
  enteredLineNumbers = [1];
  constructor(private el: ElementRef) { }
  handleClickEditor() {
    this.el.nativeElement.querySelector('.editor-contents').focus();
  }
  handleChangeContents() {
    // +2 because 1 origin + next line
    this.enteredLineNumbers = _.range(1, this.el.nativeElement.querySelectorAll('.editor-contents div').length + 2);
  }
}
