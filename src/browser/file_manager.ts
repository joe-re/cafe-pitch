import MainWindow from './main_window';
import * as fs from 'fs';
import { EventEmitter } from 'events';
const dialog = require('dialog');

export default class FileManager extends EventEmitter {
  private readingFilePath = '';
  private readingText = '';
  private static instance: FileManager;

  public static createInstance(mainWindow: MainWindow) {
    FileManager.instance = new FileManager(mainWindow);
    return FileManager.instance;
  }

  public static getInstance(): FileManager {
    return FileManager.instance;
  }

  constructor(private mainWindow: MainWindow) {
    super();
    if (FileManager.instance) throw new Error("must use the getInstance.");
    FileManager.instance = this;
  };

  public openFile() {
    dialog.showOpenDialog(this.mainWindow.getBrowserWindow(), {
      properties: ['openFile'],
      filters: [{
        name: 'markdown file',
        extensions: ['md']
      }]
    }, (files) => {
      if (files && files.length > 0) this.readFile(files[0]);
    });
  }

  private readFile(filePath: string): void {
    this.readingFilePath = filePath;
    this.readingText = fs.readFileSync(filePath, 'utf8');
    this.emit('readFile', this.readingText);
  }
}
