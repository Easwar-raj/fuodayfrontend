import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllFeedService {
  private baseUrl = 'http://127.0.0.1:8000/api/hrms/performance';

  constructor(private http: HttpClient) {}

  getUserFeedbackDetails(id: number): Observable<any> {
   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getfeedbacks/${id}`);
  }

   getFeedbackQuestions(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getfeedbackquestions/${userId}`);
  }

  addFeedback(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addfeedback`, data);
  }

  updateFeedback(id: number, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updatefeedback/${id}`, data);
  }

  addFeedbackReply(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addfeedbackreply`, data);
  }
}
