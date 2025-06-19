import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {
  private baseUrl = 'http://127.0.0.1:8000/api/hrms/enquiry'; // replace with your actual domain
  private apiUrl = 'https://ai.fuoday.com/api/send-email'; // replace with your actual domain

  constructor(private http: HttpClient) {}

  submitEnquiry(data: any): Observable<any> {

    return this.http.post(`${this.apiUrl}` , data);
}

  getEnquiries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getenquiries`);
  }
}
