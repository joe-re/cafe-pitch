import { Directive, ElementRef, Input } from '@angular/core';

const marked = require('marked');
const emoji = require('emoji-images');
const renderer = new marked.Renderer();
import {shell} from 'electron';

// set renderer options
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
renderer.text = (text, level) => emoji(text, 'images/emoji', 32);

@Directive({ selector: '[markdownText]' })
export class MarkdownDirective {
  private el: HTMLElement;

  @Input() set markdownText(text: string) {
    this.el.innerHTML = this.transform(text);
  };

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
    this.el.onclick = this.onClickContents;
  }
  private transform(value: string): string {
    return marked(value, { renderer });
  }

  private onClickContents(event: MouseEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
      const target = event.target as HTMLAnchorElement;
      shell.openExternal(target.href);
    }
  }
}
