import { Component, OnInit, OnDestroy ,  ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceService } from '../servicesFiles/attendance.service';
import { AuthService } from '../servicesFiles/auth.service';

// Optional: Disable accessibility warning and set default chart styles
Highcharts.setOptions({
  time: { useUTC: false },
  chart: {
    style: { fontFamily: '"Quicksand", serif' }
  },
  accessibility: { enabled: false }
} as unknown as Highcharts.Options);

@Component({
  selector: 'app-attendance',
  standalone: false,
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit, OnDestroy {
  userId!: number;
  attendanceData: any;
  attendanceViewData: any;
  errorMessage: string = '';
  currentPage = 1;
  itemsPerPage = 7;
  graph: any[] = [];
currentDate: string;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  currentTime: string = '';
  greeting: string = '';
  private intervalId: any;
   @ViewChild('attendanceModal') attendanceModal: any;

  constructor( private attendanceService: AttendanceService, private authService: AuthService, private modalService: NgbModal,
  ) {

     const today = new Date();
    this.currentDate = today.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  ngOnInit(): void {
    this.updateTimeAndGreeting();
    this.intervalId = setInterval(() => {
      this.updateTimeAndGreeting();
    }, 1000); // Update every second

    this.fetchAttendanceData();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  updateTimeAndGreeting(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();

    const hour = now.getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

 openAttendanceModal(): void {
  const user = this.authService.getUserData();

  if (!user || !user.id) {
    console.warn('User not found or invalid');
    return;
  }

  const userId = user.id;

  this.attendanceService.getAttendanceByRole(userId).subscribe({
    next: (response) => {
      if (response.status === 'Success') {
        this.attendanceViewData = response.data;
        this.modalService.open(this.attendanceModal, { size: 'lg' });
      } else {
        console.warn('Attendance fetch returned unsuccessful status');
        alert('Unable to retrieve attendance data.');
      }
    },
    error: (error) => {
      console.error('Attendance fetch failed:', error);
      alert('Failed to fetch attendance data. Please try again later.');
    }
  });
}


  fetchAttendanceData(): void {
    const user = this.authService.getUserData();
    if (!user) return;

    this.userId = user.id;
    this.attendanceService.getAttendance(this.userId).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          this.attendanceData = response.data;
          this.graph = response.data.graph;

          const { months, present, absent, leave, permission } = this.transformData(this.graph);

          this.chartOptions = {
            chart: { type: 'column' },
            title: { text: 'Attendance Chart' },
            xAxis: { categories: months, crosshair: true },
            yAxis: {
              min: 0,
              title: {
                text: 'Days',
                style: { fontSize: '18px', fontWeight: '700' }
              }
            },
            credits: { enabled: false },
            tooltip: {
              shared: true,
              valueSuffix: ' days'
            },
            series: [
              { name: 'Present', data: present, type: 'column' },
              { name: 'Absent', data: absent, type: 'column' },
              { name: 'Leave', data: leave, type: 'column' },
              { name: 'Permission', data: permission, type: 'column' }
            ]
          };
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch attendance data.';
        console.error(err);
      }
    });
  }

  parseAttendanceValue(value: any): number {
    if (value == null || value === '') return 0;

    const str = String(value).trim();
    const parts = str.split(' ');
    let total = 0;

    for (let part of parts) {
      if (part.includes('/')) {
        const [num, den] = part.split('/').map(Number);
        if (!isNaN(num) && !isNaN(den) && den !== 0) {
          total += num / den;
        }
      } else {
        const num = parseFloat(part);
        if (!isNaN(num)) {
          total += num;
        }
      }
    }

    return total;
  }

  transformData(graph: any[]): any {
    const months: string[] = [];
    const present: number[] = [];
    const absent: number[] = [];
    const leave: number[] = [];
    const permission: number[] = [];

    graph.forEach(entry => {
      months.push(entry.month);
      present.push(this.parseAttendanceValue(entry.present));
      absent.push(this.parseAttendanceValue(entry.absent));
      leave.push(this.parseAttendanceValue(entry.leave));
      permission.push(this.parseAttendanceValue(entry.permission));
    });

    return { months, present, absent, leave, permission };
  }
}
