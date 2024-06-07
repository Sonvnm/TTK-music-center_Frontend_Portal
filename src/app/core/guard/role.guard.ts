import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ERoles } from 'src/app/shared/enums';
import { AuthService } from 'src/app/views/pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user: any): boolean => {
        if (
          user.roles?.includes(ERoles.Administrator) ||
          user.roles?.includes(ERoles.Moderator)
        ) {
          return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
      })
    );
  }
}
