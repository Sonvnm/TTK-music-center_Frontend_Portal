import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubjectsComponent } from './subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SubjectsComponent,
  },
  {
    path: 'detail/:code',
    component: SubjectDetailComponent,
  },

];

@NgModule({
  declarations: [AddSubjectComponent, SubjectDetailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class SubjectsModule {}
