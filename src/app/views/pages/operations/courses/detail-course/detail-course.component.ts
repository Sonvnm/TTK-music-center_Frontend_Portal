import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonConfirmDialogComponent } from 'src/app/shared/components/common-confirm-dialog/common-confirm-dialog.component';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ITableColumn } from 'src/app/shared/components/hmz-table/hmz-table.interface';
import {
  EMaterialFormFieldType,
  IMatFormField,
} from 'src/app/shared/components/mat-dynamic-form/mat-dynamic-form';
import { ConstantCommon } from 'src/app/shared/constant-common';
import { ETableDefault } from 'src/app/shared/enums';
import {
  createObservable,
  disableButton,
  getLocalISOTime,
  toNumber,
} from 'src/app/shared/hmz-helper';
import { IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ClassesConstant } from '../../classes/class.constant';
import { SubjectsConstant } from '../../subjects/subjects.constant';
import { CoursesService } from '../courses.service';
import { IHMZDataSource } from './../../../../../shared/hmz-interface';
import { AddSubjectCourseComponent } from './add-subject-course/add-subject-course.component';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss'],
})
export class DetailCourseComponent implements OnInit {
  dataSave: any;
  course: Observable<any>;
  courseObj: any;
  isUpdate = false;
  subjectColumns: ITableColumn[];
  subjectData: Observable<IHMZDataSource>;
  haveSubjects: boolean;
  listItemSelected: any[] = [];
  file: File;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  isHaveImage: boolean = false;
  imageUpload: any;
  buttons: IButton[] = [
    {
      id: EButtonType.Back,
      title: 'Quay lại',
      icon: EButtonIcon.Back,
      style: EButtonMatStyle.Accent,
      click: () => this.router.navigate(['operations/courses/']),
      isShow: true,
    },
    {
      id: EButtonType.Save,
      title: 'Lưu',
      icon: EButtonIcon.Save,
      style: EButtonMatStyle.Primary,
      click: () => {},
      disabled: true,
      isShow: true,
    },
  ];

  buttonsSubject: IButton[] = [];

