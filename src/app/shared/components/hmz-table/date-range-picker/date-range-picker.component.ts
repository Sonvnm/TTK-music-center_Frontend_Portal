import { Component, EventEmitter, Output } from '@angular/core';
import { getLocalTime } from 'src/app/shared/hmz-helper';



@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
})
export class DateRangePickerComponent {
  fromDate!: Date;
  toDate!: Date;

  @Output() dateRangeSelected = new EventEmitter<{
    fromDate: Date;
    toDate: Date;
  }>();
  @Output() clearDateRange = new EventEmitter();
  @Output() enter = new EventEmitter<any>();

  emitDateRange() {
    this.dateRangeSelected.emit({
      fromDate: getLocalTime(this.fromDate),
      toDate: getLocalTime(this.toDate),
    });
  }
  onEnter() {
    this.enter.emit({
      fromDate: getLocalTime(this.fromDate),
      toDate: getLocalTime(this.toDate),
    });
  }
  clearFromDate() {
    this.fromDate = '' as any;
    this.emitDateRange();
  }

  clearToDate() {
    this.toDate = '' as any;
    this.emitDateRange();
  }
}
