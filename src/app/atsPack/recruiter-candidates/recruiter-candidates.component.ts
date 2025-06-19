import { Component } from '@angular/core';

@Component({
  selector: 'app-recruiter-candidates',
  standalone: false,
  templateUrl: './recruiter-candidates.component.html',
  styleUrl: './recruiter-candidates.component.scss'
})
export class RecruiterCandidatesComponent {
   // ============ ATS Resume Modal ============
  selectedFileName: string = '';
  jobDescription: string = '';
  showResumeModal: boolean = false;

  openResumeModal() {
    this.showResumeModal = true;
  }

  onResumeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;
    }
  }

  submitResume() {
    console.log('Resume:', this.selectedFileName);
    console.log('Job Description:', this.jobDescription);
    this.closeAllModals();
  }

  // ============ Add Candidate Modal ============
  showAddCandidateModal: boolean = false;

  resumeFileName: string = '';
  coverLetterFileName: string = '';

  candidate = {
    name: '',
    jobTitle: '',
    email: '',
    employer: '',
    phone: '',
    linkedin: '',
    location: '',
  };

  job = {
    jobId: '',
    dateOpened: '',
    department: '',
    dateClosed: '',
    manager: '',
    dateApplied: '',
    location: '',
    statusDate: '',
    experience: '',
  };

  openAddCandidateModal() {
    this.showAddCandidateModal = true;
  }

  onFileSelected(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const fileName = input.files[0].name;
      if (type === 'resume') {
        this.resumeFileName = fileName;
      } else if (type === 'cover') {
        this.coverLetterFileName = fileName;
      }
    }
  }

  submitCandidate() {
    console.log('Candidate:', this.candidate);
    console.log('Job Info:', this.job);
    console.log('Resume File:', this.resumeFileName);
    console.log('Cover Letter:', this.coverLetterFileName);
    this.closeAllModals();
  }

  // ============ Close All ============
  closeAllModals() {
    this.showResumeModal = false;
    this.showAddCandidateModal = false;

    // Reset ATS modal fields
    this.selectedFileName = '';
    this.jobDescription = '';

    // Optionally reset form data too
    this.resumeFileName = '';
    this.coverLetterFileName = '';
    this.candidate = {
      name: '',
      jobTitle: '',
      email: '',
      employer: '',
      phone: '',
      linkedin: '',
      location: '',
    };
    this.job = {
      jobId: '',
      dateOpened: '',
      department: '',
      dateClosed: '',
      manager: '',
      dateApplied: '',
      location: '',
      statusDate: '',
      experience: '',
    };
  }
}
