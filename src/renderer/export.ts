import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import { NgModule } from '@angular/core';
import { ExportComponent } from './components/export.component';
import { BrowserModule } from '@angular/platform-browser';
import { Editor } from './components/editor/editor.component';
import { Slide } from './components/slide/slide.component';
import { SlidePreview } from './components/slide/slide_preview.component';
import { MarkdownDirective } from './directives/markdown.directive';

@NgModule({
  declarations: [ ExportComponent, Editor, SlidePreview, MarkdownDirective, Slide ],
  imports: [ BrowserModule ],
  providers: [],
  bootstrap: [ ExportComponent ]
})
export class Export { }
