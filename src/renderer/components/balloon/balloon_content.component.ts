import { Component, Output, Input, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'balloon-content',
  template: `
    <div class="triangle-before"></div>
    <div class="triangle-after"></div>
    <div class="balloon-content">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .balloon-content {
      position: absolute;
      text-align: left;
      border: 1px solid #ccc;
      background-color: #fff;
      text-align: center;
      z-index: 9999;
    }
    .triangle-before {
      content: "";
      position: absolute;
      margin-left: -10px;
      width: 0;
      height: 0;
      border-bottom: 10px solid #ccc;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
    .triangle-after {
      content: "";
      position: absolute;
      margin-left: -10px;
      width: 0;
      height: 0;
      border-bottom: 10px solid #fff;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      z-index: 100000;
    }
  `]
})
export default class BalloonContent {
  centerPos: number = 0;
  topPos: number = 0;
  constructor(private el: ElementRef) { }
  setPos(topPos: number, centerPos: number) {
    const before = this.el.nativeElement.querySelector('.triangle-before');
    const after = this.el.nativeElement.querySelector('.triangle-after');
    before.style.top = `${topPos}px`;
    after.style.top = `${topPos + 1}px`;
    before.style.left = `${centerPos}px`;
    after.style.left = `${centerPos}px`;
    const content = this.el.nativeElement.querySelector('.balloon-content');
    content.style.top = `${topPos + 10}px`;
    content.style.left = `${centerPos - content.clientWidth / 2}px`;
    console.log('setted');
  }
}
