import {Component, ElementRef} from '@angular/core';
import {Slide} from './slide/slide.component';
import {SlideService} from './../services/slide.service';
import SettingsService from './../services/settings.service';
import * as _ from 'lodash';
import { ipcRenderer } from 'electron';
import Settings from './../../types/settings';

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
      <div>
        <section class="slide-section" *ngFor="let page of pages">
          <slide [text]="slideServie.getPageText(page, settings)"></slide>
        </section>
      </div>
    </div>
    `,
  providers: [SlideService, SettingsService]
})
export class ExportComponent {
  pages: Array<number>;
  private settings: Settings;

  constructor(
    private slideServie: SlideService,
    private settingsService: SettingsService,
    private el: ElementRef
  ) { }
  ngOnInit() {
    this.slideServie.setText(ipcRenderer.sendSync('RequestPrintText'));
    this.settings = this.settingsService.get();
    this.pages = _.range(1, this.slideServie.getMaxPage(this.settings) + 1);
  }

  getImages(): Array<HTMLImageElement> {
    const images = this.el.nativeElement.querySelectorAll('img');
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
