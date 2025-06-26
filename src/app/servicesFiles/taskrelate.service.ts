import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskRelateService {
  private apiUrl = 'https://backend.fuoday.com/api/hrms/home';

  constructor(private http: HttpClient) {}

  createTask(taskData: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/addtask`, taskData,{ headers });
  }
}
