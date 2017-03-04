import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Editor } from './components/editor/editor.component';
import { Slide } from './components/slide/slide.component';
import { SlidePreview } from './components/slide/slide_preview.component';
import { MarkdownDirective } from './directives/markdown.directive';

@NgModule({
  declarations: [ AppComponent, Editor, SlidePreview, MarkdownDirective, Slide ],
  imports: [ BrowserModule, ],
  providers: [],
  bootstrap: [AppComponent]
})
export class App { }
