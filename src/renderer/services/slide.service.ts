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
    _.some(this.getText().split('\n'), (text: string, index: number) => {
      if (text.match(regExp)) selectedPage++;
      return lineNo === index + 1;
    });
    return selectedPage;
  }

  private getPages(settings: Settings): string[] {
    const regExp = this.createPageBreakRegexp(settings);
    const pages: string[] = [];
    const target = this.getText().split('\n').reduce((p, c) => {
      const replaced = c.replace(regExp, (matched) => '---pagebreak---' + matched);
      return p + replaced + '\n';
    }, '');
    console.log(target);
    return target.split('---pagebreak---');
  }

  private createPageBreakRegexp(settings: Settings): RegExp {
    const cond = [];
    if (settings.separator.horizontalLine) cond.push('^---$');
    if (settings.separator.h1) cond.push('^#\\s');
    if (settings.separator.h2) cond.push('^##\\s');
    if (settings.separator.h3) cond.push('^###\\s');
    if (cond.length === 0) cond.push('^---$');
    console.log(`(${cond.join('|')})`);
    return new RegExp(`(${cond.join('|')})`);
  }
}
