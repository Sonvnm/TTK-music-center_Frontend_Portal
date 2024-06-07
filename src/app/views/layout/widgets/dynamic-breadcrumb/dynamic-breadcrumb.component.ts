import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadCrumb } from './breadcrumb';
import { BreadcrumbService } from './dynamic-breadcrumb.service';

@Component({
  selector: 'app-dynamic-breadcrumb',
  templateUrl: './dynamic-breadcrumb.component.html',
  styleUrls: ['./dynamic-breadcrumb.component.scss'],
})
export class DynamicBreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<BreadCrumb[]>;
  constructor(private breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
    this.breadcrumbs$.subscribe((data) => {});
  }
}
