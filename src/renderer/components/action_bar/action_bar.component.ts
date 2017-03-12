import { Component, Output, EventEmitter } from '@angular/core';

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
        <qiita-download-action (changeText)="changeText($event)"></qiita-download-action>
        <settings-action></settings-action>
      </div>
    </div>
    `,
})
export class ActionBar {
  @Output('changeText') _changeText = new EventEmitter();

  changeText(text: string) {
    this._changeText.emit(text);
  }
}