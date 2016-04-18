import {Component, Output, EventEmitter, SimpleChange } from 'angular2/core';
require('ace-min-noconflict');
require('ace-min-noconflict/mode-markdown');
require('ace-min-noconflict/theme-monokai');

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
  `],
  inputs: ['text']
})
export class Editor {
  @Output('changeText') changeText = new EventEmitter();
  @Output('changeSelectedLineNo') changeSelectedLineNo = new EventEmitter();

  editor: AceAjax.Editor;
  silent = false;
  changeCount = 0;

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.getSession().on('change', this.handleChangeText.bind(this));
  }

  ngOnChanges(changes: {text: SimpleChange}) {
    if (this.changeCount > 1 ) {
      --this.changeCount;
      return;
    }
    if (this.editor && this.editor.getSession().getValue() !== changes.text.currentValue) {
      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
      this.silent = true;
      this.editor.getSession().setValue(changes.text.currentValue);
      this.silent = false;
      if (this.changeCount === 1) --this.changeCount;
    }
  }

  handleChangeText(e) {
    if (this.silent) return;
    // if caused completion whitespace, it hasn't apply it yet. and updating is aync on parent.
    // so count changed and apply last changed value.
    ++this.changeCount;
    this.changeText.emit(this.editor.getSession().getValue());
  }

  handleChangeLineNo() {
    this.changeSelectedLineNo.emit(this.editor.getSelection().getCursor().row + 1);
  }
}
