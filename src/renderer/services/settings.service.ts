import { Injectable } from '@angular/core';
import Settings from './../../types/settings';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export default class SettingsService {
  private changedSource = new Subject<Settings>();
  changed$ = this.changedSource.asObservable();

  private createInitialSettings(): Settings {
    return {
      separator: {
        horizontalLine: true,
        h1: true,
        h2: true,
        h3: true,
        h4: false,
        h5: false,
        h6: false
      }
    };
  }

  public get(): Settings {
    const settings =  window.localStorage.getItem('settings');
    if (!settings) return this.createInitialSettings();
    return Object.assign({}, this.createInitialSettings(), JSON.parse(settings));
  }

  public save(settings: Settings) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    this.changedSource.next(Object.assign({}, this.createInitialSettings(), settings));
    return true;
  }
}