import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { ScheduleConstant } from '../schedule.constant';
import { ScheduleService } from '../schedule.service';
import { AddScheduleDetailComponent } from './add-schedule-detail/add-schedule-detail.component';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss'],
})
export class ScheduleDetailComponent implements OnInit {
  dataSave: any;
  item: any;

  columns: any;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };

  buttons: IButton[] = [
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.matDialogRef.close(),
      isShow: true,
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.edit(),
      disabled: true,
    },
    {
      id: EButtonType.Add,
      title: 'Thêm',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.add(),
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
    },
  ];

  title = 'Lịch học chi tiết';
  constructor(
    private service: ScheduleService,
    private toastService: ToastService,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matDialogRef: MatDialogRef<ScheduleDetailComponent>
  ) {
    this.columns = ScheduleConstant.columnDetail();
    this.hmzRequest.entity.scheduleId = this.dialogData.id;
    this.loadData(this.hmzRequest);
  }
  ngOnInit(): void {}

  loadSchedule() {
    this.service.getById(this.dialogData.id).subscribe((res) => {
      this.item = res.entity;
    });
  }

  loadData(request: IHMZRequest) {
    this.service.getAllDetailAsync(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }

  onRequest(e: any) {
    e.entity = {
      ...e.entity,
      scheduleId: this.dialogData.id,
    };
    this.loadData(e);
  }
  edit() {
    const dialogRef = this.dialog.open(AddScheduleDetailComponent, {
      width: ScheduleConstant.DialogSize.LARGE_XL,
      data: {
        title: 'Sửa lịch học chi tiết',
        item: this.listItemSelected[0],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0 || this.listItemSelected.length > 1,
      EButtonType.Edit,
      this.buttons
    );
  }

  add() {
    const dialogRef = this.dialog.open(AddScheduleDetailComponent, {
      width: ScheduleConstant.DialogSize.LARGE_XL,
      data: {
        scheduleId: this.dialogData.id,
        schedule: this.dialogData,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData(this.hmzRequest);
      }
    });
  }

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: ScheduleConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa lịch học',
        items: this.listItemSelected?.map((item: any) => item.name),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        const dataDelete = [
          ...this.listItemSelected.map((item: any) => item.id),
        ];
        this.service.deleteDetailAsync(dataDelete).subscribe((res) => {
          if (res.success) {
            this.toastService.success(res.message);
            this.loadData(this.hmzRequest);
          } else {
            this.toastService.error(res.errors);
          }
        });
      }
    });
  }
}
