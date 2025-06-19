import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  formData = {
    email: '',
    password: '',
  };
  showPassword = false;
  constructor(private http: HttpClient, private router: Router) {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    const loginPayload = {
      email: this.formData.email,
      password: this.formData.password,
    };

    this.http.post<any>('https://backend.fuoday.com/api/admin-users/login', loginPayload).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);
        localStorage.setItem('adminData', JSON.stringify(response.data)); // Store full user object
        localStorage.setItem('authToken', response.token); // Optionally store token

        this.router.navigate(['/admin']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert(error.error.message || 'Login failed');
      },
    });
  }
}
