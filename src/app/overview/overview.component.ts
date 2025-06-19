import { Component, OnInit } from '@angular/core';
import { OverviewService } from '../servicesFiles/overview.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-overview',
  standalone: false,
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent  implements OnInit {
  payslip: any;
  salaryComponents: {
    Earnings: { [key: string]: number },
    Deductions: { [key: string]: number }
  } | null = null;
  employeeDetails: any;
  onboardingDetails: any;
  userId: number = 1; // Change to dynamic ID

  constructor(private overviewService: OverviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
    }
    this.overviewService.getCurrentOverview(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
            this.payslip = response.data.payslip;
            this.salaryComponents = response.data.salary_components;
            this.employeeDetails = response.data.employee_details;
            this.onboardingDetails = response.data.onboarding_details;
          }
        },
    });
  }
}
