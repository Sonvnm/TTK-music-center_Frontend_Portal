import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HistoriesComponent } from './histories.component';
import { BankHistoryComponent } from './bank-history/bank-history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoriesComponent,
  },
  {
    path: 'audit',
    component: HistoriesComponent,
  },
  {
    path: 'banking',
    component: BankHistoryComponent,
  },
];

@NgModule({
  declarations: [BankHistoryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class HistoriesModule {}
