import {Component, Output, EventEmitter } from 'angular2/core';
import {ipcRenderer} from 'electron';
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
  `]
})
export class Editor {
  @Output('changeText') changeText = new EventEmitter();
  @Output('changeSelectedLineNo') changeSelectedLineNo = new EventEmitter();

  editor: AceAjax.Editor;

  ngOnInit() {
    this.editor = ace.edit('editor');
    this.editor.getSession().setMode('ace/mode/markdown');
    this.editor.setTheme('ace/theme/monokai');
    ipcRenderer.on('readFile', (ev, text: string) => {
      this.editor.getSession().setValue(text);
      this.changeText.emit(text);
      this.changeSelectedLineNo.emit(1);
    });
    this.editor.getSession().on('change', this.handleChangeText.bind(this));
  }

  handleChangeText() {
    this.changeText.emit(this.editor.getSession().getValue());
  }

  handleChangeLineNo() {
    this.changeSelectedLineNo.emit(this.editor.getSelection().getCursor().row + 1);
  }
}
