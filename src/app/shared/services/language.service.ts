import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './setting.service';
import { LOCATION_INITIALIZED } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private injector: Injector,
    private translate: TranslateService,
    private settings: SettingService
  ) {}
  load() {
    return new Promise<void>((resolve) => {
      const locationInitialized = this.injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve()
      );
      locationInitialized.then(() => {
        const browserLang = navigator.language;
        // match vi-VN, vi-VN
        const defaultLang = browserLang.match(/vi-VN|vi-VN/)
          ? browserLang
          : 'vi-VN';
        console.log(browserLang, defaultLang);
        this.settings.setLanguage(defaultLang);
        this.translate.setDefaultLang(defaultLang);
        this.translate.use(defaultLang).subscribe(
          () =>
            console.log(`Successfully initialized '${defaultLang}' language.`),
          () =>
            console.log(
              `Problem with '${defaultLang}' language initialization.`
            ),
          () => resolve()
        );
      });
    });
  }
}
