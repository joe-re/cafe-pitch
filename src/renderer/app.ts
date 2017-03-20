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
import PlayAction from './components/action_bar/play_action.component';
import QiitaDownloadAction from './components/action_bar/qiita_download_action.component';
import SettingsAction from './components/action_bar/settings_action.component';
import { SlidePreview } from './components/slide/slide_preview.component';
import Balloon from './components/balloon/balloon.component';
import BalloonContent from './components/balloon/balloon_content.component';
import { MarkdownDirective } from './directives/markdown.directive';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpModule } from '@angular/http'; 
import { FormsModule }   from '@angular/forms';
import { SlideService } from './services/slide.service';
import SettingsService from './services/settings.service';
import MouseControllService from './services/mouse_controll.service';

@NgModule({
  declarations: [
    AppComponent,
    Editor,
    SlidePreview,
    MarkdownDirective,
    Slide,
    Balloon,
    BalloonContent,
    ActionBar,
    PlayAction,
    QiitaDownloadAction,
    SettingsAction
  ],
  imports: [ BrowserModule, HttpModule, FormsModule],
  providers: [SlideService, MouseControllService, SettingsService],
  bootstrap: [AppComponent]
})
class App { }

platformBrowserDynamic().bootstrapModule(App);
