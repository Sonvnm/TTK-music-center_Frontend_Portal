import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { LanguageService } from '../shared/services/language.service';
import { HandleErrorInterceptor } from './interceptors/handle-error.interceptor';
import { JWTInterceptor } from './interceptors/jwt.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

export function LanguageServiceFactory(languageService: LanguageService) {
  return () => languageService.load();
}
export const APP_HTTP_INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
];
export const APP_INITIALIZER_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: LanguageServiceFactory,
    deps: [LanguageService],
    multi: true,
  },
];
