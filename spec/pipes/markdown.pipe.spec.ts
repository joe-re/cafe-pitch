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

  it('can render emoji', () => {
    const actual: HTMLElement[] = $(testee.transform('emoji :tada: :bow: :+1: :no-emoji:', []));
    const images = $('img', actual[0]);
    expect(images.length).toEqual(3);
    expect(images[0].src).toEqual('http://localhost:9876/images/emoji/tada.png');
    expect(images[1].src).toEqual('http://localhost:9876/images/emoji/bow.png');
    expect(images[2].src).toEqual('http://localhost:9876/images/emoji/%2B1.png');
  });
});
