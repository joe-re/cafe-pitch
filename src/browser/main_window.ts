import * as electron from 'electron';
import FileManager from './file_manager';
const ipc: Electron.IPCMain = electron.ipcMain;
import {EVENTS} from './../constants/events';

export default class MainWindow {
  private window: Electron.BrowserWindow;
  private static instance: MainWindow;
  private text: string;

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
    ipc.on(EVENTS.MAIN_WINDOW.RENDERER.SEND_CHANGED_TEXT, this.handleChangeText.bind(this));
    FileManager.getInstance().on(EVENTS.FILE_MANAGER.READ_FILE, this.handleReadFile.bind(this));
    FileManager.getInstance().on(EVENTS.FILE_MANAGER.RESET_FILE, this.handleResetFile.bind(this));
  }

  public getBrowserWindow(): Electron.BrowserWindow {
    return this.window;
  }

  public getText() {
    return this.text;
  }

  private handleChangeText(_ev: Electron.IPCMainEvent, data) {
    this.text = data.text;
  }

  private handleReadFile(data: string) {
    this.text = data;
    this.window.webContents.send(EVENTS.MAIN_WINDOW.MAIN.SEND_REFRESHED_TEXT, data);
  }

  private handleResetFile() {
    this.text = '';
    this.window.webContents.send(EVENTS.MAIN_WINDOW.MAIN.SEND_REFRESHED_TEXT, '');
  }
}
