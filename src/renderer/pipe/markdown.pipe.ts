import {Pipe, PipeTransform} from 'angular2/core';
const marky = require('marky-markdown');

@Pipe({name: 'markdown'})
export class MarkdownPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return marky(value).html();
  }
}
