import { Component } from '@angular/core';
import { HeirarchyService } from '../servicesFiles/heirarchy.service';

@Component({
  selector: 'app-heirarchy',
  standalone: false,
  templateUrl: './heirarchy.component.html',
  styleUrl: './heirarchy.component.scss'
})
export class  HeirarchyComponent {
  adminUserId: number = 0;

  heirarchyData = {
    level: '',
    title: '',
    experience_range: '',
    description: '',
    action: 'create'
  };

  constructor(private heirarchyService: HeirarchyService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitHeirarchy() {
    const payload = {
      ...this.heirarchyData,
      admin_user_id: this.adminUserId
    };

    this.heirarchyService.saveHeirarchy(payload).subscribe({
      next: (res) => console.log('Hierarchy created:', res),
      error: (err) => console.error('Error:', err)
    });
  }
}
