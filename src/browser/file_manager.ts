import MainWindow from './main_window';
import * as fs from 'fs';
import { EventEmitter } from 'events';
const dialog = require('dialog');

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

  public saveFile() {
    if (this.readingFilePath) {
      this.writeFile();
    } else {
      this.saveAsNewFile();
    }
  }

  public saveAsNewFile() {
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
        if (file) this.writeFile(file);
      }
    );
  }

  private readFile(filePath: string): void {
    this.readingFilePath = filePath;
    this.readingText = fs.readFileSync(filePath, 'utf8');
    this.emit('readFile', this.readingText);
  }

  private writeFile(filePath: string = this.readingFilePath): void {
    this.readingFilePath = filePath;
    this.readingText = MainWindow.getInstance().getText();
    fs.writeFile(this.readingFilePath, this.readingText);
  }
}
