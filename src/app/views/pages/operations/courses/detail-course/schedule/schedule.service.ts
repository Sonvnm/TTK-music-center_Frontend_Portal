import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, scheduled } from 'rxjs';
import { ScheduleConstant } from './schedule.constant';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  //#region  Schedule
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.GetAll,
      filter,
      ScheduleConstant.options
    );
  }

  getById(id: string): Observable<any> {
    return this.http.get(ScheduleConstant.API.GetById + '/' + id);
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.Create,
      data,
      ScheduleConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      ScheduleConstant.API.Update + '/' + data.id,
      data,
      ScheduleConstant.options
    );
  }
  editDetailAsync(data: any): Observable<any> {
    return this.http.put(
      ScheduleConstant.API.UpdateDetail + '/' + data.scheduleDetailId,
      data,
      ScheduleConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.Delete,
      id,
      ScheduleConstant.options
    );
  }
  //#endregion Schedule

  //#region  ScheduleDetail
  getAllDetailAsync(filter: any): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.GetAllDetail,
      filter,
      ScheduleConstant.options
    );
  }
  addDetailAsync(data: any): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.CreateDetail,
      data,
      ScheduleConstant.options
    );
  }
  deleteDetailAsync(id: any[]): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.DeleteDetail,
      id,
      ScheduleConstant.options
    );
  }
  getSchedulesByUser(): Observable<any> {
    return this.http.get(
      ScheduleConstant.API.GetSchedulesByUser,
      ScheduleConstant.options
    );
  }
  getSchedulesDetailByScheduleId(scheduleId: string): Observable<any> {
    return this.http.get(
      ScheduleConstant.API.GetSchedulesDetailByScheduleId + '/' + scheduleId
    );
  }
  //#endregion ScheduleDetail

  // getMomentDate(year: number, month: any) {
  //   let startDate = moment([year, month, 1]);
  //   console.log(startDate);
  //   if (startDate.day() != 1) {
  //     const previousMonth = month - 1;
  //     const durationDay = startDate.day() - 1;
  //     startDate = moment([
  //       year,
  //       previousMonth,
  //       moment([year, previousMonth]).daysInMonth() - durationDay + 1,
  //     ]);
  //     const test = startDate.get('day');
  //     console.log(test);
  //   }

  //   return {
  //     startDate: startDate.format('YYYY-MM-DD'),
  //     endDate: moment([
  //       year,
  //       month,
  //       moment([year, month]).daysInMonth(),
  //     ]).format('YYYY-MM-DD'),
  //   };
  // }

  getWeeks(year: number, month: any) {
    const weeks = [];
    for (let i = 0; i < 12; i++) {
      let myDate = this.getMomentDate(year, i, 1, 1);
      if (myDate.startDate.day() != 1) {
        const previousMonth = month - 1;
        const durationDay = myDate.startDate.day() - 1;
        myDate.startDate = moment([
          year,
          previousMonth,
          moment([year, previousMonth]).daysInMonth() - durationDay + 1,
        ]);
      }

      weeks.push(myDate);
    }
    console.log(weeks);

    return weeks;
  }
  getMomentDate(year: number, month: number, start: any, end: any) {
    return {
      startDate: moment([year, month, start]),
      endDate: moment([year, month, end]),
    };
  }
  // weeks(month: any) {
  //   const weekStartEndDay = [];
  //   const first = month.day() == 0 ? 6 : month.day() - 1;
  //   let day = 7 - first;
  //   const last = month.daysInMonth();
  //   const count = (last - day) / 7;

  //   weekStartEndDay.push(this.getMomentDate(1, day));
  //   for (let i = 0; i < count; i++) {
  //     weekStartEndDay.push(
  //       this.getMomentDate(day + 1, Math.min((day += 7), last))
  //     );
  //   }
  //   console.log(weekStartEndDay);

  //   return weekStartEndDay;
  // }
}
