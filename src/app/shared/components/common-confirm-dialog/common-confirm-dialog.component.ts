import { Component, Inject } from '@angular/core';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from '../hmz-buttons/buttons.constant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-common-confirm-dialog',
  templateUrl: './common-confirm-dialog.component.html',
  styleUrls: ['./common-confirm-dialog.component.scss'],
})
export class CommonConfirmDialogComponent {
  isDelete = false;
  title = 'common.confirm.delete.title';
  items = [];
  pageConfig = {
    pageIndex: 0,
    pageSize: 5,
    totalItems: 0,
    items: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Yes,
      title: 'Common.Button.Yes',
      icon: EButtonIcon.Yes,
      style: EButtonMatStyle.Warn,
      click: () => this.confirmDelete(EButtonType.Yes),
    },
    {
      id: EButtonType.No,
      title: 'Common.Button.No',
      icon: EButtonIcon.No,
      style: EButtonMatStyle.Primary,
      click: () => this.closeDialog(),
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<CommonConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title ?? data.title;
    this.items = data.items ?? [];
    this.initData(this.pageConfig);
  }

  confirmDelete(type: EButtonType) {
    if (type === EButtonType.Yes) {
      this.isDelete = true;
      this.closeDialog();
      return;
    }
    this.isDelete = false;
    this.closeDialog();
  }

  closeDialog() {
    this.dialogRef.close({
      isDelete: this.isDelete,
    });
  }
  initData(pageConfig: any) {
    // data to page
    this.pageConfig = {
      ...this.pageConfig,
      totalItems: this.items.length,
      items: this.items.slice(
        pageConfig.pageIndex * pageConfig.pageSize,
        (pageConfig.pageIndex + 1) * pageConfig.pageSize
      ),
    };
  }
  onChangePage(e: any) {
    this.pageConfig = {
      ...this.pageConfig,
      pageIndex: e.pageIndex,
      pageSize: e.pageSize,
      items: this.items.slice(
        e.pageIndex * e.pageSize,
        (e.pageIndex + 1) * e.pageSize
      ),
    };
    this.initData(this.pageConfig);
  }
}
