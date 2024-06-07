import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { isEmpty } from '../../hmz-helper';
import {
  IHMZDataSource,
  IHMZPageOptions,
  IHMZRequest,
} from '../../hmz-interface';
import { ITableColumn } from './hmz-table.interface';

@Component({
  selector: 'app-hmz-table',
  templateUrl: './hmz-table.component.html',
  styleUrls: ['./hmz-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class HmzTableComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() columns!: ITableColumn[];
  @Input() data: Observable<IHMZDataSource>;

  @Output() onRequest: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPageChange: EventEmitter<any> = new EventEmitter<any>();

  // Select
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() multiSelect: boolean = false;
  @Input() showSelect: boolean = false;

  @Input() pageOptions: IHMZPageOptions = {
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  };
  selectedItems: any[] = [];
  checkAll = false;
  columnFilters: { [key: string]: string } = {};
  dataRequest!: IHMZRequest;
  source: IHMZDataSource = {
    entity: {},
    errors: [],
    items: [],
    success: false,
    totalRecords: 0,
  };

  constructor() {
    this.dataRequest = {
      pageNumber: this.pageOptions.pageIndex,
      pageSize: this.pageOptions.pageSize,
      sortColumns: [],
      entity: {},
    };
  }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.selectedItems = [];
      this.checkAll = false;
      this.onSelect.emit(this.selectedItems);
      this.loadData();
    }
  }

  loadData() {
    if (this.data) {
      this.data.subscribe((res) => {
        this.source = {
          ...res,
          items: [
            ...res?.items?.map((item: any) => {
              return {
                ...item,
                selected: false,
              };
            }),
          ],
        };
      });
    }
  }
  sort(colum: any) {
    // change asc /desc
    let sortOrder = false;
    if (colum.sortType === 'asc') {
      colum.sortType = 'desc';
      sortOrder = true;
    } else {
      colum.sortType = 'asc';
      sortOrder = false;
    }
    this.dataRequest = {
      ...this.dataRequest,
      sortOrder: sortOrder,
      sortColumns: [colum.field],
    };
    this.onRequest.emit(this.dataRequest);
  }
  pageChange(e: any) {
    this.dataRequest = {
      ...this.dataRequest,
      pageNumber: e.pageIndex === 0 ? 1 : e.pageIndex + 1,
      pageSize: e.pageSize,
    };
    this.onRequest.emit(this.dataRequest);
  }
  request() {
    this.onRequest.emit(this.dataRequest);
  }
  onFilter() {
    this.dataRequest = {
      ...this.dataRequest,
      entity: this.columnFilters,
    };
    this.request();
  }
  onDateRangeSelected(
    column: ITableColumn,
    dateRange: { fromDate: Date; toDate: Date }
  ) {
    const dateRangeFilter = {
      [column.field]: {
        fromValue: isEmpty(dateRange.fromDate) ? null : dateRange.fromDate,
        toValue: isEmpty(dateRange.toDate) ? null : dateRange.toDate,
      },
    };
    this.dataRequest = {
      ...this.dataRequest,
      entity: dateRangeFilter,
    };
  }
  onDateRangeEnter(e: any) {
    this.request();
  }
  onNumberRangeSelected(
    column: ITableColumn,
    numberRange: { fromNumber: number; toNumber: number }
  ) {
    const numberRangeFilter = {
      [column.field]: {
        fromValue: isEmpty(numberRange.fromNumber)
          ? null
          : numberRange.fromNumber,
        toValue: isEmpty(numberRange.toNumber) ? null : numberRange.toNumber,
      },
    };
    this.dataRequest = {
      ...this.dataRequest,
      entity: numberRangeFilter,
    };
  }
  onNumberRangeEnter(e: any) {
    this.request();
  }

  toggleRowSelection(item: any) {
    console.log('selectedItems', this.selectedItems);
    // push item to selectedItems
    if (this.selectedItems.length === 0) {
      this.selectedItems.push(item);
      if (!this.multiSelect) {
        this.onSelect.emit(item);
        return;
      }
      this.onSelect.emit(this.selectedItems);
      return;
    }
    // check if item has in selectedItems
    const exists = this.selectedItems.some(
      (selectedItem) =>
        selectedItem.id === item.id || selectedItem.code === item.code
    );

    if (exists) {
      // remove item from selectedItems
      this.selectedItems = this.selectedItems.filter(
        (selectedItem) =>
          selectedItem.id !== item.id && selectedItem.code !== item.code
      );
    } else {
      // if multiSelect is false, clear selectedItems
      if (!this.multiSelect) {
        this.selectedItems = [item];
        this.onSelect.emit(item); // emit the item directly
      } else {
        this.selectedItems.push(item);
        this.onSelect.emit(this.selectedItems);
      }
      return;
    }

    this.checkAll = this.selectedItems.length > 0 ? true : false;
    this.onSelect.emit(this.selectedItems);
  }

  toggleSelectAll() {
    const items = [...this.source.items];

    this.selectedItems = this.checkAll ? items : [];
    this.onSelect.emit(this.selectedItems);
  }

  isChecked(item: any): boolean {
    const res = this.selectedItems.filter((selectedItem) =>
      selectedItem?.id
        ? selectedItem?.id === item.id
        : selectedItem?.code === item.code
    );
    return res && res.length > 0;
  }

  onSelectFilter(column: ITableColumn, value: any) {
    this.columnFilters = {
      ...this.columnFilters,
      [column.field]: value,
    };
    this.onFilter();
  }
}
