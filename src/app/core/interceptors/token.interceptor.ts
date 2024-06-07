import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantCommon } from 'src/app/shared/constant-common';
import { AuthService } from 'src/app/views/pages/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem(ConstantCommon.LocalStorageKey.USER_LOGIN);
      localStorage.clear();
      this.router.navigate(['/auth/login']);
    }
    return next.handle(request);
  }
}
