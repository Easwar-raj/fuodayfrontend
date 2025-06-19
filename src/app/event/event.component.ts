import { Component } from '@angular/core';
import { EventService } from '../servicesFiles/event.service';

@Component({
  selector: 'app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent  {
  adminUserId: number = 0;

  eventData = {
    event: '',
    title: '',
    date: '',
    description: '',
    action: 'create'
  };

  constructor(private eventService: EventService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitEvent() {
    const payload = {
      ...this.eventData,
      admin_user_id: this.adminUserId
    };

    this.eventService.saveEvent(payload).subscribe({
      next: (res) => console.log('Event saved successfully', res),
      error: (err) => console.error('Error saving event', err)
    });
  }
}
