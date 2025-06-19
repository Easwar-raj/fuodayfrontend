import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
    constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient ) {}

    getUserData(): { id: number; name: string; profile_photo: string } | null {
      if (isPlatformBrowser(this.platformId)) {
        const adminData = localStorage.getItem('adminData');
        if (adminData) {
          return JSON.parse(adminData);
        }
      }
      return null;
    }
  private baseUrl = 'https://backend.fuoday.com/api/admin-users'; // replace with your backend URL

    login(email: string, password: string): Observable<any> {
      const body = { email, password};
      return this.http.post<any>(`${this.baseUrl}/login`, body).pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('admin_user', JSON.stringify(response.data));
          }
        })
      );
    }

    // Achievement

    saveAchievement(payload: any) {
      const token = localStorage.getItem('token'); // or whatever your token key is
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return this.http.post(`${this.baseUrl}/save/achievement`, payload, { headers });
    }


  }

