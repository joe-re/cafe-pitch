import {Pipe, PipeTransform} from 'angular2/core';
const marked = require('marked');

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return marked(value);
  }
}
