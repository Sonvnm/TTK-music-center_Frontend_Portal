import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
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
import { RoleConstant } from '../role.constant';
import { RoleService } from '../role.service';
import { AddRolePermissionComponent } from './add-role-permission/add-role-permission.component';

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.scss'],
})
export class DetailRoleComponent implements OnInit {
  role: Observable<any> = new Observable<any>();
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Code',
      name: 'code',
      disabled: true,
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Role Name',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Role Name is required',
      },
    },
  ];

  columns: ITableColumn[] = RoleConstant.columnDetails();
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {
      roleCode: this.route.snapshot.paramMap.get('code') ?? '',
    },
    sortColumns: [],
  };
  buttons: IButton[] = [
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
      click: () => this.deleteRolePermission(),
      disabled: true,
    },
  ];
  constructor(
    private route: ActivatedRoute,
    private service: RoleService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private location: Location
  ) {}
  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.role = this.service.getByCode(code);
      this.loadData(this.hmzRequest);
    }
  }
  loadData(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        roleCode: this.route.snapshot.paramMap.get('code') ?? '',
      },
    };
    this.service.getAllPermissionByRoleName(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }
  onRequest(e: any) {
    this.hmzRequest = {
      ...e,
      entity: {
        ...e.entity,
        roleCode: this.route.snapshot.paramMap.get('code') ?? '',
      },
    };
    this.loadData(this.hmzRequest);
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }
  onFormChange(e: any) {
    console.log(e);
  }
  onFormSubmit(e: any) {
    console.log(e);
  }

  addRolePermission() {
    const dialogRef = this.dialog.open(AddRolePermissionComponent, {
      width: '80rem',
      data: {
        title: 'Add Permission to Role',
        roleCode: this.route.snapshot.paramMap.get('code') ?? '',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  deleteRolePermission() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: '30rem',
      data: {
        title: 'Delete Role',
        items: this.listItemSelected.map((x) => x.value + ' - ' + x.code),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.isDelete) {
        this.service
          .deleteRolePermission(
            this.route.snapshot.paramMap.get('code') ?? '',
            this.listItemSelected.map((x) => x.id)
          )
          .subscribe((res) => {
            if (res.success) {
              this.hotToastService.success(
                'Delete Role ' + res.entity + ' Permission Success'
              );
              this.loadData(this.hmzRequest);
            } else {
              this.hotToastService.error(res.errors);
            }
          });
      }
    });
  }
}
