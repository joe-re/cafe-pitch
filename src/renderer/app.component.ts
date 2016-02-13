import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
  selector: 'my-app',
  template: '<h1>My First Angular 2 App</h1>'
})
class AppComponent { }

document.addEventListener('DOMContentLoaded', function() {
  console.log('aaaaa');
  bootstrap(AppComponent);
});
