import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomChatConstant } from './room-chat.constant';

@Injectable({
  providedIn: 'root',
})
export class RoomChatService {
  constructor(private http: HttpClient) {}

  getByClassIdAsync(
    classId: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<any> {
    return this.http.get(
      RoomChatConstant.Message.GetClassById +
        '?classId=' +
        classId +
        '&page=' +
        page +
        '&pageSize=' +
        pageSize,
      RoomChatConstant.options
    );
  }

  getStudentByClass(classCode: string) {
    return this.http.post(
      RoomChatConstant.class.GetStudentByClass,
      { entity: { classCode: classCode } },
      RoomChatConstant.options
    );
  }
}
