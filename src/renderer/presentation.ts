import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import {bootstrap} from 'angular2/platform/browser';
import {PresentationComponent} from './components/presentation.component';

document.addEventListener('DOMContentLoaded', function() {
  bootstrap(PresentationComponent);
});
