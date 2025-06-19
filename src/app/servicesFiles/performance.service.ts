import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/performance'; // replace with your backend URL
  constructor(private http: HttpClient) {}
  getProfile(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/getteamperformance/${id}`, { headers });
  }

  getEmployeeAudit(webUserId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getemployeeaudit/${webUserId}`, { headers });
  }
}
