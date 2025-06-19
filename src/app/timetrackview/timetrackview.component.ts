import { Component, OnInit , Input, SimpleChanges,} from '@angular/core';
import { TimetrackService } from '../servicesFiles/timetracker.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-timetrackview',
  standalone: false,
  templateUrl: './timetrackview.component.html',
  styleUrl: './timetrackview.component.scss'
})
export class TimetrackviewComponent implements OnInit {
  userId!: number;
  trackerData: any;
  attendanceData: any;
  errorMessage: string = '';
  userName:string = '';

  @Input() percent: number = 0;

  radius: number = 35;
  circumference: number = 2 * Math.PI * this.radius;
  strokeDashoffset: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.updateProgress();
  }



  updateProgress(): void {
    const percentClamped = Math.min(Math.max(this.percent, 0), 100);
    this.strokeDashoffset = this.circumference - (percentClamped / 100) * this.circumference;
  }

  constructor(private timetrackService: TimetrackService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.userName = user.name;

this.timetrackService.getTrackerData(this.userId).subscribe({
  next: (response) => {
    if (response.status === 'Success') {
      this.trackerData = response.data;
      this.attendanceData = response.data.attendances_this_week;
    } else {
      console.error('Unexpected status:', response.status);
    }
  },
  error: (error) => {
    console.error('Error fetching tracker data:', error);
  }
});
  } else {
    this.errorMessage = 'User not found in local storage.';
  }
}
}
