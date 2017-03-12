import { Component } from '@angular/core';
import { ipcRenderer } from 'electron';
import { EVENTS } from './../../../constants/events';

@Component({
  selector: 'play-action',
  template: `
    <div class="action">
      <button class="btn btn-large btn-default action-button" (click)="clickStartButton()">
        <span class="icon icon-play"></span>
      </button>
      <div class="action-name">Play</div>
    </div>
    `,
  styleUrls: ['./components/action_bar/action.css']
})
export default class PlayAction {
  clickStartButton() {
    ipcRenderer.send(EVENTS.PRESENTATION_WINDOW.RENDERER.REQUEST_START_PRESENTATION);
  }
} 