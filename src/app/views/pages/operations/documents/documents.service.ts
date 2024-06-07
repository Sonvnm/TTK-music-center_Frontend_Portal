import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentsConstant } from './documents.constant';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient) {}
  getAllAsync(filter: any): Observable<any> {
    return this.http.post(
      DocumentsConstant.Document.GetAll,
      filter,
      DocumentsConstant.options
    );
  }
  // add
  addAsync(data: any, classCode: string): Observable<any> {
    return this.http.post(
      DocumentsConstant.Document.Create + '/' + classCode,
      data,
      DocumentsConstant.options
    );
  }
  // upload
  uploadAsync(data: any, classCode: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', data, data.name);
    return this.http.post(
      DocumentsConstant.Document.UploadDocument + '?classCode=' + classCode,
      formData
    );
  }
  uploadForSubjectAsync(data: any, subjectCode: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', data, data.name);
    return this.http.post(
      DocumentsConstant.Document.UploadDocumentForSubject + '?subjectCode=' + subjectCode,
      formData
    );
  }
  // edit
  editAsync(data: any): Observable<any> {
    return this.http.put(
      DocumentsConstant.Document.Update + '/' + data.id,
      data,
      DocumentsConstant.options
    );
  }
  // delete
  deleteAsync(id: any[]): Observable<any> {
    return this.http.post(
      DocumentsConstant.Document.Delete,
      id,
      DocumentsConstant.options
    );
  }

  // get by id
  getByIdAsync(id: any): Observable<any> {
    return this.http.get(
      DocumentsConstant.Document.GetById + '/' + id,
      DocumentsConstant.options
    );
  }

  // get by class
  getByClassAsync(filter: any): Observable<any> {
    return this.http.post(
      DocumentsConstant.Document.GetByClass,
      filter,
      DocumentsConstant.options
    );
  }
  getBySubject(filter: any): Observable<any> {
    return this.http.post(
      DocumentsConstant.Document.GetBySubject,
      filter,
      DocumentsConstant.options
    );
  }
}
