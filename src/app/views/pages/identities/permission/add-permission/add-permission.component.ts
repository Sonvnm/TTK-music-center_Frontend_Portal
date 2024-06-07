import { Component, Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EButtonIcon, EButtonMatStyle, EButtonType, IButton } from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { EMaterialFormFieldType, IMatFormField } from 'src/app/shared/components/mat-dynamic-form/mat-dynamic-form';
import { PermissionService } from '../permission.service';
import { HotToastService } from '@ngneat/hot-toast';
import { disableButton } from 'src/app/shared/hmz-helper';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss'],
})
export class AddPermissionComponent {
  dataSave: any;
  item: any = {};
  isUpdate = false;
  buttons: IButton[] = [
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => {},
      disabled: true,
    },
    {
      id: EButtonType.Close,
      title: 'Common.Button.Close',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Primary,
      click: () => this.closeDialog(),
    },
  ];
  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Permission Value',
      name: 'value',
      validators: [Validators.required],
      errorMessages: {
        required: 'Permission Value is required',
      },
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Permission key',
      name: 'key',
      validators: [Validators.required],
      errorMessages: {
        required: 'Permission key is required',
      },
    },
    {
      type: EMaterialFormFieldType.Text,
      label: 'Description',
      name: 'description',
      validators: [Validators.required],
      errorMessages: {
        required: 'Description is required',
      },
    },
  ];
  title = 'Add Permission';
  constructor(
    public dialogRef: MatDialogRef<AddPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: PermissionService,
    private hotToast: HotToastService
  ) {
    this.title = data?.title ?? this.title;
    if (data?.item) {
      console.log(data.item);
      this.disableFields();
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.item = data.item;
    }
  }

  // set field disabled
  disableFields() {
    this.formFields.forEach((field) => {
      // email
      // if (field.name === 'email') {
      //   field.disabled = true;
      // }
      // password to not required
    });
  }
  closeDialog(): void {
    this.dialogRef.close({
      isSave: false,
    });
  }
  onFormChange(e: any) {
    console.log(e);
    if (e?.valid) {
      this.buttons.forEach((button) => {
        if (button.id === EButtonType.Save) {
          button.disabled = false;
          button.click = () => this.save(e);
        }
      });
    } else if (e?.invalid) {
      disableButton(true, EButtonType.Save, this.buttons);
    }
  }
  onFormSubmit(e: any) {
    this.save(e);
  }
  save(e: any) {
    if (e?.valid) {
      this.dataSave = e.value;
    }
    if (this.isUpdate) {
      const data = {
        ...this.dataSave,
        id: this.item?.id,
      };
      this.update(data);
      return;
    }
    this.add(this.dataSave);
  }
  add(data: any) {
    this.service.addPermission(data).subscribe((res) => {
      if (res.success) {
        this.hotToast.success('Add Permission success', {
          position: 'top-right',
        });
        this.dialogRef.close({
          isSave: true,
        });
      }else {
        this.hotToast.error(res.errors.join(', '), {
          position: 'top-right',
        });
      }
    });
  }

  update(data: any) {
    console.log(data);
    this.service.editPermission(data).subscribe((res) => {
      console.log(res);
      if (res.success) {
        this.hotToast.success('Update Permission success', {
          position: 'top-right',
        });
        this.dialogRef.close({
          isSave: true,
        });
      }
    });
  }
}

