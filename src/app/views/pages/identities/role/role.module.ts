import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RoleComponent } from './role.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { DetailRoleComponent } from './detail-role/detail-role.component';
import { AddRolePermissionComponent } from './detail-role/add-role-permission/add-role-permission.component';

const routes: any = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: 'detail/:code',
    component: DetailRoleComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    AddRoleComponent,
    DetailRoleComponent,
    AddRolePermissionComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class RoleModule {}
