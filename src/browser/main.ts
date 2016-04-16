import MainWindow from './main_window';
import PresentationWindow from './presentation_window';
import setMenu from './menu';
import * as electron from 'electron';
import FileManager from './file_manager';

const app = electron.app;

let mainWindow;

const initialize = () => {
  MainWindow.createInstance();
  FileManager.createInstance(MainWindow.getInstance());
  PresentationWindow.createInstance();
  MainWindow.getInstance().createWindow();
  setMenu(MainWindow.getInstance());
};

app.on('ready', initialize);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) initialize();
});
