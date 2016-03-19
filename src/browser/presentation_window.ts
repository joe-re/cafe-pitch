'use strict';

const electron = require('electron');
const ipc = require( 'electron' ).ipcMain;

export default class PresentationWindow {
  window: any;
  text: string;

  constructor() {
    ipc.on( 'RequestCreateNewWindow', this._onRequestCreateNewWindow.bind( this ) );
    ipc.on( 'RequestMessage', (ev) => {
      ev.returnValue = this.text;
    });
  }

  _onRequestCreateNewWindow( ev, args ) {
    this.text = args.text;
    this.createNewWindow();
  }

  createNewWindow() {
    this.window  = new electron.BrowserWindow( { width: 940, height: 720, minWidth: 940, minHeight: 720, resizable: true } );
    this.window.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
  }
}
