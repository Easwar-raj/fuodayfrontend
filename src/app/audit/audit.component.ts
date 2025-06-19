import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../servicesFiles/profile.service';
import { AuthService } from '../servicesFiles/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { PerformanceService } from '../servicesFiles/performance.service';

@Component({
  selector: 'app-audit',
  standalone: false,
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent {

  auditForm: FormGroup;
  submitted = false;
  selectedFile: File | null = null;
  profileData: any;
  private isBrowser = false;
  errorMessage = '';
  userId!: number;
  employee: any = {};
  webUserId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private profileService: ProfileService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private performanceService: PerformanceService
  ) {
    this.auditForm = this.fb.group({
      taskHighlights: [''],
      challenges: [''],
      supportNeeded: [''],
      selfRating: [''],
      comments: [''],
      workJustification: [''],
      managerRating: [''],
      finalRemarks: [''],
      submissionStatus: ['']
    });
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        if (user && user.employee_details && user.employee_details.web_user_id) {
          this.webUserId = user.employee_details.web_user_id;
        }
      }
    }

    if (!this.webUserId) {
      this.errorMessage = 'web_user_id not found in local storage.';
      return;
    }

    this.performanceService.getEmployeeAudit(this.webUserId).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.employee = {
            name: response.data.employee_name,
            empId: response.data.emp_id,
            department: response.data.department,
            designation: response.data.designation,
            manager: response.data.reporting_manager,
            doj: response.data.date_of_joining,
            attendance: `Present: ${response.data.attendance_summary.present}, Leave: ${response.data.attendance_summary.leave}, WFH: ${response.data.attendance_summary.wfh ?? 0}`,
            payroll: `₹${response.data.payroll.ctc} (CTC), ₹${response.data.payroll.total_salary} (Net Pay)`
          };
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch employee audit data.';
      }
    });
  }

  loadProfile(): void {
    this.profileService.getProfile(this.userId).subscribe({
      next: (response) => {
        if (response.status !== 'Success') return;

        this.profileData = response.data;
        console.log("Profile Aduit : ", this.profileData)
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitForm() {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonth = monthNames[new Date().getMonth()];
    const payload: any = {
      web_user_id: this.webUserId,
      audit_month: currentMonth,
      task_highlight: this.auditForm.value.taskHighlights,
      challenges: this.auditForm.value.challenges,
      support: this.auditForm.value.supportNeeded,
      self_rating: this.auditForm.value.selfRating,
      comment: this.auditForm.value.comments
    };

    let requestBody: any;
    let headers: any = {};
    if (this.selectedFile) {
      // Use FormData if file is present
      requestBody = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        requestBody.append(key, value);
      });
      requestBody.append('file', this.selectedFile, this.selectedFile.name);
      // Let browser set Content-Type for FormData
    } else {
      // Send as JSON if no file
      requestBody = payload;
      headers = { 'Content-Type': 'application/json' };
    }

    this.http.post('https://backend.fuoday.com/api/hrms/performance/addaudit', requestBody, { headers }).subscribe({
      next: (res) => {
        console.log('Form submitted:', res);
        this.submitted = true;
        this.auditForm.reset();
        this.selectedFile = null;

      },
      error: (err) => {
        console.error('Submission failed', err);
      }
    });
  }
}
