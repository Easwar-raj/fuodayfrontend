import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-adminnav',
  standalone: false,
  templateUrl: './adminnav.component.html',
  styleUrl: './adminnav.component.scss'
})
export class AdminnavComponent {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient, private router: Router) {}

  companyName! : string;
  userId! : number;
  adminUserId!: number;
  logo!:'string';

  private isBrowser: boolean = false;

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const adminData = localStorage.getItem('adminData');
      if (adminData) {
        const user = JSON.parse(adminData);
        this.userId = user.id;
        this.logo = user.logo;
      }
    }
  }

  logout() {
    this.http.post('https://backend.fuoday.com/api/admin-users/logout', {}).subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        this.router.navigate(['/adminlogin']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }
}
