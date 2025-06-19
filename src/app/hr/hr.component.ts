import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HrService } from '../servicesFiles/hr.service';
import { AuthService } from '../servicesFiles/auth.service';
import { EnquiryService } from '../servicesFiles/enquiry.service';
import { LeaveService } from '../servicesFiles/leave.service';

@Component({
  selector: 'app-hr',
  standalone: false,
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.scss',
})
export class HrComponent implements OnInit {
  userId!: number;
  stats: any;

  attendanceToday: any;
  employeeChart: any;
  projects: any;
  recentEmployees: any;
  openPositions: any;
  userName!: string;
  profilePhoto!: string | null;
  userRole: string = '';
  designation: string = '';
  empId: string = '';
  enquiries: any[] = [];
  loading: boolean = false;
  error: string = '';
  leaveData: any;
  leaveReport: any;
  showLeavePopup = false;
  showEmployeePopup = false;
  showEnquiryPopup = false;
  styleName:string='';
  backgroundStyle: string = '';
  errorMessage: string = '';
  currentPage = 1;
  itemsPerPage = 10;

  webUsers: any;

  private isBrowser: boolean = false;


  constructor(
    private hrService: HrService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private enquiryService: EnquiryService,
    private leaveService: LeaveService
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;
        this.userName = user.name;
        this.userRole = user.role;
        this.empId = user.emp_id;
        this.profilePhoto = user.employee_details.profile_photo;
        this.designation = user.employee_details.designation;
        this.styleName = user.admin_user.company_word;

          // Set background image conditionally
      if (this.styleName === 'ar') {
        this.backgroundStyle = 'url("/assets/images/fuoday/bg/welbg-areg.png")';
      } else {
        this.backgroundStyle = 'url("/assets/images/fuoday/bg/welbg.png")';
      }
        this.loadDashboard();
        this.loadLeaveStatus();
        this.loadEmployeeStatus(this.userId);

      } else {
        console.error('User data not found or missing ID.');
      }
    }

    this.fetchEnquiries();


  }

  loadDashboard(): void {
    this.hrService.getHrDashboard(this.userId).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          this.stats = response.data.stats;
          this.attendanceToday = response.data.attendanceToday;
          this.employeeChart = response.data.employeeChart;
          this.projects = response.data.projects;

          this.recentEmployees = response.data.recentEmployees.map(
            (emp: any) => ({
              ...emp,
              bgColor: this.getRandomColor(),
            })
          );

          this.openPositions = response.data.openPositions;
        }
      },
      error: (err) => {
        console.error('Error fetching dashboard data:', err);
      },
    });
  }

  loadLeaveStatus(): void {
    this.hrService.getLeaveRequest(this.userId).subscribe({
      next: (response) => {

        if (response.status === 'Success') {
          this.leaveReport = response.data;
        }
      },
      error: (err) => {
        console.error('Error fetching leave status:', err);
      },
    });
  }
  updateStatus(leaveRequestId: number, status: 'Approved' | 'Rejected'): void {
    const payload = {
      leave_request_id: leaveRequestId,
      status: status,
      comment: '', // Optional, you can add a comment input later
    };

    this.leaveService.updateLeaveStatus(payload).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          alert(res.message);
          this.loadLeaveStatus(); // Reload leave list after update
        }
      },
      error: (err) => {
        console.error('Error updating leave status:', err);
        alert('Failed to update leave status.');
      },
    });
  }

  fetchEnquiries(): void {
    this.loading = true;
    this.enquiryService.getEnquiries().subscribe({
      next: (response) => {
        this.enquiries = response.data || response;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load enquiries';
        console.error(err);
        this.loading = false;
      },
    });
  }

 loadEmployeeStatus(id: number): void {
    this.hrService.getAllWebUsers(id).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.webUsers = res.data;
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Failed to fetch users';
        console.error(err);
      },
    });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
openEmployeePopup(): void {
    this.showEmployeePopup = true; // only if needed on open
  }
closeEmployeePopup(): void {
    this.showEmployeePopup = false;
  }
  openLeavePopup(): void {
    this.showLeavePopup = true;
    this.loadLeaveStatus(); // only if needed on open
  }

  closeLeavePopup(): void {
    this.showLeavePopup = false;
  }

  openEnquiryPopup(): void {
    this.showEnquiryPopup = true;
  }

  closeEnquiryPopup(): void {
    this.showEnquiryPopup = false;
  }
}
