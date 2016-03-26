import * as electron from 'electron';
const ipcMain = electron.ipcMain;
import FileManager from './file_manager';

export default class MainWindow {
  private window: Electron.BrowserWindow;
  public createWindow() {
    if (this.window) { return; }
    this.window = new electron.BrowserWindow({width: 800, height: 600});
    this.window.loadURL('file://' + __dirname + '/../renderer/index.html');
    this.window.on('closed', () => { this.window = null; });
    FileManager.createInstance(this).on('readFile', (data: string) => {
      this.window.webContents.send('readFile', data);
    });
  }

  public getBrowserWindow(): Electron.BrowserWindow {
    return this.window;
  }
}
