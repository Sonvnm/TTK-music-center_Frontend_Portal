import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent,
  },
  {
    path: ':code',
    component: OrdersDetailComponent,
  },
];

@NgModule({
  declarations: [OrdersDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class OrdersModule {}
