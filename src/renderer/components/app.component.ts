import {Component} from '@angular/core';
import {SlideService} from './../services/slide.service';
import {ipcRenderer} from 'electron';
import {EVENTS} from './../../constants/events';
import {MainPage} from './page/main_page.component';
import {EditSlidePage} from './page/edit_slide.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@RouteConfig([
  {
    path: '/',
    name: 'Main',
    component: MainPage
  },
  {
    path: '/edit-slide',
    name: 'EditSlide',
    component: EditSlidePage
  }
])

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
  `],
  template: `
    <div class="contents">
      <div class="actions">
        <button (click)="clickStartButton()">Start</button>
      </div>
      <a [routerLink]="['EditSlide']">Heroes</a>
      <router-outlet></router-outlet>
    </div>
    `,
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, SlideService]
})
export class AppComponent {
  constructor(private slideService: SlideService) { }
  ngOnInit() {
    ipcRenderer.on(EVENTS.MAIN_WINDOW.MAIN.SEND_REFRESHED_TEXT, (ev, text: string) => {
      this.slideService.setText(text);
      ipcRenderer.send(EVENTS.MAIN_WINDOW.RENDERER.SEND_CHANGED_TEXT, { text });
    });
  }

  clickStartButton() {
    ipcRenderer.send(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION);
  }
}
