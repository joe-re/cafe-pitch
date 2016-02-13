import {Component} from 'angular2/core';
import {Editor} from './editor/editor.component';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'my-app',
  template: '<editor></editor>',
  directives: [Editor]
})
class AppComponent { }

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(AppComponent);
});
