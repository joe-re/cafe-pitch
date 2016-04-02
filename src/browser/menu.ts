import * as electron from 'electron';
import FileManager from './file_manager';
import MainWindow from './main_window';

const menu = require('menu');
const app = electron.app;

const setMenu = (mainWindow: MainWindow) => {
  const buildedMenu = menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { label: 'New File' },
        { label: 'Open...' , accelerator: 'Command+O', click: () => {
          FileManager.getInstance().openFile();
        }},
        { type: 'separator' },
        { label: 'Save', accelerator: 'Command+S', click: () => {
          FileManager.getInstance().saveFile();
        }},
        { label: 'Save As...' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'Command+Q', click: () => app.quit() }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click: function() { mainWindow.getBrowserWindow().webContents.toggleDevTools(); }
        }
      ]
    }
  ]);

  menu.setApplicationMenu(buildedMenu);
};

export default setMenu;
