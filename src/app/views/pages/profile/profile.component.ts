import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import {
  EMaterialFormFieldType,
  IMatFormField,
} from 'src/app/shared/components/mat-dynamic-form/mat-dynamic-form';
import { disableButton } from 'src/app/shared/hmz-helper';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../identities/users/users.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UsersConstant } from '../identities/users/users.constant';
import { PaymentSalaryComponent } from '../operations/caculate-salary/payment-salary/payment-salary.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private userServices: UsersService,
    private toastService: ToastService,
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.authService.loadUserLogin();
    this.authService.userLogin$.subscribe((user: any) => {
      this.item = user;
    });
  }
  dataSave: any;
  item: any = {};
  isUpdate = false;
  imageUpload: any;

  buttons: IButton[] = [
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => {},
      disabled: true,
    },
    {
      id: EButtonType.Add,
      title: 'Bảng tính lương',
      icon: EButtonIcon.Payment,
      style: EButtonMatStyle.Primary,
      click: () => this.payment(),
      isShow: this.authService.isRole('Teacher'),
    },
    {
      id: EButtonType.ChangePassword,
      title: 'Đổi mật khẩu',
      icon: EButtonIcon.Password,
      style: EButtonMatStyle.Primary,
      click: () => this.changePassword(),
    },
    // {
    //   id: EButtonType.Close,
    //   title: 'Common.Button.Close',
    //   icon: EButtonIcon.Close,
    //   style: EButtonMatStyle.Primary,
    //   click: () => this.loca,
    // },
  ];
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên chính',
      name: 'firstName',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
      errorMessages: {
        required: 'Yêu cầu nhập tên chính',
        minlength: 'First name must be at least 2 characters',
        maxlength: 'First name cannot be more than 50 characters',
      },
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên họ',
      name: 'lastName',
      validators: [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ],
      errorMessages: {
        required: 'Yêu cầu nhập tên họ ',
        minlength: 'First name must be at least 2 characters',
        maxlength: 'First name cannot be more than 50 characters',
      },
    },
    {
      type: EMaterialFormFieldType.Number,
      label: 'Số điện thoại',
      name: 'phoneNumber',
      validators: [Validators.required],
      errorMessages: {
        required: 'Số điện thoại là bắt buộc',
      },
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày sịnh nhật',
      name: 'dateOfBirth',
      validators: [Validators.required],
      errorMessages: {
        required: 'Sinh nhật là bắt buộc',
      },
      value: new Date(1990, 0, 1),
    },
    {
      type: EMaterialFormFieldType.DropZone,
      label: 'Ảnh cá nhân',
      name: 'image',
      dropZoneConfig: {
        config: {
          maxFiles: 1,
        },
        errorMessages: (e: any) => {
          this.toastService.error(e);
        },
        onUploadSuccess: (e: any) => {
          console.log(e);
          this.imageUpload = e[1] ?? '';
        },
        onRemove: (e: any) => {
          console.log(e);
          this.imageUpload = '';
        },
      },
    },
    {
      type: EMaterialFormFieldType.Select,
      label: 'Chức danh',
      options: [
        {
          id: 1,
          label: 'Admin',
          value: 'Admin',
        },
        {
          id: 2,
          label: 'Teacher',
          value: 'Teacher',
        },
        {
          id: 3,
          label: 'Member',
          value: 'Member',
        },
      ],
      name: 'roles',
      multiple: true,
      validators: [Validators.required],
      errorMessages: {},
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Email,
      label: 'Email',
      name: 'email',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên đăng nhập',
      name: 'username',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Mã người dùng',
      name: 'code',
      disabled: true,
    },
  ];
  title = 'Chỉnh sửa thông tin cá nhân';

  // set field disabled
  disableFields() {
    this.formFields.forEach((field) => {
      if (field.name === 'password') {
        field.validators = [];
      }
    });
  }

  loadAllRoles() {
    this.userServices.loadRoles({}).subscribe((res: any) => {
      if (res.success) {
        const roles = res.items.map((item: any) => {
          return {
            id: item.id,
            label: item.name,
            value: item.name,
          };
        });
        this.formFields.forEach((field) => {
          if (field.name === 'roles') {
            field.value = roles;
          }
        });
      }
    });
  }

  onFormChange(e: any) {
    if (e?.valid) {
      this.buttons.forEach((button) => {
        if (button.id === EButtonType.Save) {
          button.disabled = false;
          button.click = () => this.save(e);
        }
      });
    } else if (e?.invalid) {
      disableButton(true, EButtonType.Save, this.buttons);
    }
  }

  onFormSubmit(e: any) {
    this.buttons.forEach((button) => {
      if (button.id === EButtonType.Save) {
        button.disabled = false;
        button.click = () => this.save(e);
      }
    });
  }

  save(e: any) {
    if (this.imageUpload != null) {
      e.value.image = this.imageUpload?.url;
      e.value.publicId = this.imageUpload?.publicId;
    }

    if (e?.valid) {
      this.dataSave = e.value;
    }
    const data = {
      ...this.dataSave,
      id: this.item?.id,
    };
    this.update(data);
    return;
  }

  update(data: any) {
    this.userServices.editUser(data).subscribe((res: any) => {
      if (res.success) {
        this.toastService.success('Cập nhật thông tin cá nhân thành công !');

        this.router.navigate(['/profile']);
      } else {
        this.toastService.error(res.errors);
      }
    });
  }

  changePassword() {
    this.matDialog
      .open(ChangePasswordComponent, {
        data: {
          title: 'Đổi mật khẩu',
        },
        panelClass: 'hmz-dialog',
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res) => {
        res ? this.router.navigate(['/profile']) : '';
      });
  }
  payment() {
    this.matDialog.open(PaymentSalaryComponent, {
      width: UsersConstant.DialogSize.EXTRA_LARGE,
      data: {
        title: 'Bảng tính lương cho giảng viên ',
        user: this.item,
      },
      disableClose: true,
    });
  }
}
