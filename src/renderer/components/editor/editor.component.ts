import {Component, ElementRef, Output, EventEmitter} from 'angular2/core';
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
      <div class="editor-contents" contenteditable=true (input)="handleChangeContents()" (keyup)="getSelectedLineNo()" (mouseup)="getSelectedLineNo">{{text}}</div>
    </div>
  `,
  styles: [`
    .editor {
      height: 100%;
      color: #BBB;
      cursor: text;
      display: flex;
      line-height: 24px;
      overflow: scroll;
    }
    .editor-line-no {
      margin: 9px;
      width: 12px;
      div { height: 24px; }
    }
    .editor-contents {
      margin: 8px;
      outline: 0;
      width: 100%;
    }
    `
  ],
  inputs: ['text']
})
export class Editor {
  @Output('changeText') changeText = new EventEmitter();
  @Output('changePage') changePage = new EventEmitter();
  private enteredLineNumbers = [1];
  constructor(private el: ElementRef) { }
  handleClickEditor() {
    this.el.nativeElement.querySelector('.editor-contents').focus();
  }
  handleChangeContents(ev: MouseEvent) {
    // +2 because 1 origin + next line
    const lines = this.el.nativeElement.querySelectorAll('.editor-contents div');
    this.enteredLineNumbers = _.range(1, lines.length + 2);
    const text = this.el.nativeElement.querySelector('.editor-contents').innerText;
    this.changeText.emit(text);
  }
  getSelectedLineNo() {
    const selectedNode = window.getSelection().anchorNode;
    const lineDiv = selectedNode.nodeName === '#text' ? selectedNode.parentElement : selectedNode;
    const contents = this.el.nativeElement.querySelector('.editor-contents');
    let foundNo = 1;
    _.each(contents.childNodes, (node: HTMLElement, index: number) => {
      if (node === lineDiv) {
        foundNo = index;
      }
    });
    let selectedPage = 1;
    _.each(this.el.nativeElement.querySelector('.editor-contents').innerText.split('\n'), (text, index) => {
      if (text === '===') selectedPage++;
      if (foundNo === index + 1) this.changePage.emit(selectedPage);
    });
  }
}
