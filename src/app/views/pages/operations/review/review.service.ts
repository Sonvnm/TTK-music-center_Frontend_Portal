import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewConstant } from './review.constant';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      ReviewConstant.Review.GetAll,
      filter,
      ReviewConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      ReviewConstant.Review.Create,
      data,
      ReviewConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      ReviewConstant.Review.Update + '/' + data.id,
      data,
      ReviewConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      ReviewConstant.Review.Delete,
      id,
      ReviewConstant.options
    );
  }
}
