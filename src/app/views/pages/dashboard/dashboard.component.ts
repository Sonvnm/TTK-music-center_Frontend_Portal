import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from './dashboard.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { toNumber } from 'src/app/shared/hmz-helper';
import { fontFamily } from 'html2canvas/dist/types/css/property-descriptors/font-family';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  preserveWhitespaces: true,
})
export class DashboardComponent implements OnInit {
  currentDate: NgbDateStruct;
  customersChartOptions: any = {};
  ordersChartOptions: any = {};
  growthChartOptions: any = {};
  courseStatisticsChart: any;
  courseStatistics: any;
  revenueChartOptions: any;

  users: any;
  orders: any;
  growth: any;

  obj = {
    primary: '#6571ff',
    secondary: '#7987a1',
    success: '#05a34a',
    info: '#66d1d1',
    warning: '#fbbc06',
    danger: '#ff3366',
    light: '#e9ecef',
    dark: '#060c17',
    muted: '#7987a1',
    gridBorder: 'rgba(77, 138, 240, .15)',
    bodyColor: '#000',
    cardBg: '#fff',
    fontFamily: "'Roboto', Helvetica, sans-serif",
  };

  displayedColumns: string[] = ['courseName', 'totalOrder', 'totalPrice'];
  dataSource = new MatTableDataSource();
  sellsChartOptions: any;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private calendar: NgbCalendar,
    private service: DashboardService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator=this.paginator
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  ngOnInit(): void {
    this.currentDate = this.calendar.getToday();

    this.getCustomerseChartOptions(this.obj);
    this.getCourseStatisticsChart();
  }

  getCourseStatisticsChart() {
    this.service.getCourseStatistics().subscribe((res) => {
      if (res.success) {
        this.courseStatistics = res.entity;
        this.dataSource.data = res.entity.topCourse;
        this.ordersChartOptions = {
          series: [
            this.courseStatistics.orderStatistic.pendingOrder,
            this.courseStatistics.orderStatistic.doneOrder,
            this.courseStatistics.orderStatistic.failOrder,
          ],
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: [
            'Đơn hàng đang xử lý',
            'Đơn hàng thành công',
            'Đơn hàng thất bại',
          ],
          title: {
            text: 'Tình hình các đơn hàng',
            style: {
              fontFamily: 'tahoma',
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
        this.courseStatisticsChart = {
          series: [
            this.courseStatistics.newCourse,
            this.courseStatistics.processingCourse,
            this.courseStatistics.endCourse,
          ],
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Khóa học mới', 'Khóa học đang mở', 'Khóa học đã đóng'],
          title: {
            text: 'Tình hình các khóa học',
            style: {
              fontFamily: 'tahoma',
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };
      }
    });
  }

  /**
   * Customerse chart options
   */
  getCustomerseChartOptions(obj: any) {
    this.service.getUserChart({}).subscribe((res: any) => {
      this.users = res.entity;
      if (res.success) {
        this.customersChartOptions = {
          series: [
            {
              name: 'Người dùng',
              data: [...res.entity.values],
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
          },
          colors: [obj.primary],
          xaxis: {
            // type: 'text',
            categories: [...res.entity.labels],
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          title: {
            text: 'Người dùng theo tháng',
            align: 'left',
            style: {
              fontFamily: 'tahoma',
            },
          },
          stroke: {
            width: 2,
            curve: 'smooth',
          },
        };

        this.sellsChartOptions = {
          series: [
            {
              name: 'Tổng doanh thu',
              data: [...res.entity.sells],
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (val: any) => {
              return toNumber(val + 'VNĐ');
            },
          },
          colors: [obj.primary],
          xaxis: {
            // type: 'text',
            categories: [...res.entity.labels],
          },
          yaxis: {
            labels: {
              formatter: (val: any) => {
                return toNumber(val) ? toNumber(val) : 0;
              },
            },
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          title: {
            text: 'Tổng doanh thu theo tháng',
            align: 'left',
            style: {
              fontFamily: 'tahoma',
            },
          },

          stroke: {
            width: 2,
            curve: 'smooth',
          },
        };

        this.revenueChartOptions = {
          title: {
            text: `Tổng lợi nhuận: ${toNumber(res.entity.totalRevenue)} VNĐ`,
            style: {
              fontFamily: 'tahoma',
            },
          },
          subtitle: {
            text: 'Lợi nhuận theo tháng',
            style: {
              fontFamily: 'tahoma',
            },
          },
          series: [
            {
              name: 'Doanh thu',
              data: [...res.entity.sells],
            },
            {
              name: 'Phí trả lương',
              data: [...res.entity.paidSalary],
            },
            {
              name: 'Lợi nhuận',
              data: [...res.entity.revenue],
            },
          ],
          chart: {
            type: 'bar',
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
          },
          xaxis: {
            categories: [...res.entity.labels],
          },
          yaxis: {
            labels: {
              formatter: (val: any) => {
                return toNumber(val) ? toNumber(val) : 0;
              },
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val: any) {
                return `${toNumber(val)} VNĐ`;
              },
            },
          },
        };
      }
    });
  }

  /**
   * Orders chart options
   */
}
