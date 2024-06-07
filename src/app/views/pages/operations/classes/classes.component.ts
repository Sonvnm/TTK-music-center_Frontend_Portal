import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../auth/auth.service';
import { CoursesConstant } from '../courses/courses.constant';
import { AddClassComponent } from './add-class/add-class.component';
import { ClassesConstant } from './class.constant';
import { ClassesService } from './classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  columns: any;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    // entity: {},
    sortColumns: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'Common.Button.Add',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.add(),
      isShow: this.authService.isRole('Admin'),
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.edit(),
      disabled: true,
      isShow: this.authService.isRole('Admin'),
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
      isShow: this.authService.isRole('Admin'),
    },
  ];

  constructor(
    private service: ClassesService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
    this.columns = ClassesConstant.columns(this.router);
  }
  loadData(request: IHMZRequest) {
    this.service.getAllAsync(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }
  onRequest(e: any) {
    this.loadData(e);
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;

    disableButton(
      this.listItemSelected.length === 0 || this.listItemSelected.length > 1,
      EButtonType.Edit,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }

  add() {
    // open dialog
    const dialogRef = this.dialog.open(AddClassComponent, {
      width: CoursesConstant.DialogSize.EXTRA_LARGE,
      data: {
        title: 'Thêm mới lớp',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((e) => {
      console.log(e);
      this.loadData(this.hmzRequest);
    });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(result);
    // });
  }
  edit() {
    // open dialog
    const dialogRef = this.dialog.open(AddClassComponent, {
      width: CoursesConstant.DialogSize.EXTRA_LARGE,
      data: {
        title: 'Sửa lớp',
        item: this.listItemSelected[0],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: CoursesConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa lớp học',
        items: this.listItemSelected.map((x) => x.name),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service
          .deleteAsync(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
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
}
