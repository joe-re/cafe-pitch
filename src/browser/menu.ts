import * as electron from 'electron';
import FileManager from './file_manager';
import MainWindow from './main_window';
import PresentationWindow from './presentation_window';
import ExportWindow from './export_window';
import { Menu } from 'electron';

const app = electron.app;

const setMenu = (mainWindow: MainWindow) => {
  const menuItems  = [
    {
      label: 'File',
      submenu: [
        { label: 'New File', accelerator: 'Command+N', click: () => {
          FileManager.getInstance().resetFile();
        }},
        { label: 'Open...' , accelerator: 'Command+O', click: () => {
          FileManager.getInstance().openFile();
        }},
        { type: 'separator' },
        { label: 'Save', accelerator: 'Command+S', click: () => {
          FileManager.getInstance().saveFile();
        }},
        { label: 'Save As...', click: () => {
          FileManager.getInstance().saveAsNewFile();
        }},
        { type: 'separator' },
        { label: 'Export To PDF', click: () => {
          ExportWindow.getInstance().createWindow(MainWindow.getInstance().getText());
        }}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C',  role: 'copy' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
      ]
    },
    {
      label: 'Play',
      submenu: [
        { label: 'Play Slideshow', accelerator: 'Alt+CmdOrCtrl+P', click: () => PresentationWindow.getInstance().createWindow() }
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
  ] as Electron.MenuItemOptions[];
  if (process.platform === "darwin" ) {
    menuItems.unshift(
      {
        label: "CafePitch",
        submenu: [
          { label: "Quit", accelerator: "CmdOrCtrl+Q", click: () => app.quit() }
        ]
      }
    );
  }
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuItems));
};

export default setMenu;
