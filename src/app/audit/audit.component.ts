import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../servicesFiles/profile.service';
import { AuthService } from '../servicesFiles/auth.service';
import { isPlatformBrowser } from '@angular/common';

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

  // Auto-filled sample data
  employee = {
    name: 'Ramesh Kumar',
    empId: 'TSS0035',
    department: 'IT Development',
    designation: 'Senior Developer',
    manager: 'Priya Sharma',
    doj: '12-Apr-2022',
    attendance: 'Present: 20, Leave: 2, WFH: 4',
    payroll: '₹65,000 (CTC), ₹58,000 (Net Pay)'
  };

  constructor(private fb: FormBuilder, private http: HttpClient,private profileService: ProfileService,private authService: AuthService,@Inject(PLATFORM_ID) private platformId: Object,) {
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
      }
    }

    const user = this.authService.getUserData();
    if (!user) {
      this.errorMessage = 'User not found in local storage.';
      return;
    }
    this.userId = user.id;
    this.loadProfile();
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
    const formData = new FormData();

    // Add form values
    Object.entries(this.auditForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // Add employee data for audit tracking
    Object.entries(this.employee).forEach(([key, value]) => {
      formData.append(`employee_${key}`, value);
    });

    // Add file if selected
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    // Fake API POST
    this.http.post('https://jsonplaceholder.typicode.com/posts', formData).subscribe({
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
