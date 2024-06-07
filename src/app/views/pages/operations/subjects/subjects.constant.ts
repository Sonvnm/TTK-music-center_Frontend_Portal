import { Router } from '@angular/router';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime } from 'src/app/shared/hmz-helper';

export class SubjectsConstant extends ApiConstant {
  static Room = {
    GetAll: this.BASE_URL + '/Subject/GetAll',
    GetById: this.BASE_URL + '/Subject/GetById',
    Create: this.BASE_URL + '/Subject/Create',
    Update: this.BASE_URL + '/Subject/Update',
    Delete: this.BASE_URL + '/Subject/Delete',
  };

  static Subject = {
    getSubjectsForCourse: this.BASE_URL + '/Subject/GetSubjectsForCourse',
    GetByCode: this.BASE_URL + '/Subject/GetByCode',
  };

  static columns(router?: Router): ITableColumn[] {
    return [
      // {
      //   field: 'code',
      //   fieldName: 'Mã môn học',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event: (row: any) => {
      //     router?.navigate(['operations/subjects', row.code]);
      //   },
      // },
      {
        field: 'name',
        fieldName: 'Tên môn học',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          router?.navigate(['operations/subjects/detail', row.code]);
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
    ];
  }
}
