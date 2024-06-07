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
import { CoursesService } from '../../courses/courses.service';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent {
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

  title = 'Thêm mới lớp học';
  constructor(
    public dialogRef: MatDialogRef<AddClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClassesService,
    private courseService: CoursesService,
    private hotToast: ToastService
  ) {
    this.title = data?.title ?? this.title;
    if (data?.item) {
      console.log(data.item);
      this.disableFields();
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
    this.loadCourse();
  }
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên lớp học',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Tên lớp học không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Textarea,
      label: 'Mô tả lớp học',
      name: 'description',
    },
    {
      type: EMaterialFormFieldType.Select,
      label: 'Khóa học',
      name: 'courseId',
      validators: [Validators.required],
      errorMessages: {
        required: 'Khóa học không được để trống',
      },
      options: [],
      value: this.item?.courseId,
    },
  ];

  loadCourse() {
    this.courseService.getAllAsync({}).subscribe((res) => {
      if (res.success) {
        this.formFields.forEach((field: IMatFormField) => {
          if (field.name === 'courseId') {
            field.options = res.items.map((item: any) => ({
              label: item.name,
              value: item.id,
            }));
          }
        });
      }
    });
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
    this.service.editAsync(data).subscribe((res) => {
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
}
