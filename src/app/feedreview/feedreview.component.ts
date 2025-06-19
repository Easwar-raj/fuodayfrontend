import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AllFeedService } from '../servicesFiles/allfeed.service';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-feedreview',
  standalone: false,
  templateUrl: './feedreview.component.html',
  styleUrls: ['./feedreview.component.scss']
})
export class FeedreviewComponent implements OnInit {
  feedbackForm!: FormGroup;
  requestedFeedbacks: any[] = [];
  receivedFeedbacks: any[] = [];
  questions: any[] = [];
  loading = true;
  error = '';
  message = '';
  userId!: number;
  userName!: string;
  empID: string = '';
  profilePhoto: string = '';
  isPopupOpen = false;

  constructor(
    private feedService: AllFeedService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.userId = user.id;
          this.userName = user.name;
          this.empID = user.emp_id;
          this.profilePhoto = user.employee_details?.profile_photo || '';

          this.initForm();         // ✅ Initialize form only after user info
          this.loadFeedbacks();    // ✅ Load feedbacks
          this.getQuestions();     // ✅ Load questions

        } catch (err) {
          this.error = 'Invalid user data.';
          this.loading = false;
        }
      } else {
        this.error = 'User not identified.';
        this.loading = false;
      }
    }
  }

  // ✅ Initialize form with default structure
  initForm(): void {
    this.feedbackForm = this.fb.group({
      requested_by_id: [this.userId],
      requested_by_name: [this.userName],
      to_id: ['', Validators.required],
      to_name: ['', Validators.required],
      from_id: [this.userId],
      from_name: [this.userName],
      review_ratings: this.fb.array([]),
      overall_ratings: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['']
    });
  }

  // ✅ Get review_ratings array
  get reviewRatings(): FormArray<FormControl> {
    return this.feedbackForm.get('review_ratings') as FormArray<FormControl>;
  }

  getQuestions(): void {
    this.feedService.getFeedbackQuestions(this.userId).subscribe({
      next: (res) => {
        this.questions = res.data || [];
        this.reviewRatings.clear();
        this.questions.forEach(() => {
          this.reviewRatings.push(this.fb.control(null, [Validators.required, Validators.min(1), Validators.max(5)]));
        });
      },
      error: () => {
        this.message = 'Failed to load feedback questions.';
      }
    });
  }

  loadFeedbacks(): void {
    this.feedService.getUserFeedbackDetails(this.userId).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.requestedFeedbacks = res.data?.requested_feedbacks || [];
          this.receivedFeedbacks = res.data?.received_feedbacks || [];
        } else {
          this.error = 'Failed to fetch feedbacks.';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Server error while loading feedbacks.';
        this.loading = false;
      }
    });
  }

  submitFeedback(): void {
    console.log('Submitting feedback...');
    console.log('Form Value:', this.feedbackForm.value);
    console.log('Form Valid:', this.feedbackForm.valid);

    if (this.feedbackForm.valid) {
      this.feedService.addFeedback(this.feedbackForm.value).subscribe({
        next: (res) => {
          console.log('Feedback submission response:', res);
          this.message = res.message || 'Feedback submitted successfully.';
          this.closePopup();
        },
        error: (err) => {
          console.error('Error submitting feedback:', err);
          this.message = 'Failed to submit feedback.';
        }
      });
    } else {
      console.warn('Feedback form is invalid:', this.feedbackForm.errors);
      this.message = 'Please fill all required fields.';
    }
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
    this.message = '';

    if (this.feedbackForm) {
      this.feedbackForm.reset({
        requested_by_id: this.userId,
        requested_by_name: this.userName,
        from_id: this.userId,
        from_name: this.userName
      });
      this.getQuestions(); // Rebuild ratings after reset
    }
  }
}
