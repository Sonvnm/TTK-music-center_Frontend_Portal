import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import {
  EColumnType,
  ITableColumn,
} from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UsersConstant } from 'src/app/views/pages/identities/users/users.constant';
import { ClassesService } from '../../classes.service';

@Component({
  selector: 'app-add-student-class',
  templateUrl: './add-student-class.component.html',
  styleUrls: ['./add-student-class.component.scss'],
})
export class AddStudentClassComponent implements OnInit {
  isSave: boolean = false;
  buttons: IButton[] = [
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => this.save(),
      disabled: true,
    },
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Primary,
      click: () => this.dialogRef.close({ isSave: this.isSave }),
    },
  ];
  title = 'Thêm học viên vào lớp';

  dataPermission!: Observable<IHMZDataSource>;
  listItemSelected: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };

  columHidden = ['roles', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'];
  columns = UsersConstant.columns.map((item: ITableColumn) => {
    if (item.field === 'code') {
      item.type = EColumnType.Text;
      item.event = () => {};
    }
    if (this.columHidden.includes(item.field)) {
      item.hidden = true;
    }
    return item;
  });
  isTeacher = false;

  constructor(
    public dialogRef: MatDialogRef<AddStudentClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClassesService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {
    this.title = data.title ?? this.title;
  }

  ngOnInit(): void {
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        classCode: this.data.classCode,
      },
    };
    this.isTeacher = this.data.isTeacher;
    if (this.data.isTeacher) {
      this.service.getTeacherNotInClass(request).subscribe((res) => {
        this.dataPermission = createObservable(res);
      });
    } else {
      this.service.getStudentNotInClass(request).subscribe((res) => {
        this.dataPermission = createObservable(res);
      });
    }
  }
  onRequest(e: any) {
    this.loadData(e);
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Save,
      this.buttons
    );
  }
  save() {
    console.log(this.listItemSelected);
    const userCode = this.isTeacher
      ? [this.listItemSelected.code]
      : this.listItemSelected.map((item: any) => item.code);
    const data = {
      userCode,
      classCode: this.data.classCode,
    };
    this.service.addStudentClass(data, this.isTeacher).subscribe((res) => {
      if (res.success) {
        this.loadData(this.hmzRequest);
        this.toastService.success(res.message);
        this.isSave = true;
      } else {
        this.toastService.error(res.errors);
      }
    });
  }
}
