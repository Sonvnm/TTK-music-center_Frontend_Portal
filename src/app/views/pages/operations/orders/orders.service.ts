import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersConstant } from './orders.constant';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  // get all
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      OrdersConstant.Order.GetAll,
      filter,
      OrdersConstant.options
    );
  }
  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      OrdersConstant.Order.GetById + '/' + id,
      OrdersConstant.options
    );
  }
  // get by code
  getByCodeAsync(code: any): Observable<any> {
    return this.http.get(
      OrdersConstant.Order.GetByCode + '/' + code,
      OrdersConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      OrdersConstant.Order.Create,
      data,
      OrdersConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      OrdersConstant.Order.Update + '/' + data.id,
      data,
      OrdersConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      OrdersConstant.Order.Delete,
      id,
      OrdersConstant.options
    );
  }
  // update status
  updateStatusAsync(data: any,id:string): Observable<any> {
    return this.http.put(
      OrdersConstant.Order.UpdateStatus + '/' + data.id,
      data,
      OrdersConstant.options
    );
  }
}
