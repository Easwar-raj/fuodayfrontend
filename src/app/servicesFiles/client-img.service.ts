import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientimgService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin-users/save/client';

  constructor(private http: HttpClient) {}

  saveClient(data: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      // 'Content-Type': 'multipart/formdata'
    });
    return this.http.post(this.apiUrl, data, {headers});
  }
}
