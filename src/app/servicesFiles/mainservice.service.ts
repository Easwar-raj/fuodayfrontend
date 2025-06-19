import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin-users/save/service';

  constructor(private http: HttpClient) {}

  saveService(data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, data , { headers });
  }
}
