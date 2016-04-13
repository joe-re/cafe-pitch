import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(AppComponent);
});
