import { Component, OnInit } from '@angular/core';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import { StudentProcessConstant } from './student-process.constant';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { EButtonIcon, EButtonMatStyle, EButtonType, IButton } from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentProcessService } from './student-process.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ETableDefault } from 'src/app/shared/enums';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-process',
  templateUrl: './student-process.component.html',
  styleUrls: ['./student-process.component.scss']
})
export class StudentProcessComponent implements OnInit {

  columns = StudentProcessConstant.columns(this.dialog);
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
    private service: StudentProcessService,
    private dialog: MatDialog,
    private toastsService: ToastService,
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

  onRequest(e: IHMZRequest) {
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
      width: StudentProcessConstant.DialogSize.CONFIRM_DIALOG,
      data: {
        title: 'Xóa quá trình học của học viên',
        items: this.listItemSelected.map((x) => x.username),
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isDelete) {
        this.service
          .deleteAsync(this.listItemSelected.map((x) => x.id))
          .subscribe((res) => {
            if (res.success) {
              this.toastsService.success(res.message);
              this.loadData(this.hmzRequest);
            } else {
              this.toastsService.error(res.errors);
            }
          });
      }
    });
  }
}
