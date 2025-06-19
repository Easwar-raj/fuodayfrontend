import { Component, OnInit } from '@angular/core';
import { WebUserEmpService } from '../servicesFiles/webuseremp.service';

@Component({
  selector: 'app-webuseremp',
  standalone: false,
  templateUrl: './webuseremp.component.html',
  styleUrl: './webuseremp.component.scss'
})
export class WebuserempComponent implements OnInit {
  adminUserId!: number;
  webUserId!: number;
  webUserData: any;
  error: string | null = null;
  successMessage: string | null = null;
  userPerson: any;

  // Form fields
  name: string = '';
  phone: string = '';
  email: string = '';
  department: string = '';
  profileFile: File | null = null;

  constructor(private webUserEmpService: WebUserEmpService) {}

  ngOnInit(): void {
    const admin = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = admin.id;
    this.fetchWebUser();
  }

  fetchWebUser(): void {
    this.webUserEmpService.getWebUserById(this.adminUserId).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.webUserData = res.data;
          this.userPerson = res.data?.user_data || '';
        }
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to load user data';
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileFile = file;
    }
  }

  setUserDataForEdit(user: any): void {
    this.webUserId = user.id;
    this.name = user.name || '';
    this.email = user.email || '';
    this.phone = user.employee_details?.personal_contact_no || '';
    this.department = user.employee_details?.department || '';
    this.profileFile = user.employee_details?.profile_photo || '';
    console.log("Profile Update : ", this.profileFile);
  }

  updateUser(): void {
    const formData = new FormData();
    formData.append('web_user_id', this.webUserId.toString());
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('department', this.department);

    if (this.profileFile) {
      formData.append('profile', this.profileFile);
    }

    this.webUserEmpService.updateWebUser(this.webUserId, formData).subscribe({
      next: (res) => {
        this.successMessage = res.data.message;
        this.fetchWebUser();
      },
      error: (err) => {
        this.error = err.error?.message || 'Update failed';
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.webUserEmpService.deleteWebUser(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.userPerson = this.userPerson.filter((user: any) => user.id !== id);
        localStorage.removeItem('web_user');
      },
      error: (err) => {
        this.error = err.error?.message || 'Delete failed';
      }
    });
  }
}
