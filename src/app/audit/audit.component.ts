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
  hoveredRating = 0; // To store the rating on hover
  isLoading = false; // FIXED: Added missing 'isLoading' property
  selectedFiles: { [key: string]: string } = {};
  selfRating: number = 0;
  auditReportList: any[] = [];
  selectedAudit: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private profileService: ProfileService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private performanceService: PerformanceService
  ) {
    this.auditForm = this.fb.group({
      review_period: [''],
      audit_cycle_type: [''],
      selfRating: [''],
      technicalSkillsUsed: [[]],
      communicationCollaboration: this.fb.group({
        dailyStandups: [false],
        clientMeetings: [false],
        slack: [false]
      }),
      crossFunctionalInvolvement: this.fb.group({
        techSupport: [false],
        bdSupport: [false]
      }),
      monthlyTaskHighlights: [''],
      personalHighlights: [''],
      areasToImprove: [''],
      initiativeTaken: this.fb.group({
        processSuggestion: [false],
        documentation: [false]
      }),
      learningCertificationsDone: [''],
      suggestionsToCompany: [''],
      previousCycleGoals: [''],
      goalAchievementPercentage: [''],
      kpiMetricsFile: [null],
      projectsWorkedOn: [''],
      tasksModulesCompleted: [''],
      performanceEvidencesFile: [null],
      finalRemarks: [''],
      acknowledgement: [false],
      attachments: [null]
    });
  }



  stars = [1, 2, 3, 4, 5];
  // selfRating: number = 0;
  // hoveredRating: number = 0;

  rate(rating: number): void {
    this.selfRating = rating;
    this.auditForm.patchValue({ selfRating: rating });
  }

  onStarHover(rating: number): void {
    this.hoveredRating = rating;
  }

  onStarLeave(): void {
    this.hoveredRating = 0;
  }

  getAllAuditReports() {
    if (!this.webUserId) {
      console.error('web_user_id is missing');
      return;
    }

    const url = `https://backend.fuoday.com/api/hrms/performance/getallauditreport/${this.webUserId}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response && response.status === 'Success') {
          this.auditReportList = response.data;
        } else {
          console.warn('Unexpected response format', response);
        }
      },
      error: (err) => {
        console.error('Failed to load audit reports:', err);
      }
    });
  }


  // -------------------------

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

    this.getAllAuditReports();

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
            attendance_percentage: response.data.attendance_percentage,
            working_mode: response.data.working_mode,
            // payroll: `₹${response.data.payroll.ctc} (CTC), ₹${response.data.payroll.total_salary} (Net Pay)`
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



  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }

  onFileSelected(event: any, controlName: string, isMultiple: boolean = false): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (isMultiple) {
        this.auditForm.patchValue({ [controlName]: files });
        this.selectedFiles[controlName] = `${files.length} files selected`;
      } else {
        const file = files[0];
        this.auditForm.patchValue({ [controlName]: file });
        this.selectedFiles[controlName] = file.name;
      }
    }
  }

 submitForm() {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  const payload: any = {
    web_user_id: this.webUserId,
    audit_cycle_type: this.auditForm.value.audit_cycle_type,
    review_period: this.auditForm.value.review_period,
    audit_month: currentMonth,
    self_rating: String(this.auditForm.value.selfRating),
    technical_skills_used: Array.isArray(this.auditForm.value.technicalSkillsUsed)
      ? this.auditForm.value.technicalSkillsUsed.join(', ')
      : String(this.auditForm.value.technicalSkillsUsed),
    communication_collaboration: typeof this.auditForm.value.communicationCollaboration === 'object'
      ? Object.keys(this.auditForm.value.communicationCollaboration).filter(k => this.auditForm.value.communicationCollaboration[k]).join(', ')
      : String(this.auditForm.value.communicationCollaboration),
    cross_functional_involvement: typeof this.auditForm.value.crossFunctionalInvolvement === 'object'
      ? Object.keys(this.auditForm.value.crossFunctionalInvolvement).filter(k => this.auditForm.value.crossFunctionalInvolvement[k]).join(', ')
      : String(this.auditForm.value.crossFunctionalInvolvement),
    task_highlight: this.auditForm.value.monthlyTaskHighlights,
    personal_highlight: this.auditForm.value.personalHighlights,
    areas_to_improve: this.auditForm.value.areasToImprove,
    initiative_taken: typeof this.auditForm.value.initiativeTaken === 'object'
      ? Object.keys(this.auditForm.value.initiativeTaken).filter(k => this.auditForm.value.initiativeTaken[k]).join(', ')
      : String(this.auditForm.value.initiativeTaken),
    learnings_certifications: this.auditForm.value.learningCertificationsDone,
    suggestions_to_company: this.auditForm.value.suggestionsToCompany,
    previous_cycle_goals: this.auditForm.value.previousCycleGoals,
    goal_achievement: String(this.auditForm.value.goalAchievementPercentage),
    kpi_metrics: this.auditForm.value.kpiMetricsFile,
    projects_worked: this.auditForm.value.projectsWorkedOn,
    tasks_modules_completed: this.auditForm.value.tasksModulesCompleted,
    performance_evidences: this.auditForm.value.performanceEvidencesFile,
    final_remarks: this.auditForm.value.finalRemarks,
    acknowledgement: this.auditForm.value.acknowledgement,
    attachments: this.auditForm.value.attachments
  };

  let requestBody: any;
  let headers: any = {};
  if (this.selectedFile) {
    requestBody = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      requestBody.append(key, value);
    });
    requestBody.append('file', this.selectedFile, this.selectedFile.name);
  } else {
    requestBody = payload;
    headers = { 'Content-Type': 'application/json' };
  }

  this.http.post('https://backend.fuoday.com/api/hrms/performance/addaudit', requestBody, { headers }).subscribe({
    next: (res) => {
      console.log('Form submitted:', res);
      alert('Employee Audit Form submitted successfully!');
      this.submitted = true;
      this.auditForm.reset();
      this.selectedFile = null;
    },
    error: (err) => {
      console.error('Submission failed', err);
      alert('Submission failed. Please try again later.');
    }
  });
}

}