  formFields: IMatFormField[] = [
    {
      type: EMaterialFormFieldType.Text,
      label: 'Tên khóa học',
      name: 'name',
      validators: [Validators.required],
      errorMessages: {
        required: 'Tên khóa học không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.EditorQuill,
      label: 'Mô tả khóa học',
      name: 'description',
      validators: [Validators.required],
      errorMessages: {
        required: 'Mô tả khóa học không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Price,
      label: 'Giá',
      name: 'price',
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(1000000000),
      ],
      errorMessages: {
        required: 'Giá không được để trống',
        min: 'Giá không được nhỏ hơn 0',
        max: 'Giá không được lớn hơn 1000000000',
      },
      valueFormatter: (e: any) => {
        console.log(toNumber(e));
        return toNumber(e);
      },
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày bắt đầu',
      name: 'startDate',
      validators: [Validators.required],
      errorMessages: {
        required: 'Ngày bắt đầu không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.Date,
      label: 'Ngày kết thúc',
      name: 'endDate',
      validators: [Validators.required],
      errorMessages: {
        required: 'Ngày kết thúc không được để trống',
      },
    },

    {
      type: EMaterialFormFieldType.Text,
      label: 'Link Video',
      name: 'video',
      validators: [Validators.required],
      errorMessages: {
        required: 'Link Video không được để trống',
      },
    },
    {
      type: EMaterialFormFieldType.DropZone,
      label: 'Hình ảnh',
      name: 'imageUpload',
      dropZoneConfig: {
        config: {
          maxFiles: 1,
        },
        errorMessages: (e: any) => {
          this.hotToast.error(e);
        },
        onUploadSuccess: (e: any) => {
          console.log(e);
          this.imageUpload = e[1] ?? '';
        },
        onRemove: (e: any) => {
          console.log(e);
          this.imageUpload = '';
        },
      },
    },
    {
      type: EMaterialFormFieldType.Image,
      label: 'Hình ảnh',
      name: 'image',
    },

    {
      type: EMaterialFormFieldType.Checkbox,
      label: 'Trạng thái',
      name: 'status',
    },
  ];
  title = 'Thêm mới khóa học';
  courseId: string;
  constructor(
    private service: CoursesService,
    private hotToast: ToastService,
    private acivatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private toastService: ToastService,
    private router: Router
  ) {
    this.subjectColumns = SubjectsConstant.columns(router);
    this.courseId = this.acivatedRoute.snapshot.paramMap.get('id') || '';
    if (this.courseId) {
      this.loadData(this.hmzRequest);
      disableButton(false, EButtonType.Save, this.buttons);
      this.isUpdate = true;
      this.title = this.courseId ? 'Chi tiết khóa học' : this.title;
      this.buttonsSubject = [
        {
          id: EButtonType.Back,
          title: 'Quay lại',
          icon: EButtonIcon.Back,
          style: EButtonMatStyle.Accent,
          click: () => this.router.navigate(['operations/courses/']),
          isShow: true,
        },
        {
          id: EButtonType.Add,
          title: 'Thêm môn học',
          icon: EButtonIcon.Add,
          style: EButtonMatStyle.Primary,
          click: () => this.addSubjectCourse(),
          isShow: this.isUpdate,
        },
        {
          id: EButtonType.Delete,
          title: 'Xóa',
          icon: EButtonIcon.Delete,
          style: EButtonMatStyle.Warn,
          disabled: true,
          click: () => this.delete(),
        },
      ];
    }
  }
  ngOnInit(): void {}

  getImage(event: any) {
    this.file = event.file;
  }

  onFormChange(e: any) {
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

  createFormData(data: any) {
    let formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (['startDate', 'endDate'].includes(key)) {
        formData.append(key, getLocalISOTime(data[key]));
      } else formData.append(key, data[key]);
    });

    if (this.file) {
      this.isHaveImage = true;
      formData.append('image', this.file);
    }
    formData.append('isHaveImage', this.isHaveImage.toString());
    return formData;
  }
  save(e: any) {
    if (this.imageUpload) {
      e.value.image = this.imageUpload?.url;
      e.value.publicId = this.imageUpload?.publicId;
    }
    if (e?.valid) {
      this.dataSave = { ...this.dataSave, ...e.value };
    }
    if (this.dataSave.startDate || this.dataSave.endDate) {
      this.dataSave.startDate = getLocalISOTime(this.dataSave.startDate);
      this.dataSave.endDate = getLocalISOTime(this.dataSave.endDate);
    }
    let formData = new FormData();

    if (this.isUpdate) {
      const data = {
        ...this.dataSave,
        code: this.courseId,
        status: ConstantCommon.StringIsNullOrSpace(this.dataSave.status)
          ? false
          : this.dataSave.status,
      };
      formData = this.createFormData(data);
      this.update(formData);
      return;
    }
    this.dataSave = {
      ...this.dataSave,
      status: ConstantCommon.StringIsNullOrSpace(this.dataSave.status)
        ? false
        : this.dataSave.status,
    };
    formData = this.createFormData(this.dataSave);
    this.add(formData);
  }

  add(data: any) {
    this.service.addAsync(data).subscribe((res) => {
      if (res.success) {
        this.hotToast.success('Đã thêm khóa học thành công');
        this.router.navigate(['/operations/courses/update', res.entityId]);
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }

  onRequest(e: any) {
    this.hmzRequest = {
      ...e,
      entity: {
        ...e.entity,
      },
    };
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    request = {
      ...request,
      entity: {
        ...request.entity,
        courseId: this.courseId,
      },
    };
    this.course = this.service.getSubjectCourse(request);
    this.course.subscribe((e) => {
      if (e.entity.image) {
        this.isHaveImage = true;
      }
      const subject = { ...e, items: e.entity.subjects };
      this.subjectData = createObservable(subject);
      this.courseObj = {
        url: e.entity.image,
      };
    });
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;

    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttonsSubject
    );
  }

  update(data: any) {
    this.service.editAsync(data, this.courseId).subscribe((res) => {
      if (res.success) {
        this.hotToast.success('Đã cập nhật khóa học thành công');
        this.loadData(this.hmzRequest);
      } else {
        this.hotToast.error(res.errors);
      }
    });
  }

  addSubjectCourse() {
    const dialogRef = this.matDialog.open(AddSubjectCourseComponent, {
      maxHeight: ClassesConstant.DialogSize.EXTRA_LARGE,
      disableClose: true,
      data: {
        title: 'Thêm môn học vào khóa học',
        courseId: this.courseId,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData(this.hmzRequest);
      }
    });
  }
  delete() {
    if (this.listItemSelected.length > 0) {
      this.matDialog
        .open(CommonConfirmDialogComponent, {
          width: '30rem',
          data: {
            title: 'Xóa môn học ',
            items: this.listItemSelected.map((x) => x.name),
          },
          disableClose: true,
        })
        .afterClosed()
        .subscribe((res) => {
          if (res.isDelete) {
            let listSubjectId: string[] = [];
            let data = {};
            this.listItemSelected.map((item) => {
              listSubjectId.push(item.id);
              data = {
                courseId: this.courseId,
                listSubjectId,
              };
            });
            this.service.removeSubjectCourse(data).subscribe((res) => {
              if (res && res.success) {
                this.listItemSelected = [];
                this.toastService.success(res.message);
                this.loadData(this.hmzRequest);
              } else {
                this.toastService.error(res.errors);
              }
            });
          }
        });
    }
  }

  isRemoveImage(event: any) {
    this.isHaveImage = false;
  }
}
