import { Component, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { MainserviceService } from '../servicesFiles/mainservice.service';

@Component({
  selector: 'app-mainservice',
  standalone: false,
  templateUrl: './mainservice.component.html',
  styleUrl: './mainservice.component.scss'
})
export class  MainserviceComponent implements OnInit {
  adminUserId: string = '';

  serviceData = {
    admin_user_id: '',
    name: '',
    description: '',
    action: 'create',
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private mainService: MainserviceService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('adminData') || '{}');
      this.adminUserId = user.id;
      this.serviceData.admin_user_id = this.adminUserId;
    }
  }

  submitService() {
    this.mainService.saveService(this.serviceData).subscribe({
      next: (response) => {
        alert(response.message);
      },
      error: (err) => {
        console.error('Error:', err);
        alert(err.error?.message || 'Failed to save service.');
      }
    });
  }
}
