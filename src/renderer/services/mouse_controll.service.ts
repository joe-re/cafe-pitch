import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export default class MouseControll {
  private clickedSource = new Subject<HTMLElement>();
  clicked$ = this.clickedSource.asObservable();

  clicked(html: HTMLElement) {
    this.clickedSource.next(html);
  }
}