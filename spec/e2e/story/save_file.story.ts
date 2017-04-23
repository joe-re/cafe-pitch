import { Application, waitForExistFile } from '../e2e_test_helper';
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
    return app.stop(this.currentTest.state, this.currentTest.title);
  });

  it('should save as a new file.', function () {
    const page = new SlideEditorPage(app.client);
    return page.inputText("test text").then(() => {
      setTimeout(() => fakeMenu.clickMenu('File', 'Save As...'), 100);
      return waitForExistFile('./sandbox/test.md')
    }).then(() => fs.readFileSync("./sandbox/test.md", "utf8")).then((text) => {
      assert.equal("test text", text);
    });
  });
});
