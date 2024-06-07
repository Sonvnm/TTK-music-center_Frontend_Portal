import { Component, Input, OnInit } from '@angular/core';
import { HMZButtons, IButton } from './buttons.constant';

@Component({
  selector: 'app-hmz-buttons',
  templateUrl: './hmz-buttons.component.html',
  styleUrls: ['./hmz-buttons.component.scss'],
})
export class HmzButtonsComponent implements OnInit {
  private _buttons?: IButton[];
  @Input()
  get buttons(): IButton[] {
    return this._buttons || HMZButtons.buttonDefaults;
  }
  set buttons(value: IButton[]) {
    this._buttons = value;
  }
  @Input() title: string = '';
  constructor() {}

  ngOnInit(): void {
    if (!this.buttons) {
      this.buttons = HMZButtons.buttonDefaults;
    }
  }
}
