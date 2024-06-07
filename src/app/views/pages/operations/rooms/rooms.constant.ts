import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime } from 'src/app/shared/hmz-helper';

export class RoomsConstant extends ApiConstant {
  static Room = {
    GetAll: this.BASE_URL + '/Room/GetAll',
    GetById: this.BASE_URL + '/Room/GetById',
    Create: this.BASE_URL + '/Room/Create',
    Update: this.BASE_URL + '/Room/Update',
    Delete: this.BASE_URL + '/Room/Delete',
  };

  static columns: ITableColumn[] = [
    {
      field: 'name',
      fieldName: 'Tên phòng',
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
