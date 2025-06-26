import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FeedassignService } from '../servicesFiles/feedassign.service';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskRelateService } from '../servicesFiles/taskrelate.service';

@Component({
  selector: 'app-feed',
  standalone: false,
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  schedules: any[] = [];
  assignedToMe: any[] = [];
  assignedByMe: any[] = [];
  projects: any[] = [];
  calendarDays: { day: number; events: any[] }[] = [];
  currentMonthYear: string | undefined;

  assignedToMeForm: any[] = [];


  taskForm: FormGroup;
  successMessage: string = ''; 
  errorMessage: string = '';
  errorMessageTask: string = '';
  userId!: number;
  isBrowser!: boolean;
  showTaskPopup = false;


  constructor(
    private feedassignService: FeedassignService,
    private fb: FormBuilder, // ✅ Fix: Added FormBuilder injection
    private taskService: TaskRelateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.taskForm = this.fb.group({
      web_user_id: ['', Validators.required],
      date: ['', Validators.required,],
      description: ['', Validators.required],
      assigned_by: ['', Validators.required],
      assigned_by_id: [''],
      // assigned_to: ['', Validators.required],
      assigned_to: ['', Validators.required],       // 👈 emp_name
      assigned_to_id: ['', Validators.required], 
      project_id: [''],
      project: [''],
      priority: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  openTaskPopup() {
  this.showTaskPopup = true;
}

closeTaskPopup() {
  this.showTaskPopup = false;
}

onAssignedToChange(event: any): void {
  const selectedWebUserId = event.target.value;
  const selectedEmp = this.assignedToMeForm.find(emp => emp.web_user_id == selectedWebUserId);

  if (selectedEmp) {
    this.taskForm.patchValue({
      assigned_to: selectedEmp.emp_name // Set emp_name to assigned_to
    });
  } else {
    this.taskForm.patchValue({
      assigned_to: ''
    });
  }
}



  ngOnInit(): void {

    const now = new Date();
     const today = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    this.currentMonthYear = now.toLocaleDateString('en-US', options);

    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;

        // ✅ Auto-fill user data in task form
        this.taskForm.patchValue({
          web_user_id: user.id,
          assigned_by_id: user.id,
          assigned_by: user.name,
          date: today,
        });

        this.feedassignService.getFeeds(this.userId).subscribe({
          next: (res) => {
            if (res.status === 'Success') {
              this.schedules = res.data.schedules;
              this.assignedToMe = res.data.assigned;
              this.assignedByMe = res.data.pending;
              this.projects = res.data.projects;
              this.generateCalendar();
            } else {
              this.errorMessage = 'Failed to load feed data.';
            }
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error while fetching feed data.';
          }
        });

        this.feedassignService.getEmployeeByAdmin(this.userId).subscribe({
          next: (res) => {
            if (res.status === 'Success') {
             this.assignedToMeForm = res.data;
            } else {
              this.errorMessage = 'Failed to load feed data.';
            }
          },
          error: (err) => {
            console.error(err);
            this.errorMessage = 'Error while fetching feed data.';
          }
        });
      } else {
        this.errorMessage = 'User not found in local storage.';
      }
    }
  }

  generateCalendar() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-based index

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.calendarDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = day.toString().padStart(2, '0');
      const monthStr = (month + 1).toString().padStart(2, '0');
      const dateStr = `${dayStr}-${monthStr}-${year}`;

      const matchedEvents = this.schedules
        .filter(sch => sch.date === dateStr)
        .map(sch => sch.schedule_event);

      this.calendarDays.push({
        day,
        events: matchedEvents
      });
    }
  }

  submitTask() {
    if (this.taskForm.invalid) return;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.taskForm.reset();

        // ✅ Refill user IDs after reset
        this.taskForm.patchValue({
          web_user_id: this.userId,
          assigned_by_id: this.userId
        });

        // ✅ Optional: Clear success message after 3 seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Something went wrong';
      },
    });
  }
}
