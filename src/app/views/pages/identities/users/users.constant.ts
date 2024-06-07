import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { datePipe, toDate, toDateTime } from 'src/app/shared/hmz-helper';

export class UsersConstant extends ApiConstant {
  static User = {
    GetAll: this.BASE_URL + '/User/GetAll',
    GetById: this.BASE_URL + '/User/GetById',
    Create: this.BASE_URL + '/User/Create',
    Update: this.BASE_URL + '/User/Update',
    Delete: this.BASE_URL + '/User/Delete',
    Export: this.BASE_URL + '/User/ExportExcel',
    GetByUsername: this.BASE_URL + '/User/GetByUsername',
    ChangePassword: this.BASE_URL + '/User/ChangePassword',
  };
  static Role = {
    GetAll: this.BASE_URL + '/Role/GetAll',
  };

  static columns: ITableColumn[] = [
    // {
    //   field: 'code',
    //   fieldName: 'Code',
    //   type: EColumnType.Text,
    //   sort: true,
    //   filter: true,
    // },
    {
      field: 'username',
      fieldName: 'Tên đăng nhập',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'email',
      fieldName: 'Email',
      type: EColumnType.Email,
      sort: true,
      filter: true,
    },
    {
      field: 'firstName',
      fieldName: 'Họ',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'lastName',
      fieldName: 'Tên đệm',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'image',
      fieldName: 'Hình đại diện',
      type: EColumnType.Image,
    },
    {
      field: 'dateOfBirth',
      fieldName: 'Ngày sinh nhật',
      type: EColumnType.Date,
      sort: true,
      filter: true,
      valueFormatter: (value: any) => {
        return toDate(value);
      },
    },

    {
      field: 'roles',
      fieldName: 'Vai trò',
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
