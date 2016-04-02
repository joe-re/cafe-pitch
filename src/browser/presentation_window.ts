import * as electron from 'electron';
const ipc: Electron.IPCMain = electron.ipcMain;

export default class PresentationWindow {
  private window: Electron.BrowserWindow;
  private text: string;
  private static instance: PresentationWindow;

  constructor() {
    if (PresentationWindow.instance) throw new Error('must use the getInstance.');
    ipc.on( 'RequestCreateNewWindow', this.hanldRequestCreateNewWindow.bind( this ) );
    ipc.on( 'RequestMessage', (ev: Electron.IPCMainEvent) => {
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

  private hanldRequestCreateNewWindow( _ev: Electron.IPCMainEvent, args ) {
    this.text = args.text;
    this.createWindow();
  }

  private createWindow() {
    if (this.window) return;
    this.window  = new electron.BrowserWindow( { width: 940, height: 740, minWidth: 940, minHeight: 740, resizable: true } );
    this.window.loadURL('file://' + __dirname + '/../renderer/presentation_window.html');
    this.window.on('closed', () => { this.window = null; });
  }
}
