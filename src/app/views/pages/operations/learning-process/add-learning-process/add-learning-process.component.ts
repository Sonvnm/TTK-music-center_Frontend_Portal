import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { disableButton, toDate, toDateTime } from 'src/app/shared/hmz-helper';
import { LearningProcessService } from '../learning-process.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {
  EMaterialFormFieldType,
  IMatFormField,
  IOption,
} from 'src/app/shared/components/mat-dynamic-form/mat-dynamic-form';
import { Validators } from '@angular/forms';
import { ScheduleService } from '../../courses/detail-course/schedule/schedule.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-add-learning-process',
  templateUrl: './add-learning-process.component.html',
  styleUrls: ['./add-learning-process.component.scss'],
})
export class AddLearningProcessComponent {
  dataSave: any;
  item: any = {};
  isUpdate = false;
  schedules: any;
  schedulesDetail: any;
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
      type: EMaterialFormFieldType.Select,
      label: 'Lịch dạy',
      name: 'scheduleId',
      validators: [Validators.required],
      errorMessages: {
        required: 'Lịch dạy không được để trống',
      },
      options: [],
      action: this.onSelectSchedule(),
    },
    {
      type: EMaterialFormFieldType.Select,
      label: 'Lịch dạy chi tiết',
      name: 'scheduleDetailId',
      validators: [Validators.required],
      errorMessages: {
        required: 'Lịch dạy chi tiết không được để trống',
      },
      options: [],
    },
    // {
    //   type: EMaterialFormFieldType.Select,
    //   label: 'Lịch học',
    //   name: 'scheduleId',
    //   validators: [Validators.required],
    //   errorMessages: {
    //     required: 'Lịch học không được để trống',
    //   },
    //   multiple: true,
    //   options: [],
    //   disabled: true,
    // },

    {
      type: EMaterialFormFieldType.Text,
      label: 'Mô tả',
      name: 'description',
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tài sản mượn',
      name: 'assets',
    },
  ];

  title = 'Thêm mới lịch học';
  isGetSchedulesDetail: any;
  constructor(
    public dialogRef: MatDialogRef<AddLearningProcessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: LearningProcessService,
    private hotToast: ToastService,
    private scheduleService: ScheduleService,
    private authService: AuthService
  ) {
    this.title = data?.title ?? this.title;
    if (data?.item) {
      this.disableFields();
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
    this.loadSchedule();
  }

  loadSchedule() {
    this.scheduleService.getSchedulesByUser().subscribe((res) => {
      if (res.success) {
        this.formFields.forEach((field: IMatFormField) => {
          if (field.name === 'scheduleId') {
            field.options = res.items.map(
              (item: any): IOption => ({
                label:
                  item.course.name +
                  ' - ' +
                  toDate(item.startDate) +
                  ' - ' +
                  toDate(item.endDate),
                value: item.id,
                id: item.id,
              })
            );
          }
        });
      }
    });
  }

  // set field disabled
  disableFields() {
    this.formFields.forEach((field) => {
      if (field.name === 'scheduleId') {
        field.disabled = true;
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close({
      isSave: false,
    });
  }

  getSchedulesDetailByScheduleId(scheduleId: string) {
    this.scheduleService
      .getSchedulesDetailByScheduleId(scheduleId)
      .subscribe((res) => {
        if (res.success) {
          this.formFields.forEach((field: IMatFormField) => {
            if (field.name === 'scheduleDetailId') {
              field.disabled = true;
              field.options = res.items.map(
                (item: any): IOption => ({
                  label:
                    item.name +
                    ' - ' +
                    item.className +
                    ' - ' +
                    item.roomName +
                    ' - ' +
                    toDateTime(item.startTime) +
                    ' - ' +
                    toDateTime(item.endTime),
                  value: item.id,
                  id: item.id,
                })
              );
            }
          });
        }
      });
  }
  onFormChange(e: any) {
    if (
      e.value &&
      e.value.scheduleId &&
      this.isGetSchedulesDetail != e.value.scheduleId
    ) {
      this.isGetSchedulesDetail = e.value.scheduleId;

      this.getSchedulesDetailByScheduleId(e.value.scheduleId);
    }

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
      this.authService.userLogin$.subscribe((res) => {
        this.dataSave = { ...this.dataSave, userId: res.id };
      });
    }
    this.add(this.dataSave);
  }
  add(data: any) {
    this.service.addAsync(data).subscribe((res) => {
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

  onSelectSchedule() {
    console.log('on select ');
  }
}
