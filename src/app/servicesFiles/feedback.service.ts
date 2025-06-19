import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'https://backend.fuoday.com/api/admin-users/save/feedbackquestions';

  constructor(private http: HttpClient) {}

  saveFeedbackQuestion(payload: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, payload, { headers });
  }
}
