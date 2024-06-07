import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { PermissionConstant } from '../../../permission/permission.constant';
import { PermissionService } from '../../../permission/permission.service';

@Component({
  selector: 'app-add-role-permission',
  templateUrl: './add-role-permission.component.html',
  styleUrls: ['./add-role-permission.component.scss'],
})
export class AddRolePermissionComponent implements OnInit {
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
      click: () => this.dialogRef.close(),
    },
  ];
  title = 'Add Permission to Role';

  dataPermission!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };

  columns = PermissionConstant.columns();
  constructor(
    public dialogRef: MatDialogRef<AddRolePermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PermissionService,
    private dialog: MatDialog,
    private hotToastService: HotToastService
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
        roleCode: this.data.roleCode,
      },
    };
    this.service.getPermissionNotInRoleCode(request).subscribe((res) => {
      this.dataPermission = createObservable(res);
    });
  }
  onRequest(e: any) {
    console.log(e);
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
    const permissionsId = this.listItemSelected.map((item) => item.id);
    this.service
      .addPermissionsToRole(permissionsId, this.data.roleCode)
      .subscribe((res) => {
        if (res.success) {
          this.hotToastService.success(
            'Add ' + res.entity + ' permission(s) to role successfully'
          );
          this.dialogRef.close({
            isSave: true,
          });
        } else {
          this.hotToastService.error(res.errors.join(', '));
        }
      });
  }
}
