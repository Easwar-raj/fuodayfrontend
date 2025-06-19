import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientimgService } from '../servicesFiles/client-img.service';

@Component({
  selector: 'app-client-img',
  standalone: false,
  templateUrl: './client-img.component.html',
  styleUrl: './client-img.component.scss'
})
export class ClientImgComponent  {
  clientForm: FormGroup;
  logoFile: File | null = null;
  isSubmitting = false;
  responseMessage = '';
  adminUserId: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private clientService: ClientimgService
  ) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;

    // Initialize the reactive form with admin_user_id dynamically
    this.clientForm = this.fb.group({
      admin_user_id: [this.adminUserId, Validators.required],
      name: ['', Validators.required],
      description: [''],
      logo: [null],
      action: ['create', Validators.required],
    });
  }

onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];
    }
  }

onSubmit() {
  if (this.clientForm.invalid) return;

  this.isSubmitting = true;

  const formData = new FormData();
  Object.entries(this.clientForm.value).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value.toString());
    }
  });

  if (this.logoFile) {
    formData.append('logo', this.logoFile);
  }

  this.clientService.saveClient(formData).subscribe({
    next: (res) => {
      this.responseMessage = res.message;

      // Reset form fully, including validators and state
      this.clientForm.reset();

      // Reset logo file variable
      this.logoFile = null;
      

      // Mark form as pristine and untouched (optional)
      this.clientForm.markAsPristine();
      this.clientForm.markAsUntouched();

      this.isSubmitting = false;
    },
    error: (err) => {
      this.responseMessage = err.error?.message || 'An error occurred';
      this.isSubmitting = false;
    }
  });
}

}
