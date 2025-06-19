import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimetrackService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/timetracker';

  constructor(private http: HttpClient) {}

  getTrackerData(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/gettracker/${id}`, { headers });
  }
}
