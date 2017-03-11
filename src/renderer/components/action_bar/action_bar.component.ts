import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'action-bar',
  styles: [`
    .action {
      display: inline-block;
      text-align: center;
      margin-right: 100px;
    }
    .action-name {
      color: white;
    }
    .attach-balloon {
      position: relative;
    }
    .download-qiita-form {
      text-align: left;
      width: 400px;
      height: 200px;
      padding: 20px;
    }
  `],
  template: `
    <div class="action-bar">
      <div class="action">
        <button class="btn btn-large btn-default" (click)="clickStartButton()">
          <span class="icon icon-play"></span>
        </button>
        <div class="action-name">Play</div>
      </div>
      <div class="action">
        <balloon>
          <button #attachBalloon class="btn btn-large btn-default download-qiita-button" (click)="clickQiitaDownloadButton($event)">
            <span class="icon icon-play"></span>
          </button>
          <div class="action-name">Download from Qiita</div>
          <balloon-content class="qiita-balloon" [isOpen]="isOpenDownloadQiitaForm">
            <form class="download-qiita-form">
              <div class="form-group">
                <label>Article URL</label>
                <textarea class="form-control" rows="3"></textarea>
              </div>
              <button class="btn btn-primary">Download</button>
            </form>
          </balloon-content>
        </balloon>
      </div>
    </div>
    `,
})
export class ActionBar {
  private isOpenDownloadQiitaForm = false;
  private _handleClickApplicaton: any;

  constructor(private el: ElementRef) {
    this._handleClickApplicaton = this.handleClickApplication.bind(this);
  }

  ngOnInit() {
    document.addEventListener('click', this._handleClickApplicaton);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this._handleClickApplicaton);
  }

  handleClickApplication(e: MouseEvent) {
    if (!(e.target instanceof HTMLElement)) return;
    const quiitaContents: NodeList = this.el.nativeElement.querySelectorAll('.qiita-balloon, .download-qiita-button');
    let isClickedQuiitaContents = false;
    for (const node of quiitaContents) {
      if (node.contains(e.target)) {
        isClickedQuiitaContents = true;
        break;
      }
    }
    if (!isClickedQuiitaContents) this.isOpenDownloadQiitaForm = false;
  }

  clickQiitaDownloadButton(e: MouseEvent) {
    this.isOpenDownloadQiitaForm = !this.isOpenDownloadQiitaForm;
  }
}

