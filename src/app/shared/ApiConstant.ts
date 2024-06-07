import { environment } from 'src/environments/environment';
import { IHMZRequest } from './hmz-interface';
import { ConstantCommon } from './constant-common';
import { HttpHeaders } from '@angular/common/http';

export class ApiConstant extends ConstantCommon {
  static BASE_URL = environment.api + 'api/v1';
  static options = {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
  static optionsData = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  static baseRequest: IHMZRequest = {
    pageNumber: 1,
    pageSize: 10,
    entity: {},
    sortColumns: [],
  };
  static optionsFile = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    responseType: 'blob',
    observe: 'response',
  };
}
