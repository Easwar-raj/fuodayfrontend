import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users'; // adjust this URL

  constructor(private http: HttpClient) {}

getAbouts(adminUserId: number) {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.get<any>(
    `${this.baseUrl}/get/abouts/${adminUserId}`,
    { headers }
  );
}
  saveAbout(data: any) {
    return this.http.post(`${this.baseUrl}/save/about`, data );
  }
   deleteAbout(admin_user_id: number) {
    return this.http.delete(`${this.baseUrl}/delete/about`, { body: { admin_user_id} });
  }


}
