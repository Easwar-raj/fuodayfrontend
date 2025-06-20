import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-emp-audit',
  standalone: false,
  templateUrl: './emp-audit.component.html',
  styleUrl: './emp-audit.component.scss'
})
export class EmpAuditComponent implements OnInit {
  auditReport: any = null;
  errorMessage: string = '';
  selectedAudit: any = null;
  selectedAuditId: number | null = null;

  editForm: FormGroup;
  managerForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      audit_month: [''],
      challenges: [''],
      comment: [''],
      emp_id: [''],
      emp_name: [''],
      self_rating: [''],
      support: [''],
      task_highlight: ['']
    });

    this.managerForm = this.fb.group({
      work_justification: [''],
      manager_review: [''],
      final_remarks: [''],
      submissionStatus: ['Submitted to Management'],
      manager_review_comments: [''],
      rating_execution: [''],
      rating_innovation: [''],
      attendance_discipline_score: [''],
      quality_of_delivery: [''],
      ownership_initiative: [''],
      team_growth_contribution: [''],
      promotion_action_suggested: ['']
    });
  }

  ngOnInit(): void {
    let webUserId: number | null = null;
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user?.employee_details?.web_user_id) {
        webUserId = user.employee_details.web_user_id;
      }
    }

    if (!webUserId) {
      this.errorMessage = 'web_user_id not found in local storage.';
      return;
    }

    this.http.get(`https://backend.fuoday.com/api/hrms/performance/getauditreportingteam/${webUserId}`).subscribe({
      next: (data: any) => {
        this.auditReport = data;
        console.log(this.auditReport);
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch audit report.';
      }
    });
  }

  onEdit(webUserId: number) {
    this.selectedAudit = null; // Clear previous state
    this.managerForm.reset();  // Reset the form
  
    const apiUrl = `https://backend.fuoday.com/api/hrms/performance/getauditreport/${webUserId}`;
    
    this.http.get(apiUrl).subscribe({
      next: (response: any) => {
        if (response?.status === 'Success' && response?.data) {
          this.selectedAudit = response.data;
          this.selectedAuditId = response.data.id;
        } else {
          alert('No audit data found for this user.');
        }
      },
      error: (err) => {
        console.error('Error fetching audit data:', err);
        alert('Failed to fetch audit data.');
      }
    });
  }
  

  submitManagerReview() {
    if (this.managerForm.valid && this.selectedAuditId) {
      const payload = {
        work_justification: this.managerForm.value.work_justification,
        manager_review: this.managerForm.value.manager_review,
        final_remarks: this.managerForm.value.final_remarks,
        manager_review_comments: this.managerForm.value.manager_review_comments,
        execution_rating: String(this.managerForm.value.rating_execution),
        innovation_rating: String(this.managerForm.value.rating_innovation),
        attendance_discipline_score: this.managerForm.value.attendance_discipline_score,
        delivery_quality: this.managerForm.value.quality_of_delivery,
        ownership_initiative: this.managerForm.value.ownership_initiative,
        team_growth_contribution: this.managerForm.value.team_growth_contribution,
        promotion_action_suggested: this.managerForm.value.promotion_action_suggested
      };

      const apiUrl = `https://backend.fuoday.com/api/hrms/performance/updateaudit/${this.selectedAuditId}`;

      this.http.post(apiUrl, payload).subscribe({
        next: (res) => {
          alert('Review submitted successfully!');
          this.selectedAudit = null;
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Failed to submit review.');
        }
      });
    } else {
      alert('Please complete the form or missing audit ID');
    }
  }
}

