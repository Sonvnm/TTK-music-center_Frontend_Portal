import { ApiConstant } from 'src/app/shared/ApiConstant';

export class DashboardConstant extends ApiConstant {
  static Dashboard = {
    GetDashboardUsers: this.BASE_URL + '/Dashboard/GetDashboardUsers',
    GetDashboardOrders: this.BASE_URL + '/Dashboard/GetDashboardOrders',
    GetDashboardLearningProcess:
      this.BASE_URL + '/Dashboard/GetDashboardLearningProcess',
    GetCourseStatistics: this.BASE_URL + '/Dashboard/GetCourseStatistics',
  };
}
