import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { RouterModule } from '@angular/router';
import { PermissionComponent } from './permission.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes = [
  {
    path: 'create',
    component: AddPermissionComponent,
  },
  {
    path: '',
    component: PermissionComponent,
  },
];

@NgModule({
  declarations: [AddPermissionComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class PermissionModule {}
