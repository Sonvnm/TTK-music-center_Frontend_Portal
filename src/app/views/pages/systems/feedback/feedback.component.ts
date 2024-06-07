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
import { FeedBackConstant } from './feedback.constant';
import { FeedBackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  columns = FeedBackConstant.columns;
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
      id: EButtonType.Delete,
      title: 'Common.Button.Delete',
      icon: EButtonIcon.Delete,
      style: EButtonMatStyle.Warn,
      click: () => this.delete(),
      disabled: true,
    },
    {
      id: EButtonType.Approve,
      title: 'Common.Button.Approve',
      icon: EButtonIcon.Approve,
      style: EButtonMatStyle.Primary,
      click: () => this.approve(),
      disabled: true,
    },
    {
      id: EButtonType.Reject,
      title: 'Common.Button.Reject',
      icon: EButtonIcon.Reject,
      style: EButtonMatStyle.Warn,
      click: () => this.reject(),
      disabled: true,
    },
  ];

  status: string;

  constructor(
    private service: FeedBackService,
    private dialog: MatDialog,
    private hotToastService: ToastService
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
      this.listItemSelected.length === 0 ||
        e.status === 'Done' ||
        e.status === 'Canceled',
      EButtonType.Reject,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0 ||
        e.status === 'Done' ||
        e.status === 'Canceled',
      EButtonType.Approve,
      this.buttons
    );
  }

  approve() {
    console.log(this.listItemSelected);

    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: FeedBackConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Duyệt phản hồi',
        items: [this.listItemSelected.title],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service.approveAsync(this.listItemSelected.id).subscribe((res) => {
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

  // reject
  reject() {
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: FeedBackConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Từ chối phản hồi',
        items: [this.listItemSelected.title],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service.rejectAsync(this.listItemSelected.id).subscribe((res) => {
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

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: FeedBackConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa phản hồi',
        items: [this.listItemSelected.title],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service
          .deleteAsync([this.listItemSelected.id])
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
