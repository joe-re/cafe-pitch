import {join} from 'path';
import * as electron from 'electron';
import * as spectron from 'spectron';

export class Application {
  private app: spectron.Application;

  start() {
    if (!this.app) {
      this.app = new spectron.Application({
        path: electron,
        args: [join(__dirname, '..', '..')],
        startTimeout: 10000
      });
    }
    if (this.app.isRunning()) {
      return Promise.reject(new Error('application has already started.'));
    }
    return this.app.start();
  }

  stop() {
    if (!(this.app && this.app.isRunning())) {
      return Promise.reject(new Error("application isn't working."));
    }
    return this.app.stop();
  }

  get client() {
    return this.app.client;
  }
}
