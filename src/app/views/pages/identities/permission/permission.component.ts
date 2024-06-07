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
import { disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AddPermissionComponent } from './add-permission/add-permission.component';
import { PermissionConstant } from './permission.constant';
import { PermissionService } from './permission.service';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
})
export class PermissionComponent implements OnInit {
  columns = PermissionConstant.columns();
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
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
      click: () => this.addPermission(),
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.editPermission(),
      disabled: true,
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deletePermission(),
      disabled: true,
    },
  ];

  constructor(
    private service: PermissionService,
    private dialog: MatDialog,
    private hotToastService: ToastService
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    this.data = this.service.getPermission(request);
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

  addPermission() {
    // open dialog
    const dialogRef = this.dialog.open(AddPermissionComponent, {
      width: '70rem',
      data: {
        title: 'Add Permission',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  editPermission() {
    // open dialog
    const dialogRef = this.dialog.open(AddPermissionComponent, {
      width: '50rem',
      data: {
        title: 'Edit Permission',
        item: this.listItemSelected[0],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  deletePermission() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: '30rem',
      data: {
        title: 'Delete Permission',
        items: this.listItemSelected.map((x) => x.Permissionname),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        this.service
          .deletePermission(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.hotToastService.success('Xóa thành công !');
              this.loadData(this.hmzRequest);
            } else {
              this.hotToastService.error(res.errors);
            }
          });
      }
    });
  }
}
