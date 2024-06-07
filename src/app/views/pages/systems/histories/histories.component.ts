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
import { RoomsConstant } from '../../operations/rooms/rooms.constant';
import { HistoriesConstant } from './histories.constant';
import { HistoriesService } from './histories.service';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
})
export class HistoriesComponent implements OnInit {
  columns = HistoriesConstant.columns;
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

  delete() {
    // open dialog
    const dialogRef = this.dialog.open(CommonConfirmDialogComponent, {
      width: RoomsConstant.DialogSize.CONFIRM_DIALOG,
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
