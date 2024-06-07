import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private hotToast: HotToastService) {}
  success(message: string) {
    this.hotToast.success(message, {
      position: 'bottom-right',
      icon: '👏',
      className: 'hot-toast-success',
      style: {
        border: '1px solid green',
        padding: '1.1rem',
        color: 'black',
        fontWeight: '600',
      },
    });
  }
  error(message: string[]) {
    this.hotToast.error(message.join(', '), {
      position: 'bottom-right',
      icon: '❌',
      style: {
        border: '1px solid red',
        padding: '1.1rem',
        color: 'black',
        fontWeight: '600',
      },
    });
  }
}
