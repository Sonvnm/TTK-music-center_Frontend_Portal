import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedBackConstant } from './feedback.constant';

@Injectable({
  providedIn: 'root',
})
export class FeedBackService {
  constructor(private http: HttpClient) {}

  // get all
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      FeedBackConstant.FeedBack.GetAll,
      filter,
      FeedBackConstant.options
    );
  }
  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      FeedBackConstant.FeedBack.GetById + '/' + id,
      FeedBackConstant.options
    );
  }
  // get by code
  getByCodeAsync(code: any): Observable<any> {
    return this.http.get(
      FeedBackConstant.FeedBack.GetByCode + '/' + code,
      FeedBackConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      FeedBackConstant.FeedBack.Create,
      data,
      FeedBackConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      FeedBackConstant.FeedBack.Update + '/' + data.id,
      data,
      FeedBackConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      FeedBackConstant.FeedBack.Delete,
      id,
      FeedBackConstant.options
    );
  }

  // approveAsync
  approveAsync(id: string): Observable<any> {
    return this.http.put(
      FeedBackConstant.FeedBack.Approve + '/' + id,
      FeedBackConstant.options
    );
  }
  // rejectAsync
  rejectAsync(id: string): Observable<any> {
    return this.http.put(
      FeedBackConstant.FeedBack.Reject + '/' + id,
      FeedBackConstant.options
    );
  }
}
