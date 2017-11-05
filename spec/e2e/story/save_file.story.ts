import Application from '../application';
import * as FileSystem from '../helper/file_system';
import SlideEditorPage from '../page/slide_editor.page';
import * as fs from 'fs';
import * as assert from 'power-assert';
import * as fakeMenu from 'spectron-fake-menu';
import * as fakeDialog from 'spectron-fake-dialog';

describe("click 'Save As...' menu", function () {
  this.timeout(10000);
  let app = new Application();

  beforeEach(function () {
    return app.start().then(() => fakeDialog.mock([
      { method: 'showSaveDialog', value: 'sandbox/test.md' },
      { method: 'showOpenDialog', value: ['sandbox/test.md'] }
    ]));
  });

  afterEach(function () {
    return app.stop(this.currentTest.state, this.currentTest.title);
  });

  it('should save as a new file', function () {
    const page = new SlideEditorPage(app.client);
    return page.inputText("test text").then(() => {
      setTimeout(() => fakeMenu.clickMenu('File', 'Save As...'), 100);
      return FileSystem.waitForExistFile('./sandbox/test.md')
    }).then(() => fs.readFileSync("./sandbox/test.md", "utf8")).then((text) => {
      assert.equal("test text", text);
    });
  });
});

describe("click 'Save' menu", function () {
  this.timeout(10000);
  let app = new Application();

  beforeEach(function () {
    return app.start().then(() => fakeDialog.mock([
      { method: 'showSaveDialog', value: 'sandbox/test.md' },
      { method: 'showOpenDialog', value: ['sandbox/test.md'] }
    ]));
  });

  afterEach(function () {
    return app.stop(this.currentTest.state, this.currentTest.title);
  });

  context('new file', function() {
    it('should save as a new file', function () {
      const page = new SlideEditorPage(app.client);
      return page.inputText("test text").then(() => {
        setTimeout(() => fakeMenu.clickMenu('File', 'Save'), 100);
        return FileSystem.waitForExistFile('./sandbox/test.md')
      }).then(() => fs.readFileSync("./sandbox/test.md", "utf8")).then((text) => {
        assert.equal("test text", text);
      });
    });
  });

  context('existing file', function() {
    beforeEach(function() {
      fs.writeFileSync('./sandbox/test.md', 'content');
    });

    it('should overwrite file content', function () {
      fakeMenu.clickMenu('File', 'Open...');
      const page = new SlideEditorPage(app.client);
      return page.waitForExistEditorText('content')
        .then(() => page.inputText('overwrite')) // success file open
        .then(() => setTimeout(() => fakeMenu.clickMenu('File', 'Save'), 100))
        .then(() => FileSystem.waitForExistFileText('./sandbox/test.md', 'overwrite'))
        .then(() => assert(true));
    });
  });
});
