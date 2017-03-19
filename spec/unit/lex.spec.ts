/// <reference path="../../typings/globals/mocha/index.d.ts" />

import lex from '../../src/renderer/utils/lex';
import * as assert from 'power-assert';

describe('lexing lines', function() {
  it('should be lexed by lines', function () {
    const text =
      'text\n\n' +
      '# heading1\n' +
      '\n' +
      '## heading2\n' +
      '\n' +
      '### heading3\n' +
      '\n' +
      '#### heading4\n' +
      '\n' +
      '##### heading5\n' +
      '\n' +
      '###### heading6\n' +
      '\n' +
      '    code\n' +
      '\n' +
      '```\n' +
      'fenses1 line\n' +
      'fenses2 line\n' +
      '```\n' +
      '---\n';
    const settings = {
      separator: { horizontalLine: true, h1: true, h2: true, h3: true, h4: false, h5: false, h6: false }
    };
    const lines = lex(text, settings);
    assert.equal(lines.length, 21);
    assert.deepEqual(lines[0], { type: 'others', text: 'text\n' });
    assert.deepEqual(lines[1], { type: 'others', text: '\n' });
    assert.deepEqual(lines[2], { type: 'heading', depth: 1, text: '# heading1\n', break: true });
    assert.deepEqual(lines[3], { type: 'others', text: '\n' });
    assert.deepEqual(lines[4], { type: 'heading', depth: 2, text: '## heading2\n', break: true });
    assert.deepEqual(lines[5], { type: 'others', text: '\n' });
    assert.deepEqual(lines[6], { type: 'heading', depth: 3, text: '### heading3\n', break: true });
    assert.deepEqual(lines[7], { type: 'others', text: '\n' });
    assert.deepEqual(lines[8], { type: 'heading', depth: 4, text: '#### heading4\n', break: false });
    assert.deepEqual(lines[9], { type: 'others', text: '\n' });
    assert.deepEqual(lines[10], { type: 'heading', depth: 5, text: '##### heading5\n', break: false });
    assert.deepEqual(lines[11], { type: 'others', text: '\n' });
    assert.deepEqual(lines[12], { type: 'heading', depth: 6, text: '###### heading6\n', break: false });
    assert.deepEqual(lines[13], { type: 'others', text: '\n' });
    assert.deepEqual(lines[14], { type: 'code', text: '    code\n' });
    assert.deepEqual(lines[15], { type: 'others', text: '\n' });
    assert.deepEqual(lines[16], { type: 'code', text: '```\n' });
    assert.deepEqual(lines[17], { type: 'code', text: 'fenses1 line\n' });
    assert.deepEqual(lines[18], { type: 'code', text: 'fenses2 line\n' });
    assert.deepEqual(lines[19], { type: 'code', text: '```\n' });
    assert.deepEqual(lines[20], { type: 'hr', text: '\n', break: true });
  });
});
