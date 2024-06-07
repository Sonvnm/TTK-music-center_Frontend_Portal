import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassComponent } from './add-class/add-class.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { DetailClassComponent } from './detail-class/detail-class.component';
import { AddStudentClassComponent } from './detail-class/add-student-class/add-student-class.component';
import { RoomChatComponent } from './detail-class/room-chat/room-chat.component';

const routes: Routes = [
  {
    path: '',
    component: ClassesComponent,
  },
  {
    path: 'detail',
    component: DetailClassComponent,
  },
  {
    path: 'detail/:code',
    component: DetailClassComponent,
  },
];

@NgModule({
  declarations: [
    AddClassComponent,
    DetailClassComponent,
    AddStudentClassComponent,
    RoomChatComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ClassesModule {}
