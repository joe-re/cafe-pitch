import Application from '../application';
import * as assert from 'power-assert';

describe('application launch', function () {
  this.timeout(10000);
  let app = new Application();
  beforeEach(function () {
    return app.start();
  });

  afterEach(function () {
    return app.stop();
  });

  it('shows an initial window', function () {
    return app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1);
    });
  });
});
