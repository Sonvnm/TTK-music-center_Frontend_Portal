import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleConstant } from './role.constant';
import { RoleService } from './role.service';
import { ITableColumn } from 'src/app/shared/components/hmz-table/hmz-table.interface';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ETableDefault } from 'src/app/shared/enums';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { AddRoleComponent } from './add-role/add-role.component';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
  columns!: ITableColumn[];
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
      click: () => this.addRole(),
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.editRole(),
      disabled: true,
    },
    {
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.deleteRole(),
      disabled: true,
    },
  ];

  constructor(
    private service: RoleService,
    private dialog: MatDialog,
    private hotToastService: HotToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.columns = RoleConstant.columns(this.router);
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    this.service.getRole(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }
  onRequest(e: any) {
    console.log(e);
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

  addRole() {
    // open dialog
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '70rem',
      data: {
        title: 'Add Role',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  editRole() {
    // open dialog
    const dialogRef = this.dialog.open(AddRoleComponent, {
      width: '50rem',
      data: {
        title: 'Edit Role',
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
  deleteRole() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: '30rem',
      data: {
        title: 'Delete Role',
        items: this.listItemSelected.map((x) => x.Rolename),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        this.service
          .deleteRole(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.hotToastService.success('Delete success');
              this.loadData(this.hmzRequest);
            } else {
              this.hotToastService.error(res.errors.join(', '));
            }
          });
      }
    });
  }
}
