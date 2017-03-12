import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { QiitaService } from './../../services/qiita.service';

@Component({
  selector: 'qiita-download-action',
  styles: [`
    .attach-balloon {
      position: relative;
    }
    .download-qiita-form {
      text-align: left;
      width: 400px;
      height: 200px;
      padding: 20px;
    }
    .qiita-url-textarea {
      resize: none;
    }
    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .error { color: red; }
  `],
  template: `
    <div class="action">
      <balloon>
        <button #attachBalloon class="btn btn-large btn-default  action-button download-qiita-button" (click)="clickQiitaDownloadButton($event)">
          <span class="icon icon-play"></span>
        </button>
        <div class="action-name">Download from Qiita</div>
        <balloon-content class="qiita-balloon" [isOpen]="isOpenDownloadQiitaForm" >
          <form class="download-qiita-form" (ngSubmit)="submitQiitaDownloadForm()">
            <div class="form-group">
              <label>Article URL</label>
              <textarea
                class="form-control qiita-url-textarea"
                rows="3"
                [(ngModel)]="qiitaUrl"
                [ngModelOptions]="{standalone: true}"
              >
              </textarea>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="isDisabledToSubmit()">Download</button>
            <span class="error" *ngIf="isError">Failed to download Qiita article.</span>
          </form>
        </balloon-content>
      </balloon>
     </div>
    `,
  providers: [QiitaService],
  styleUrls: ['./components/action_bar/action.css']
})
export default class QiitaDownloadAction {
  @Output('changeText') changeText = new EventEmitter();
  private isOpenDownloadQiitaForm = false;
  private _handleClickApplicaton: any;
  private qiitaUrl = '';
  private isLoading = false;
  private isError = false;

  constructor(private el: ElementRef, private qiitaService: QiitaService) {
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

  submitQiitaDownloadForm(e: MouseEvent) {
    this.isLoading = true;
    this.isError = false;
    this.qiitaService.get(this.qiitaUrl)
      .finally(() => this.isLoading = false)
      .subscribe(
        result => {
          console.log(result.raw_body);
          this.changeText.emit(result.raw_body);
          this.isOpenDownloadQiitaForm = false;
          this.qiitaUrl = '';
        },
        error => {
          console.log(error);
          this.isError = true;
        },
      )
  }

  isDisabledToSubmit() {
    return this.isLoading || !this.qiitaUrl;
  }
}
