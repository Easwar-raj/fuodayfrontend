import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://backend.fuoday.com/api/hrms/home'; // Replace with your actual Laravel API base URL

  constructor(private http: HttpClient) {}

  getHandledProjects(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/getprojects/${userId}`);
  }

}
