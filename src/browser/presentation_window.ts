'use strict';

const electron = require('electron');
const ipc: Electron.IPCMain = require( 'electron' ).ipcMain;

export default class PresentationWindow {
  private window: Electron.BrowserWindow;
  private text: string;

  constructor() {
    ipc.on( 'RequestCreateNewWindow', this.hanldRequestCreateNewWindow.bind( this ) );
    ipc.on( 'RequestMessage', (ev: Electron.IPCMainEvent) => {
      ev.returnValue = this.text;
    });
  }

  hanldRequestCreateNewWindow( _ev: Electron.IPCMainEvent, args ) {
    this.text = args.text;
    this.createNewWindow();
  }

  createNewWindow() {
    this.window  = new electron.BrowserWindow( { width: 940, height: 720, minWidth: 940, minHeight: 720, resizable: true } );
    this.window.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
  }
}
