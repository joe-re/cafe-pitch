import { Component, ElementRef } from '@angular/core';
import { Editor } from './editor/editor.component';
import { SlidePreview } from './slide/slide_preview.component';
import { ipcRenderer } from 'electron';
import { EVENTS } from './../../constants/events';
import Settings from './../../types/settings';
import { SlideService } from './../services/slide.service';
import SettingsService from './../services/settings.service';
import MouseControllService from './../services/mouse_controll.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'my-app',
  styles: [`
    .contents {
      height: 94%;
      box-sizing: border-box;
    }
    .inner-contents {
      display: flex;
      height: 100%;
      width: 100%;
      border: black solid 1px;
    }
    .inner-contents div.editor-area,
    .inner-contents div.slide-preview-area {
      height: 100%;
      width: 50%;
    }
    .header {
      padding: 12px;
    }
  `],
  template: `
    <header class="header">
      <action-bar (changeText)="changeText($event)"></action-bar>
    </header>
    <div class="contents">
      <div class="inner-contents">
        <div class="editor-area">
          <editor (changeText)="changeText($event)" (changeSelectedLineNo)="changeSelectedLineNo($event)" [text]="slideService.getText()"></editor>
        </div>
        <div class="slide-preview-area">
          <slide-preview [text]="slideService.getPageText(page, settings)"></slide-preview>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  private page = 1;
  private _handleClickApplication;
  private settings: Settings;
  private settingsChangedSubscription: Subscription;

  constructor(
    private slideService: SlideService,
    private mouseControllService: MouseControllService,
    private settingsService: SettingsService,
    private el: ElementRef
  ) {
    this._handleClickApplication = this.handleClickApplication.bind(this)
  }

  ngOnInit() {
    ipcRenderer.on(EVENTS.MAIN_WINDOW.MAIN.SEND_REFRESHED_TEXT, (ev, text: string) => {
      this.changeText(text);
      this.changeSelectedLineNo(1);
    });
    document.addEventListener('click', this._handleClickApplication);
    this.settings = this.settingsService.get();
    this.settingsChangedSubscription = this.settingsService.changed$.subscribe((settings) => {
      this.settings = settings;
    });
  }

  ngOnDestroy() {
    document.removeEventListener('click', this._handleClickApplication);
    this.settingsChangedSubscription.unsubscribe();
  }

  handleClickApplication(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    this.mouseControllService.clicked(e.target);
  }

  changeText(text: string) {
    this.slideService.setText(text);
    ipcRenderer.send(EVENTS.MAIN_WINDOW.RENDERER.SEND_CHANGED_TEXT, { text });
  }

  changeSelectedLineNo(selectedLineNo: number) {
    this.page = this.slideService.getPageNo(selectedLineNo, this.settings);
  }
}
