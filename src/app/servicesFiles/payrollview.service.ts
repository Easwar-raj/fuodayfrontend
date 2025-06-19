import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollViewService {
  private apiUrl = 'https://backend.fuoday.com/api/hrms/payroll/getpayroll'; // Replace with actual URL

  constructor(private http: HttpClient) {}

  getPayrollDetails(userId: number): Observable<any> {
     const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers });
  }
}
