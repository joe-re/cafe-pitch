import {Injectable} from 'angular2/core';
import * as _ from 'lodash';

@Injectable()
export class SlideService {
  private text = '';

  public setText(text: string): void {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public getPageText(pageNo: number): string {
    const pages = this.getPages();
    if (pages.length < pageNo || pageNo < 1) {
      return '';
    }
    return pages[pageNo - 1];
  }

  public getMaxPage(): number {
    return this.getPages().length;
  }

  public getPageNo(lineNo: number): number {
    let selectedPage = 1;
    _.some(this.getText().split('\n'), (text: string, index: number) => {
      if (text === '---') selectedPage++;
      return lineNo === index + 1;
    });
    return selectedPage;
  }

  private getPages(): string[] {
    return this.text.split('---');
  }
}
