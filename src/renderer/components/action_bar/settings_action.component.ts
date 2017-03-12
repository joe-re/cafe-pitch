import { Component } from '@angular/core';

@Component({
  selector: 'settings-action',
  styles: [`
    .settings-form {
      text-align: left;
      width: 400px;
      height: 240px;
      padding: 20px;
    }
    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error { color: red; }
  `],
  template: `
    <div class="action">
      <balloon>
        <button #attachBalloon class="btn btn-large btn-default action-button" (click)="clickSettingsButton()">
          <span class="icon icon-cog"></span>
        </button>
        <div class="action-name">Settings</div>
        <balloon-content [isOpen]="isOpenBalloon" >
          <form class="settings-form" (ngSubmit)="submit()">
            <div class="form-group">
              <div>Sepatator</div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Horizontal Line(---)
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Before h1
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Before h2
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input type="checkbox"> Before h3
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            <span class="error" *ngIf="isError">Failed to save Settings.</span>
          </form>
        </balloon-content>
      </balloon>
    </div>
  `,
  styleUrls: ['./components/action_bar/action.css']
})
export default class SettingsAction {
  private isOpenBalloon = false;
  clickSettingsButton(e: MouseEvent) {
    this.isOpenBalloon = !this.isOpenBalloon;
  }

  submit(e: MouseEvent) {
    this.isOpenBalloon = false;
  }
} 
