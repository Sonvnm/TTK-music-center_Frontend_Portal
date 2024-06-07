import { Router } from '@angular/router';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { datePipe, toDate, toDateTime } from 'src/app/shared/hmz-helper';

export class RoleConstant extends ApiConstant {
  static Role = {
    GetAll: this.BASE_URL + '/Role/GetAll',
    GetById: this.BASE_URL + '/Role/GetById',
    Create: this.BASE_URL + '/Role/Create',
    Update: this.BASE_URL + '/Role/Update',
    Delete: this.BASE_URL + '/Role/Delete',

    GetByCode: this.BASE_URL + '/Role/GetByCode',
  };
  static Permission = {
    GetByRoleName: this.BASE_URL + '/Permission/GetByRole',
    RemoveRolePermission: this.BASE_URL + '/Permission/RemoveRolePermission',
    GetNotInRoleCode: this.BASE_URL + '/Permission/GetNotInRole',
  };

  static columns(router: Router): ITableColumn[] {
    return [

      {
        field: 'name',
        fieldName: 'name',
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
          return toDate(value);
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

  static columnDetails(): ITableColumn[] {
    return [
      {
        field: 'code',
        fieldName: 'Code',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'key',
        fieldName: 'Key',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'value',
        fieldName: 'Giá trị',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },

      {
        field: 'description',
        fieldName: 'Description',
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
