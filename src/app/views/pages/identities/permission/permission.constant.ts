import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';

import { datePipe, toDate, toDateTime } from 'src/app/shared/hmz-helper';

export class PermissionConstant extends ApiConstant {
  static Permission = {
    GetAll: this.BASE_URL + '/Permission/GetAll',
    GetById: this.BASE_URL + '/Permission/GetById',
    Create: this.BASE_URL + '/Permission/Create',
    Update: this.BASE_URL + '/Permission/Update',
    Delete: this.BASE_URL + '/Permission/Delete',

    GetNotInRoleCode: this.BASE_URL + '/Permission/GetNotInRole',
    AddPermissionsToRole: this.BASE_URL + '/Permission/AddPermissionsToRole',
  };

  static columns(): ITableColumn[] {
    return [
      {
        field: 'code',
        fieldName: 'Code',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'value',
        fieldName: 'Gía trị',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
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
