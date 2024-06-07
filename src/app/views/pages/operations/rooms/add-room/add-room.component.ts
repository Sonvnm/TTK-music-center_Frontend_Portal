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
import { disableButton } from 'src/app/shared/hmz-helper';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss'],
})
export class AddRoomComponent {
  dataSave: any;
  item: any = {};
  isUpdate = false;
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
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên phòng',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Tên phòng không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Textarea,
      label: 'Mô tả',
      name: 'description',
    },
  ];
  title = 'Thêm phòng';
  constructor(
    public dialogRef: MatDialogRef<AddRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: RoomsService,
    private hotToast: ToastService
  ) {
    this.title = data?.title ?? this.title;
    if (data?.item) {
      this.disableFields();
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
  }

  // set field disabled
  disableFields() {
    //this.formFields.forEach((field) => {
    // email
    // if (field.name === 'email') {
    //   field.disabled = true;
    // }
    // password to not required
    //});
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
    this.save(e);
  }
  save(e: any) {
    if (e?.valid) {
      this.dataSave = e.value;
    }
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
    this.service.addAsync(data).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.hotToast.success('Đã thêm phòng thành công');
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
    this.service.editAsync(data).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.hotToast.success('Đã cập nhật phòng thành công');
        this.dialogRef.close({
          isSave: true,
        });
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }
}
