import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault, ETypeHistory } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { HistoriesConstant } from '../histories.constant';
import { HistoriesService } from '../histories.service';

@Component({
  selector: 'app-bank-history',
  templateUrl: './bank-history.component.html',
  styleUrls: ['./bank-history.component.scss'],
})
export class BankHistoryComponent implements OnInit, OnDestroy {
  columns = HistoriesConstant.columns.map((x) => {
    if (x.field === 'type') {
      x.options = [
        { value: ETypeHistory.Create, label: 'Tạo mới' },
        { value: ETypeHistory.Transaction, label: 'Giao dịch' },
        { value: ETypeHistory.Update, label: 'Cập nhật' },
        { value: ETypeHistory.Other, label: 'Khác' },
      ];
      x.value = ETypeHistory.Transaction;
      x.disabled = true;
    }
    return x;
  });
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {
      type: ETypeHistory.Transaction, // "Transaction"
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
      click: () => this.delete(),
      disabled: true,
    },
    // {
    //   id: EButtonType.Export,
    //   title: 'Common.Button.Export',
    //   icon: EButtonIcon.Export,
    //   style: EButtonMatStyle.Primary,
    //   click: () => {},
    //   disabled: false,
    // },
  ];

  constructor(
    private service: HistoriesService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private location: Location
  ) {}
  ngOnDestroy(): void {
    this.columns.forEach((e) => {
      if (e.field === 'type') {
        (e.options = [
          { value: ETypeHistory.Create, label: 'Tạo mới' },
          { value: ETypeHistory.Update, label: 'Cập nhật' },
          { value: ETypeHistory.Delete, label: 'Xóa' },
          { value: ETypeHistory.Login, label: 'Đăng nhập' },
          { value: ETypeHistory.Logout, label: 'Đăng xuất' },
          { value: ETypeHistory.Error, label: 'Lỗi' },
          { value: ETypeHistory.Other, label: 'Khác' },
          { value: ETypeHistory.Transaction, label: 'Giao dịch' },
        ]),
          (e.disabled = false);
      }
    });
  }
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    this.service.getAllAsync(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }
  onRequest(e: any) {
    e.entity.type = ETypeHistory.Transaction;
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

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: HistoriesConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa log',
        items: this.listItemSelected.map((x) => x.action),
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
