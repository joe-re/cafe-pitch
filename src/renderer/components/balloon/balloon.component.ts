import { Component, Output, Input, EventEmitter, AfterViewInit, ContentChild, ElementRef } from '@angular/core';
import BalloonContentComponent from './balloon_content.component';

@Component({
  selector: 'balloon',
  template: `
  <div class="balloon">
    <ng-content></ng-content>
  </div>
  `,
  styles: [`
    .balloon {
      position: relative;
    }
  `]
})
export default class Balloon implements AfterViewInit {
  @ContentChild('attachBalloon') attachBalloon: ElementRef;
  @ContentChild(BalloonContentComponent) contentComponent: BalloonContentComponent

  constructor(private el: ElementRef) { }
   ngAfterViewInit(): void {
     setTimeout(() => {
       this.setBallonContentPositon();
     }, 0);
   }

   setBallonContentPositon() {
     const ballon = this.el.nativeElement.querySelector('.balloon');
     const { clientWidth, offsetWidth, clientHeight, offsetTop } = this.attachBalloon.nativeElement;
     const centerPos = clientWidth + offsetWidth / 2;
     const topPos = clientHeight + offsetTop;
     this.contentComponent.setPos(topPos, centerPos);
   }
 }