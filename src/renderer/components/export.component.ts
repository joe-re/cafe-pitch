import {Component, ElementRef} from 'angular2/core';
import {BrowserDomAdapter} from 'angular2/platform/browser'
import {Slide} from './slide/slide.component';
import {SlideService} from './../services/slide.service';
import * as _ from 'lodash';
const ipcRenderer = require('electron').ipcRenderer;

@Component({
  selector: 'export',
  styles: [`
    .contents {
      height: 100%;
      box-sizing: border-box;
    }
    .slide-section {
      width: 297mm;
      height: 210mm;
      page-break-inside: avoid;
      page-break-after: always;
    }
    slide {
      width: 100%;
      height: 100%;
    }
  `],
  template: `
    <div class="contents">
      <div slide-list>
        <section class="slide-section" *ngFor="#page of pages">
          <slide [text]="slideServie.getPageText(page)"></slide>
        </section>
      </div>
    </div>
    `,
  directives: [Slide],
  providers: [SlideService, BrowserDomAdapter]
})
export class ExportComponent {
  pages: Array<number>;
  constructor(private slideServie: SlideService, private el: ElementRef, private dom: BrowserDomAdapter) { }
  ngOnInit() {
    this.slideServie.setText(ipcRenderer.sendSync('RequestPrintText'));
    this.pages = _.range(1, this.slideServie.getMaxPage());
  }

  getImages(): Array<HTMLImageElement> {
    const images = this.dom.querySelectorAll(this.el.nativeElement, 'img');
    return Array.prototype.slice.call(images);
  }

  ngAfterViewInit() {
    const loadingImages = this.getImages().filter((image) => !image.complete);
    if (loadingImages.length === 0) {
      this.sendRequestPrintPdf();
      return;
    }
    Promise.all(loadingImages.map((image: HTMLImageElement) => {
      return new Promise((resolve) => image.onload = () => resolve());
    })).then(this.sendRequestPrintPdf);
  }

  sendRequestPrintPdf() {
    ipcRenderer.send('RequestPrintToPDF');
  }
}
