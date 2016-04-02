import * as electron from 'electron';
import FileManager from './file_manager';

export default class MainWindow {
  private window: Electron.BrowserWindow;
  private static instance: MainWindow;

  constructor() {
    if (MainWindow.instance) throw new Error('must use the getInstance.');
  };

  public static createInstance() {
    if (!MainWindow.instance) {
      MainWindow.instance = new MainWindow();
    }
  }

  public static getInstance(): MainWindow {
    this.createInstance();
    return MainWindow.instance;
  }

  public createWindow() {
    if (this.window) { return; }
    this.window = new electron.BrowserWindow({width: 800, height: 600});
    this.window.loadURL('file://' + __dirname + '/../renderer/index.html');
    this.window.on('closed', () => { this.window = null; });
    FileManager.getInstance().on('readFile', this.handleReadFile.bind(this));
  }

  public getBrowserWindow(): Electron.BrowserWindow {
    return this.window;
  }

  private handleReadFile(data: string) {
    this.window.webContents.send('readFile', data);
  }
}
