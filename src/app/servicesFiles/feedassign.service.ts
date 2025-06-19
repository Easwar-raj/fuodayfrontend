import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedassignService {
  private baseUrl = 'http://127.0.0.1:8000/api/hrms/home'; // Replace with your actual API base

  constructor(private http: HttpClient) {}

  getFeeds(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getfeeds/${userId}`);
  }
}
