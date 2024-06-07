import { ApiConstant } from "src/app/shared/ApiConstant";
import { EColumnType, ITableColumn } from "src/app/shared/components/hmz-table/hmz-table.interface";
import { EFeedBackStatus, ETypeFeedBackType } from "src/app/shared/enums";
import { toDateTime } from "src/app/shared/hmz-helper";

export class FeedBackConstant extends ApiConstant {
  static FeedBack = {
    GetAll: this.BASE_URL + '/FeedBack/GetAll',
    GetById: this.BASE_URL + '/FeedBack/GetById',
    GetByCode: this.BASE_URL + '/FeedBack/GetByCode',
    Create: this.BASE_URL + '/FeedBack/Create',
    Update: this.BASE_URL + '/FeedBack/Update',
    Delete: this.BASE_URL + '/FeedBack/Delete',

    Approve: this.BASE_URL + '/FeedBack/Approve',
    Reject: this.BASE_URL + '/FeedBack/Reject',
  };

  static columns: ITableColumn[] = [
    // {
    //   field: 'code',
    //   fieldName: 'Mã',
    //   type: EColumnType.Text,
    //   sort: true,
    //   filter: true,
    // },
    {
      field: 'title',
      fieldName: 'Tiêu đề',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'type',
      fieldName: 'Loại',
      type: EColumnType.Select,
      filter: true,
      multiple: false,
      options:[
        {value: ETypeFeedBackType.Error, label: 'Lỗi'},
        {value: ETypeFeedBackType.Report, label: 'Báo cáo'},
        {value: ETypeFeedBackType.Help, label: 'Trợ giúp'},
        {value: ETypeFeedBackType.Other, label: 'Khác'},
      ],
      value: null,
    },
    {
      field: 'username',
      fieldName: 'Người phản hồi',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'status',
      fieldName: 'Trạng thái',
      type: EColumnType.Select,
      filter: true,
      multiple: false,
      options:[
        {value: EFeedBackStatus.New, label: 'Mới'},
        {value: EFeedBackStatus.InProgress, label: 'Đang xử lý'},
        {value: EFeedBackStatus.Done, label: 'Hoàn thành'},
        {value: EFeedBackStatus.Canceled, label: 'Hủy bỏ'},
      ],
      value: null,
    },
    {
      field: 'description',
      fieldName: 'Mô tả',
      width: '200px',
      type: EColumnType.Link,
      event: (row: any) => {},
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
