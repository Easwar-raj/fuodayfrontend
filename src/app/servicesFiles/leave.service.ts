import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  addLeave(payload: { web_user_id: number; type: string; from: string; to: string; reason: string; }) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'https://backend.fuoday.com/api/hrms/leave'; // Update with actual backend API URL

  constructor(private http: HttpClient) {}

  getLeaveStatus(userId: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    return this.http.get(`${this.baseUrl}/getleave/${userId}`,{ headers });
  }

  addLeaveRequest(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addleave`, data);
  }
updateLeaveStatus(data: { leave_request_id: number, status: string, comment?: string }): Observable<any> {
  return this.http.post(`${this.baseUrl}/updateleave`, data);
}
}

