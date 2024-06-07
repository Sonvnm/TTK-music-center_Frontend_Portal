import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, delay } from 'rxjs';
import { ConstantCommon } from './shared/constant-common';
import { LoadingService } from './shared/services/loading.service';
import { SettingService } from './shared/services/setting.service';
import { AuthService } from './views/pages/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Music Center | Phần mềm quản lý trng tâm âm nhạc';
  isLoading: BehaviorSubject<boolean>;

  constructor(
    private translate: TranslateService,
    private settingService: SettingService,
    private authService: AuthService,
    private router: Router,
    public loadingService: LoadingService
  ) {}
  ngAfterViewInit(): void {
    this.isLoading = this.loadingService.isLoading$;
    console.log(this.isLoading);
  }
  // ngAfterViewChecked(): void {
  //   this.isLoading = this.loadingService.isLoading$;
  //   console.log(this.isLoading);
  // }

  ngOnInit(): void {
    const lang = localStorage.getItem('language') || 'vi-VN';
    if (lang) {
      this.translate.use(lang);
      this.settingService.setLanguage(lang);
    }
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user = localStorage.getItem(
      ConstantCommon.LocalStorageKey.USER_LOGIN
    );
    if (user) {
      const userPare: any = JSON.parse(user);
      if (userPare) {
        this.authService.setUserSign(userPare);
        this.authService.loadUserLogin();
      }
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
