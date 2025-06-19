import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebUserEmpService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users'; // Update with actual domain

  constructor(private http: HttpClient) {}

  getWebUserById(admin_user_id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getallwebusers/${admin_user_id}`, { headers });
  }

  private apiUrl = 'https://backend.fuoday.com/api/web-users';
  updateWebUser(webUserId: number, formData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      // 'Content-Type': 'multipart/formdata'
    });
    return this.http.post(`${this.apiUrl}/update/${webUserId}`, formData, {headers});
  }

  deleteWebUser(id: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

}
