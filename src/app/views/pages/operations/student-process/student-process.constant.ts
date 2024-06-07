import { MatDialog } from '@angular/material/dialog';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime } from 'src/app/shared/hmz-helper';

export class StudentProcessConstant extends ApiConstant {
  static StudentProcess = {
    GetAll: this.BASE_URL + '/StudentStudyProcess/GetAll',
    GetById: this.BASE_URL + '/StudentStudyProcess/GetById',
    Create: this.BASE_URL + '/StudentStudyProcess/Create',
    Creates: this.BASE_URL + '/StudentStudyProcess/CreateStudyProcesses',
    Update: this.BASE_URL + '/StudentStudyProcess/Update',
    Delete: this.BASE_URL + '/StudentStudyProcess/Delete',

    GetByLearningProcessId:
      this.BASE_URL + '/StudentStudyProcess/GetByLearningProcess',
    AutoAddAllStudent: this.BASE_URL + '/StudentStudyProcess/AutoAddAllStudent',
    UpdateProcessStudent:
      this.BASE_URL + '/StudentStudyProcess/UpdateProcessStudent',
  };

  static columns(dialog: MatDialog): ITableColumn[] {
    return [
      // {
      //   field: 'code',
      //   fieldName: 'Mã',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event: (row: any) => {},
      // },
      // {
      //   field: 'learningProcessCode',
      //   fieldName: 'Mã trình học',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      // },

      {
        field: 'username',
        fieldName: 'Học viên',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'isAbsent',
        fieldName: 'Vắng mặt',
        type: EColumnType.Boolean,
        sort: true,
        filter: true,
        options: [
          { value: null, label: 'Tất cả' },
          { value: true, label: 'Có' },
          { value: false, label: 'Không' },
        ],
      },
      // {
      //   field: 'isLate',
      //   fieldName: 'Đi trễ',
      //   type: EColumnType.Boolean,
      //   sort: true,
      //   filter: true,
      //   options: [
      //     { value: null, label: 'Tất cả' },
      //     { value: true, label: 'Có' },
      //     { value: false, label: 'Không' },
      //   ],
      // },
      {
        field: 'description',
        fieldName: 'Mô tả',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
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
        fieldName: 'Common.Table.UpdatedAt',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'updatedBy',
        fieldName: 'Common.Table.UpdatedBy',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      // Default Columns
    ];
  }
}
