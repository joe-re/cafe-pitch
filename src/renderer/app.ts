import 'es6-shim';
import 'reflect-metadata';
import 'rxjs/Rx';
import 'zone.js/dist/zone';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { Editor } from './components/editor/editor.component';
import { Slide } from './components/slide/slide.component';
import { ActionBar } from './components/action_bar/action_bar.component';
import { SlidePreview } from './components/slide/slide_preview.component';
import Balloon from './components/balloon/balloon.component';
import BalloonContent from './components/balloon/balloon_content.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http'; 
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Editor,
    SlidePreview,
    MarkdownDirective,
    Slide,
    Balloon,
    BalloonContent,
    ActionBar
  ],
  imports: [ BrowserModule, HttpModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
class App { }

platformBrowserDynamic().bootstrapModule(App);
