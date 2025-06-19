import { Component } from '@angular/core';
import { FeedbackService } from '../servicesFiles/feedback.service';

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  adminUserId: number = 0;

  feedbackData = {
    question: '',
    action: 'create'
  };

  constructor(private feedbackService: FeedbackService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }

  submitFeedback() {
    const payload = {
      ...this.feedbackData,
      admin_user_id: this.adminUserId
    };

    this.feedbackService.saveFeedbackQuestion(payload).subscribe({
      next: (res) => console.log('Feedback question saved successfully', res),
      error: (err) => console.error('Error saving feedback question', err)
    });
  }
}
