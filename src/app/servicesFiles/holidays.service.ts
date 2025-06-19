import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin-users/save/holiday';

  constructor(private http: HttpClient) {}

  saveHoliday(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
