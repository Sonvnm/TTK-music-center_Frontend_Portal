import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LearningProcessConstant } from './learning-process.constant';
import { ScheduleConstant } from '../courses/detail-course/schedule/schedule.constant';

@Injectable({
  providedIn: 'root',
})
export class LearningProcessService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      LearningProcessConstant.LearningProcess.GetAll,
      filter,
      LearningProcessConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      LearningProcessConstant.LearningProcess.Create,
      data,
      LearningProcessConstant.options
    );
  }

  // edit
  editLearningProcessAsync(data: any): Observable<any> {
    return this.http.put(
      LearningProcessConstant.LearningProcess.Update + '/' + data.id,
      data,
      LearningProcessConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      LearningProcessConstant.LearningProcess.Delete,
      id,
      LearningProcessConstant.options
    );
  }

  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      LearningProcessConstant.LearningProcess.GetById + '/' + id,
      LearningProcessConstant.options
    );
  }

  // get schedules by user login
  GetSchedulesByUserAsync(filter: any): Observable<any> {
    return this.http.post(
      ScheduleConstant.API.GetSchedulesByUser,
      filter,
      LearningProcessConstant.options
    );
  }
  getByUser(): Observable<any> {
    return this.http.get(
      LearningProcessConstant.LearningProcess.GetByUser,
      LearningProcessConstant.options
    );
  }
  getByUsername(userName: string): Observable<any> {
    return this.http.get(
      LearningProcessConstant.LearningProcess.GetByUsername + '/' + userName,
      LearningProcessConstant.options
    );
  }
  getByUsernameForPaymentSalary(userName: string): Observable<any> {
    return this.http.get(
      LearningProcessConstant.LearningProcess.GetByUsernameForPaymentSalary + '/' + userName,
      LearningProcessConstant.options
    );
  }
}
