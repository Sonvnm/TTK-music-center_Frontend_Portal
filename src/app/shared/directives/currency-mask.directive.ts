import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appCurrencyMask]',
})
export class CurrencyMaskDirective {
  ngControl = inject(NgControl);

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onInputChange(event);
  }

  onInputChange(event: any) {
    event = event.toString();
    let newVal = event.replace(/\D/g, '');
    console.log(newVal);

    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1');
    } else if (newVal.length <= 4) {
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})/, '$1,$2');
    } else if (newVal.length <= 5) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1,$2');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1,$2');
    } else if (newVal.length <= 7) {
      newVal = newVal.replace(/^(\d{0,1})(\d{0,3})(\d{0,4})/, '$1,$2,$3');
    } else if (newVal.length <= 8) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,4})/, '$1,$2,$3');
    } else if (newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1,$2,$3');
    } else {
      newVal = newVal.substring(0, 10);
      newVal = newVal.replace(
        /^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/,
        '$1,$2,$3,$4'
      );
    }

    this.ngControl.valueAccessor?.writeValue(newVal);
  }
}
