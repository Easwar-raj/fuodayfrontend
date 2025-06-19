import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://ai.fuoday.com/api/chat-hrms';

  constructor(private http: HttpClient) {}

  sendChatPayload(payload: any): Observable<any> {
    const token = localStorage.getItem('authToken'); // 🔐 Store securely after login
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrl, payload, { headers });
  }
}
