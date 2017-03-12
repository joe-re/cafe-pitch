import * as electron from 'electron';
import FileManager from './file_manager';

export default class ExportWindow {
  private window: electron.BrowserWindow;
  private static instance;
  private text: string;

  public static createInstance() {
    if (!ExportWindow.instance) {
      ExportWindow.instance = new ExportWindow();
    }
  }

  public static getInstance(): ExportWindow {
    this.createInstance();
    return ExportWindow.instance;
  }

  constructor() {
    electron.ipcMain.on('RequestPrintText', (ev) => {
      ev.returnValue = this.text;
    });
    electron.ipcMain.on('RequestPrintToPDF', (ev) => {
      FileManager.getInstance().exportToPdf(this.window.webContents).then(() => {
        this.window.close();
        this.window = null;
      });
    });
  };

  public createWindow(text: string) {
    if (this.window) {
      this.window.close();
      this.window = null;
    }
    this.text = text;
    this.window  = new electron.BrowserWindow({ width: 940, height: 740, show: false });
    this.window.loadURL('file://' + __dirname + '/../renderer/export_window.html');
    this.window.on('closed', () => { this.window = null; });
    this.window.toggleDevTools();
  }
}
