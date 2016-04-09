import MainWindow from './main_window';
import * as fs from 'fs';
import { EventEmitter } from 'events';
import ExportWindow from './export_window';
const dialog: Electron.Dialog = require('dialog');

export default class FileManager extends EventEmitter {
  private readingFilePath = '';
  private readingText = '';
  private static instance: FileManager;

  constructor() {
    super();
    if (FileManager.instance) throw new Error('must use the getInstance.');
  };

  public static createInstance() {
    if (!FileManager.instance) {
      FileManager.instance = new FileManager();
    }
  }

  public static getInstance(): FileManager {
    return FileManager.instance;
  }

  public resetFile() {
    const reset = () => {
      this.readingText = '';
      this.readingFilePath = '';
      this.emit('ResetFile', this.readingText);
    };
    if (this.isUnsaving()) this.showFileSavingQuestionDialog().then(reset.bind(this));
    else reset();
  }

  public openFile() {
    dialog.showOpenDialog(
      MainWindow.getInstance().getBrowserWindow(),
      {
        title: 'open',
        properties: ['openFile'],
        filters: [{
          name: 'markdown file',
          extensions: ['md']
        }]
      },
      (files) => {
        if (files && files.length > 0) this.readFile(files[0]);
      }
    );
  }

  public saveFile(): Promise<{}> {
    return new Promise((resolve) => {
      const saving = this.readingFilePath ? this.writeFile : this.saveAsNewFile;
      saving.call(this).then(resolve);
    });
  }

  public saveAsNewFile(): Promise<{}> {
    return new Promise((resolve, reject) => {
      dialog.showSaveDialog(
        MainWindow.getInstance().getBrowserWindow(),
        {
          title: 'save',
          filters: [{
            name: 'markdown file',
            extensions: ['md']
          }]
        },
        (file) => {
          if (file) this.writeFile(file).then(resolve);
          else reject();
        }
      );
    });
  }

  public exportToPdf(webContents: Electron.WebContents): Promise<{}> {
    return new Promise((resolve, reject) => {
      dialog.showSaveDialog(
        MainWindow.getInstance().getBrowserWindow(),
        {
          title: 'save',
          filters: [{
            name: 'pdf file',
            extensions: ['pdf']
          }]
        },
        (file) => {
          if (file) this.writePdf(webContents, file).then(resolve);
          else reject();
        }
      );
    });
  };

  private writePdf(webContents: Electron.WebContents, filePath: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      webContents.printToPDF({ marginsType: 1, printBackground: true, landscape: true, pageSize: 'A4' }, (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        fs.writeFile(filePath, data, (writeErr) => {
          if (writeErr) {
            reject(error);
            return;
          }
          resolve();
        });
      });
    });
  }

  private showFileSavingQuestionDialog(): Promise<{}> {
    return new Promise((resolve, reject) => {
      dialog.showMessageBox(
        MainWindow.getInstance().getBrowserWindow(),
        {
          title: 'alert',
          type: 'question',
          message: 'file has changes, do you want to save them?',
          buttons: ['Save', 'Cancel', "Don't Save"]
        },
        (response) => {
          if (response === 2) {
            resolve();
            return;
          } else if (response === 1) {
            reject();
            return;
          } else if (response === 0) {
            // if immediately open save dialog, closing animation can't keep up with opening it.
            setTimeout(() => this.saveFile().then(resolve), 100);
            return;
          }
        }
      );
    });
  }

  private readFile(filePath: string): Promise<{}> {
    return new Promise((resolve) => {
      this.readingFilePath = filePath;
      this.readingText = fs.readFileSync(filePath, 'utf8');
      this.emit('readFile', this.readingText);
      resolve();
    });
  }

  private writeFile(filePath: string = this.readingFilePath): Promise<{}> {
    return new Promise((resolve) => {
      this.readingFilePath = filePath;
      this.readingText = MainWindow.getInstance().getText();
      fs.writeFileSync(this.readingFilePath, this.readingText);
      resolve();
    });
  }

  private isUnsaving(): boolean {
    if (!this.readingText && !MainWindow.getInstance().getText()) {
      return false;
    }
    return this.readingText !== MainWindow.getInstance().getText();
  }
}
