import { Component } from '@angular/core';
import { JobOpeningsService } from '../servicesFiles/jobopenings.service';

@Component({
  selector: 'app-jobopenings',
  standalone: false,
  templateUrl: './jobopenings.component.html',
  styleUrl: './jobopenings.component.scss'
})
export class JobopeningsComponent {
  adminUserId: number = 0;

  jobOpeningData = {
    title: '',
    position: '',
    action: 'create'
  };

  constructor(private jobOpeningsService: JobOpeningsService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitJobOpening() {
    const payload = {
      ...this.jobOpeningData,
      admin_user_id: this.adminUserId
    };

    this.jobOpeningsService.saveJobOpening(payload).subscribe({
      next: (res) => console.log('Job opening created:', res),
      error: (err) => console.error('Error:', err)
    });
  }
}

