import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/views/pages/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private authService: AuthService) {}
  canActivateChild(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        console.log(user);

        if (user && user.roles.includes('Admin')) return true;
        this.router.navigate(['/operations/review']);
        return false;
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (user) return true;
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}
