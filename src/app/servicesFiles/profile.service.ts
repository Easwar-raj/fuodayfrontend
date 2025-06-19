import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://127.0.0.1:8000/api/hrms/profile'; // replace with your backend URL

  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/getprofile/${id}`, { headers });
  }
   updateEmployeeProfile(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateemployeeprofile`, data);
  }
  updateOrCreateSkill(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateskills`, data);
  }
  deleteSkill(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteskill`, data);
  }
  updateOrCreateEducation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateeducation`, data );
  }
  deleteEducation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteeducation`, data);
  }
  updateOrCreateExperience(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/updateexperience`, data);
  }
  deleteExperience(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/deleteexperience`, data);
  }
  updateOnboardingDocuments(data: FormData): Observable<any> {
  return this.http.post(`${this.baseUrl}/updateonboarding`, data);
}


   private profileUrl = 'http://127.0.0.1:8000/api/web-users';

   updateProfileImage(id: number, data: FormData): Observable<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.profileUrl}/update/${id}`, data, { headers });
  }

}


