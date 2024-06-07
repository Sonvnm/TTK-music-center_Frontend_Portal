import { ApiConstant } from 'src/app/shared/ApiConstant';

export class RoomChatConstant extends ApiConstant {
  static Message = {
    GetAll: this.BASE_URL + '/Message/GetAll',
    GetById: this.BASE_URL + '/Message/GetById',
    Create: this.BASE_URL + '/Message/Create',
    Update: this.BASE_URL + '/Message/Update',
    Delete: this.BASE_URL + '/Message/Delete',

    GetClassById: this.BASE_URL + '/Message/GetByClassId',
  };

  static class = {
    GetStudentByClass: this.BASE_URL + '/Class/GetStudentByClass',
  };
}
