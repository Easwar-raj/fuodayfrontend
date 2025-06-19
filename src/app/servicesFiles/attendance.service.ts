import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  checkOut(attendanceId: any) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://127.0.0.1:8000/api/hrms/attendance'; // Make sure this is your correct API URL

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getAttendance(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/getattendances/${id}`, { headers });
  }

  getTodayAttendance(id: number): Observable<any> {
     const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/gettoday/${id}`, { headers });
}

  getAttendanceByRole(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/getattendancebyrole/${id}`, { headers });
  }

  addAttendance(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/addattendance`, data, { headers });
  }

  updateAttendance(data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/updateattendance`, data, { headers });
  }
}
