import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../servicesFiles/leave.service';
import { AuthService } from '../servicesFiles/auth.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-leave',
  standalone: false,
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit {
  // Highcharts
  Highcharts: typeof Highcharts = Highcharts;
  leaveChartOptions: Highcharts.Options = {};

  // User info
  userId!: number;
  empId: string = '';
  department: string = '';

  // Data containers
  leaveSummary: any[] = [];
  leaveReport: any[] = [];
  holidays: any[] = [];
  graph: any = {};
  monthlyGraph: any[] = [];
  currentPage = 1;
  itemsPerPage = 7;

  today: string = new Date().toISOString().split('T')[0];

  // Leave form popup state
  isLeavePopupOpen = false;

  // Leave request form model
  leaveRequest = {
    web_user_id: 0,
    emp_id: '',
    department: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  };

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.empId = user.emp_id;
      this.department = user.employee_details.designation;

      // Initialize form values
      const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
      this.leaveRequest = {
        web_user_id: this.userId,
        emp_id: this.empId,
        department: this.department,
        type: '',
        startDate: today,
        endDate: today,
        reason: ''
      };

      this.fetchLeaveData();
    }
  }

  // Fetch leave summary and reports
  private fetchLeaveData(): void {
    this.leaveService.getLeaveStatus(this.userId).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
          this.leaveSummary = response.data.leave_summary || [];
          this.leaveReport = response.data.leave_report || [];
          this.holidays = response.data.holidays || [];
          this.graph = response.data.graph || [];
          this.monthlyGraph = response.data.monthly_graph || [];

          this.initializeLeaveChart();
          this.initializeMonthlyLeaveChart();
        }
      },
      error: (err) => {
        console.error('Failed to fetch leave data:', err);
      }
    });
  }

  // Leave type chart
  private initializeLeaveChart(): void {
    if (!this.graph || this.graph.length === 0) return;

    const data = this.graph[0];
    const year = data.year || 'Unknown Year';
    const leaveTypes = Object.keys(data).filter(key => key !== 'year' && key !== 'percentage');
    const leaveCounts = leaveTypes.map(type => data[type]);
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    this.leaveChartOptions = {
      chart: { type: 'column' },
      title: { text: `Leave Overview - ${year}` },
      xAxis: {
        categories: leaveTypes,
        title: { text: 'Leave Type' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Number of Leaves' }
      },
      series: [{
        name: 'Leaves',
        type: 'column',
        data: leaveCounts,
        color: primaryColor
      }],
      credits: { enabled: false }
    };

    Highcharts.chart('leaveChartContainer', this.leaveChartOptions);
  }

  // Monthly trend chart
  private initializeMonthlyLeaveChart(): void {
    if (!this.monthlyGraph || this.monthlyGraph.length === 0) return;

    const months = this.monthlyGraph.map(entry => entry.month);
    const leaveCounts = this.monthlyGraph.map(entry => entry.leave);
    const primaryColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--primary')
      .trim();

    Highcharts.chart('monthlyLeaveChartContainer', {
      chart: { type: 'line' },
      title: { text: 'Monthly Leave Trend' },
      xAxis: {
        categories: months,
        title: { text: 'Month' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Leaves Taken' }
      },
      tooltip: {
        pointFormat: '<b>{point.y}</b> leaves taken in {point.category}'
      },
      series: [{
        name: 'Leaves',
        type: 'line',
        data: leaveCounts,
        color: primaryColor
      }],
      credits: { enabled: false }
    });
  }

  // Popup Controls
  openLeavePopup(): void {
    this.isLeavePopupOpen = true;
  }

  closeLeavePopup(): void {
    this.isLeavePopupOpen = false;
  }

  // Form Submission
  submitLeaveRequest(): void {
    const payload = {
      web_user_id: this.leaveRequest.web_user_id,
      emp_id: this.leaveRequest.emp_id,
      department: this.leaveRequest.department,
      type: this.leaveRequest.type,
      from: this.leaveRequest.startDate,
      to: this.leaveRequest.endDate,
      reason: this.leaveRequest.reason
    };

    this.leaveService.addLeaveRequest(payload).subscribe({
      next: () => {
        this.closeLeavePopup();
        this.ngOnInit(); // Refresh data after submission
      },
      error: (err) => {
        console.error('Error submitting leave request:', err);
      }
    });
  }
}
