import { Component } from '@angular/core';

@Component({
  selector: 'action-bar',
  styles: [`
    .action-group {
      display: inline-block;
      margin-right: 100px;
    }
  `],
  template: `
    <div class="action-bar">
      <div class="action-group">
        <play-action></play-action>
      </div>
      <div class="action-group">
        <settings-action></settings-action>
      </div>
    </div>
    `,
})
export class ActionBar { }