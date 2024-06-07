import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, SETTING_DEFAULT } from 'src/app/core/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private options = SETTING_DEFAULT;
  private notify$ = new BehaviorSubject<any>({});
  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }

  setOptions(options: AppSettings) {
    this.options = { ...this.options, ...options };
    this.notify$.next(this.options);
  }
  getOptions(): AppSettings {
    return this.options;
  }
  get language() {
    return this.options.language;
  }
  setLanguage(language: string) {
    this.options.language = language;
    this.notify$.next({ language });
  }
}
