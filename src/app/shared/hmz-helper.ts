import * as moment from 'moment';
import { Observable } from 'rxjs';
import {
  EButtonType,
  IButton,
} from './components/hmz-buttons/buttons.constant';

export function datePipe(value: any, ...args: any[]) {
  return value ? new Date(value).toLocaleString('vi-VN').split(',')[0] : '';
}

export function toDateTime(value: any, ...args: any[]) {
  if (value) {
    const date = new Date(value);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
  return '';
}

// Format date dd/MM/yyyy
export function toDate(value: any, ...args: any[]) {
  if (value) {
    const options: any = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(value).toLocaleDateString('en-GB', options);
  }
  return '';
}

// Time ago
export function timeAgo(value: any, ...args: any[]): string {
  if (value) {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + ' năm trước';
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' tháng trước';
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' ngày trước';
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' giờ trước';
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' phút trước';
    }

    return Math.floor(seconds) + ' giây trước';
  }
  return '';
}

// format number 1000 => 1,000
export function toNumber(value: any, ...args: any[]) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
}

// format B => KB => MB => GB => TB
export function toSize(value: any) {
  if (value) {
    let size = value;
    let unit = 'B';
    if (size > 1024) {
      size = size / 1024;
      unit = 'KB';
    }
    if (size > 1024) {
      size = size / 1024;
      unit = 'MB';
    }
    if (size > 1024) {
      size = size / 1024;
      unit = 'GB';
    }
    if (size > 1024) {
      size = size / 1024;
      unit = 'TB';
    }
    return `${size.toFixed(2)} ${unit}`;
  }
  return '';
}

export function createObservable(res: any): Observable<any> {
  if (res !== null && res !== undefined) {
    const observable = new Observable((observer) => {
      observer.next(res);
    });
    return observable;
    // setTimeout(() => {
    //   subject.next(res);
    //   subject.complete();
    // }, 1);
    // return subject;
  }
  return new Observable();
}

export function create(res: any) {}
export function disableButton(
  isDisable: boolean,
  button: EButtonType,
  buttons: IButton[]
) {
  buttons = buttons.map((item) => {
    if (item.id === button) {
      item.disabled = isDisable;
    }
    return item;
  });
}

// string is empty
export function isEmpty(value: any) {
  return value === null || value === undefined || value === '';
}

export function getLocalISOTime(dateEntity: any): string {
  const date = new Date(dateEntity);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzOffset).toISOString();
  return localISOTime.slice(0, -1);
}

export function getLocalTime(dateEntity: any): Date {
  const date = new Date(dateEntity);
  const localDate = new Date(date.getTime());
  localDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return localDate;
}

export function getWeeks(year: number) {
  const firstDay = moment([year]);
  const firstMonday = firstDay.clone().day('Monday');
  const lastDayInWeek = moment(`${year}-01-${firstMonday.days() + 7}`);
  const firstSunday = lastDayInWeek.clone().day('Sunday');
  const weeks = [];
  let startWeek = firstMonday.clone();
  let lastWeek = firstSunday.clone();
  console.log(startWeek, lastWeek);

  while (
    (startWeek.year() === year || startWeek.year() === year - 1) &&
    (lastWeek.year() === year || lastWeek.year() === year - 1)
  ) {
    const myWeek = {
      startWeek: {
        view: startWeek.clone().format('DD-MM'),
        value: startWeek.clone(),
      },
      lastWeek: {
        view: lastWeek.clone().format('DD-MM'),
        value: lastWeek.clone(),
      },
    };
    weeks.push(myWeek);
    startWeek.add(1, 'weeks');
    lastWeek.add(1, 'weeks');
  }

  return weeks;
}

export function getDateRange(startWeek: any, lastWeek: any) {
  const datesWeek = [];

  datesWeek.push(startWeek.clone());

  while (startWeek.isBefore(lastWeek)) {
    startWeek.add(1, 'days');
    datesWeek.push(startWeek.clone());
  }
  return datesWeek;
}
export function createFormData(data: any, file?: any) {
  let formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });

  if (file) {
    formData.append('file', file, 'bangluong.pdf');
  }
  return formData;
}
