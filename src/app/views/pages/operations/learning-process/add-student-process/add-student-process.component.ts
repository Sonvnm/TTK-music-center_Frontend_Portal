import { Component, Inject, OnInit } from '@angular/core';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import {
  createObservable,
  disableButton,
  toDateTime,
} from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { StudentProcessService } from '../../student-process/student-process.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Router } from '@angular/router';
import { ETableDefault } from 'src/app/shared/enums';
import { Observable, map } from 'rxjs';
import { StudentProcessConstant } from '../../student-process/student-process.constant';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { UpdateProcessStudentComponent } from './update-process-student/update-process-student.component';
import { LearningProcessService } from '../learning-process.service';
import { ClassesService } from '../../classes/classes.service';

@Component({
  selector: 'app-add-student-process',
  templateUrl: './add-student-process.component.html',
  styleUrls: ['./add-student-process.component.scss'],
})
export class AddStudentProcessComponent implements OnInit {
  columns = StudentProcessConstant.columns(this.dialog);
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  title = 'Danh sách học viên đi học';
  items: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Edit,
      title: 'Điểm danh',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.edit(),
    },
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.dialogRef.close(this.isSave),
    },
  ];
  isSave: boolean;
  isUpdate: any;

  constructor(
    private service: StudentProcessService,
    private dialog: MatDialog,
    private toastsService: ToastService,
    private router: Router,
    public dialogRef: MatDialogRef<AddStudentProcessComponent>,
    private learningProcessService: LearningProcessService,
    private classService: ClassesService,
    @Inject(MAT_DIALOG_DATA) public dataRef: any
  ) {}
  ngOnInit(): void {
    this.title = `Danh sách học viên đi học từ  ${toDateTime(
      this.dataRef.startTime
    )} tới ${toDateTime(this.dataRef.endTime)}`;
    console.log(this.dataRef);

    if (this.dataRef?.status == 'New') {
      this.classService
        .getStudentsClassByClassId(this.dataRef.classId)
        .subscribe((res) => {
          this.items = res.items[0].studentClasses;
          if (this.items.length <= 0) {
            this.toastsService.error(['Lớp học không có học viên nào']);
            disableButton(true, EButtonType.Edit, this.buttons);
          }
          this.items.map((item: any) => {
            (item.isAbsent = true),
              (item.description = ''),
              (item.username = item.user.firstName + ' ' + item.user.lastName);
          });
        });
    } else {
      this.buttons.map((res) =>
        res.id == EButtonType.Edit
          ? (res.title = 'Cập nhật điểm danh')
          : (res.title = 'Đóng')
      );
      this.isUpdate = true;
      this.loadData(this.hmzRequest);
    }
  }

  loadData(request: IHMZRequest) {
    this.service
      .getAllByLearningProcessIdAsync(request, this.dataRef.id)
      .subscribe((res) => {
        this.items = res.items;
      });
  }

  delete() {
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: StudentProcessConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa Tiến trình học của học viên',
        items: this.listItemSelected.map((x) => x.code + ' - ' + x.username),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        this.service
          .deleteAsync(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.toastsService.success(res.message);
              this.loadData(this.hmzRequest);
            } else {
              this.toastsService.error(res.errors);
            }
          });
      }
    });
  }

  edit() {
    this.items.map((item: any) => {
      item.isUpdate = this.isUpdate;
    });
    if (this.isUpdate) {
      this.service.createsAsync(this.items).subscribe((res) => {
        if (res.success) {
          this.toastsService.success(res.message);
          this.isSave = true;
          this.loadData(this.hmzRequest);
        } else {
          this.toastsService.error(res.errors);
        }
      });
    } else {
      this.items.map((item: any) => {
        item.learningProcessId = this.dataRef.id;
      });
      this.service.createsAsync(this.items).subscribe((res) => {
        if (res.success) {
          this.toastsService.success(res.message);
          this.isSave = true;
          this.isUpdate = true;
          this.buttons.map((res) =>
          res.id == EButtonType.Edit
            ? (res.title = 'Cập nhật điểm danh')
            : (res.title = 'Đóng')
        );
          this.loadData(this.hmzRequest);
        } else {
          this.toastsService.error(res.errors);
        }
      });
    }
    // const dialogRef = this.dialog.open(UpdateProcessStudentComponent, {
    //   width: StudentProcessConstant.DialogSize.LARGE_XL,
    //   data: {
    //     title: 'Cập nhật Tiến trình học của học viên',
    //     item: this.listItemSelected,
    //   },
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result.isSave) {
    //     this.loadData(this.hmzRequest);
    //   }
    // });
  }
}
