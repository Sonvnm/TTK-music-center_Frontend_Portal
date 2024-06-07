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
import { disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../../auth/auth.service';
import { ClassesConstant } from '../../classes/class.constant';
import { DocumentsService } from '../../documents/documents.service';
import { SubjectsService } from '../subjects.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.scss'],
})
export class SubjectDetailComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  subject: Observable<any> = new Observable();
  code: string = '';
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Code',
      name: 'code',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Môn học',
      name: 'name',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Textarea,
      label: 'Mô tả',
      name: 'description',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày tạo',
      name: 'createdAt',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Người tạo',
      name: 'createdBy',
      disabled: true,
    },
  ];

  columns: ITableColumn[] = ClassesConstant.columnStudentClass(
    this.authService
  );
  documentColumns: ITableColumn[] = ClassesConstant.columnDocumentsSubject();

  data!: Observable<IHMZDataSource>;
  dataDoc!: Observable<IHMZDataSource>;
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

  buttonsDoc: IButton[] = [
    {
      id: EButtonType.Back,
      title: 'Common.Button.Back',
      icon: EButtonIcon.Back,
      style: EButtonMatStyle.Primary,
      click: () => this.location.back(),
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deleteDocument(),
      disabled: true,
      isShow: this.authService.isRole('Admin'),
    },
    {
      id: EButtonType.Upload,
      title: 'Common.Button.Upload',
      icon: EButtonIcon.Upload,
      style: EButtonMatStyle.Primary,
      click: () => this.uploadDocument(),
      isShow: this.authService.isRole('Admin'),
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentsService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private location: Location,
    public authService: AuthService,
    private subjectService: SubjectsService
  ) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code') ?? '';
    if (this.code) {
      this.subject = this.subjectService.getByCodeAsync(this.code);
      this.loadDataDoc(this.hmzRequestDoc);
    }
  }

  loadDataDoc(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        subjectCode: this.code,
      },
    };
    this.dataDoc = this.documentService.getBySubject(request);
  }

  onRequestDoc(e: any) {
    this.hmzRequestDoc = {
      ...e,
      entity: {
        ...e.entity,
        subjectCode: this.code,
      },
    };
    this.loadDataDoc(this.hmzRequestDoc);
  }

  onSelectChangeDoc(e: any) {
    this.listItemSelectedDoc = e;
    disableButton(
      this.listItemSelectedDoc.length === 0,
      EButtonType.Delete,
      this.buttonsDoc
    );
  }

  uploadDocument() {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: any) {
    this.fileDoc = event.target.files[0];
    if (this.fileDoc) {
      this.documentService
        .uploadForSubjectAsync(this.fileDoc, this.code)
        .subscribe((res) => {
          if (res.success) {
            this.toastService.success(res.message);
            this.loadDataDoc(this.hmzRequestDoc);
          } else {
            this.toastService.error(res.errors);
          }
        });
    } else {
      this.toastService.error(['Chưa chọn file']);
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
        this.documentService
          .deleteAsync(this.listItemSelectedDoc.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.toastService.success(res.message);
              this.loadDataDoc(this.hmzRequestDoc);
            } else {
              this.toastService.error(res.errors);
            }
          });
      }
    });
  }
}
