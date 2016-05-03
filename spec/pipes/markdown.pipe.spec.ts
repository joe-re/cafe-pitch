import { describe, it, expect, beforeEach } from 'angular2/testing';
import { MarkdownPipe } from '../../src/renderer/pipe/markdown.pipe';
const $ = require('jquery');

describe('MarkdownPipe', () => {
  let testee: MarkdownPipe;
  beforeEach(() => {
    testee = new MarkdownPipe();
  });

  it('can parse html from markdown', () => {
    const actual: HTMLElement[] = $(testee.transform('# title', []));
    expect(actual[0].tagName).toEqual('H1');
    expect(actual[0].innerText).toEqual('title');
  });
});
