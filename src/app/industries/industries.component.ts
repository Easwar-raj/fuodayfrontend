import { Component } from '@angular/core';
import { IndustriesService } from '../servicesFiles/industries.service';

@Component({
  selector: 'app-industries',
  standalone: false,
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss'
})
export class IndustriesComponent {
  adminUserId: number = 0;

  industryData = {
    name: '',
    description: '',
    action: 'create'
  };

  constructor(private industriesService: IndustriesService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitIndustry() {
    const payload = {
      ...this.industryData,
      admin_user_id: this.adminUserId
    };

    this.industriesService.saveIndustry(payload).subscribe({
      next: (res) => console.log('Industry created:', res),
      error: (err) => console.error('Error:', err)
    });
  }
}
