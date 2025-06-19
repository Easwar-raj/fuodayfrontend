import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectteamService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin-users/save/projects';

  constructor(private http: HttpClient) {}

  saveProject(data: any) {
    const token = localStorage.getItem('authToken'); // Use the token from localStorage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, data, { headers });
  }
}
