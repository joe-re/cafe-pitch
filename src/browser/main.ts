'use strict';

import PresentationWindow from './presentation_window';
const electron = require('electron');

const app = electron.app;

let mainWindow: Electron.BrowserWindow;
let presentationWindow;

function createWindow () {
  mainWindow = new electron.BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');
  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  presentationWindow = new PresentationWindow();
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
