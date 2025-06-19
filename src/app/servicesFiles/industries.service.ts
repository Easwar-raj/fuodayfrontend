import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndustriesService {
  private apiUrl = 'https://backend.fuoday.com/api/admin-users/save/industry';

  constructor(private http: HttpClient) {}

  saveIndustry(data: any) {
    const token = localStorage.getItem('authToken'); // Use the token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
