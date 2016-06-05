import {Component, ViewEncapsulation, EventEmitter, HostListener, ElementRef, Input} from '@angular/core';

type Pos = { top: number, left: number };

@Component({
  selector: 'rectangle',
  template: `
    <div class="rectangle">
      <p>aaaa</p>
    </div>
  `,
  styles: [`
    .rectangle {
      width: 100px;
      height: 100px;
      background-color: red;
    }
  `],
  encapsulation: ViewEncapsulation.Native
})
export class Rectangle {
  mousedrag;

  mouseup   = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  @HostListener('mouseup', ['$event'])
  onMouseup(event) { this.mouseup.emit(event); }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) { this.mousedown.emit(event); }

  @HostListener('mousemove', ['$event'])
  onMousemove(event) { this.mousemove.emit(event); }

  constructor(public el: ElementRef) {
    this.el.nativeElement.style.position = 'absolute';
    this.el.nativeElement.style.cursor = 'pointer';

    this.mousedown.map((event: MouseEvent): Pos => {
      event.preventDefault();
      return {
        left: event.clientX - this.el.nativeElement.getBoundingClientRect().left,
        top:  event.clientY - this.el.nativeElement.getBoundingClientRect().top
      };
    }).flatMap(offsetPos => this.mousemove.map((event: MouseEvent): Pos => {
      return {
        top: event.clientY - offsetPos.top,
        left: event.clientX - offsetPos.left
      };
    }).takeUntil(this.mouseup))
    .subscribe((pos) => {
      const top = pos.top < 0 ? 0 : pos.top;
      const left = pos.left < 0 ? 0 : pos.left;
      this.el.nativeElement.style.top  = top   + 'px';
      this.el.nativeElement.style.left = left + 'px';
    });
  }

  // onInit() {
  //   this.mousedrag.subscribe({
  //     next: pos => {
  //       // Update position
  //       console.log(pos);
  //       this.element.nativeElement.style.top  = pos.top  + 'px';
  //       this.element.nativeElement.style.left = pos.left + 'px';
  //     }
  //   });
  // }
}
