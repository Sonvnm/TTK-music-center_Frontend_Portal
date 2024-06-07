import { toDate } from 'src/app/shared/hmz-helper';
import { Router } from '@angular/router';
import {
  ITableColumn,
  EColumnType,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime } from 'src/app/shared/hmz-helper';
import { EScheduleStatus } from 'src/app/shared/enums';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';
import { scheduled } from 'rxjs';
import { CoursesConstant } from '../../courses.constant';

export class ScheduleConstant extends ApiConstant {
  static API = {
    GetAll: this.BASE_URL + '/Schedule/GetAll',
    GetSchedulesByUser: this.BASE_URL + '/Schedule/GetSchedulesByUser',
    GetSchedulesDetailByScheduleId:
      this.BASE_URL + '/ScheduleDetail/GetSchedulesDetailByScheduleId',
    GetById: this.BASE_URL + '/Schedule/GetById',
    Create: this.BASE_URL + '/Schedule/Create',
    Update: this.BASE_URL + '/Schedule/Update',
    Delete: this.BASE_URL + '/Schedule/Delete',

    GetAllDetail: this.BASE_URL + '/ScheduleDetail/GetAll',
    GetByIdDetail: this.BASE_URL + '/ScheduleDetail/GetById',
    CreateDetail: this.BASE_URL + '/ScheduleDetail/Create',
    DeleteDetail: this.BASE_URL + '/ScheduleDetail/Delete',
    UpdateDetail: this.BASE_URL + '/ScheduleDetail/Update',
  };

  static columns(dialog: MatDialog): ITableColumn[] {
    return [
      // {
      //   field: 'code',
      //   fieldName: 'Mã lịch học',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event(row) {
      //     const dialogRef = dialog.open(ScheduleDetailComponent, {
      //       width: CoursesConstant.DialogSize.VH120,
      //       data: row,
      //     });
      //     dialogRef.afterClosed().subscribe((result: any) => {});
      //   },
      // },
      {
        field: 'name',
        fieldName: 'Tên lịch học',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event(row) {
          const dialogRef = dialog.open(ScheduleDetailComponent, {
            width: CoursesConstant.DialogSize.VH120,
            data: row,
          });
          dialogRef.afterClosed().subscribe((result: any) => {});
        },
      },
      {
        field: 'className',
        fieldName: 'Lớp',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'startDate',
        fieldName: 'Ngày bắt đầu',
        type: EColumnType.Date,
        sort: true,
        filter: true,
        valueFormatter(row) {
          return toDate(row);
        },
      },
      {
        field: 'endDate',
        fieldName: 'Ngày kết thúc',
        type: EColumnType.Date,
        sort: true,
        filter: true,
        valueFormatter(row) {
          return toDate(row);
        },
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      // Default Columns
      {
        field: 'createdAt',
        fieldName: 'Common.Table.CreatedAt',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'createdBy',
        fieldName: 'Common.Table.CreatedBy',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      {
        field: 'updatedAt',
        fieldName: 'Ngày cập nhật',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'updatedBy',
        fieldName: 'Người cập nhật',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
    ];
  }

  static columnDetail(): ITableColumn[] {
    return [
      // {
      //   field: 'code',
      //   fieldName: 'Mã lịch dạy học',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event(row) {},
      // },
      {
        field: 'name',
        fieldName: 'Tên lịch dạy học',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'isMakeUpClass',
        fieldName: 'Học bù',
        type: EColumnType.Boolean,
        sort: true,
        filter: true,
      },
      {
        field: 'startTime',
        fieldName: 'Thời gian bắt đầu',
        type: EColumnType.Date,
        sort: true,
        filter: true,
        valueFormatter(row) {
          return toDateTime(row);
        },
      },
      {
        field: 'endTime',
        fieldName: 'Thời gian kết thúc',
        type: EColumnType.Date,
        sort: true,
        filter: true,
        valueFormatter(row) {
          return toDateTime(row);
        },
      },
      {
        field: 'roomName',
        fieldName: 'Phòng học',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      // Default Columns
      {
        field: 'createdAt',
        fieldName: 'Common.Table.CreatedAt',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'createdBy',
        fieldName: 'Common.Table.CreatedBy',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
    ];
  }
}
