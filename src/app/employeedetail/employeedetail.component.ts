import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employeedetail',
  standalone: false,
  templateUrl: './employeedetail.component.html',
  styleUrl: './employeedetail.component.scss'
})
export class EmployeedetailComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      employeeId: ['', Validators.required],
      role: ['', Validators.required],
      group: [''],
      password: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      employmentType: ['', Validators.required],
      roleLocation: ['', Validators.required],
      workModule: ['', Validators.required],
      dateOfJoining: ['', Validators.required],

      // Reporting Manager Info
      reportingManagerId: [''],
      reportingManagerName: [''],

      // Payroll Details (nested group)
      payroll: this.fb.group({
        basicSalary: [''],
        cca: [''],
        specialAllowance: [''],
        additionalAllowance: [''],
        fixedAllowance: [''],
        leaveEncashment: [''],
        grossSalary: [''],
        epfContribution: [''],
        esiContribution: [''],
        professionalTax: [''],
        totalDeductions: [''],
        totalSalary: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
    } else {
      this.employeeForm.markAllAsTouched(); // Show validation errors
    }
  }
}
