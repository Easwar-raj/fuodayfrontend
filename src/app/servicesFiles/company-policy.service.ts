import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyPolicyService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users';

  constructor(private http: HttpClient) {}

  savePolicy(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/save/policies`, data);
  }

  deletePolicy(data: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/policies`, { body: data });
  }
}
