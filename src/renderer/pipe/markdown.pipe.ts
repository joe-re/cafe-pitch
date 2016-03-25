import {Pipe, PipeTransform} from 'angular2/core';
const marked = require('marked');
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, args: string[]): HTMLDocument {
    return marked(value);
  }
}
