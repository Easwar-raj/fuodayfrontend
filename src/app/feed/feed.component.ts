import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FeedassignService } from '../servicesFiles/feedassign.service';
import { isPlatformBrowser } from '@angular/common';

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
  errorMessage: string = '';
  userId!: number;
  isBrowser!: boolean;
  currentMonthYear: string | undefined;
  calendarDays: { day: number; events: any[] }[] = [];

  constructor(
    private feedassignService: FeedassignService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    this.currentMonthYear = now.toLocaleDateString('en-US', options);

    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;

        this.feedassignService.getFeeds(this.userId).subscribe({
          next: (res) => {
            if (res.status === 'Success') {
                this.schedules = res.data.schedules;
                this.assignedToMe = res.data.assigned_to_me;
                this.assignedByMe = res.data.assigned_by_me;
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
}
