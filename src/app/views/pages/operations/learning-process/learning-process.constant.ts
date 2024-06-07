import { MatDialog } from '@angular/material/dialog';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime } from 'src/app/shared/hmz-helper';
import { AddStudentProcessComponent } from './add-student-process/add-student-process.component';

export class LearningProcessConstant extends ApiConstant {
  static LearningProcess = {
    GetAll: this.BASE_URL + '/LearningProcess/GetAll',
    GetById: this.BASE_URL + '/LearningProcess/GetById',
    Create: this.BASE_URL + '/LearningProcess/Create',
    Update: this.BASE_URL + '/LearningProcess/Update',
    Delete: this.BASE_URL + '/LearningProcess/Delete',
    GetByUser: this.BASE_URL + '/LearningProcess/GetByUser',
    GetByUsername: this.BASE_URL + '/LearningProcess/GetByUsername',
    GetByUsernameForPaymentSalary: this.BASE_URL + '/LearningProcess/GetByUsernameForPaymentSalary',
  };

  static columns(dialog: MatDialog, func: () => void): ITableColumn[] {
    return [
      {
        field: 'className',
        fieldName: 'Lớp',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          dialog
            .open(AddStudentProcessComponent, {
              data: row,
              disableClose: true,
            })
            .afterClosed()
            .subscribe((res) => {

              if (res) {
                func();
              }
            });
        },
      },
      {
        field: 'courseName',
        fieldName: 'Khóa học',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      {
        field: 'status',
        fieldName: 'Trạng thái',
        type: EColumnType.Text,
        filter: false,
        sort: false,
        className: (row) => {
          return row == 'New'
            ? 'badge bg-primary'
            : row == 'Pending'
            ? 'badge bg-warning text-dark'
            : 'badge bg-success';
        },
      },
      // {
      //   field: 'code',
      //   fieldName: 'Mã',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event: (row: any) => {
      //     dialog.open(AddStudentProcessComponent, {
      //       data: row,
      //       width: LearningProcessConstant.DialogSize.VH150,
      //       disableClose: true,
      //     });
      //   },
      // },
      // {
      //   field: 'name',
      //   fieldName: 'Tên ngày học',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      // },
      {
        field: 'startTime',
        fieldName: 'Thời gian bắt đầu',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'endTime',
        fieldName: 'Thời gian kết thúc',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'assets',
        fieldName: 'Tài sản mượn',
        type: EColumnType.Text,
        sort: true,
        filter: true,
        width: '300px',
      },

      {
        field: 'username',
        fieldName: 'Giáo viên',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      // {
      //   field: 'scheduleCode',
      //   fieldName: 'Mã lịch học',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      // },

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
      // {
      //   field: 'updatedAt',
      //   fieldName: 'Common.Table.UpdatedA  t',
      //   type: EColumnType.DateTime,
      //   sort: true,
      //   filter: true,
      //   valueFormatter: (value: any) => {
      //     return toDateTime(value);
      //   },
      // },
      // {
      //   field: 'updatedBy',
      //   fieldName: 'Common.Table.UpdatedBy',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      // },
    ];
  }
  static columnsCalculateSalary(): ITableColumn[] {
    return [
      {
        field: 'courseName',
        fieldName: 'Khóa học',
        type: EColumnType.Text,
        filter: false,
        sort: false,
      },
      {
        field: 'className',
        fieldName: 'Lớp',
        type: EColumnType.Text,
        filter: false,
        sort: false,
      },

      {
        field: 'startTime',
        fieldName: 'Thời gian bắt đầu',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'endTime',
        fieldName: 'Thời gian kết thúc',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      // {
      //   field: 'assets',
      //   fieldName: 'Tài sản mượn',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      //   width: '300px',
      // },

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
    ];
  }
}
