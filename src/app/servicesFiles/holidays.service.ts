import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private apiUrl = 'https://backend.fuoday.com/api/admin-users/save/holiday';

  constructor(private http: HttpClient) {}

  saveHoliday(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
