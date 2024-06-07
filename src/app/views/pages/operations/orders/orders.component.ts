import { Component, OnInit } from '@angular/core';
import { OrdersConstant } from './orders.constant';
import { Observable } from 'rxjs';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ETableDefault } from 'src/app/shared/enums';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { OrdersService } from './orders.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  columns = OrdersConstant.columns(this.dialog, this.router);
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
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
    },
  ];

  constructor(
    private service: OrdersService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
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
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: OrdersConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa đơn hàng',
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
              this.toastService.success(res.message);
              this.loadData(this.hmzRequest);
            } else {
              this.toastService.error(res.errors);
            }
          });
      }
    });
  }
}
