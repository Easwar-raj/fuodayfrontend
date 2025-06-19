// src/app/services/auth.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient ) {}

  getUserData(): {
    admin_user: any;
    employee_details: any;
    department: string;
    emp_id: string; id: number; name: string; profile_photo: string;
} | null {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        return JSON.parse(userData);
      }
    }
    return null;
  }

  private baseUrl = 'http://127.0.0.1:8000/api/web-users'; // Replace with your actual backend URL


  login(email: string, password: string, role: string): Observable<any> {
    const body = { email, password, role };
    return this.http.post<any>(`${this.baseUrl}/login`, body).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('access_token', response.token);
          localStorage.setItem('web_user', JSON.stringify(response.data));
        }
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post('http://127.0.0.1:8000/api/web-users/logout', {}, { headers }).pipe(
      tap(() => {
        this.clearSession();
      })
    );
  }

  clearSession() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUser(): any {
    const user = localStorage.getItem('web_user');
    return user ? JSON.parse(user) : null;
  }
}
