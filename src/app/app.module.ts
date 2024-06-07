import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './core/guard/auth.guard';
import { LayoutModule } from './views/layout/layout.module';

import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { IdentitiesComponent } from './views/pages/identities/identities.component';
import { OperationsComponent } from './views/pages/operations/operations.component';
import { SystemsComponent } from './views/pages/systems/systems.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './core/custom-paginator';
const COMPONENTS = [AppComponent, ErrorPageComponent, IdentitiesComponent];
const MODULES = [
  CommonModule,
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  SharedModule,
  LayoutModule,
];

const PROVIDERS = [
  AuthGuard,
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: {} },

  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'outline' },
  },
  {provide:MatPaginatorIntl,useClass:MatPaginatorIntlCro}
];

@NgModule({
  declarations: [...COMPONENTS, OperationsComponent, SystemsComponent],

  imports: [...MODULES, NgxPermissionsModule.forRoot()],
  exports: [...MODULES],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
