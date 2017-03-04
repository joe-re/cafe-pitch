import {EVENTS} from './../constants/events';
import MainWindow from './../browser/main_window';
import * as electron from 'electron';

export default class PresentationWindow {
  private window: electron.BrowserWindow;
  private text: string;
  private static instance: PresentationWindow;

  constructor() {
    if (PresentationWindow.instance) throw new Error('must use the getInstance.');
    electron.ipcMain.on(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION, this.hanldRequestStartPresentation.bind( this ) );
    electron.ipcMain.on(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_MESSAGE, (ev) => {
      ev.returnValue = this.text;
    });
  };

  public static createInstance() {
    if (!PresentationWindow.instance) {
      PresentationWindow.instance = new PresentationWindow();
    }
  }

  public static getInstance(): PresentationWindow {
    this.createInstance();
    return PresentationWindow.instance;
  }

  public createWindow() {
    if (this.window) return;
    this.text = MainWindow.getInstance().getText();
    this.window  = new electron.BrowserWindow( { width: 940, height: 740, minWidth: 940, minHeight: 740, resizable: true } );
    this.window.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
    this.window.on('closed', () => { this.window = null; });
  }

  private hanldRequestStartPresentation( _ev) {
    this.createWindow();
  }
}
