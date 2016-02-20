'use strict';

const electron = require('electron');

export default class PresentationWindow {
  _windows = new Map();
  _ipc = require( 'electron' ).ipcMain;

  constructor() {
    this._ipc.on( 'RequestCreateNewWindow', this._onRequestCreateNewWindow.bind( this ) );
  }

  _onRequestCreateNewWindow( ev ) {
    this.createNewWindow();
  }

  createNewWindow() {
    const w  = new electron.BrowserWindow( { width: 400, height: 400, minWidth: 400, minHeight: 400, resizable: true } );
    const id = w.id;

    w.on( 'closed', () => {
      this._windows.delete( id );
    } );

    w.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
    this._windows.set( id, w );

    return w;
  }
}
