import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AddLearningProcessComponent } from './add-learning-process/add-learning-process.component';
import { LearningProcessConstant } from './learning-process.constant';
import { LearningProcessService } from './learning-process.service';

@Component({
  selector: 'app-learning-process',
  templateUrl: './learning-process.component.html',
  styleUrls: ['./learning-process.component.scss'],
})
export class LearningProcessComponent implements OnInit {
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  columns = LearningProcessConstant.columns(this.dialog, () =>
    this.loadData(this.hmzRequest)
  );
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];

  buttons: IButton[] = [
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
    },
    {
      id: EButtonType.Add,
      title: 'Common.Button.Add',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.add(),
    },
  ];
  years: number[];
  datas: any;

  constructor(
    private service: LearningProcessService,
    private dialog: MatDialog,
    private toastsService: ToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
    this.years = [moment().year() - 1, moment().year(), moment().year() + 1];
  }

  loadData(request: IHMZRequest) {
    this.service.getAllAsync(request).subscribe((res) => {
      this.data = createObservable(res);
    });
    this.service.getByUser().subscribe((res) => {
      if (res.success) {
        this.datas = res.items;
      }
    });
  }

  onRequest(e: IHMZRequest) {
    this.loadData(e);
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }

  add() {
    // open dialog
    const dialogRef = this.dialog.open(AddLearningProcessComponent, {
      data: {
        title: 'Menu.Operations.LearningProcess.Add',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: LearningProcessConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa quá trình dạy học',
        items: this.listItemSelected.map((x) => x.code),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service
          .deleteAsync(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.toastsService.success(res.message);
              this.loadData(this.hmzRequest);
            } else {
              this.toastsService.error(res.errors);
            }
          });
      }
    });
  }
}
