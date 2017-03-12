import { Component } from '@angular/core';

@Component({
  selector: 'settings-action',
  template: `
    <div class="action">
      <button class="btn btn-large btn-default action-button">
        <span class="icon icon-cog"></span>
      </button>
      <div class="action-name">Settings</div>
    </div>
  `,
  styleUrls: ['./components/action_bar/action.css']
})
export default class SettingsAction {
} 
