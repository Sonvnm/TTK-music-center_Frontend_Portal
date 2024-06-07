import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardConstant } from './dashboard.constant';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getUserChart(filter: any): Observable<any> {
    return this.http.post(
      DashboardConstant.Dashboard.GetDashboardUsers,
      filter,
      DashboardConstant.options
    );
  }

  getOrderChart(filter: any): Observable<any> {
    return this.http.post(
      DashboardConstant.Dashboard.GetDashboardOrders,
      filter,
      DashboardConstant.options
    );
  }

  getGrowthChart(filter: any): Observable<any> {
    return this.http.post(
      DashboardConstant.Dashboard.GetDashboardLearningProcess,
      filter,
      DashboardConstant.options
    );
  }
  getCourseStatistics(): Observable<any> {
    return this.http.get(DashboardConstant.Dashboard.GetCourseStatistics);
  }
}
