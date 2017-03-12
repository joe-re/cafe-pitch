import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import SettingsService from './../../services/settings.service';
import MouseControllService from './../../services/mouse_controll.service';
import Settings from './../../../types/settings';
import { Subscription }   from 'rxjs/Subscription';

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
        <button id="settings-button" #attachBalloon class="btn btn-large btn-default action-button" (click)="clickSettingsButton()">
          <span class="icon icon-cog"></span>
        </button>
        <div class="action-name">Settings</div>
        <balloon-content id="settings-balloon" [isOpen]="isOpenBalloon" >
          <form class="settings-form" #settingsForm="ngForm" (ngSubmit)="submit(settingsForm)">
            <div class="form-group">
              <div>Sepatator</div>
              <div class="checkbox">
                <label>
                  <input [(ngModel)]="settings.separator.horizontalLine" name="horizontalLine" type="checkbox"> Horizontal Line(---)
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input [(ngModel)]="settings.separator.h1" name="h1" type="checkbox"> Before h1
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input [(ngModel)]="settings.separator.h2" name="h2" type="checkbox"> Before h2
                </label>
              </div>
              <div class="checkbox">
                <label>
                  <input [(ngModel)]="settings.separator.h3" name="h3" type="checkbox"> Before h3
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
  styleUrls: ['./components/action_bar/action.css'],
  providers: [SettingsService]
})
export default class SettingsAction {
  private isOpenBalloon = false;
  private settings: Settings;
  private mouseControllSubscription: Subscription;

  constructor(
    private settingsService: SettingsService,
    private mouseControllService: MouseControllService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.settings = this.settingsService.get();
    this.mouseControllSubscription = this.mouseControllService.clicked$.subscribe(html => this.handleClickApplication(html));
  }

  ngOnDestroy() {
    this.mouseControllSubscription.unsubscribe();
  }

  handleClickApplication(html: HTMLElement) {
    const settingsContents: Node[] = Array.prototype.slice.call(
      this.el.nativeElement.querySelectorAll('#settings-button, #settings-balloon')
    );
    if (!settingsContents.find((node) => node.contains(html))) this.isOpenBalloon = false;
  }

  clickSettingsButton(e: MouseEvent) {
    this.isOpenBalloon = !this.isOpenBalloon;
  }

  submit(settingsForm: NgForm) {
    this.settingsService.save(this.settings);
    this.isOpenBalloon = false;
  }
} 
