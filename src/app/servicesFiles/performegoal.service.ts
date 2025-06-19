import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerformegoalService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/performance'; // replace with your backend URL
  constructor(private http: HttpClient) {}
  getGoal(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/getgoals/${id}`, { headers });
  }
}
