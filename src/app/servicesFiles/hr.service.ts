// src/app/services/hr.service.ts

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HrService {


  // Route::get('/getpendingleaves/{id}', [HrPageController::class, 'getPendingLeaveRequests']);

  private baseUrl = 'http://127.0.0.1:8000/api/hrms/hr'; // Replace with actual URL

  constructor(private http: HttpClient) {}

  getHrDashboard(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/gethr/${id}`, {headers});
  }

   getAllWebUsers(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getallwebusers/${id}`);
  }

  getLeaveRequest(id:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/getpendingleaves/${id}`);
  }
}
