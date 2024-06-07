import { ApiConstant } from "src/app/shared/ApiConstant";
import { EColumnType, ITableColumn } from "src/app/shared/components/hmz-table/hmz-table.interface";

export class CalculateConstant extends ApiConstant {

  static User = {
    GetAll: this.BASE_URL + '/User/GetAll',
  };
  static PaymentSalary = {
    CalculateSalaryForTeacher: this.BASE_URL + '/PaymentSalary/CalculateSalaryForTeacher',
    PaymentSalaryForTeacher: this.BASE_URL + '/PaymentSalary/PaymentSalaryForTeacher',
  };

  static columns: ITableColumn[] = [
    {
      field: 'username',
      fieldName: 'Tên tài khoản',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'firstName',
      fieldName: 'Tên giảng viên',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },
    {
      field: 'lastName',
      fieldName: 'Họ giảng viên',
      type: EColumnType.Text,
      sort: true,
      filter: true,
    },

    {
      field: 'roles',
      fieldName: 'Chức vụ',
      type: EColumnType.Text,
      disabled: true,
    },
  ];
}
