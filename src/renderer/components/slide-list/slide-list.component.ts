import {Component} from 'angular2/core';

@Component({
  selector: 'slide-list',
  template: `
    <div class="slide-list">  </div>
  `,
  styles: [`
    .slide-list {
      width: 100%;
      background: white;
      height: 100%;
      position: absolute;
    }
    `
  ]
})
export class SlideList {
}
