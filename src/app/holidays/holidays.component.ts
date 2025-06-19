import { Component } from '@angular/core';
import { HolidaysService } from '../servicesFiles/holidays.service';

@Component({
  selector: 'app-holidays',
  standalone: false,
  templateUrl: './holidays.component.html',
  styleUrl: './holidays.component.scss'
})
export class HolidaysComponent {
  adminUserId: number = 0;

  holidayData = {
    holiday: '',
    date: '',
    description: '',
    action: 'create'
  };

  constructor(private holidaysService: HolidaysService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitHoliday() {
    const payload = {
      ...this.holidayData,
      admin_user_id: this.adminUserId
    };

    this.holidaysService.saveHoliday(payload).subscribe({
      next: (res) => console.log('Holiday created:', res),
      error: (err) => console.error('Error:', err)
    });
  }
}
