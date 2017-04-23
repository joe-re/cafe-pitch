import {join} from 'path';
import * as fs from 'fs';
import * as electron from 'electron';
import * as spectron from 'spectron';
import * as fakeMenu from 'spectron-fake-menu';
import * as mkdirp from 'mkdirp';
import * as del from 'del';

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
    del.sync([
      `${join(process.cwd(), 'sandbox')}/**/*`,
      `${join(process.cwd(), 'reports')}/**/*`,
    ]);
    mkdirp.sync(join(process.cwd(), 'sandbox'));
    mkdirp.sync(join(process.cwd(), 'reports'));
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

  stop(testResult: string = null, testTitle: string = null) {
    if (!(this.app && this.app.isRunning())) {
      return Promise.reject(new Error("application isn't working."));
    }
    if (testResult && testTitle && testResult === 'failed') {
      return this.report(testTitle).then(() => this.app.stop());
    }
    return this.app.stop();
  }

  report(testTitle) {
    return Promise.all([reportLog(this.app, testTitle), capturePage(this.app, testTitle)])
  }

  get client() {
    return this.app.client;
  }
}

export function waitForExistFile(filePath: string) {
  return new Promise((resolve, _reject) => {
    const timer = setInterval(() => {
      if (fs.existsSync(filePath)) {
        resolve();
        clearInterval(timer);
      }
    }, 1000);
  });
}