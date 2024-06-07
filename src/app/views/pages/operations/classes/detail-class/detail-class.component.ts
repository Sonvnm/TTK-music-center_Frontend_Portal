import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ITableColumn } from 'src/app/shared/components/hmz-table/hmz-table.interface';
import {
  EMaterialFormFieldType,
  IMatFormField,
} from 'src/app/shared/components/mat-dynamic-form/mat-dynamic-form';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../../auth/auth.service';
import { DocumentsService } from '../../documents/documents.service';
import { ClassesConstant } from '../class.constant';
import { ClassesService } from '../classes.service';
import { AddStudentClassComponent } from './add-student-class/add-student-class.component';
import { RoomChatComponent } from './room-chat/room-chat.component';

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.scss'],
})
export class DetailClassComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  class: Observable<any> = new Observable();
  userLogin: any;
  code: string = '';

  columns: ITableColumn[] = ClassesConstant.columnStudentClass(
    this.authService
  );
  documentColumns: ITableColumn[] = ClassesConstant.columnDocument();
  documentSubjectColumns: ITableColumn[] =
    ClassesConstant.columnSubjectDoucment();

  data!: Observable<IHMZDataSource>;
  dataDoc!: Observable<IHMZDataSource>;
  dataSubjectDoc!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  listItemSelectedDoc: any[] = [];
  fileDoc?: File;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  hmzRequestDoc: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Code',
      name: 'code',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên lớp',
      name: 'name',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Textarea,
      label: 'Mô tả',
      name: 'description',
      disabled: true,
    },
  ];

  buttons: IButton[] = [
    {
      id: EButtonType.Back,
      title: 'Common.Button.Back',
      icon: EButtonIcon.Back,
      style: EButtonMatStyle.Primary,
      click: () => this.location.back(),
    },
    {
      id: EButtonType.Add,
      title: 'Thêm học viên',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.addStudentClass(),
      isShow: this.authService.isRole('Admin'),
    },
    {
      id: EButtonType.Add,
      title: 'Thêm giảng viên',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.addTeacherClass(),
      isShow: this.authService.isRole('Admin'),
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deleteStudentClass(),
      disabled: true,
      isShow: this.authService.isRole('Admin'),
    },
  ];

  buttonChat: IButton[] = [
    {
      id: EButtonType.Chat,
      title: 'Chat',
      icon: EButtonIcon.Chat,
      style: EButtonMatStyle.Primary,
      click: () => this.goChat(this.userLogin),
    },
  ];
  buttonsDoc: IButton[] = [
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deleteDocument(),
      disabled: true,
    },
    {
      id: EButtonType.Upload,
      title: 'Common.Button.Upload',
      icon: EButtonIcon.Upload,
      style: EButtonMatStyle.Primary,
      click: () => this.uploadDocument(),
    },
  ];
  courseId: any;
  classId: any;
  constructor(
    private route: ActivatedRoute,
    private service: ClassesService,
    private documentService: DocumentsService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private location: Location,
    public authService: AuthService
  ) {}

  title: string = 'Vui lòng thêm giáo viên trước';
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
    if (this.code) {
      this.class = this.service.getByCodeAsync(this.code);
      this.class.subscribe((res) => {
        this.courseId = res.entity.course.id;
        this.classId = res.entity.id;
        this.loadDataDoc(this.hmzRequestDoc);
      });
      this.loadData(this.hmzRequest);
    }

    this.authService.userLogin$.subscribe((res) => {
      this.userLogin = res;
    });
  }

  loadData(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        classCode: this.code,
      },
    };
    this.service.getStudentInClass(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }

  loadDataDoc(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        classId: this.classId,
        courseId: this.courseId,
      },
    };
    this.dataDoc = this.documentService.getByClassAsync(request);
  }

  onRequest(e: any) {
    this.hmzRequest = {
      ...e,
      entity: {
        ...e.entity,
        classId: this.classId,
      },
    };
    this.loadData(this.hmzRequest);
  }

  onRequestDoc(e: any) {
    this.hmzRequestDoc = {
      ...e,
      entity: {
        ...e.entity,
        classId: this.classId,
        courseId: this.courseId,
      },
    };
    this.loadDataDoc(this.hmzRequestDoc);
  }

  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }
  onSelectChangeDoc(e: any) {
    this.listItemSelectedDoc = e;
    disableButton(
      this.listItemSelectedDoc.length === 0,
      EButtonType.Delete,
      this.buttonsDoc
    );
  }

  onFormChange(e: any) {
    console.log(e);
  }

  onFormSubmit(e: any) {
    console.log(e);
  }

  addTeacherClass(): any {
    const dialogRef = this.dialog.open(AddStudentClassComponent, {
      maxHeight: ClassesConstant.DialogSize.EXTRA_LARGE,
      disableClose: true,
      data: {
        title: 'Thêm giảng viên vào lớp',
        classCode: this.code,
        isTeacher: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }

  addStudentClass() {
    const dialogRef = this.dialog.open(AddStudentClassComponent, {
      maxHeight: ClassesConstant.DialogSize.EXTRA_LARGE,
      disableClose: true,
      data: {
        title: 'Thêm học viên vào lớp',
        classCode: this.code,
        isTeacher: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }

  deleteStudentClass() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: ClassesConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa sinh viên khỏi lớp',
        items: this.listItemSelected.map((x) => x.code + ' - ' + x.username),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        const data = {
          userCode: this.listItemSelected.map((x) => x.code),
          classCode: this.code,
        };
        this.service.deleteStudentClassAsync(data).subscribe((res) => {
          if (res.success) {
            this.hotToastService.success(res.message);
            this.loadData(this.hmzRequest);
          } else {
            this.hotToastService.error(res.errors);
          }
        });
      }
    });
  }

  uploadDocument() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    this.fileDoc = event.target.files[0];
    console.log(this.fileDoc);
    if (this.fileDoc) {
      this.documentService
        .uploadAsync(this.fileDoc, this.code)
        .subscribe((res) => {
          if (res.success) {
            this.hotToastService.success(res.message);
            this.loadDataDoc(this.hmzRequestDoc);
          } else {
            this.hotToastService.error(res.errors);
          }
        });
    } else {
      this.hotToastService.error(['Chưa chọn file']);
    }
  }

  deleteDocument() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: ClassesConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa tài liệu',
        items: this.listItemSelectedDoc.map((x) => x.name),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        this.service
          .deleteDocumentsFromClass(this.listItemSelectedDoc.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.hotToastService.success(res.message);
              this.loadDataDoc(this.hmzRequestDoc);
            } else {
              this.hotToastService.error(res.errors);
            }
          });
      }
    });
  }

  goChat(user: any) {
    this.class.subscribe((res) => {
      const dialogRef = this.dialog.open(RoomChatComponent, {
        width: ClassesConstant.DialogSize.VH150,
        maxHeight: '80vh',
        data: {
          class: res.entity,
          user: user,
        },
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result) => {});
    });
  }
}
