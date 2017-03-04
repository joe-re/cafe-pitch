declare namespace Spectron {
  export interface ApplicationOptions {
    path: any;
    args?: string[];
    cwd?: string;
    env?: Object;
    host?: string;
    port?: number;
    nodePath?: string;
    connectionRetryCount?: number;
    connectionRetryTimeout?: number;
    quitTimeout?: number;
    requireName?: string;
    startTimeout?: number;
    waitTimeout?: number;
  }

  export interface Client<T> extends WebdriverIO.Client<T> {
    getMainProcessLogs(): Promise<string[]>;
    getRenderProcessLogs(): Promise<string[]>;
    getSelectedText(): Promise<string>;
    getWindowCount(): Promise<number>;
    waitUntilTextExists(selector: string, text: string, timeout?: number): Promise<void>;
    waitUntilWindowLoaded(timeout?: number): Promise<void>;
    windowByIndex(index: number): Promise<void>;
  }

  export class Application {
    client: Client<void>;
    electron: Electron.ElectronMainAndRenderer;
    browserWindow: Electron.BrowserWindow;
    webContents: Electron.WebContents;
    mainProcess: NodeJS.EventEmitter;
    rendererProcess: NodeJS.EventEmitter;

    constructor(options: ApplicationOptions);
    start(): Promise<void>;
    stop(): Promise<void>;
    restart(): void;
    isRunning(): boolean;
  }
}

declare module 'spectron' {
  export = Spectron;
}
