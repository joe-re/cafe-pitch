import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import Settings from '../../types/settings';
import lex from '../utils/lex';

@Injectable()
export class SlideService {
  private text = '';

  public setText(text: string): void {
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public getPageText(pageNo: number, settings: Settings): string {
    const pages = this.getPages(settings);
    if (pages.length < pageNo || pageNo < 1) {
      return '';
    }
    return pages[pageNo - 1];
  }

  public getMaxPage(settings: Settings): number {
    return this.getPages(settings).length;
  }

  public getPageNo(lineNo: number, settings: Settings): number {
    const lines = lex(this.getText(), settings);
    let selectedPage = 1;
    _.some(lines, (line, index: number) => {
      if (line.break) selectedPage++;
      return lineNo === index + 1;
    });
    return selectedPage;
  }

  private getPages(settings: Settings): string[] {
    const lines = lex(this.getText(), settings);
    console.log(lines);
    const pages: string[] = [];
    let page = '';
    lines.forEach(line => {
      if (line.type === 'heading' || line.type === 'hr') {
        if (line.break) {
          pages.push(page);
          page = '';
        }
      }
      page += line.text;
    });
    if (page) pages.push(page);
    return pages;
  }
}
