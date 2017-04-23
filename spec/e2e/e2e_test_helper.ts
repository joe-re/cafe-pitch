import {join} from 'path';
import * as fs from 'fs';
import * as electron from 'electron';
import * as spectron from 'spectron';
import * as fakeMenu from 'spectron-fake-menu';

const outputDir = "reports";

function capturePage(app: any, testName) {
  return app.browserWindow.capturePage().then((img) => {
    fs.writeFileSync(`${outputDir}/capture_${testName}.png`, img);
  });
}

function reportLog(app: any, testName) {
  return Promise.all([
    app.client.getRenderProcessLogs(),
    app.client.getMainProcessLogs()
  ]).then(([ rendererLogs, mainLogs ]) => {
    const logs = JSON.stringify({
      renderer: rendererLogs,
      main: mainLogs
    });
    fs.writeFileSync(`${outputDir}/logs_${testName}.txt`, logs, "utf8");
  });
}

export class Application {
  private app: spectron.Application;

  start() {
    if (!this.app) {
      this.app = new spectron.Application({
        path: electron,
        args: [
           "--require", join(__dirname, "preload.js"),
          join(__dirname, '..', '..')
        ],
        startTimeout: 10000
      });
      fakeMenu.apply(this.app);
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

  report(testName) {
    return Promise.all([reportLog(this.app, testName), capturePage(this.app, testName)])
  }

  get client() {
    return this.app.client;
  }
}
