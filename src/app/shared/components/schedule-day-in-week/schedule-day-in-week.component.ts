import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { getDateRange, getWeeks } from '../../hmz-helper';

@Component({
  selector: 'app-schedule-day-in-week',
  templateUrl: './schedule-day-in-week.component.html',
  styleUrls: ['./schedule-day-in-week.component.scss'],
})
export class ScheduleDayInWeekComponent implements OnInit {
  @Input() years: any;
  @Input() datas: any;

  constructor() {}
  weeks: any;

  daysInWeek: any;
  thisWeek: any;

  ngOnInit(): void {
    this.weeks = getWeeks(this.years[1]);
    this.getThisWeek();
  }

  getData(day: any, slotIndex: any) {
    const startDate = this.datas.filter((data: any) => {
      return day.isSame(moment(data.scheduleDetail?.startTime), 'day');
    });

    if (startDate.length > 0) {
      for (const element of startDate) {
        const slot = moment(element.scheduleDetail.startTime).format('LT');
        if (slotIndex === this.switchSlot(slot)) {
          return element;
        }
      }
    }
    return '-';
  }

  switchSlot(slot: any) {
    switch (slot) {
      case '7:00 AM':
        return 0;
      case '1:00 PM':
        return 1;
      case '6:00 PM':
        return 2;
    }
    return null;
  }

  getThisWeek() {
    this.thisWeek = this.weeks.filter((x: any) => {
      const dateNow = moment().format('L');
      return (
        x.startWeek.value.isSameOrBefore(dateNow) &&
        x.lastWeek.value.isSameOrAfter(dateNow)
      );
    });

    const startWeek = this.thisWeek[0].startWeek.value.clone();
    const lastWeek = this.thisWeek[0].lastWeek.value.clone();
    this.daysInWeek = getDateRange(startWeek, lastWeek);
  }

  onYearChange(event: any) {
    if (event) {
      if (event.value == moment().year()) {
        this.weeks = getWeeks(event.value);
        this.getThisWeek();
        return;
      }
      this.thisWeek = null;
      this.weeks = getWeeks(event.value);
      this.onWeekChange({ value: this.weeks[0] });
    }
  }
  onWeekChange(event: any) {
    if (event) {
      const startWeek = event.value.startWeek.value.clone();
      const lastWeek = event.value.lastWeek.value.clone();
      this.daysInWeek = getDateRange(startWeek, lastWeek);
    }
  }
}
