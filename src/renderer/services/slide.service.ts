import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import Settings from '../../types/settings';

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
    const regExp = this.createPageBreakRegexp(settings);
    let selectedPage = 1;
    let foundFirstContents = false;
    _.some(this.getText().split('\n'), (text: string, index: number) => {
      if (foundFirstContents && text.match(regExp)) {
        selectedPage++;
      } 
      if (!text) foundFirstContents = true; // don't count until find first content, because remove first empty separator
      return lineNo === index + 1;
    });
    return selectedPage;
  }

  private getPages(settings: Settings): string[] {
    const regExp = this.createPageBreakRegexp(settings);
    const target = this.getText().split('\n').reduce((p, c) => {
      const replaced = c.replace(regExp, (matched) =>
        matched === '---' ? '---pagebreak---' : '---pagebreak---' + matched
      );
      return p + replaced + '\n';
    }, '');
    const pages = target.split('---pagebreak---');
    if (pages.length > 0 && !pages[0].replace('\n', '')) {
      pages.shift(); // remove first empty separator
    }
    return pages;
  }

  private createPageBreakRegexp(settings: Settings): RegExp {
    const cond = [];
    if (settings.separator.horizontalLine) cond.push('^---$');
    if (settings.separator.h1) cond.push('^#\\s');
    if (settings.separator.h2) cond.push('^##\\s');
    if (settings.separator.h3) cond.push('^###\\s');
    if (cond.length === 0) cond.push('^---$');
    return new RegExp(`(${cond.join('|')})`);
  }
}
