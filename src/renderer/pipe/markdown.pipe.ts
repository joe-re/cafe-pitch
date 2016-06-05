import {Pipe, PipeTransform} from '@angular/core';
const marked = require('marked');
const emoji = require('emoji-images');
const renderer = new marked.Renderer();

renderer.text = (text, level) => emoji(text, 'images/emoji', 32);

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    return marked(value, { renderer });
  }
}
