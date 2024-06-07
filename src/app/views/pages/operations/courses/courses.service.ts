import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoursesConstant } from './courses.constant';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      CoursesConstant.Course.GetAll,
      filter,
      CoursesConstant.options
    );
  }
  getByCodeAsync(code: string): Observable<any> {
    return this.http.get(
      CoursesConstant.Course.GetByCode + '/' + code,
      CoursesConstant.options
    );
  }
  getSubjectCourse(filter: any): Observable<any> {
    return this.http.post(
      CoursesConstant.Course.GetSubjectCourse,
      filter,
      CoursesConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(CoursesConstant.Course.Create, data);
  }

  addSubjectToCourse(data: any): Observable<any> {
    return this.http.post(CoursesConstant.Course.AddSubjectToCourse, data);
  }
  // edit
  editAsync(data: any, courseId: string): Observable<any> {
    return this.http.put(CoursesConstant.Course.Update + '/' + courseId, data);
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      CoursesConstant.Course.Delete,
      id,
      CoursesConstant.options
    );
  }
  removeSubjectCourse(data: any): Observable<any> {
    return this.http.post(CoursesConstant.Course.RemoveSubjectCourse, data);
  }
}
