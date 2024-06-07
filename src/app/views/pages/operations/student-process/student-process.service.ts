import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentProcessConstant } from './student-process.constant';

@Injectable({
  providedIn: 'root',
})
export class StudentProcessService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.GetAll,
      filter,
      StudentProcessConstant.options
    );
  }

  createsAsync(data: any): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.Creates,
      data,
      StudentProcessConstant.options
    );
  }
  // add
  addAsync(data: any): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.Create,
      data,
      StudentProcessConstant.options
    );
  }

  // auto Add All Student to StudentProcess
  autoAddAllStudentAsync(leaningProcessId: string): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.AutoAddAllStudent +
        '/' +
        leaningProcessId,
      StudentProcessConstant.options
    );
  }

  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      StudentProcessConstant.StudentProcess.Update + '/' + data.id,
      data,
      StudentProcessConstant.options
    );
  }
  // update process student
  updateProcessStudentAsync(data: any, processId: string): Observable<any> {
    return this.http.put(
      StudentProcessConstant.StudentProcess.UpdateProcessStudent +
        '/' +
        processId,
      data,
      StudentProcessConstant.options
    );
  }
  updateProcessesAsync(data: any): Observable<any> {
    return this.http.put(
      StudentProcessConstant.StudentProcess.UpdateProcessStudent,
      data,
      StudentProcessConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.Delete,
      id,
      StudentProcessConstant.options
    );
  }

  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      StudentProcessConstant.StudentProcess.GetById + '/' + id,
      StudentProcessConstant.options
    );
  }

  // Get all by LearningProcessId
  getAllByLearningProcessIdAsync(data: any, id: any): Observable<any> {
    return this.http.post(
      StudentProcessConstant.StudentProcess.GetByLearningProcessId + '/' + id,
      data,
      StudentProcessConstant.options
    );
  }
}
