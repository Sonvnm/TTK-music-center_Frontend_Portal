import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';
import { BreadCrumb } from './breadcrumb';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  // Subject emitting the breadcrumb hierarchy
  private _breadcrumbs$ = new BehaviorSubject<BreadCrumb[]>([]);
  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    if (this.router.url !== '/') {
      this.createBreadcrumbLink(this.router);
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.createBreadcrumbLink(e);
      });
  }

  createBreadcrumbLink(route: Router) {
    // Split the URL at the '?' character and take the first part
    const url = this.router.url.split('?')[0];
    const routes = url
      .split('/')
      .filter((item) => item.length > 0)
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1));
    // routes to breadcrumb with translakey
    const data = routes.map((route, index) => {
      // toUpperCase first character route
      route = route.charAt(0).toUpperCase() + route.slice(1);
      const url = `/${routes.slice(0, index + 1).join('/')}`;

      if (index === 0) {
        return {
          label: route,
          translateKey: `Menu.${route}`,
          link: url,
          icon: 'fa fa-home',
        };
      }
      // check if route is of index 3
      if (index === 3 && routes.length >= 3) {
        let label = routes[3];
        return {
          label: label ?? '',
          translateKey: label ?? '',
          link: url,
          icon: 'fa fa-angle-right',
        };
      }
      // check if last route
      if (index === routes.length - 1) {
        let label = routes[index].split('.');
        let lastLabel = label[label.length - 1];

        return {
          label: lastLabel ?? '',
          translateKey: `Menu.${routes.splice(0, index + 1).join('.')}`,
          link: url,
          icon: 'fa fa-angle-right',
        };
      }

      return {
        label: route,
        translateKey: `Menu.${routes.slice(0, index + 1).join('.')}`,
        link: url,
        icon: 'fa fa-angle-right',
      };
    });
    this._breadcrumbs$.next(data);
  }
}
