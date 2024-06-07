import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { AddUserComponent } from './add-user/add-user.component';
import { UsersConstant } from './users.constant';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  columns = UsersConstant.columns;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'Common.Button.Add',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      click: () => this.addUser(),
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.editUser(),
      disabled: true,
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deleteUser(),
      disabled: true,
    },
    {
      id: EButtonType.Export,
      title: 'Common.Button.Export',
      icon: EButtonIcon.Export,
      style: EButtonMatStyle.Primary,
      click: () => this.service.exportUser(this.hmzRequest),
    },
  ];

  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    private hotToastService: ToastService
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    this.service.getUsers(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }
  onRequest(e: any) {
    console.log(e);
    this.loadData(e);
  }
  onSelectChange(e: any) {
    console.log(e);

    this.listItemSelected = e

    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Edit,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }

  addUser() {
    // open dialog
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: UsersConstant.DialogSize.EXTRA_LARGE,
      data: {
        title: 'Thêm mới người dùng',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  editUser() {
    // open dialog
    const dialogRef = this.dialog.open(AddUserComponent, {
      height: UsersConstant.DialogSize.EXTRA_LARGE,
      data: {
        title: 'Cập nhật người dùng',
        item: this.listItemSelected,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  deleteUser() {
    // open dialog
    console.log(this.listItemSelected);

    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: UsersConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa người dùng',
        items: [this.listItemSelected.username],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service
          .deleteUser([this.listItemSelected.id])
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
