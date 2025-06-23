import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HrService } from '../servicesFiles/hr.service';
import { AuthService } from '../servicesFiles/auth.service';
import { WebuserService } from '../servicesFiles/webuser.service';
import { EnquiryService } from '../servicesFiles/enquiry.service';
import { LeaveService } from '../servicesFiles/leave.service';

@Component({
  selector: 'app-management-dashboard',
  standalone: false,
  templateUrl: './management-dashboard.component.html',
  styleUrl: './management-dashboard.component.scss'
})
export class ManagementDashboardComponent implements OnInit {
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
  showAuditPopup = false;
  showEnquiryPopup = false;
  showLatePopup = false;
  showAuditViewPopup = false;
  styleName:string='';
  backgroundStyle: string = '';
  errorMessage: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  groupedEmployees: any[] = [];
  // add the audit reports
  auditReportList: any[] = [];
  selectedAudit: any = null;


  webUsers: any;

  private isBrowser: boolean = false;


  constructor(
    private hrService: HrService,
    private authService: AuthService,
    private webuserService: WebuserService,
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
        this.getAllAuditReports(); 
      } else {
        console.error('User data not found or missing ID.');
      }
    }

    this.fetchEnquiries();
    this.fetchGroupedEmployees();


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
    fetchGroupedEmployees() {
    this.loading = true;
    this.webuserService.getEmployeesByManager(this.userId).subscribe({
      next: (res) => {
        this.groupedEmployees = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching employees', err);
        this.loading = false;
      },
    });
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

  openAuditPopup(): void {
    this.showAuditPopup = true;
  }

  closeAuditPopup(): void {
    this.showAuditPopup = false;
  }
  openLatePopup(): void {
    this.showLatePopup = true;
  }

  closeLatePopup(): void {
    this.showLatePopup = false;
  }
  // old code for openauditviewPopup()
  // openAuditViewPopup(): void {
  //   this.showAuditViewPopup = true;
  // }
  openAuditViewPopup(empId: string): void {
  const audit = this.auditReportList.find(a => a.emp_id === empId);
  if (audit) {
    this.selectedAudit = audit;
    this.showAuditViewPopup = true;
  } else {
    console.warn('No audit found for emp_id:', empId);
    this.selectedAudit = null;
   }
}


  closeAuditViewPopup(): void {
    this.showAuditViewPopup = false;
  }
  openEnquiryPopup(): void {
    this.showEnquiryPopup = true;
  }

  closeEnquiryPopup(): void {
    this.showEnquiryPopup = false;
  }

  
  // getauditreport api call 

  getAllAuditReports() {
    if (!this.userId) {
      console.error('web_user_id is missing');
      return;
    }

    const url = `https://backend.fuoday.com/api/hrms/performance/getallauditreport/${this.userId}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response && response.status === 'Success') {
          this.auditReportList = response.data;
          console.log("line 270", this.auditReportList);
        } else {
          console.warn('Unexpected response format', response);
        }
      },
      error: (err) => {
        console.error('Failed to load audit reports:', err);
      }
    });
  }

 


}





