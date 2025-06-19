import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalleaveService {
  private baseUrl = 'http://127.0.0.1:8000/api/admin-users/save/totalleaves';

  constructor(private http: HttpClient) {}

  saveTotalLeave(data: any) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(this.baseUrl, data, { headers });
  }
}
