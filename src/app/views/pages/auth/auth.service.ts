import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import { AuthConstant } from './auth.constant';
import { ConstantCommon } from 'src/app/shared/constant-common';
import { UsersService } from '../identities/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = new ReplaySubject<any>(1);
  private userLogin = new ReplaySubject<any>(1);
  userLogin$ = this.userLogin.asObservable();
  public currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient, private userService: UsersService) {
    // check token expired
    if (this.isTokenExpired()) {
      this.signOut();
    } else {
      const user = JSON.parse(
        localStorage.getItem(ConstantCommon.LocalStorageKey.USER_LOGIN) || '{}'
      );
      this.currentUser.next(user);
    }
  }

  signIn(user: any) {
    return this.http
      .post<any>(AuthConstant.Auth.login, user, ApiConstant.options)
      .pipe(
        map((res: any) => {
          if (res.success && res.entity) {
            const user: any = res.entity;
            if (user) {
              this.setUserSign(user);
              this.loadUserLogin();
            }
          }
          return res;
        })
      );
  }

  signUp(user: any) {
    return this.http
      .post<any>(AuthConstant.Auth.register, user, ApiConstant.options)
      .pipe(
        map((user: any) => {
          return user;
        })
      );
  }

  setUserSign(user: any) {
    const roles = this.getDecodedToken(user.token.accessToken || '')
      .role as string[];
    if (roles) {
      if (Array.isArray(roles)) {
        user.roles = roles;
      } else {
        user.roles = [roles];
      }
    }

    localStorage.setItem(
      ConstantCommon.LocalStorageKey.USER_LOGIN,
      JSON.stringify(user)
    );
    this.currentUser.next(user);
  }

  signOut() {
    localStorage.removeItem(ConstantCommon.LocalStorageKey.USER_LOGIN);
    this.currentUser.next(null as any);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // check token expired
  isTokenExpired(): boolean {
    // Check if the token has expired here 15 minutes
    const token = this.getToken() ?? null;
    if (!token) {
      return true;
    }
    const decoded = this.getDecodedToken(token);
    if (decoded.exp === undefined) {
      return false;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): any {
    // get token from local storage
    const user = localStorage.getItem(
      ConstantCommon.LocalStorageKey.USER_LOGIN
    );
    if (user) {
      const userPare: any = JSON.parse(user);
      if (userPare) {
        return userPare.token.accessToken;
      }
    } else {
      return null;
    }
  }

  loadUserLogin() {
    const user = localStorage.getItem(
      ConstantCommon.LocalStorageKey.USER_LOGIN
    );
    if (user) {
      const userPare: any = JSON.parse(user);
      if (userPare) {
        this.userService
          .getByUsername(userPare.username)
          .subscribe((res: any) => {
            if (res.success && res.entity) {
              const user: any = res.entity;
              if (user) {
                this.userLogin.next(user);
              }
            } else {
              this.signOut();
            }
          });
      }
    }
  }
  isRole(role: string | string[]) {
    const user = localStorage.getItem(
      ConstantCommon.LocalStorageKey.USER_LOGIN
    );
    if (user) {
      const userPare: any = JSON.parse(user);
      if (userPare) {
        return userPare.roles.some((x: any) => role.includes(x));
      }
    }
    return false;
  }
}
