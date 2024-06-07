import { Component, Inject, OnInit } from '@angular/core';
import { OrdersConstant } from '../orders.constant';
import { Observable } from 'rxjs';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ETableDefault } from 'src/app/shared/enums';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { OrdersService } from '../orders.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss'],
})
export class OrdersDetailComponent implements OnInit {
  columns = OrdersConstant.columnsDetail();
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  buttons: IButton[] = [
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      // click: () => this.dialogRef.close(),
    },
  ];
  code: string;
  constructor(
    private service: OrdersService,
    private toastService: ToastService,
    private activatedRoute:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.code = this.activatedRoute.snapshot.paramMap.get('code') || '';
    if (!this.code) {
      this.toastService.success('Không tìm thấy mã đơn hàng');

    }
    this.loadData(this.code);
  }

  loadData(code: string) {
    this.service.getByCodeAsync(code).subscribe((res) => {
      if (res.entity.orderDetails.length > 0) {
        res.items = res.entity.orderDetails;
      }
      console.log(res);

      this.data = createObservable(res);
    });
  }

  onRequest(e: any) {
    this.loadData(this.code);
  }
}
