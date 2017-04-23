import Application from '../application';
import * as assert from 'power-assert';
import SlideEditorPage from '../page/slide_editor.page';
import { jsdom } from 'jsdom';

describe('input text to editor.', function () {
  this.timeout(10000);
  let app = new Application();
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    return app.stop(this.currentTest.state, this.currentTest.title);
  });

  describe('input markdown text', function() {
    it('parses and renders html.', function() {
      const page = new SlideEditorPage(app.client);
      return page.inputText('# h1 title\n- list')
        .then(() => page.getSlideHtml())
        .then((html) => {
          const dom: Document = jsdom(html);
          const h1 = dom.querySelector('h1');
          assert.equal(h1.textContent, 'h1 title');
          const li = dom.querySelector('li');
          assert.equal(li.textContent, 'list');
        });
    });
  });

  describe('input :emoji:', function() {
    it('renders image', function() {
      const page = new SlideEditorPage(app.client);
      return page.inputText(':bow:')
        .then(() => page.findEmoji('bow'))
        .then((result) => assert.ok(result));
    });
  });
});
