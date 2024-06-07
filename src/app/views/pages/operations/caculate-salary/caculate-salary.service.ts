import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalculateConstant } from './caculate-salary.constant';

@Injectable({
  providedIn: 'root',
})
export class CaculateSalaryService {
  constructor(private http: HttpClient) {}

  calculateSalaryAsync(query: any): Observable<any> {
    return this.http.post(
      CalculateConstant.PaymentSalary.CalculateSalaryForTeacher,
      query,
      CalculateConstant.options
    );
  }

  paymentSalaryAsync(query: any): Observable<any> {
    return this.http.post(
      CalculateConstant.PaymentSalary.PaymentSalaryForTeacher,
      query
    );
  }
}
