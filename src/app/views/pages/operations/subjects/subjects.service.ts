import { Injectable } from '@angular/core';
import { SubjectsConstant } from './subjects.constant';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService {
  getByCodeAsync(code: string): Observable<any> {
    return this.http.get(
      SubjectsConstant.Subject.GetByCode + '/' + code,
      SubjectsConstant.options
    );
  }
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      SubjectsConstant.Room.GetAll,
      filter,
      SubjectsConstant.options
    );
  }

  getSubjectsForCourse(query: any, courseId: string) {
    console.log(courseId, query);

    return this.http.post(
      SubjectsConstant.Subject.getSubjectsForCourse + '/' + courseId,
      query,
      SubjectsConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      SubjectsConstant.Room.Create,
      data,
      SubjectsConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      SubjectsConstant.Room.Update + '/' + data.id,
      data,
      SubjectsConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      SubjectsConstant.Room.Delete,
      id,
      SubjectsConstant.options
    );
  }


}
