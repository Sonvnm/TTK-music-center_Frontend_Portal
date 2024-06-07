import { MatDialog } from '@angular/material/dialog';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { EOrderStatus } from 'src/app/shared/enums';
import { toDateTime, toNumber } from 'src/app/shared/hmz-helper';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { Router, RouterModule } from '@angular/router';

export class OrdersConstant extends ApiConstant {
  static Order = {
    GetAll: this.BASE_URL + '/Order/GetAll',
    GetById: this.BASE_URL + '/Order/GetById',
    GetByCode: this.BASE_URL + '/Order/GetByCode',
    Create: this.BASE_URL + '/Order/Create',
    Update: this.BASE_URL + '/Order/Update',
    Delete: this.BASE_URL + '/Order/Delete',

    UpdateStatus: this.BASE_URL + '/Order/UpdateStatus',
  };

  static columns(dialog: MatDialog, router: Router): ITableColumn[] {
    return [
      // {
      //   field: 'code',
      //   fieldName: 'Mã đơn hàng',
      //   type: EColumnType.Link,
      //   sort: true,
      //   filter: true,
      //   event(row) {
      //     router?.navigate(['operations/orders', row.code]);
      //   },
      // },
      {
        field: 'name',
        fieldName: 'Tên đơn hàng',
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
        field: 'totalPrice',
        fieldName: 'Tổng tiền',
        type: EColumnType.Number,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toNumber(value) + ' VNĐ';
        },
      },
      {
        field: 'username',
        fieldName: 'Người đặt',
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
        options: [
          { value: EOrderStatus.New, label: 'Mới' },
          { value: EOrderStatus.Pending, label: 'Chờ xác nhận' },
          { value: EOrderStatus.Canceled, label: 'Đã hủy' },
          { value: EOrderStatus.Done, label: 'Hoàn thành' },
        ],
        disabled: false,
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
        width: '200px',
        type: EColumnType.Text,
      },

      // Default Columns
      {
        field: 'createdAt',
        fieldName: 'Ngày đặt hàng',
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

  static columnsDetail(): ITableColumn[] {
    return [
      {
        field: 'code',
        fieldName: 'Mã đơn hàng',
        type: EColumnType.Link,
        sort: true,
        filter: true,
      },
      {
        field: 'name',
        fieldName: 'Tên đơn hàng',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      {
        field: 'totalPrice',
        fieldName: 'Tổng tiền',
        type: EColumnType.Number,
        sort: true,
        filter: true,
        valueFormatter: (value: any) => {
          return toNumber(value) + ' VNĐ';
        },
      },
      {
        field: 'username',
        fieldName: 'Người đặt',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'status',
        fieldName: 'Mô tả',
        type: EColumnType.Select,
        filter: true,
        multiple: false,
        options: [
          { value: EOrderStatus.New, label: 'Mới' },
          { value: EOrderStatus.Pending, label: 'Chờ xác nhận' },
          { value: EOrderStatus.Canceled, label: 'Đã hủy' },
          { value: EOrderStatus.Done, label: 'Hoàn thành' },
        ],
        disabled: false,
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
        width: '200px',
        type: EColumnType.Text,
      },

      // Default Columns
      {
        field: 'createdAt',
        fieldName: 'Ngày đặt hàng',
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
