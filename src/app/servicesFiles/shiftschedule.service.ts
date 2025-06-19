import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShiftscheduleService  {
  private baseUrl = 'http://127.0.0.1:8000/api/hrms/timetracker';

  constructor(private http: HttpClient) {}

  addSchedule(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addschedule`, data);
  }

  getMonthlySchedules(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/getschedules`, data);
  }
}
