import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverviewService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/payroll'; // Replace with actual base URL

  constructor(private http: HttpClient) {}

  getCurrentOverview(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getoverview/${id}`,{headers});
  }
}
