import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
import { UsersService } from '../../identities/users/users.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  dataSave: any;
  item: any = {};
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
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Primary,
      click: () => this.closeDialog(false),
    },
  ];

  title = '';
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private toastService: ToastService
  ) {
    this.title = data?.title ?? this.title;
  }
  ngOnInit(): void {}
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Password,
      label: 'Mật khẩu cũ',
      name: 'oldPassword',
      validators: [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
        ),
      ],
      errorMessages: {
        required: 'Mật khẩu cũ là bắt buộc',
        pattern:
          'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
      },
    },
    {
      type: EMaterialFormFieldType.Password,
      label: 'Mật khẩu mới',
      name: 'newPassword',
      validators: [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
        ),
      ],
      errorMessages: {
        required: 'Mật khẩu mới là bắt buộc',
        pattern:
          'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
      },
    },
    {
      type: EMaterialFormFieldType.Password,
      label: 'Nhập lại mật khẩu mới',
      name: 'confirmPassword',
      validators: [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
        ),
      ],
      errorMessages: {
        required: 'Mật khẩu nhập lại là bắt buộc',
        pattern:
          'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
      },
    },
  ];

  // set field disabled

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
  onFormChange(e: any) {
    console.log(e);
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
    this.save(e);
  }
  save(e: any) {
    if (e?.valid) {
      this.dataSave = e.value;
    }
    const data = {
      ...this.dataSave,
      email: JSON.parse(localStorage.getItem('user_login') ?? '').email,
      id: this.item?.id,
    };
    this.update(data);
    return;
  }

  update(data: any) {
    console.log(data);
    this.usersService.updatePassword(data).subscribe((res) => {
      if (res.success) {
        this.toastService.success('Cập nhật mật khẩu mới thành công !');
        this.closeDialog(true);
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
}
