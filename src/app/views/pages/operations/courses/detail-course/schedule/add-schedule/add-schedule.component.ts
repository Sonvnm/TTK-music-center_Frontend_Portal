import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { log } from 'console';
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
import { ClassesService } from '../../../../classes/classes.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss'],
})
export class AddScheduleComponent implements OnInit {
  item: any;
  isUpdate: boolean = false;
  isSave: boolean = false;
  buttons: IButton[] = [
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.matDialogRef.close(this.isSave),
      isShow: true,
    },
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => {},
      disabled: true,
    },
  ];

  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên lịch học',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Tên lịch học không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Select,
      label: 'Chọn lớp học',
      name: 'classId',
      validators: [Validators.required],
      errorMessages: {
        required: 'Vui lòng chọn lớp học',
      },
      options: [],
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày bắt đầu',
      name: 'startDate',
      validators: [Validators.required],
      errorMessages: {
        required: 'Ngày bắt đầu không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày kết thúc',
      name: 'endDate',
      validators: [Validators.required],
      errorMessages: {
        required: 'Ngày kết thúc không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Textarea,
      label: 'Mô tả',
      name: 'description',
    },
  ];
  title = 'Menu.Operations.Schedule.Create';

  constructor(
    private service: ScheduleService,
    private toastService: ToastService,
    private classService: ClassesService,

    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matDialogRef: MatDialogRef<AddScheduleComponent>
  ) {
    this.dialogData.title?.length > 0
      ? (this.title = this.dialogData.title)
      : null;
  }

  ngOnInit(): void {
    // set start date and end date to form
    console.log(this.dialogData);
    this.loadClasses();
    if (this.dialogData.item) {
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = this.dialogData.item;
    }

    const minDate = getLocalISOTime(new Date(this.dialogData.course.startDate));
    const maxDate = getLocalISOTime(new Date(this.dialogData.course.endDate));

    this.formFields.forEach((field) => {
      if (field.name === 'startDate') {
        field.value = minDate;
        field.min = minDate;
        field.max = maxDate;
      }
      if (field.name === 'endDate') {
        field.value = maxDate;
        field.min = minDate;
        field.max = maxDate;
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
    this.save(e);
  }
  save(e: any) {
    let dataSave: any;
    if (e?.valid) {
      dataSave = e.value;
    }
    dataSave.courseId = this.dialogData.course.id;
    dataSave.startDate = getLocalISOTime(e.value.startDate);
    dataSave.endDate = getLocalISOTime(e.value.endDate);
    dataSave.id = this.dialogData?.item?.id;

    this.isUpdate ? this.edit(dataSave) : this.add(dataSave);
  }

  loadClasses() {
    this.classService
      .getClassesByCourse(this.dialogData.course.id)
      .subscribe((res) => {
        this.formFields.forEach((field) => {
          if (field.name === 'classId') {
            field.options = res.items.map((room: any) => {
              return {
                id: room.id,
                value: room.id,
                label: room.name,
              };
            });
          }
        });
      });
  }
  add(data: any) {
    this.service.addAsync(data).subscribe((res) => {
      if (res.success) {
        this.toastService.success(res.message);
        this.matDialogRef.close(true)
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
  edit(data: any) {
    this.service.editAsync(data).subscribe((res) => {
      if (res.success) {
        this.toastService.success(res.message);
        this.isSave = true;
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
}
