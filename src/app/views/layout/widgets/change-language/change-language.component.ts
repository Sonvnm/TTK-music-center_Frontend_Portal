import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './lang-model';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
})
export class ChangeLanguageComponent implements OnInit {
  langs: Lang[] = [
    {
      code: 'vi-VN',
      icon: 'assets/images/flags/us.svg',
      name: 'English',
      isMain: false,
    },
    {
      code: 'vi-VN',
      icon: 'assets/images/flags/vn.svg',
      name: 'Tiếng Việt',
      isMain: false,
    },
  ];
  langMain?: Lang = this.langs.find((x) => x.code === 'vi-VN');
  constructor(
    private translate: TranslateService
  ) {
    this.translate.addLangs(['vi-VN', 'vi-VN']);
  }

 ngOnInit(): void {
    // check local storage
    const lang = localStorage.getItem('language');
    if (lang) {
      this.langMain = this.langs.find((x) => x.code === lang);
    }
  }

  changeLanguage(langCode: string) {
    //clear local storage language
    localStorage.removeItem('language');
   // this.translate.use(langCode);
    //this.settings.setLanguage(langCode);
    localStorage.setItem('language', langCode);
    // set language main
    //this.langMain = this.langs.find((x) => x.code === langCode);
    location.reload();
  }
}
