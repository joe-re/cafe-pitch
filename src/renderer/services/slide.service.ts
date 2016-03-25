import {Injectable} from 'angular2/core';

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

  private getPages(): string[] {
    return this.text.split('===');
  }
}
