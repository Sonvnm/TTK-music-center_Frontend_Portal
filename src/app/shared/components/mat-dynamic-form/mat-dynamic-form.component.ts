import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IMatFormField, MyErrorStateMatcher } from './mat-dynamic-form';
import { getLocalTime } from '../../hmz-helper';

// const formFields: FormField[] = [
//   {
//     type: EMaterialFormFieldType.Text,
//     label: 'Email',
//     name: 'email',
//     validators: [Validators.required, Validators.email],
//     errorMessages: {
//       required: 'Email is required',
//       email: 'Invalid email format',
//     },
//   },
//   {
//     type: EMaterialFormFieldType.Text,
//     label: 'First Name',
//     name: 'firstName',
//     validators: [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
//     errorMessages: {
//       required: 'First name is required',
//       minlength: 'First name must be at least 2 characters',
//       maxlength: 'First name cannot be more than 50 characters',
//     },
//   },
//   // Add more form fields as needed
// ];

@Component({
  selector: 'app-mat-dynamic-form',
  templateUrl: './mat-dynamic-form.component.html',
  styleUrls: ['./mat-dynamic-form.component.scss'],
})
export class MatDynamicFormComponent implements OnInit, OnChanges {
  @Input() formFields: IMatFormField[] = [];
  @Input() data: any;
  @Input() isReload: boolean = false;

  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  dataForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isReload) {
      if (this.data) {
        // check is Observable
        if (this.data?.subscribe) {
          this.data.subscribe((data: any) => {
            this.initData(data.entity ? data.entity : data);
          });
        } else {
          this.initData(this.data);
        }
      }
    }
  }

  ngOnInit() {
    this.dataForm = this.createFormGroup();
    if (this.data) {
      // check is Observable
      if (this.data?.subscribe) {
        this.data.subscribe((data: any) => {
          this.initData(data.entity ? data.entity : data);
        });
      } else {
        this.initData(this.data);
      }
    }
  }

  createFormGroup(): FormGroup {
    const formGroupConfig: Record<string, any> = {};
    this.formFields.forEach((field) => {

      formGroupConfig[field.name] = ['', field.validators || []];
      // check if field is value default
      if (field.value != null) {
        // patch value default
        formGroupConfig[field.name][0] = field.value;
      }
      // check field is disabled
      if (field.disabled) {
        formGroupConfig[field.name][0] = { value: '', disabled: true };
      }
    });
    return this.fb.group(formGroupConfig);
  }

  initData(data: any) {
    if (data) {
      this.formFields.forEach((field) => {
        if (data[field.name]) {
          this.dataForm.controls[field.name].patchValue(data[field.name]);
          // check field is disabled
          if (field.disabled) {
            this.dataForm.controls[field.name].disable();
          }
        }
      });
      // set form to valid
      this.dataForm.markAsPristine();
      this.onChange();
    }
  }

  onSubmit() {
    if (this.dataForm.valid && !this.data) {
      this.setTimeLocal(this.dataForm);
      this.submit.emit(this.dataForm);
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  onChange() {
    console.log(this.dataForm);
    // check data is date to use function getLocalTime
    this.setTimeLocal(this.dataForm);
    this.change.emit(this.dataForm);
  }

  private setTimeLocal(dataForm: any) {
    // check data is date to use function getLocalTime
    if (dataForm.value) {
      Object.keys(dataForm.value).forEach((key) => {
        if (
          dataForm?.value[key] instanceof Date ||
          this.isDate(dataForm?.value[key])
        ) {
          //console.log('dataForm.value[key]', dataForm.value[key]);
          dataForm.value[key] = getLocalTime(dataForm.value[key]);
          //console.log('dataForm.value[key]', dataForm.value[key]);
        }
      });
    }
  }

  private isDate(value: any): boolean {
    if (typeof value !== 'string' || value === '') {
      return false;
    }
    return !!value.match(/^\d{4}-\d{2}-\d{2}$/);
  }
}
