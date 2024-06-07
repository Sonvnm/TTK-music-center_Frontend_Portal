import { Router } from '@angular/router';
import { ApiConstant } from 'src/app/shared/ApiConstant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { toDateTime, toSize } from 'src/app/shared/hmz-helper';
import { AuthService } from '../../auth/auth.service';

export class ClassesConstant extends ApiConstant {
  static Class = {
    GetAll: this.BASE_URL + '/Class/GetAll',
    GetByCode: this.BASE_URL + '/Class/GetByCode',
    GetClassesByCourse: this.BASE_URL + '/Class/GetClassesByCourse',
    GetStudentsClassByClassId: this.BASE_URL + '/Class/GetStudentsClassByClassId',
    GetById: this.BASE_URL + '/Class/GetById',
    Create: this.BASE_URL + '/Class/Create',
    Update: this.BASE_URL + '/Class/Update',
    Delete: this.BASE_URL + '/Class/Delete',
    RemoveStudentFromClass: this.BASE_URL + '/Class/RemoveStudentClass',
    GetStudentByClass: this.BASE_URL + '/Class/GetStudentByClass',
    GetStudentNotInClass: this.BASE_URL + '/Class/GetStudentNotInClass',
    GetTeacherNotInClass: this.BASE_URL + '/Class/GetTeacherNotInClass',
    AddStudentToClass: this.BASE_URL + '/Class/AddStudentToClass',
    DeleteDocumentsFromClass: this.BASE_URL + '/Class/DeleteDocumentsFromClass',
  };

  static columns(router?: Router): ITableColumn[] {
    return [
      {
        field: 'name',
        fieldName: 'Tên lớp',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          router?.navigate(['operations/classes/detail', row.code]);
        },
      },

      {
        field: 'description',
        fieldName: 'Mô tả',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'courseName',
        fieldName: 'Tên khóa học',
        type: EColumnType.Text,
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

  static columnStudentClass(authService?: AuthService): ITableColumn[] {
    return [
      {
        field: 'code',
        fieldName: 'Mã học viên',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'roleName',
        fieldName: 'Vai trò',
        type: EColumnType.Text,
        sort: false,
        filter: false,
        className: (row) => {
          return row == 'Teacher'
            ? 'badge badge-success'
            : 'badge badge-primary';
        },
      },
      {
        field: 'firstName',
        fieldName: 'Tên học viên',
        type: EColumnType.Text,
        sort: false,
        filter: false,
      },
      {
        field: 'lastName',
        fieldName: 'Họ học viên',
        type: EColumnType.Text,
        sort: false,
        filter: false,
      },
      {
        field: 'email',
        fieldName: 'Email',
        type: EColumnType.Text,
        sort: false,
        filter: false,
      },


    ];
  }

  static columnDocument(router?: Router): ITableColumn[] {
    return [
      {
        field: 'name',
        fieldName: 'Tên tài liệu',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          window.open(row.filePath, '_blank');
        },
      },
      {
        field: 'className',
        fieldName: 'Lớp',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'subjectName',
        fieldName: 'Môn',
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
        valueFormatter(row) {
          return toSize(row);
        },
      },
      {
        field: 'fileExtension',
        fieldName: 'Định dạng',
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
    ];
  }

  static columnDocumentsSubject(router?: Router): ITableColumn[] {
    return [
      {
        field: 'name',
        fieldName: 'Tên tài liệu',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          window.open(row.filePath, '_blank');
        },
      },

      // {
      //   field: 'subjectName',
      //   fieldName: 'Môn',
      //   type: EColumnType.Text,
      //   sort: true,
      //   filter: true,
      // },

      {
        field: 'fileSize',
        fieldName: 'Kích thước',
        type: EColumnType.Number,
        sort: true,
        filter: true,
        valueFormatter(row) {
          return toSize(row);
        },
      },
      {
        field: 'fileExtension',
        fieldName: 'Định dạng',
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
    ];
  }
  static columnSubjectDoucment(router?: Router): ITableColumn[] {
    return [
      {
        field: 'code',
        fieldName: 'Mã tài liệu',
        type: EColumnType.Text,
        sort: true,
        filter: true,
      },
      {
        field: 'name',
        fieldName: 'Tên tài liệu',
        type: EColumnType.Link,
        sort: true,
        filter: true,
        event: (row: any) => {
          window.open(row.filePath, '_blank');
        },
      },
      {
        field: 'description',
        fieldName: 'Mô tả',
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
        valueFormatter(row) {
          return toSize(row);
        },
      },
      {
        field: 'fileExtension',
        fieldName: 'Định dạng',
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
    ];
  }
}
