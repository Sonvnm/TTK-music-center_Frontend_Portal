import { Router } from '@angular/router';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime, toNumber } from 'src/app/shared/hmz-helper';

export class CoursesConstant extends ApiConstant {
  static Course = {
    GetAll: this.BASE_URL + '/Course/GetAll',
    GetSubjectCourse: this.BASE_URL + '/Course/GetAll/subjects',
    GetById: this.BASE_URL + '/Course/GetById',
    GetByCode: this.BASE_URL + '/Course/GetByCode',
    Create: this.BASE_URL + '/Course/Create',
    Update: this.BASE_URL + '/Course/Update',
    Delete: this.BASE_URL + '/Course/Delete',
    AddSubjectToCourse: this.BASE_URL + '/Course/AddSubjectToCourse',
    RemoveSubjectCourse: this.BASE_URL + '/Course/RemoveSubjectCourse',
  };

  static columns(router?: Router): ITableColumn[] {
    return [
      {
        field: 'name',
        fieldName: 'Tên khóa học',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event(row) {
          router?.navigate(['/operations/courses/update', row.id]);
        },
      },
      {
        field: 'price',
        fieldName: 'Giá',
        type: EColumnType.Number,
        sort: true,
        valueFormatter: (value: any) => {
          return toNumber(value);
        },
        filter: true,
      },
      {
        field: 'startDate',
        fieldName: 'Ngày bắt đầu',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'endDate',
        fieldName: 'Ngày kết thúc',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'image',
        fieldName: 'Hình ảnh',
        type: EColumnType.Image,
        sort: false,
        filter: false,
        event(row) {
          window.open(row.image, '_blank');
        },
      },
      {
        field: 'video',
        fieldName: 'Link Video',
        type: EColumnType.Link,
        sort: false,
        filter: false,
        event(row) {
          window.open(row.video, '_blank');
        },
      },
      {
        field: 'status',
        fieldName: 'Trạng thái',
        type: EColumnType.Boolean,
        sort: true,
        filter: true,
      },

      // Default Columns
      {
        field: 'createdAt',
        fieldName: 'Ngày tạo',
        type: EColumnType.DateTime,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toDateTime(value);
        },
      },
      {
        field: 'createdBy',
        fieldName: 'Người tạo',
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
}
