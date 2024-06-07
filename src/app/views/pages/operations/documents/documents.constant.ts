import { ApiConstant } from "src/app/shared/ApiConstant";
import { EColumnType, ITableColumn } from "src/app/shared/components/hmz-table/hmz-table.interface";
import { toDateTime, toSize } from "src/app/shared/hmz-helper";

export class DocumentsConstant extends ApiConstant {
  static Document = {
    GetAll: this.BASE_URL + '/Document/GetAll',
    GetById: this.BASE_URL + '/Document/GetById',
    Create: this.BASE_URL + '/Document/Create',
    Update: this.BASE_URL + '/Document/Update',
    Delete: this.BASE_URL + '/Document/Delete',

    GetBySubject: this.BASE_URL + '/Document/GetBySubject',
    GetByClass: this.BASE_URL + '/Document/GetByClass',
    UploadDocument: this.BASE_URL + '/Document/UploadDocument',
    UploadDocumentForSubject: this.BASE_URL + '/Document/UploadDocumentForSubject',
  };

  static columns: ITableColumn[] = [

    {
      field: 'name',
      fieldName: 'Tên tài liệu',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },

    {
      field: 'fileSize',
      fieldName: 'Kích thước',
      type: EColumnType.Number,
      sort: true,
      filter: true,
      valueFormatter: (value: any) => {
        return toSize(value);
      }
    },
    {
      field: 'fileExtension',
      fieldName: 'Định dạng',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'filePath',
      fieldName: 'Đường dẫn',
      type: EColumnType.Link,
      sort: false,
      filter: false,
      width: '100px',
      event: (row: any) => {
        window.open(row.filePath, '_blank');
      }
    },

    {
      field: 'className',
      fieldName: 'Lớp học',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'subjectName',
      fieldName: 'Môn học',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'username',
      fieldName: 'Người tải lên',
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
    // {
    //   field: 'createdBy',
    //   fieldName: 'Common.Table.CreatedBy',
    //   type: EColumnType.Text,
    //   sort: true,
    //   filter: true,
    // },

  ];
}
