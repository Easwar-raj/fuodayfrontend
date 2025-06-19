import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private baseUrl = 'https://backend.fuoday.com/api/hrms/home'; // Replace with actual API base

  constructor(private http: HttpClient) {}

  getTeamByUserId(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getteam/${userId}`,{headers});
  }
}
