import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private baseUrl = 'https://backend.fuoday.com/api/hrms/support';

  constructor(private http: HttpClient) {}

  getTicketsByUserId(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/gettickets/${userId}`);
  }
  addTicket(ticketData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addticket`, ticketData);
  }

  updateTicket(ticketId: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateticket/${ticketId}`, data);
  }
}



