import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleConstant } from './role.constant';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}
  getRole(filter: any): Observable<any> {
    return this.http.post(
      RoleConstant.Role.GetAll,
      filter,
      RoleConstant.options
    );
  }
  // add
  addRole(Role: any): Observable<any> {
    return this.http.post(RoleConstant.Role.Create, Role, RoleConstant.options);
  }
  // edit
  editRole(Role: any): Observable<any> {
    return this.http.put(
      RoleConstant.Role.Update + '/' + Role.id,
      Role,
      RoleConstant.options
    );
  }
  // delete
  deleteRole(id: any[]): Observable<any> {
    return this.http.post(RoleConstant.Role.Delete, id, RoleConstant.options);
  }
  // load roles
  loadRoles(filter: any): Observable<any> {
    return this.http.post(
      RoleConstant.Role.GetAll,
      filter,
      RoleConstant.options
    );
  }

  // get by code
  getByCode(code: string): Observable<any> {
    return this.http.get(
      RoleConstant.Role.GetByCode + '/' + code,
      RoleConstant.options
    );
  }
  // get all permission by role name
  getAllPermissionByRoleName(filter: any): Observable<any> {
    return this.http.post(
      RoleConstant.Permission.GetByRoleName,
      filter,
      RoleConstant.options
    );
  }
  // get all permission not in role code
  getAllPermissionNotInRoleCode(filter: any): Observable<any> {
    return this.http.post(
      RoleConstant.Permission.GetNotInRoleCode,
      filter,
      RoleConstant.options
    );
  }
  // delete role permission
  deleteRolePermission(
    roleName: string,
    permissionsId: string[]
  ): Observable<any> {
    return this.http.post(
      RoleConstant.Permission.RemoveRolePermission + '/' + roleName,
      permissionsId,
      RoleConstant.options
    );
  }
}
