import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';

@Component({
  selector: 'my-app',
  template: '<editor></editor>',
  directives: [Editor]
})
export class AppComponent { }
