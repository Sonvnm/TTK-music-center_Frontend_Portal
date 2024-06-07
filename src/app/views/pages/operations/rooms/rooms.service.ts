import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomsConstant } from './rooms.constant';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      RoomsConstant.Room.GetAll,
      filter,
      RoomsConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      RoomsConstant.Room.Create,
      data,
      RoomsConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      RoomsConstant.Room.Update + '/' + data.id,
      data,
      RoomsConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(RoomsConstant.Room.Delete, id, RoomsConstant.options);
  }
}
