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
import { AddRoomComponent } from '../rooms/add-room/add-room.component';
import { RoomsConstant } from '../rooms/rooms.constant';
import { ReviewConstant } from './review.constant';
import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  columns = ReviewConstant.columns;
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
      click: () => this.add(),
    },
    {
      id: EButtonType.Edit,
      title: 'Common.Button.Edit',
      icon: EButtonIcon.Edit,
      style: EButtonMatStyle.Primary,
      click: () => this.edit(),
      disabled: true,
    },
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
    private service: ReviewService,
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

  onRequest(e: IHMZRequest) {
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

  add() {
    // open dialog
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: RoomsConstant.DialogSize.LARGE_XL,
      data: {
        title: 'Thêm mới phòng',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  edit() {
    // open dialog
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: RoomsConstant.DialogSize.LARGE_XL,
      data: {
        title: 'Sửa phòng',
        item: this.listItemSelected[0],
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (result.isSave) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: RoomsConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa Phòng',
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
