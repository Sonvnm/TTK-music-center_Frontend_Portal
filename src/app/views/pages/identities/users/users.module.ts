import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'create',
    component: AddUserComponent,
  },
  {
    path: '',
    component: UsersComponent,
  },
];
@NgModule({
  declarations: [AddUserComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
