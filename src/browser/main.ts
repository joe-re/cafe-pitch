import MainWindow from './main_window';
import PresentationWindow from './presentation_window';
import setMenu from './menu';
import * as electron from 'electron';

const app = electron.app;

let mainWindow;
let presentationWindow;

const initialize = () => {
  mainWindow = new MainWindow();
  mainWindow.createWindow();
  presentationWindow = new PresentationWindow();
  setMenu(mainWindow.getBrowserWindow());
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
