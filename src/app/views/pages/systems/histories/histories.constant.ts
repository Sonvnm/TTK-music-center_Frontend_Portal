import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { ETypeHistory } from 'src/app/shared/enums';
import { toDate, toDateTime, toNumber } from 'src/app/shared/hmz-helper';

export class HistoriesConstant extends ApiConstant {
  static Room = {
    GetAll: this.BASE_URL + '/HistorySystem/GetAll',
    GetById: this.BASE_URL + '/HistorySystem/GetById',
    GetByCode: this.BASE_URL + '/HistorySystem/GetByCode',
    Create: this.BASE_URL + '/HistorySystem/Create',
    Update: this.BASE_URL + '/HistorySystem/Update',
    Delete: this.BASE_URL + '/HistorySystem/Delete',
  };

  static columns: ITableColumn[] = [
    {
      field: 'action',
      fieldName: 'Hành động',
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
      options: [
        { value: ETypeHistory.Create, label: 'Tạo mới' },
        { value: ETypeHistory.Update, label: 'Cập nhật' },
        { value: ETypeHistory.Delete, label: 'Xóa' },
        { value: ETypeHistory.Login, label: 'Đăng nhập' },
        { value: ETypeHistory.Logout, label: 'Đăng xuất' },
        { value: ETypeHistory.Error, label: 'Lỗi' },
        { value: ETypeHistory.Other, label: 'Khác' },
      ],
      disabled: false,
    },
    {
      field: 'price',
      fieldName: 'Chi phí',
      width: '200px',
      type: EColumnType.Number,
      valueFormatter: (row: any) => {
        return toNumber(row);
      },
    },
    {
      field: 'description',
      fieldName: 'Mô tả',
      width: '200px',
      type: EColumnType.Text,
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
  ];
}
