import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaculateSalaryComponent } from './caculate-salary/caculate-salary.component';
import { ClassesComponent } from './classes/classes.component';
import { CoursesComponent } from './courses/courses.component';
import { DocumentsComponent } from './documents/documents.component';
import { LearningProcessComponent } from './learning-process/learning-process.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewComponent } from './review/review.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StudentProcessComponent } from './student-process/student-process.component';
import { SubjectsComponent } from './subjects/subjects.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rooms',
    pathMatch: 'full',
  },
  {
    path: 'rooms',
    loadChildren: () =>
      import('./rooms/rooms.module').then((m) => m.RoomsModule),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/subjects.module').then((m) => m.SubjectsModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.module').then((m) => m.CoursesModule),
  },
  {
    path: 'classes',
    loadChildren: () =>
      import('./classes/classes.module').then((m) => m.ClassesModule),
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./documents/documents.module').then((m) => m.DocumentsModule),
  },
  {
    path: 'learning-process',
    loadChildren: () =>
      import('./learning-process/learning-process.module').then(
        (m) => m.LearningProcessModule
      ),
  },
  {
    path: 'student-process',
    loadChildren: () =>
      import('./student-process/student-process.module').then(
        (m) => m.StudentProcessModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'review',
    loadChildren: () =>
      import('./review/review.module').then((m) => m.ReviewModule),
  },
  {
    path: 'caculate-salary',
    loadChildren: () =>
      import('./caculate-salary/caculate-salary.module').then(
        (m) => m.CaculateSalaryModule
      ),
  },
];

@NgModule({
  declarations: [
    RoomsComponent,
    SubjectsComponent,
    CoursesComponent,
    ClassesComponent,
    DocumentsComponent,
    LearningProcessComponent,
    StudentProcessComponent,
    OrdersComponent,
    CaculateSalaryComponent,
    ReviewComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class OperationsModule {}
