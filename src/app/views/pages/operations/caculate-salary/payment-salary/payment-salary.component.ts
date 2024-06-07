import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Observable } from 'rxjs';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault } from 'src/app/shared/enums';
import {
  createFormData,
  createObservable,
  disableButton,
  getLocalTime,
  toDateTime,
} from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { AuthService } from '../../../auth/auth.service';
import { LearningProcessConstant } from '../../learning-process/learning-process.constant';
import { LearningProcessService } from '../../learning-process/learning-process.service';
import { CaculateSalaryService } from '../caculate-salary.service';

@Component({
  selector: 'app-payment-salary',
  templateUrl: './payment-salary.component.html',
  styleUrls: ['./payment-salary.component.scss'],
})
export class PaymentSalaryComponent implements OnInit {
  @ViewChild('content', { static: true }) content: any;
  columns = LearningProcessConstant.columnsCalculateSalary();
  data!: Observable<IHMZDataSource>;
  dataSave: any;
  item: any = {};
  isReload = false;
  title: string;
  user: any;
  username: string;
  month = new Date().getMonth() + 1;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  learningProcessList: any = [];
  calculateDate = {
    fromValue: new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 1}-1`
    ),
    toValue: new Date(
      `${new Date().getFullYear()}-${new Date().getMonth() + 2}-1`
    ),
  };
  toDateTime(valueFormatter: any) {
    return toDateTime(valueFormatter);
  }
  buttons: IButton[] = [
    {
      id: EButtonType.Save,
      title: 'Trả lương',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => this.save(),
      isShow: this.authService.isRole('Admin'),
    },

    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.closeDialog(),
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<PaymentSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public dataRef: any,
    private service: CaculateSalaryService,
    private hotToast: ToastService,
    private authService: AuthService,
    private matDialog: MatDialog,
    private processService: LearningProcessService
  ) {
    this.title = dataRef?.title ?? this.title;
    this.username = dataRef.user.username;
    this.user = dataRef.user;
  }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.processService.getByUsernameForPaymentSalary(this.username).subscribe((res: any) => {
      if (res.success) {
        this.data = createObservable(res);
        this.learningProcessList = res.items;
        this.calculateSalary();
      }
    });
  }

  calculateSalary(e: any = null) {
    this.service
      .calculateSalaryAsync({
        username: this.dataRef.user.username,
        calculateDate: {
          fromValue: getLocalTime(this.calculateDate.fromValue),
          toValue: getLocalTime(this.calculateDate.toValue),
        },
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.item = res.entity;
          disableButton(
            res.entity.amount === 0,
            EButtonType.Save,
            this.buttons
          );
        } else {
          this.hotToast.error(res.errors);
        }
      });
  }

  closeDialog(): void {
    this.dialogRef.close({
      isSave: false,
    });
  }

  save() {
    const data = this.content.nativeElement;
    this.content.nativeElement.style.display = 'block';
    html2canvas(data).then((canvas: any) => {
      const width = canvas.width;
      const height = canvas.height;
      const pdf = new jsPDF('l', 'px', [width, height]);

      var imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 0, 0, width, height);
      const file = pdf.output('blob');
      if (this.item) {
        const data = {
          username: this.dataRef.user.username,
          fromDate: this.calculateDate.fromValue.toISOString(),
          toDate: this.calculateDate.toValue.toISOString(),
          amount: this.item.amount,
          description: this.item.description,
        };
        const formData = createFormData(data, file);

        this.add(formData);
      } else {
        this.hotToast.error(['Vui lòng điền đầy đủ thông tin']);
      }
    });
    this.content.nativeElement.style.display = 'none';
  }
  add(data: any) {
    this.service.paymentSalaryAsync(data).subscribe((res: any) => {
      if (res.success) {
        this.hotToast.success(res.message);
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }
}
