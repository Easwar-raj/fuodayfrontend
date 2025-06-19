import { Component } from '@angular/core';

@Component({
  selector: 'app-ats-tracker',
  standalone: false,
  templateUrl: './ats-tracker.component.html',
  styleUrl: './ats-tracker.component.scss'
})
export class AtsTrackerComponent {

showModal = false;

  interview = {
    stage: 'Technical',
    type: 'Offline',
    datetime: '',
    location: 'Physical',
    interviewers: ''
  };

  openPopup() {
    this.showModal = true;
  }
  closePopup() {
  this.showModal = false;
}

  submit() {
    console.log('Interview Data:', this.interview);
    this.showModal = false;
    // Call API to save data if needed
  }
}
