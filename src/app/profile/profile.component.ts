import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProfileService } from '../servicesFiles/profile.service';
import { AuthService } from '../servicesFiles/auth.service';
import { WebuserService } from '../servicesFiles/webuser.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  adminId!: number;
  id!: number;
  profileData: any;
  errorMessage = '';
  successMessage = '';
  styleName = '';
  backgroundStyle = '';

  selectedUserId!: number;
  selectedFile: File | null = null;
  showEditPopup = false;

  isEditing = false;
  isAboutEditing = false;
  isSkillEditing = false;
  isEmployeeEditing = false;
  isOnboardEditing = false;
  isExperienceEditing = false;
  isEducationEditing = false;

  profileForm: FormGroup;
  aboutForm: FormGroup;
  skillForm: FormGroup;
  onboardForm: FormGroup;
  onexperienceForm: FormGroup;
  educationForm: FormGroup;
  editForm: FormGroup;

  onboarded = 0;
  maxValue = 100;
  circumference = 2 * Math.PI * 54;
  strokeOffset = this.circumference;
  private isBrowser = false;

  fileFields = [
    { name: 'pan', label: 'PAN' },
    { name: 'passbook', label: 'Passbook' },
    { name: 'payslip', label: 'Payslip' },
    { name: 'offer_letter', label: 'Offer Letter' }
  ];

  uploadedFlags: { [key: string]: boolean } = {
    pan: false,
    passbook: false,
    payslip: false,
    offer_letter: false
  };

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private fb: FormBuilder,
    private webuserService: WebuserService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.profileForm = this.fb.group({
      web_user_id: [''],
      first_name: [''],
      last_name: [''],
      dob: [''],
      official_email: [''],
      address: ['']
    });

    this.aboutForm = this.fb.group({
      web_user_id: [''],
      about: ['']
    });

    this.skillForm = this.fb.group({
      web_user_id: [''],
      skills: this.fb.array([])
    });

    this.onboardForm = this.fb.group({
      web_user_id: [''],
      welcome_email_sent: [''],
      scheduled_date: [''],
      photo: [''],
      pan: [''],
      passbook: [''],
      payslip: [''],
      offer_letter: ['']
    });

    this.onexperienceForm = this.fb.group({
      experiences: this.fb.array([])
    });

    this.educationForm = this.fb.group({
      web_user_id: [''],
      qualification: [''],
      university: [''],
      year_of_passing: ['']
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['']
    });
  }

  createExperienceGroup(data: any = {}): FormGroup {
    return this.fb.group({
      web_user_id: [this.userId],
      company_name: [data.company_name || ''],
      no_of_yrs: [data.no_of_yrs || ''],
      role: [data.role || ''],
      duration: [data.duration || ''],
      responsibilities: [data.responsibilities || ''],
      achievements: [data.achievements || '']
    });
  }

  get experiences(): FormArray {
    return this.onexperienceForm.get('experiences') as FormArray;
  }

  get skills(): FormArray {
    return this.skillForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.styleName = user.admin_user.company_word;
        this.backgroundStyle = this.styleName === 'ar'
          ? 'url("/assets/images/fuoday/bg/welbg-areg.png")'
          : 'url("/assets/images/fuoday/bg/welbg.png")';
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
        const [firstName, lastName] = response.data.name.split(' ');

        this.profileForm.patchValue({
          web_user_id: this.userId,
          first_name: firstName,
          last_name: lastName,
          dob: response.data.dob,
          official_email: response.data.email,
          address: response.data.address
        });

        this.aboutForm.patchValue({
          web_user_id: this.userId,
          about: response.data.about
        });

        this.skillForm.patchValue({ web_user_id: this.userId });
        this.skills.clear();
        (response.data.skills || []).forEach((skill: any) => this.addSkill(skill));

        if (response.data?.experiences?.length > 0) {
          this.experiences.clear();
          response.data.experiences.forEach((exp: any) => {
            this.experiences.push(this.createExperienceGroup(exp));
          });
        } else {
          this.experiences.clear();
          this.experiences.push(this.createExperienceGroup());
        }

        if (response.data?.education) {
          this.educationForm.patchValue({
            web_user_id: this.userId,
            qualification: response.data.education.qualification ?? '',
            university: response.data.education.university ?? '',
            year_of_passing: response.data.education.year_of_passing ?? ''
          });
        }

        if (response.data?.onboardings) {
          this.onboardForm.patchValue({
            web_user_id: this.userId,
            welcome_email_sent: response.data.onboardings.welcome_email_sent ?? '',
            scheduled_date: response.data.onboardings.scheduled_date ?? ''
          });

          this.fileFields.forEach(field => {
            if (response.data.onboardings[field.name]) {
              this.uploadedFlags[field.name] = true;
            }
          });
        }

        this.updateProgress(response.data?.referred_summary?.onboarded ?? 0);
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch profile data.';
        console.error(err);
      }
    });
  }

  // Edit Popup
  openEditPopup(user: any) {
    this.selectedUserId = this.userId;
    this.editForm.patchValue({
      name: this.profileData.name,
      phone: this.profileData.personal_contact_no
    });
    this.selectedFile = null;
    this.showEditPopup = true;
  }

  closeEditPopup() {
    this.showEditPopup = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

addExperience(): void {
  this.experiences.push(this.createExperienceGroup());
  console.log('Experience added:', this.experiences.value);
}

removeExperience(index: number): void {
  console.log('Removing experience at index:', index);
  this.experiences.removeAt(index);
  console.log('Remaining experiences:', this.experiences.value);
}

  submitEdit() {
    const formData = new FormData();
    formData.append('name', this.editForm.get('name')?.value);
    formData.append('phone', this.editForm.get('phone')?.value);
    if (this.selectedFile) {
      formData.append('profile', this.selectedFile);
    }

    this.webuserService.updateWebUser(this.selectedUserId, formData).subscribe({
      next: () => {
        this.successMessage = 'User updated successfully';
        this.closeEditPopup();
        this.loadProfile();
      },
      error: (err) => {
        console.error(err);
        alert('Update failed');
      }
    });
  }

  onFileSelected(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.onboardForm.patchValue({ [fieldName]: file });
      this.uploadedFlags[fieldName] = true;
    }
  }

  updateProgress(value: number): void {
    this.onboarded = value;
    const percentage = Math.min(value / this.maxValue, 1);
    this.strokeOffset = this.circumference * (1 - percentage);
  }

