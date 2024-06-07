import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersConstant } from './users.constant';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}
  getUsers(filter: any): Observable<any> {
    return this.http.post(
      UsersConstant.User.GetAll,
      filter,
      UsersConstant.options
    );
  }
  // add
  addUser(user: any): Observable<any> {
    return this.http.post(
      UsersConstant.User.Create,
      user,
      UsersConstant.options
    );
  }
  // edit
  editUser(user: any): Observable<any> {
    return this.http.put(
      UsersConstant.User.Update + '/' + user.id,
      user,
      UsersConstant.options
    );
  }
  // delete
  deleteUser(id: any[]): Observable<any> {
    return this.http.post(UsersConstant.User.Delete, id, UsersConstant.options);
  }
  // export
  exportUser(filter: any): void {
    this.http
      .post(UsersConstant.User.Export, filter, {
        observe: 'response',
        responseType: 'blob',
        headers: { 'Content-Type': 'application/json' },
      })
      .subscribe((response: any) => {
        const blob = new Blob([response.body]);
        const downloadURL = window.URL.createObjectURL(response.body);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.click();
      });
  }

  // get by username
  getByUsername(username: string): Observable<any> {
    return this.http.get(
      UsersConstant.User.GetByUsername + '/' + username,
      UsersConstant.options
    );
  }

  // load roles
  loadRoles(filter: any): Observable<any> {
    return this.http.post(
      UsersConstant.Role.GetAll,
      filter,
      UsersConstant.options
    );
  }

  updatePassword(query: any): Observable<any> {
    return this.http.post(UsersConstant.User.ChangePassword, query);
  }
}
