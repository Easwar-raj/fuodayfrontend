import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebuserService {
  private baseUrl = 'https://backend.fuoday.com/api/web-users';

  constructor(private http: HttpClient) {}

  saveWebUser(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/save`, data, { headers });
  }

  updateWebUser(id: number, formData: FormData) {
     const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/update/${id}`, formData,{headers});
  }
}
