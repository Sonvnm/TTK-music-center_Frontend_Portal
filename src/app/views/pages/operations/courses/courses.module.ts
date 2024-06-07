import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { AddSubjectCourseComponent } from './detail-course/add-subject-course/add-subject-course.component';
import { DetailCourseComponent } from './detail-course/detail-course.component';
import { ScheduleComponent } from './detail-course/schedule/schedule.component';
const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'create',
    component: DetailCourseComponent,
  },
  {
    path: 'update',
    component: DetailCourseComponent,
  },
  {
    path: 'update/:id',
    component: DetailCourseComponent,
  },
  {
    path: 'schedule',
    loadChildren: () =>
      import('./detail-course/schedule/schedule.module').then(
        (m) => m.ScheduleModule
      ),
  },
];

@NgModule({
  declarations: [
    DetailCourseComponent,
    AddSubjectCourseComponent,
    ScheduleComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CoursesModule {}
