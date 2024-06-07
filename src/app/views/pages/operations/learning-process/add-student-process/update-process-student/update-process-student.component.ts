import { Component, Inject, OnInit } from '@angular/core';
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
import { StudentProcessService } from '../../../student-process/student-process.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { disableButton } from 'src/app/shared/hmz-helper';
import { ConstantCommon } from 'src/app/shared/constant-common';

@Component({
  selector: 'app-update-process-student',
  templateUrl: './update-process-student.component.html',
  styleUrls: ['./update-process-student.component.scss'],
})
export class UpdateProcessStudentComponent {
  dataSave: any;
  item: any = {};
  isUpdate = false;
  isSave = false;
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
      label: 'Mã',
      name: 'code',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Học viên',
      name: 'username',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Mã quá trình học',
      name: 'learningProcessCode',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Mô tả',
      name: 'description',
    },
    // vang mat
    {
      type: EMaterialFormFieldType.Checkbox,
      label: 'Vắng mặt',
      name: 'isAbsent',
    },
  ];

  title = 'Update Ngày Học Của Học Viên';
  constructor(
    public dialogRef: MatDialogRef<UpdateProcessStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: StudentProcessService,
    private hotToast: ToastService
  ) {
    this.title = data?.title ?? this.title;
    if (data?.item) {
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
  }

  closeDialog(): void {
    this.dialogRef.close({
      isSave: this.isSave,
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
    this.dataSave = e.value;
    this.dataSave.isAbsent = e.value.isAbsent != '' ? e.value.isAbsent : false;

    this.service
      .updateProcessStudentAsync(this.dataSave, this.item.id)
      .subscribe((res) => {
        if (res.success) {
          this.hotToast.success(res.message);
          this.isSave = true;
        } else {
          this.hotToast.error(res.errors);
        }
      });
  }
}
