import { Application } from '../e2e_test_helper';
import SlideEditorPage from '../page/slide_editor.page';
import * as fs from 'fs';
import * as assert from 'power-assert';
import * as fakeMenu from 'spectron-fake-menu';

describe('save as new file', function () {
  this.timeout(10000);
  let app = new Application();
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    if (this.currentTest.state === "failed") {
      app.report(this.currentTest.title).then(() => app.stop());
    }
    return app.stop();
  });

  it('should create new file.', function () {
    const page = new SlideEditorPage(app.client);
    return page.inputText("test text").then(() => {
      fakeMenu.clickMenu('File', 'Save As...');
      return new Promise((resolve, _reject) => {
        const timer = setInterval(() => {
          if (fs.existsSync("./sandbox/test.md")) {
            const text = fs.readFileSync("./sandbox/test.md", "utf8");
            resolve(text);
            clearInterval(timer);
          }
        }, 1000);
      });
    }).then((text) => {
      assert.equal("test text", text);
    });
  });
});
