import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { AuthService } from 'src/app/views/pages/auth/auth.service';
import { CoursesConstant } from '../../courses.constant';
import { AddScheduleComponent } from './add-schedule/add-schedule.component';
import { ScheduleConstant } from './schedule.constant';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Input() course!: Observable<any>;
  courseObject: any;
  columns: any;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    // entity: {},
    sortColumns: [],
  };

  buttons: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'Common.Button.Add',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.add(),
      isShow: this.authService.isRole('Admin'),
      // click: () => this.add(),
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
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
      isShow: this.authService.isRole('Admin'),
    },
  ];

  constructor(
    private service: ScheduleService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.columns = ScheduleConstant.columns(this.dialog);
    this.course.subscribe((res) => {
      this.courseObject = res.entity;
      this.hmzRequest.entity = {
        courseId: this.courseObject.id,
      };
      this.loadData(this.hmzRequest);
    });
  }

  loadData(request: IHMZRequest) {
    this.service.getAllAsync(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }

  onRequest(e: any) {
    var query = {
      ...e,
      entity: { ...e.entity, courseId: this.courseObject.id },
    };

    this.loadData(query);
  }

  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Reject,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Approve,
      this.buttons
    );

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
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: CoursesConstant.DialogSize.LARGE_XL,
      data: {
        course: this.courseObject,
      },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  edit() {
    const dialogRef = this.dialog.open(AddScheduleComponent, {
      width: CoursesConstant.DialogSize.LARGE_XL,
      data: {
        title: 'Sửa lịch học',
        item: this.listItemSelected[0],
        course: this.listItemSelected[0].course,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  delete() {
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: '50vw',
      data: {
        title: 'Xóa lịch dạy',
        items: this.listItemSelected.map(
          (item: any) =>
            `Lịch học: ${item.name} - Ngày bắt đầu: ${moment(
              item.startDate
            ).format('DD-MM-YYYY')} - Ngày kết thúc: ${moment(
              item.endDate
            ).format('DD-MM-YYYY')}`
        ),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        const dataDelete = this.listItemSelected.map((item: any) => item.id);
        this.service.deleteAsync(dataDelete).subscribe((res) => {
          if (res.success) {
            this.hotToastService.success(res.message);
            this.loadData(this.hmzRequest);
          } else {
            this.hotToastService.error(res.errors);
          }
        });
      }
    });
  }

  getWeeks(month: any) {
    console.log(month);

    console.log(month.day());
  }
}
