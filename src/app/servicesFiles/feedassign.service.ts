import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedassignService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/home'; // Replace with your actual API base
  private userBaseUrl = 'https://backend.fuoday.com/api/web-users';

  constructor(private http: HttpClient) {}

  getFeeds(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getfeeds/${userId}`);
  }

  getEmployeeByAdmin(userId: number): Observable<any> {
    return this.http.get(`${this.userBaseUrl}/getemployeesbyadmin/${userId}`)
  }
}
