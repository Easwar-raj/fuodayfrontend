import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users/save/event';

  constructor(private http: HttpClient) {}

  saveEvent(eventData: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.baseUrl, eventData, { headers });
  }
}
