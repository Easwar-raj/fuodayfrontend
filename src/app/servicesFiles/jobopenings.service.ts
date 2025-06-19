import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobOpeningsService {
  private apiUrl = 'https://backend.fuoday.com/api/admin-users/save/jobopenings';

  constructor(private http: HttpClient) {}

  saveJobOpening(data: any) {
    const token = localStorage.getItem('authToken'); // Use the token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
