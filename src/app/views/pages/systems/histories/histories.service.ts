import { Injectable } from '@angular/core';
import { HistoriesConstant } from './histories.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

 constructor(private http: HttpClient) {}

 // get all
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      HistoriesConstant.Room.GetAll,
      filter,
      HistoriesConstant.options
    );
  }
  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      HistoriesConstant.Room.GetById + '/' + id,
      HistoriesConstant.options
    );
  }
  // get by code
  getByCodeAsync(code: any): Observable<any> {
    return this.http.get(
      HistoriesConstant.Room.GetByCode + '/' + code,
      HistoriesConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      HistoriesConstant.Room.Create,
      data,
      HistoriesConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      HistoriesConstant.Room.Update + '/' + data.id,
      data,
      HistoriesConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(HistoriesConstant.Room.Delete, id, HistoriesConstant.options);
  }
}
