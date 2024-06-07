import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import {
  ChatService,
  IChatQuery,
  IChatView,
} from 'src/app/shared/services/chat.service';
import { RoomChatService } from './room-chat.service';
import { timeAgo } from 'src/app/shared/hmz-helper';
import { ToastService } from 'src/app/shared/services/toast.service';


@Component({
  selector: 'app-room-chat',
  templateUrl: './room-chat.component.html',
  styleUrls: ['./room-chat.component.scss'],
})
export class RoomChatComponent implements OnInit {
  user: any;
  message: string = '';
  chatQuery: IChatQuery;
  messages: IChatView[] = [];
  users: any[] = [];

  title = 'Phòng chat';
  buttonChat: IButton[] = [
    {
      id: EButtonType.Close,
      title: 'Quay lại',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.dialogRef.close(),
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<RoomChatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private chatService: ChatService,
    private roomChatService: RoomChatService,
    private toastrService: ToastService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.user = this.data.user;
    this.chatQuery = {
      classId: this.data.class.id,
      userId: this.data.user.id,
      username: this.data.user.username,
      image: this.data.user.image,
      content: '',
    };
    this.getChatHistory();
    this.chatService.startConnection(this.chatQuery);
    this.chatService.messageReceived.subscribe((message: IChatView) => {
      this.messages = [...this.messages, message];
    });
    this.getStudentInClass();

    this.title = 'Phòng chat của lớp: ' + this.data.class.name;
  }

  sendMessage(user: any): void {
    this.chatQuery.content = this.message;
    // check null message
    if (!this.message) {
      this.toastrService.error(['Vui lòng nhập nội dung tin nhắn']);
      return;
    }
    this.chatService.sendMessage(this.chatQuery);
    this.message = '';
  }

  // enter to send message
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage(this.user);
    }
  }

  getChatHistory(): void {
    this.roomChatService
      .getByClassIdAsync(this.data.class.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.messages = res.entity;
        }
      });
  }

  getStudentInClass(): void {
    this.roomChatService
      .getStudentByClass(this.data.class.code)
      .subscribe((res: any) => {
        console.log(res);

        if (res.success) {
          this.users = res.items;
        }
      });
  }

  timeAgo(time?: string): string {
    return timeAgo(time);
  }

  ngOnDestroy(): void {
    this.chatService.leaveClassroom(this.chatQuery);
  }
}
