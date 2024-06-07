import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentProcessComponent } from './student-process.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentProcessComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class StudentProcessModule {}
