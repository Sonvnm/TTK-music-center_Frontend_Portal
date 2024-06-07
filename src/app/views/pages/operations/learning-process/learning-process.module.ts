import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LearningProcessComponent } from './learning-process.component';
import { AddLearningProcessComponent } from './add-learning-process/add-learning-process.component';
import { AddStudentProcessComponent } from './add-student-process/add-student-process.component';
import { UpdateProcessStudentComponent } from './add-student-process/update-process-student/update-process-student.component';

const routes: Routes = [
  {
    path: '',
    component: LearningProcessComponent
  }
];


@NgModule({
  declarations: [
    AddLearningProcessComponent,
    AddStudentProcessComponent,
    UpdateProcessStudentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LearningProcessModule { }
