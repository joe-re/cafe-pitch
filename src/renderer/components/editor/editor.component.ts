import {Component, Output, Input, EventEmitter } from '@angular/core';
require('ace-min-noconflict');
require('ace-min-noconflict/mode-markdown');
require('ace-min-noconflict/theme-monokai');
import ace from 'ace-min-noconflict';

@Component({
  selector: 'editor',
  template: `
    <div id="editor"
      disabled='true'
      (keyup)="handleChangeLineNo()"
      (mouseup)="handleChangeLineNo()"
    ></div>
  `,
  styles: [`
    #editor {
      width: 100%;
      height: 100%;
    }
  `]
})
export class Editor {
  @Output('changeText') changeText = new EventEmitter();
  @Output('changeSelectedLineNo') changeSelectedLineNo = new EventEmitter();
  @Input()
  set text(text: string) {
    if (this.changeTextCount > 1 ) {
      --this.changeTextCount;
      return;
    }
    if (this.editor && this.editor.getSession().getValue() !== text) {
      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
      this.silent = true;
      this.editor.getSession().setValue(text);
      this.silent = false;
    }
    if (this.changeTextCount === 1) --this.changeTextCount;
  }

  editor: ace.AceAjax.Editor;
  silent = false;
  changeTextCount = 0;

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().on('change', this.handleChangeText.bind(this));
  }

  handleChangeText(e) {
    if (this.silent) return;
    // if caused completion whitespace, it hasn't apply it yet. and updating is aync on parent.
    // so count changed and apply last changed value.
    ++this.changeTextCount;
    this.changeText.emit(this.editor.getSession().getValue());
  }

  handleChangeLineNo() {
    this.changeSelectedLineNo.emit(this.editor.getSelection().getCursor().row + 1);
  }
}
