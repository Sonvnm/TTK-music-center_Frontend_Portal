// chat.service.ts
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from './toast.service';

export interface IChatQuery {
  classId: string | null;
  userId: string | null;
  username: string | null;
  image: string | null;
  content: string | null;
}
export interface IChatView {
  classId: string | null;
  className: string | null;
  userId: string | null;
  username: string | null;
  content: string | null;
  sendAt?: string;
  timeAgo: string | null;
  user: any;
}


@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: signalR.HubConnection;
  urlChat = environment.api + 'chat';
  messageReceived = new Subject<IChatView>();

  /**
   *
   */
  constructor(
    private toastr: ToastService
  ) {


  }
  startConnection = (chatQuery: IChatQuery) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.urlChat)
      .build();

    this.hubConnection
      .start()
      .then(() => {
        this.addReceiveMessageListener();
        this.joinClassroom(chatQuery);
        console.log('Connection started');
      })
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  closeConnection = () => {
    this.hubConnection
      .stop()
      .then(() => {
        console.log('Connection closed');
      })
      .catch((err) => console.log('Error while closing connection: ' + err));
  };

  joinClassroom = (chatQuery: IChatQuery) => {
    this.hubConnection
      .invoke('JoinClassroom', chatQuery)
      .catch((err) => console.error(err));
  };

  leaveClassroom = (chatQuery: IChatQuery) => {
    this.hubConnection
      .invoke('LeaveClassroom', chatQuery)
      .catch((err) => console.error(err));
  };

  addReceiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (res: IChatView) => {
      this.messageReceived.next(res);
    });
  };

  sendMessage = (chatQuery: IChatQuery) => {
    this.hubConnection
      .invoke('SendMessageToGroup', chatQuery)
      .catch((err) => {
        this.toastr.error([err]);
      });
  };
}
