import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Số phần tử mỗi trang';
  override nextPageLabel = 'Trang kế';
  override previousPageLabel = 'Trang trước';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 của ' + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' của ' + length;
  };
}
