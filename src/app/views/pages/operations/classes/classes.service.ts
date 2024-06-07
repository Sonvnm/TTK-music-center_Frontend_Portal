import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'console';
import { Observable } from 'rxjs';
import { ClassesConstant } from './class.constant';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    console.log(filter);
    return this.http.post(
      ClassesConstant.Class.GetAll,
      filter,
      ClassesConstant.options
    );
  }
  // get by code
  getByCodeAsync(code: string): Observable<any> {
    return this.http.get(
      ClassesConstant.Class.GetByCode + '/' + code,
      ClassesConstant.options
    );
  }

  getClassesByCourse(courseId: string): Observable<any> {
    return this.http.get(
      ClassesConstant.Class.GetClassesByCourse + '/' + courseId,
      ClassesConstant.options
    );
  }
  getStudentsClassByClassId(classId: string): Observable<any> {
    return this.http.get(
      ClassesConstant.Class.GetStudentsClassByClassId + '/' + classId,
      ClassesConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.Create,
      data,
      ClassesConstant.options
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      ClassesConstant.Class.Update + '/' + data.id,
      data,
      ClassesConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.Delete,
      id,
      ClassesConstant.options
    );
  }

  // delete student class
  deleteStudentClassAsync(data: any): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.RemoveStudentFromClass,
      data,
      ClassesConstant.options
    );
  }

  // get by code
  getStudentInClass(filter: any): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.GetStudentByClass,
      filter,
      ClassesConstant.options
    );
  }

  // get student not in class
  getStudentNotInClass(filter: any): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.GetStudentNotInClass,
      filter,
      ClassesConstant.options
    );
  }

  // add student to class
  addStudentClass(data: any, isTeacher: boolean = false): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.AddStudentToClass + '/' + isTeacher,
      data,
      ClassesConstant.options
    );
  }
  // get teacher not in class
  getTeacherNotInClass(filter: any): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.GetTeacherNotInClass,
      filter,
      ClassesConstant.options
    );
  }
  deleteDocumentsFromClass(documentsId: string[]): Observable<any> {
    return this.http.post(
      ClassesConstant.Class.DeleteDocumentsFromClass,
      documentsId,
      ClassesConstant.options
    );
  }
}
