import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsComponent } from './rooms.component';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
];

@NgModule({
  declarations: [AddRoomComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class RoomsModule {}
