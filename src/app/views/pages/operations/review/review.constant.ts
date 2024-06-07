import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  ITableColumn,
  EColumnType,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDate, toDateTime } from 'src/app/shared/hmz-helper';

export class ReviewConstant extends ApiConstant {
  static Review = {
    GetAll: this.BASE_URL + '/Review/GetAll',
    GetById: this.BASE_URL + '/Review/GetById',
    Create: this.BASE_URL + '/Review/Create',
    Update: this.BASE_URL + '/Review/Update',
    Delete: this.BASE_URL + '/Review/Delete',
  };

  static columns: ITableColumn[] = [
    // {
    //   field: 'code',
    //   fieldName: 'Mã đánh giá',
    //   type: EColumnType.Text,
    //   sort: true,
    //   filter: true,
    // },
    {
      field: 'userName',
      fieldName: 'Người đánh giá',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'courseName',
      fieldName: 'Khóa học',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'rating',
      fieldName: 'Xếp hạng',
      type: EColumnType.Number,
      sort: true,
      filter: true,
    },
    {
      field: 'comment',
      fieldName: 'Nhận xét',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },

    // Default Columns

    {
      field: 'createdAt',
      fieldName: 'Ngày đánh giá',
      type: EColumnType.DateTime,
      sort: true,
      filter: true,
      valueFormatter: (value: any) => {
        return toDate(value);
      },
    },
    // {
    //   field: 'updatedAt',
    //   fieldName: 'Common.Table.UpdatedAt',
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
