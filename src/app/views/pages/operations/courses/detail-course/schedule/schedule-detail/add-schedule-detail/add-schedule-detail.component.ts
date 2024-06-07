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
import {
  disableButton,
  getLocalISOTime,
  getLocalTime,
} from 'src/app/shared/hmz-helper';
import { RoomsService } from 'src/app/views/pages/operations/rooms/rooms.service';
import { ScheduleService } from '../../schedule.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import * as moment from 'moment';
@Component({
  selector: 'app-add-schedule-detail',
  templateUrl: './add-schedule-detail.component.html',
  styleUrls: ['./add-schedule-detail.component.scss'],
})
export class AddScheduleDetailComponent implements OnInit {
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
      type: EMaterialFormFieldType.Select,
      label: 'Chọn phòng học',
      name: 'roomId',
      validators: [Validators.required],
      errorMessages: {
        required: 'Vui lòng chọn phòng học',
      },
      options: [],
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Tên lịch học không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày học',
      name: 'startDate',
      validators: [Validators.required],
      errorMessages: {
        required: 'Ngày học không được để trống',
      },
      event: () => {},
    },
    {
      type: EMaterialFormFieldType.Select,
      label: 'Chọn Ca học',
      name: 'timeSlot',
      validators: [Validators.required],
      errorMessages: {
        required: 'Vui lòng chọn ca học',
      },
      options: [
        { id: 1, value: 1, label: 'Sáng 7h-9h' },
        { id: 2, value: 2, label: 'Chiều 13h-15h' },
        { id: 3, value: 3, label: 'Tối 18h-20h' },
      ],
    },
    {
      type: EMaterialFormFieldType.Checkbox,
      label: 'Học bù',
      name: 'isMakeUpClass',
      value: false,
    },
  ];
  isUpdate: boolean;
  item: any;
  isSave: boolean;

  constructor(
    private roomService: RoomsService,
    private service: ScheduleService,
    private toastService: ToastService,

    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matDialogRef: MatDialogRef<AddScheduleDetailComponent>
  ) {}

  ngOnInit(): void {
    this.loadRoom();
    // set min max for date
    console.log('this.dialogData', this.dialogData);
    if (this.dialogData.item) {
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = this.dialogData.item;
      this.item.startDate = getLocalISOTime(this.item?.startTime);
      if (moment(this.item.startDate).hour() == 7) {
        this.item.timeSlot = 1;
      } else if (moment(this.item.startDate).hour() == 13) {
        this.item.timeSlot = 2;
      } else if (moment(this.item.startDate).hour() == 18) {
        this.item.timeSlot = 3;
      }
    }
    if (this.dialogData.schedule) {
      const minDate = new Date(this.dialogData.schedule.startDate);
      const maxDate = new Date(this.dialogData.schedule.endDate);
      this.formFields.forEach((field) => {
        if (field.name === 'startDate') {
          field.min = minDate;
          field.max = maxDate;
          field.value = minDate;
        }
      });
    }
  }

  loadRoom() {
    this.roomService.getAllAsync({}).subscribe((res) => {
      this.formFields.forEach((field) => {
        if (field.name === 'roomId') {
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
    dataSave.scheduleId = this.dialogData.scheduleId??this.item?.scheduleId;
    dataSave.startDate = getLocalTime(e.value.startDate);
    dataSave.scheduleDetailId=this?.item?.id
    this.isUpdate ? this.edit(dataSave) : this.add(dataSave);
  }

  add(data: any) {
    this.service.addDetailAsync(data).subscribe((res) => {
      if (res.success) {
        this.toastService.success('Thêm lịch học thành công');
        this.matDialogRef.close(true);
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
  edit(data: any) {

    this.service.editDetailAsync(data).subscribe((res) => {
      if (res.success) {
        this.toastService.success('Sửa lịch học thành công');
        this.isSave = true;
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
}
