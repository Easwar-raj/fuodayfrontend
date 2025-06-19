import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalleaveService {
  private baseUrl = 'https://backend.fuoday.com/api/admin-users/save/totalleaves';

  constructor(private http: HttpClient) {}

  saveTotalLeave(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, data, { headers });
  }
}
