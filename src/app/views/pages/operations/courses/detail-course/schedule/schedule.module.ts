import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { ScheduleComponent } from './schedule.component';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { AddScheduleDetailComponent } from './schedule-detail/add-schedule-detail/add-schedule-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
  },
  {
    path: 'create',
    component: ScheduleDetailComponent,
  },
  { path: 'update/:id', component: ScheduleDetailComponent },
];

@NgModule({
  declarations: [ScheduleDetailComponent, AddScheduleComponent, AddScheduleDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ScheduleModule {}
