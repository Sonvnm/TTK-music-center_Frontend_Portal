import { Component, Inject } from '@angular/core';
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
import { disableButton, getLocalISOTime } from 'src/app/shared/hmz-helper';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
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
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Primary,
      click: () => this.closeDialog(),
    },
  ];
  formFields: IMatFormField[];
  title = 'Thêm mới người dùng';
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userServices: UsersService,
    private hotToast: ToastService
  ) {
    this.formFields = [
      {
        type: EMaterialFormFieldType.Email,
        label: 'Email',
        name: 'email',
        validators: [Validators.required, Validators.email],
        errorMessages: {
          required: 'Yêu cầu thư điện tử',
          email: 'Sai định dạng email',
        },
      },
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
          required: 'First name is required',
          minlength: 'First name must be at least 2 characters',
          maxlength: 'First name cannot be more than 50 characters',
        },
      },
      {
        type: EMaterialFormFieldType.Text,
        label: 'Họ và tên đệm',
        name: 'lastName',
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
        errorMessages: {
          required: 'Tên là bắt buộc',
          minlength: 'Tên phải có ít nhất 2 ký tự',
          maxlength: 'Tên không được quá 50 ký tự',
        },
      },
      {
        type: EMaterialFormFieldType.Number,
        label: 'Số diện thoại',
        name: 'phoneNumber',
      },
      {
        type: EMaterialFormFieldType.Password,
        label: 'Mật khẩu',
        name: 'password',
        validators: [
          Validators.required,
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
          ),
        ],
        errorMessages: {
          required: 'Mật khẩu là bắt buộc',
          pattern:
            'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt',
        },
      },
      {
        type: EMaterialFormFieldType.DropZone,
        label: 'Hình ảnh đại diện',
        name: 'imageUpload',
        dropZoneConfig: {
          config: {
            maxFiles: 1,
          },
          errorMessages: (e: any) => {
            this.hotToast.error(e);
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
        type: EMaterialFormFieldType.Image,
        label: 'Hình đại diện',
        name: 'image',
      },
      {
        type: EMaterialFormFieldType.Date,
        label: 'Ngày sinh',
        name: 'dateOfBirth',
        validators: [Validators.required],
        errorMessages: {
          required: 'Sinh nhật là bắt buộc',
        },
        value: new Date(1990, 0, 1),
      },
      {
        type: EMaterialFormFieldType.Checkbox,
        label: 'Hoạt động',
        value: true,
        name: 'isActive',
        validators: [],
        errorMessages: {},
      },
      {
        type: EMaterialFormFieldType.Select,
        label: 'Vai trò',
        options: [
          {
            id: 1,
            label: 'Admin',
            value: 'Admin',
          },
          {
            id: 2,
            label: 'Giảng viên',
            value: 'Teacher',
          },
          {
            id: 3,
            label: 'Sinh viên',
            value: 'Member',
          },
        ],
        name: 'roles',
        multiple: true,
        validators: [Validators.required],
        errorMessages: {},
      },
    ];
    this.title = data?.title ?? this.title;
    this.loadAllRoles();
    if (data?.item) {
      this.disableFields();
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
  }

  // set field disabled
  disableFields() {
    this.formFields.forEach((field) => {
      if (field.name === 'password') {
        field.disabled = true;
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

  closeDialog(): void {
    this.dialogRef.close({
      isSave: false,
    });
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
    this.buttons.forEach((button) => {
      if (button.id === EButtonType.Save) {
        button.disabled = false;
        button.click = () => this.save(e);
      }
    });
  }

  save(e: any) {
    if (this.imageUpload) {
      e.value.image = this.imageUpload?.url;
      e.value.publicId = this.imageUpload?.publicId;
    }

    if (e?.valid) {
      this.dataSave = e.value;
    }
    this.dataSave.dateOfBirth = getLocalISOTime(this.dataSave.dateOfBirth);

    if (this.isUpdate) {
      const data = {
        ...this.dataSave,
        id: this.item?.id,
      };
      this.update(data);
      return;
    }
    this.add(this.dataSave);
  }
  add(data: any) {
    this.userServices.addUser(data).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.hotToast.success(res.message);
        this.dialogRef.close({
          isSave: true,
        });
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }

  update(data: any) {
    console.log(data);
    this.userServices.editUser(data).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        this.hotToast.success('Cập nhật thông tin người dùng thành công ');
        this.dialogRef.close({
          isSave: true,
        });
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }
}
