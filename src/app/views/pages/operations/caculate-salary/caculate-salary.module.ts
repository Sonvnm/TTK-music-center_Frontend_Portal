import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CaculateSalaryComponent } from './caculate-salary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentSalaryComponent } from './payment-salary/payment-salary.component';

const routes: Routes = [
  {
    path: '',
    component: CaculateSalaryComponent,
  },
];

@NgModule({
  declarations: [
    PaymentSalaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CaculateSalaryModule { }
