import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionConstant } from './permission.constant';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  getPermission(filter: any): Observable<any> {
    return this.http.post(
      PermissionConstant.Permission.GetAll,
      filter,
      PermissionConstant.options
    );
  }
  // add
  addPermission(Permission: any): Observable<any> {
    return this.http.post(PermissionConstant.Permission.Create, Permission, PermissionConstant.options);
  }
  // edit
  editPermission(Permission: any): Observable<any> {
    return this.http.put(
      PermissionConstant.Permission.Update + '/' + Permission.id,
      Permission,
      PermissionConstant.options
    );
  }
  // delete
  deletePermission(id: any[]): Observable<any> {
    return this.http.post(PermissionConstant.Permission.Delete, id, PermissionConstant.options);
  }
  // load Permissions
  loadPermissions(filter: any): Observable<any> {
    return this.http.post(
      PermissionConstant.Permission.GetAll,
      filter,
      PermissionConstant.options
    );
  }
  // get permission not in role code
  getPermissionNotInRoleCode(filter: any): Observable<any> {
    return this.http.post(
      PermissionConstant.Permission.GetNotInRoleCode,
      filter,
      PermissionConstant.options
    );
  }
  // add permissions to role
  addPermissionsToRole(permissionsId: string[], roleCode: string): Observable<any> {
    return this.http.post(
      PermissionConstant.Permission.AddPermissionsToRole + '/' + roleCode,
      permissionsId,
      PermissionConstant.options
    );
  }
}
