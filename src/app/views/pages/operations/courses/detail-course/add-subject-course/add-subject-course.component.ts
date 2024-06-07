import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import {
  EButtonIcon,
  EButtonMatStyle,
  EButtonType,
  IButton,
} from 'src/app/shared/components/hmz-buttons/buttons.constant';
import { ETableDefault } from 'src/app/shared/enums';
import { createObservable, disableButton } from 'src/app/shared/hmz-helper';
import { IHMZDataSource, IHMZRequest } from 'src/app/shared/hmz-interface';
import { ToastService } from 'src/app/shared/services/toast.service';
import { SubjectsConstant } from '../../../subjects/subjects.constant';
import { SubjectsService } from '../../../subjects/subjects.service';
import { CoursesService } from '../../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject-course',
  templateUrl: './add-subject-course.component.html',
  styleUrls: ['./add-subject-course.component.scss'],
})
export class AddSubjectCourseComponent implements OnInit {
  columns: any;
  data!: Observable<IHMZDataSource>;
  listItemSelected: any[] = [];
  isSave: boolean = false;
  title: string;
  courseId: string;
  hmzRequest: IHMZRequest = {
    pageNumber: ETableDefault.DefaultPageIndex.valueOf(),
    pageSize: ETableDefault.DefaultPageSize.valueOf(),
    entity: {},
    sortColumns: [],
  };
  buttons: IButton[] = [
    {
      id: EButtonType.Add,
      title: 'Thêm',
      icon: EButtonIcon.Add,
      style: EButtonMatStyle.Primary,
      disabled: true,
      click: () => this.add(),
    },

    {
      id: EButtonType.Close,
      title: 'Đóng',
      icon: EButtonIcon.Close,
      style: EButtonMatStyle.Warn,
      click: () => this.matDialogRef.close(this.isSave),
    },
  ];

  constructor(
    private service: SubjectsService,
    private courseService: CoursesService,
    private dialog: MatDialog,
    private toastService: ToastService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private matDialogRef: MatDialogRef<AddSubjectCourseComponent>
  ) {
    this.columns = SubjectsConstant.columns(router);
  }
  ngOnInit(): void {
    this.title = this.dialogData.title;
    this.courseId = this.dialogData.courseId;
    this.loadData(this.hmzRequest);
  }
  loadData(request: IHMZRequest) {
    this.service
      .getSubjectsForCourse(request, this.courseId)
      .subscribe((res) => {
        this.data = createObservable(res);
      });
  }
  onRequest(e: any) {
    console.log(e);
    this.loadData(e);
  }
  onSelectChange(e: any) {
    this.listItemSelected = e;
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Add,
      this.buttons
    );
    disableButton(
      this.listItemSelected.length === 0,
      EButtonType.Delete,
      this.buttons
    );
  }

  add() {
    if (this.listItemSelected.length > 0) {
      let data = {};
      const listSubjectId: string[] = [];
      this.listItemSelected.map((item) => {
        listSubjectId.push(item.id);
        data = {
          courseId: this.dialogData.courseId,
          listSubjectId,
        };
      });
      this.courseService.addSubjectToCourse(data).subscribe((res) => {
        if (res && res.success) {
          this.isSave = true;
          this.toastService.success(res.message);
          this.loadData(this.hmzRequest);
        } else {
          this.toastService.error(res.errors);
        }
      });
    }
  }
}
