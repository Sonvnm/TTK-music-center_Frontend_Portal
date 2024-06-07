import { toNumber } from 'src/app/shared/hmz-helper';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Define a data structure for form fields
export enum EMaterialFormFieldType {
  Text = 'text',
  Date = 'date',
  Number = 'number',
  Select = 'select',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Custom = 'custom',
  File = 'file',
  Email = 'email',
  Password = 'password',
  Textarea = 'textarea',
  Autocomplete = 'autocomplete',
  Slider = 'slider',
  SlideToggle = 'slideToggle',
  Chips = 'chips',
  RadioGroup = 'radioGroup',
  CheckboxGroup = 'checkboxGroup',
  ColorPicker = 'colorPicker',
  DatePicker = 'datePicker',
  TimePicker = 'timePicker',
  DateTimePicker = 'dateTimePicker',
  MonthPicker = 'monthPicker',
  YearPicker = 'yearPicker',
  InputMask = 'inputMask',
  DropZone = 'dropZone',
  Image = 'image',
  EditorQuill = 'editorQuill',
  Price = 'price',
}

export interface IOption {
  id?: any;
  value?: any;
  label?: string;
}

export interface IMatFormField {
  type: EMaterialFormFieldType; // 'text', 'date', 'number', 'select', 'radio', 'checkbox', 'custom'
  label: string;
  name: string;
  disabled?: boolean; // Optional disabled flag
  readonly?: boolean; // Optional readonly flag
  value?: any; // Optional default value
  matIcon?: string; // Optional icon for mat-form-field
  action?: void; // Optional action to perform when button is clicked
  validators?: any[]; // Optional list of validators
  multiple?: boolean; // Optional multiple flag for select
  options?: IOption[]; // Optional list of options for select
  errorMessages?: Record<string, string> | any; // Optional custom error messages
  placeholder?: string; // Optional placeholder
  event?: any; // Optional event
  className?: string; // Optional class name
  valueFormatter?: (value?: any) => any;

  radioGroups?: IRadioButton[]; // Optional list of options for radio

  min?: any; // Optional min value for number or date
  max?: any; // Optional max value for number or date
  datetimePicker?: INgxDatetimePicker; // Optional max value for number or date

  dropZoneConfig?: IDropZoneConfig; // Optional dropZone config
}

export interface IRadioButton {
  label: string;
  value: any;
  checked?: boolean;
  disabled?: boolean;
  event?: (event: any) => any;
}

export interface IDropZoneConfig {
  config?: DropzoneConfigInterface;
  message?: string;
  errorMessages?: (event: any) => any;
  onUploadSuccess?: (event: any) => any;
  onRemove?: (event: any) => any;
}

export interface INgxDatetimePicker {
  showSpinners?: boolean;
  showSeconds?: number;
  stepHour?: number;
  stepMinute?: number;
  stepSecond?: number;
  touchUi?: any;
  color?: 'primary' | 'accent' | 'warn' | undefined;
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
