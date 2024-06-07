import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize, take } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AuthService } from 'src/app/views/pages/auth/auth.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
      if (user) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token.accessToken}`,
          },
        });
      }
    });

    this.loadingService.isLoading$.next(true);
    return next
      .handle(request)
      .pipe(finalize(() => this.loadingService.isLoading$.next(false)));
  }
}
