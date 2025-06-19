import { Component, Inject, OnInit } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AboutService } from '../servicesFiles/about.service';

@Component({
  selector: 'app-about',
   standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  adminUserId: number = 0;
  aboutForm!: FormGroup;
  aboutList: any[] = [];

  isEditMode: boolean = false;
  editingId: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private aboutService: AboutService,
    private fb: FormBuilder
  ) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user?.id || 0;
  }

  ngOnInit(): void {
    this.initForm();
    this.loadAbouts();
  }

  private initForm(): void {
    this.aboutForm = this.fb.group({
      about: [''],
      services: [''],
      industries: [''],
      client: [''],
      team: ['']
    });
  }

loadAbouts(): void {
  this.aboutService.getAbouts(this.adminUserId).subscribe({
    next: (response) => {
      console.log("Line 54:", response);
      if (response.status === 'Success') {
        // Ensure aboutList is always an array
        this.aboutList = response.data ? [response.data] : [];
        console.log("Line 57:", this.aboutList);
      } else {
        console.error("Failed to load about data:", response.message);
      }
    },
    error: (error) => {
      console.error("HTTP error loading about data:", error);
    }
  });
}


  onSubmit(): void {
    const action = this.isEditMode ? 'update' : 'create';
    const payload: any = {
      admin_user_id: this.adminUserId,
      action,
      ...this.aboutForm.value
    };

    if (this.isEditMode && this.editingId !== null) {
      payload.id = this.editingId;
    }

    this.aboutService.saveAbout(payload).subscribe({
      next: () => {
        this.loadAbouts();
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to save about data:', err);
      }
    });
  }

  onEdit(about: any): void {
    this.isEditMode = true;
    this.editingId = about.id;
    this.aboutForm.patchValue({
      about: about.about,
      services: about.services,
      industries: about.industries,
      client: about.client,
      team: about.team
    });
  }

  onDelete(admin_user_id: number): void {
    if (confirm('Are you sure you want to delete this?')) {
      this.aboutService.deleteAbout(admin_user_id).subscribe({
        next: () => this.loadAbouts(),
        error: (err) => console.error('Failed to delete:', err)
      });
    }
  }

  onCancel(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.aboutForm.reset();
    this.isEditMode = false;
    this.editingId = null;
  }
}
