import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { DragDropImageComponent } from './components/drag-drop-image/drag-drop-image.component';
import { ImageDropDragDirective } from './directives/image-drop-drag.directive';

import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  DROPZONE_CONFIG,
  DropzoneConfigInterface,
  DropzoneModule,
} from 'ngx-dropzone-wrapper';
import { LightboxModule } from 'ngx-lightbox';
import { NgxPermissionsModule } from 'ngx-permissions';
import { environment } from 'src/environments/environment';
import {
  APP_HTTP_INTERCEPTORS,
  APP_INITIALIZER_PROVIDERS,
} from '../core/inittializers';
import { CommonConfirmDialogComponent } from './components/common-confirm-dialog/common-confirm-dialog.component';
import { HmzButtonsComponent } from './components/hmz-buttons/hmz-buttons.component';
import { DateRangePickerComponent } from './components/hmz-table/date-range-picker/date-range-picker.component';
import { HmzTableComponent } from './components/hmz-table/hmz-table.component';
import { NumberRangeComponent } from './components/hmz-table/number-range/number-range.component';
import { MatDynamicFormComponent } from './components/mat-dynamic-form/mat-dynamic-form.component';
import { ConstantCommon } from './constant-common';
import { MaterialModule } from './material.module';
import { ScheduleDayInWeekComponent } from './components/schedule-day-in-week/schedule-day-in-week.component';
import { CurrencyMaskDirective } from './directives/currency-mask.directive';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: environment.api + 'api/v1/Upload/UploadImage',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
  headers: {
    Authorization: 'Bearer ' + ConstantCommon.getAccessToken(),
  },
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const COMPONENTS: any[] = [
  HmzTableComponent,
  HmzButtonsComponent,
  NumberRangeComponent,
  DateRangePickerComponent,
  CommonConfirmDialogComponent,
  MatDynamicFormComponent,
  DragDropImageComponent,
  ScheduleDayInWeekComponent
];

const DIRECTIVES = [ImageDropDragDirective, CurrencyMaskDirective];
const MODULE = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  PerfectScrollbarModule,
  NgbDropdownModule,
  NgbTooltipModule,
  NgbNavModule,
  NgbCollapseModule,
  NgSelectModule,
  NgxDatatableModule,
  DropzoneModule,
  MaterialModule,
  NgxPermissionsModule,
  LightboxModule,
  QuillModule.forRoot(), // ngx-quill
  HotToastModule.forRoot({
    position: 'bottom-right',
    icon: '🔥',
    duration: 3000,
  }),
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
    defaultLanguage: localStorage.getItem('language') || 'vi-VN',
  }),
];

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY HH:mm:ss', // Input format
  },
  display: {
    dateInput: 'DD/MM/YYYY HH:mm:ss', // Input format
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULE],
  exports: [...MODULE, ...COMPONENTS],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
    ...APP_HTTP_INTERCEPTORS,
    ...APP_INITIALIZER_PROVIDERS,
  ],
})
export class SharedModule {}
