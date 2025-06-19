import { Component, Inject, OnInit } from '@angular/core';
import { WebuserService } from '../servicesFiles/webuser.service';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { log } from 'console';

@Component({
  selector: 'app-webuser',
  standalone: false,
  templateUrl: './webuser.component.html',
  styleUrl: './webuser.component.scss'
})
export class WebuserComponent implements OnInit {
  webUserData: any = {
    action: 'create',
    admin_user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    dob: '',
    role_location: '',
    permanent_address:'',
    place:'',
    designation: '',
    department: '',
    emp_id: '',
    password: '',
    group: '',
    blood_group: '',
    employment_type: '',
    work_module: '',
    date_of_joining: '',
    reporting_manager_id: '',
    reporting_manager_name: '',
    basic: '',
    city_compensatory_allowance: '',
    special_allowance: '',
    additional_allowance: '',
    fixed_allowance: '',
    leave_encashment: '',
    pf: '',
    esi: '',
    professional_tax: '',
    gross: '',
    actual_deductions: '',
    actual_salary: '',
    ctc: '',
    personal_contact_no:'',
    emergency_contact_no:'',
    official_contact_no:''
  };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private webuserService: WebuserService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const user = JSON.parse(localStorage.getItem('adminData') || '{}');
      this.webUserData.admin_user_id = user.id;
      // console.log("Webuser : " , this.webUserData.admin_user_id);
    }
  }

  ngOnInit(): void {}

submitWebUserForm(): void {
  // console.log('Submitting Web User Data:', this.webUserData);  // 👈 log the data to check

  this.webuserService.saveWebUser(this.webUserData).subscribe({
    next: (res) => {
      console.log('Response:', res); // 👈 log the API response
      alert(res.message);
    },
    error: (err) => {
      // console.error('Error:', err);  // 👈 log the error
      alert(err.error.message || 'Error occurred');
    }
  });
}
}
