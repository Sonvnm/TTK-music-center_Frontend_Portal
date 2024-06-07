import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { BaseComponent } from './views/layout/base/base.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        canActivateChild: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/pages/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'identities',
        loadChildren: () =>
          import('./views/pages/identities/identities.module').then(
            (m) => m.IdentitiesModule
          ),
      },
      {
        path: 'operations',
        loadChildren: () =>
          import('./views/pages/operations/operations.module').then(
            (m) => m.OperationsModule
          ),
      },
      {
        path: 'systems',
        loadChildren: () =>
          import('./views/pages/systems/systems.module').then(
            (m) => m.SystemsModule
          ),
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },

  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
