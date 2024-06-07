export interface IHMZRequest {
  pageNumber: number;
  pageSize: number;
  entity?: any;
  sortColumns?: any[];
  sortOrder?: boolean;
}
export interface IHMZDataSource {
  entity: any;
  errors: any[];
  items: any[];
  success: boolean;
  totalRecords: number;
}
export interface IHMZPageOptions {
  pageSize: number;
  pageSizeOptions: number[];
  pageIndex: number;
}
