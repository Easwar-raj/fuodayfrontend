import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryService } from '../servicesFiles/enquiry.service';

@Component({
  selector: 'app-login',
  standalone:false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  successLoginMessage = '';
  successEnquireMessage = '';
  successTableMessage: string | null = null;
  errorMessage = '';
  formData = { email: '', password: '' };
  selectedTab: 'employee' | 'recruiter' = 'employee';
  showPassword = false;
  showPopup = false;
   enquiryForm!: FormGroup;
  currentTab = {
    title: 'Employee Login',
    description: 'Access employee dashboard',
    buttonText: 'Login',
  };

  constructor(private http: HttpClient, private router: Router , private fb: FormBuilder, private enquiryService: EnquiryService) { }
   openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
// Enquire Form


  ngOnInit() {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('userData');
    if (token && user) {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    }

     this.enquiryForm = this.fb.group({
  full_name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  contact_number: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]], // for digits only
  message: ['']
});
  }

  switchTab(tab: 'employee' | 'recruiter') {
    this.selectedTab = tab;
    this.currentTab = {
      title: `${tab} Login`,
      description: `Access ${tab.toLowerCase()} dashboard`,
      buttonText: `Login as ${tab}`,
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

onSubmit() {
  this.loading = true;
  this.errorMessage = '';
  this.successLoginMessage = '';

  const loginPayload = {
    email: this.formData.email,
    password: this.formData.password,
    role: this.selectedTab === 'recruiter' ? 'recruiter' : 'employee',
  };

  this.http.post<any>('http://127.0.0.1:8000/api/web-users/login', loginPayload).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userData', JSON.stringify(response.data));

      this.successLoginMessage = 'Login successful';
      setTimeout(() => {
        this.successLoginMessage = '';

        // 🧭 Conditional Navigation
        if (loginPayload.role === 'recruiter') {
          this.router.navigate(['/recruiter-dashboard'], { replaceUrl: true });
        } else {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        }

      }, 300);
    },
    error: (error) => {
      console.error('Login failed:', error);
      this.errorMessage = error.error?.message || 'Login failed';
      this.loading = false;
      setTimeout(() => (this.errorMessage = ''), 5000);
    },
    complete: () => {
      if (this.successLoginMessage) {
        this.loading = false;
      }
    },
  });
}


submitForm(): void {
  if (this.enquiryForm.valid) {
    this.enquiryService.submitEnquiry(this.enquiryForm.value).subscribe({
      next: (res) => {
        console.log("Enquire Form Response:", res);

        // ✅ Show success message
        this.successTableMessage = '✅ Enquiry submitted successfully.';

        // ✅ Optional: Disable form or button to prevent re-submission during delay
        this.enquiryForm.disable();

        // ✅ Show message for 3 seconds, then close popup
        setTimeout(() => {
          this.successTableMessage = null;
          this.closePopup();      // 👈 Make sure this closes the popup modal/dialog
          this.enquiryForm.enable();
          this.enquiryForm.reset(); // optional reset after closing
        }, 3000);
      },
      error: (err) => {
        console.error('Enquiry Error:', err);
        this.successTableMessage = '❌ Error submitting enquiry.';

        setTimeout(() => {
          this.successTableMessage = null;
        }, 3000);
      }
    });
  } else {
    this.successTableMessage = '⚠️ Please fill all required fields correctly.';
    setTimeout(() => {
      this.successTableMessage = null;
    }, 3000);
  }
}

}
