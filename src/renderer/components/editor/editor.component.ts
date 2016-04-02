import {Component, ElementRef, Output, EventEmitter} from 'angular2/core';
import * as _ from 'lodash';
import {ipcRenderer} from 'electron';

@Component({
  selector: 'editor',
  template: `
    <div class="editor" (click)="handleClickEditor()">
      <div class="editor-line-no">
        <div *ngFor="#lineNumber of enteredLineNumbers">
          {{lineNumber}}
        </div>
      </div>
      <div class="editor-contents"
        contenteditable=true
        (input)="handleChangeContents($event)"
        (paste)="handlePaste($event)"
        (keyup)="hanldeChangeLineNo()"
        (mouseup)="hanldeChangeLineNo()"
      ></div>
    </div>
  `,
  styles: [`
    .editor {
      height: 100%;
      color: #BBB;
      cursor: text;
      display: flex;
      line-height: 24px;
      overflow-y: scroll;
    }
    .editor::-webkit-scrollbar {
      display: none;
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
  ]
})
export class Editor {
  @Output('changeText') changeText = new EventEmitter();
  @Output('changeSelectedLineNo') changeSelectedLineNo = new EventEmitter();
  private enteredLineNumbers: number[] = [1];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    ipcRenderer.on('readFile', (ev, text: string) => {
      this.enteredLineNumbers = _.range(1, text.split('\n').length + 1);
      this.el.nativeElement.querySelector('.editor-contents').innerHTML =
        _.reduce(this.escapeHTML(text).split('\n'), (memo, v) => memo += `<div>${v ? v : '<br>'}</div>`);
      this.changeText.emit(text);
    });
  }

  private escapeHTML(str) {
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  handleClickEditor() {
    this.el.nativeElement.querySelector('.editor-contents').focus();
  }

  handleChangeContents(ev) {
    const text = ev.target.innerText;
    const lines = text.split('\n');
    this.enteredLineNumbers = _.range(1, lines.length);
    this.changeText.emit(text);
  }

  hanldeChangeLineNo() {
    let isFound = false;
    const findIndex = (nodes: Element[], target: Node, memo: number = 1): number => {
      _.each(nodes, (node: HTMLElement, index: number) => {
        if (isFound) return;
        const childDivs = _.filter(node.children, (child: HTMLElement) => child.nodeName === 'DIV');
        if (node === target) {
          isFound = true;
        } else if (childDivs.length > 0) {
          memo = findIndex(childDivs, target, memo);
        } else {
          ++memo;
        }
      });
      return memo;
    };

    const selectedNode = window.getSelection().anchorNode;
    const selectedLineDiv: Node = selectedNode.nodeName === '#text' ? selectedNode.parentElement : selectedNode;
    const contents = this.el.nativeElement.querySelector('.editor-contents');
    let selectedLineNo: number = contents === selectedLineDiv ? 1 : findIndex(contents.children, selectedLineDiv);
    this.changeSelectedLineNo.emit(selectedLineNo);
  }

  handlePaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }
}
