import {Application} from '../e2e_test_helper';
import * as assert from 'power-assert';

describe('application launch', function () {
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
