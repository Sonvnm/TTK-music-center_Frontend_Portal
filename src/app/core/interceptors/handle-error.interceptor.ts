import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class HandleErrorInterceptor implements HttpInterceptor {
  constructor(private hotToastService: ToastService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Có lỗi xảy ra'; // Một thông báo mặc định
        switch (error.status) {
          case 400: // Bad Request
            errorMessage = 'Yêu cầu không hợp lệ';
            break;
          case 401: // Unauthorized
            errorMessage = 'Không có quyền truy cập';
            break;
          case 403: // Forbidden
            errorMessage = 'Không có quyền truy cập';
            break;
          case 404: // Not Found
            errorMessage = 'Không tìm thấy dữ liệu';
            break;
          case 500: // Internal Server Error
            errorMessage = 'Lỗi máy chủ';
            break;
          case 503: // Service Unavailable
            errorMessage = 'Dịch vụ không khả dụng';
            break;
          default:
            errorMessage = error.message ? error.message : 'Có lỗi xảy ra';
            break;
        }
        this.hotToastService.error([errorMessage]); // Hiển thị thông báo lỗi
        return throwError(error);
      })
    );
  }
}
