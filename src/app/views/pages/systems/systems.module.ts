import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriesComponent } from './histories/histories.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'histories',
    loadChildren: () =>
      import('./histories/histories.module').then((m) => m.HistoriesModule),
  },
  {
    path: 'feedback',
    loadChildren: () =>
      import('./feedback/feedback.module').then((m) => m.FeedbackModule),
  },
];

@NgModule({
  declarations: [HistoriesComponent, FeedbackComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class SystemsModule {}
