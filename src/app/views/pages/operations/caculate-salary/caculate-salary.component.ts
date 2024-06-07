import { Component, OnInit } from '@angular/core';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { UsersService } from '../../identities/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ETableDefault } from 'src/app/shared/enums';
import { CalculateConstant } from './caculate-salary.constant';
import { Observable } from 'rxjs';
import { AddUserComponent } from '../../identities/users/add-user/add-user.component';
import { UsersConstant } from '../../identities/users/users.constant';
import { CaculateSalaryService } from './caculate-salary.service';
import { PaymentSalaryComponent } from './payment-salary/payment-salary.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caculate-salary',
  templateUrl: './caculate-salary.component.html',
  styleUrls: ['./caculate-salary.component.scss'],
})
export class CaculateSalaryComponent implements OnInit {
  columns = CalculateConstant.columns;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {
      roles: 'teacher',
    },
    sortColumns: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'Trả lương',
      icon: EButtonIcon.Payment,
      style: EButtonMatStyle.Primary,
      click: () => this.payment(),
      disabled: true,
    },
  ];

  constructor(
    private userService: UsersService,
    private service: CaculateSalaryService,
    private dialog: MatDialog,
    private hotToastService: ToastService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadData(this.hmzRequest);
  }

  loadData(request: IHMZRequest) {
    this.userService.getUsers(request).subscribe((res) => {
      this.data = createObservable(res);
    });
  }

  onRequest(e: any) {
    console.log(e);
    e.entity.roles = 'teacher';
    this.loadData(e);
  }

  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(e?.length === 0, EButtonType.Add, this.buttons);
  }

  payment() {
    // open dialog
    const dialogRef = this.dialog.open(PaymentSalaryComponent, {
      width: UsersConstant.DialogSize.VH100,
      data: {
        title:
          'Trả lương cho giảng viên ' +
          this.listItemSelected?.firstName +
          ' ' +
          this.listItemSelected?.lastName,
        user: this.listItemSelected,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.isSave) {
        this.router.navigate(['systems/histories/banking']);
      }
    });
  }
}
