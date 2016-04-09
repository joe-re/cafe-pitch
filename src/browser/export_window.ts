import * as electron from 'electron';
const ipc: Electron.IPCMain = electron.ipcMain;
import FileManager from './file_manager';

export default class ExportWindow {
  private window: Electron.BrowserWindow;
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
    ipc.on('RequestPrintText', (ev: Electron.IPCMainEvent) => {
      ev.returnValue = this.text;
    });
    ipc.on('RequestPrintToPDF', (ev: Electron.IPCMainEvent) => {
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
    this.window  = new electron.BrowserWindow( { width: 940, height: 0, webPreferences: { webSecurity: false } } );
    this.window.loadURL('file://' + __dirname + '/../renderer/export_window.html');
    this.window.on('closed', () => { this.window = null; });
  }
}