addSkill(skill: any = { id: null, skill: '', level: '' }): void {
  this.skills.push(this.fb.group({
    id: [skill.id], // ✅ Add id control
    skill: [skill.skill],
    level: [skill.level]
  }));
}


removeSkill(index: number): void {
  const skillGroup = this.skills.at(index);

  const skillId = skillGroup.get('id')?.value;
  const skillName = skillGroup.get('skill')?.value;
  const skillLevel = skillGroup.get('level')?.value;

  console.log('Skill ID:', skillId);
  console.log('Skill Name:', skillName);
  console.log('Skill Level:', skillLevel);

  // ✅ If no ID, remove locally only
  if (!skillId) {
    console.log('No ID found, removing skill locally only.');
    this.skills.removeAt(index);
    return;
  }

  const payload = {
    web_user_id: this.userId,
    id: skillId,
    skill: skillName,
    level: skillLevel,
  };

  console.log('Prepared payload for deletion:', payload);

  if (confirm('Are you sure you want to delete this skill?')) {
    this.profileService.deleteSkill(payload).subscribe({
      next: (response) => {
        console.log('Delete response:', response);
        if (response) {
          console.log('Skill deleted successfully on server. Removing from form.');
          this.skills.removeAt(index);
        } else {
          this.errorMessage = 'Failed to delete skill: ' + response.message;
          console.error(this.errorMessage);
        }
      },
      error: (err) => {
        this.errorMessage = 'Error deleting skill.';
        console.error('API error:', err);
      }
    });
  } else {
    console.log('User canceled the skill deletion.');
  }
}


  // Toggle Edit Sections
  enableEdit() { this.isEditing = true; }
  enableAboutEdit() { this.isAboutEditing = true; }
  enableSkillEdit() { this.isSkillEditing = true; }
  enableEmployeeEdit() { this.isEmployeeEditing = true; }
  enableOnboardEdit() { this.isOnboardEditing = true; }
  enableExperienceEdit() { this.isExperienceEditing = true; }
  enableEducationEdit() { this.isEducationEditing = true; }

  // Save Methods
  saveProfile() {
    if (this.profileForm.valid) {
      this.profileService.updateEmployeeProfile(this.profileForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.isEditing = false;
            this.ngOnInit();
          }
        }
      });
    }
  }

  saveAbout() {
    if (this.aboutForm.valid) {
      this.profileService.updateEmployeeProfile(this.aboutForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.isAboutEditing = false;
            this.ngOnInit();
          }
        }
      });
    }
  }

  saveSkill() {
    if (this.skillForm.valid) {
      const payloads = this.skills.controls.map(skillGroup => ({
        web_user_id: this.userId,
        skill: skillGroup.value.skill,
        level: skillGroup.value.level
      }));

      const requests = payloads.map(payload =>
        this.profileService.updateOrCreateSkill(payload)
      );

      forkJoin(requests).subscribe({
        next: (responses) => {
          console.log('All skills saved:', responses);
          this.isSkillEditing = false;
          this.ngOnInit();
        },
        error: (err) => {
          console.error('Error saving skills:', err);
          this.errorMessage = 'Failed to save skills.';
        }
      });
    }
  }

  saveonboard() {
    if (this.onboardForm.valid) {
      const formData = new FormData();

      formData.append('web_user_id', this.userId.toString());

      Object.entries(this.onboardForm.value).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          formData.append(key, value.toString());
        }
      });

      this.profileService.updateOnboardingDocuments(formData).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.isOnboardEditing = false;
            this.ngOnInit();
          } else {
            this.errorMessage = 'Failed to update onboarding documents.';
          }
        },
        error: (err) => {
          this.errorMessage = 'Error updating onboarding documents.';
          console.error(err);
        }
      });
    }
  }

  saveExperience() {
    if (this.onexperienceForm.valid) {
      this.profileService.updateOrCreateExperience(this.onexperienceForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.isExperienceEditing = false;
            this.ngOnInit();
          }
        },
        error: (err) => {
          console.error('Error updating experience:', err);
        }
      });
    }
  }

  saveEducation() {
    if (this.educationForm.valid) {
      this.profileService.updateOrCreateEducation(this.educationForm.value).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.isEducationEditing = false;
            this.ngOnInit();
          }
        },
        error: (err) => {
          console.error('Error updating education:', err);
        }
      });
    }
  }

  // Cancel Methods
  cancelAboutEdit() {
    this.isAboutEditing = false;
    this.aboutForm.patchValue({ about: this.profileData.about });
  }

  cancelSkillEdit() {
    this.isSkillEditing = false;
    this.skillForm.patchValue({ skill: this.profileData.skills });
  }

  cancelPersonalEdit() {
    this.isEditing = false;
    this.loadProfile();
  }

  cancelExperienceEdit() {
    this.isExperienceEditing = false;
    this.loadProfile();
  }

  cancelEducationEdit() {
    this.isEducationEditing = false;
    this.loadProfile();
  }
   getWidth(level: string): string {
    switch (level) {
      case 'Expert': return '100%';
      case 'Advanced': return '80%';
      case 'Intermediate': return '50%';
      case 'Beginner': return '30%';
      default: return '0%';
    }
  }

}
