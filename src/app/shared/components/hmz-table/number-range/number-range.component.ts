import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-number-range',
  templateUrl: './number-range.component.html',
  styleUrls: ['./number-range.component.scss']
})
export class NumberRangeComponent {
  fromNumber!: number;
  toNumber!: number;

  @Output() numberRangeSelected = new EventEmitter<{ fromNumber: number, toNumber: number }>();
  @Output() enter = new EventEmitter<any>();

  emitNumberRange() {
    this.numberRangeSelected.emit({ fromNumber: this.fromNumber, toNumber: this.toNumber });
  }

  clearFromNumber() {
    this.fromNumber = null as any;
    this.emitNumberRange();
  }

  clearToNumber() {
    this.toNumber = null as any;
    this.emitNumberRange();
  }
  onEnter() {
    this.enter.emit({
      fromNumber: this.fromNumber,
      toNumber: this.toNumber,
    });
  }
}
