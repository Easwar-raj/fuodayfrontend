import { Component , OnInit} from '@angular/core';
import { PayrollViewService } from '../servicesFiles/payrollview.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-payrollview',
  standalone: false,
  templateUrl: './payrollview.component.html',
  styleUrl: './payrollview.component.scss'
})
export class PayrollviewComponent implements OnInit {
  payrolls: any[] = [];
  incentives: number = 0;
  totalCTC:number = 0;
  userId!: number; // Change as per actual user ID
  errorMessage: string = '';

  constructor(private payrollService: PayrollViewService, private authService: AuthService) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
  }


    this.payrollService.getPayrollDetails(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
        this.payrolls = response.data.payrolls;
        this.incentives = response.data.incentives;
        this.totalCTC = response.data.total_ctc;
          }
        },
      error: (err) => {
        console.error('Failed to load payroll details:', err);
      }
    });

}
}
