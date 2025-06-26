import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users/save/event';
  private apiUrl = 'https://backend.fuoday.com/api/hrms/home';

  constructor(private http: HttpClient) {}

  saveEvent(eventData: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, eventData, { headers });
  }
   getAnnouncements(webUserId: number, type: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getannouncements/${webUserId}/${type}`);
  }
}
