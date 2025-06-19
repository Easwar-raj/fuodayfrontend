import { Component, NgModule } from '@angular/core';
import { RedirectCommand, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DualnavComponent } from './dualnav/dualnav.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveComponent } from './leave/leave.component';
import { HrComponent } from './hr/hr.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PerformanceComponent } from './performance/performance.component';
import { SettingComponent } from './setting/setting.component';
import path from 'path';
import { TeamComponent } from './team/team.component';
import { OrganizationComponent } from './organization/organization.component';
import { FeedComponent } from './feed/feed.component';
import { MyzoneComponent } from './myzone/myzone.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { GoalComponent } from './goal/goal.component';
import { PerformsumComponent } from './performsum/performsum.component';
import { GradesComponent } from './grades/grades.component';
import { PayrollviewComponent } from './payrollview/payrollview.component';
import { OverviewComponent } from './overview/overview.component';
import { ShiftscheduleComponent } from './shiftschedule/shiftschedule.component';
import { TimetrackviewComponent } from './timetrackview/timetrackview.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CompanydataComponent } from './companydata/companydata.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { WebuserComponent } from './webuser/webuser.component';
import { WebuserempComponent } from './webuseremp/webuseremp.component';
import { FeedreviewComponent } from './feedreview/feedreview.component';
import { SupportComponent } from './support/support.component';
import { AuthGuard } from './guards/auth.guard';
import { RecruiterDashboardComponent } from './atsPack/recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterDualnavComponent } from './atsPack/recruiter-dualnav/recruiter-dualnav.component';
import { RecruiterMaindashboardComponent } from './atsPack/recruiter-maindashboard/recruiter-maindashboard.component';
import { RecruiterLogComponent } from './atsPack/recruiter-log/recruiter-log.component';
import { RecruiterCandidatesComponent } from './atsPack/recruiter-candidates/recruiter-candidates.component';
import { RecruiterTrackerComponent } from './atsPack/recruiter-tracker/recruiter-tracker.component';
import { RecruiterInterviewComponent } from './atsPack/recruiter-interview/recruiter-interview.component';
import { AtsTrackerComponent } from './atsPack/ats-tracker/ats-tracker.component';
import { RecruiterHiringComponent } from './atsPack/recruiter-hiring/recruiter-hiring.component';
import { RecruiterOnboardingComponent } from './atsPack/recruiter-onboarding/recruiter-onboarding.component';
import { AtsHiringComponent } from './atsPack/ats-hiring/ats-hiring.component';
import { RecruiterJobPortalComponent } from './atsPack/recruiter-job-portal/recruiter-job-portal.component';
import { RecruiterSupportComponent } from './atsPack/recruiter-support/recruiter-support.component';
import { AtsInterviewComponent } from './atsPack/ats-interview/ats-interview.component';
import { AuditComponent } from './audit/audit.component';
import { EmpAuditComponent } from './emp-audit/emp-audit.component';


const routes: Routes = [
  // Redirect to Admin Page
  { path: 'adminlogin', component: AdminLoginComponent },
  // { path: '', redirectTo: 'admin', pathMatch: 'full' },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'companydata', pathMatch: 'full' },
      // { path: 'employeedata', component: EmployeedataComponent },
      { path: 'webuserdata', component: WebuserempComponent },
      { path: 'employeedetail', component: EmployeedetailComponent },
      { path: 'webuser', component: WebuserComponent },
      { path: 'companydata', component: CompanydataComponent }
    ]
  },
  // Redirect root path to login
  { path: '', redirectTo: 'login', pathMatch: 'full'},

  // Login route (NO dualnav layout)
  { path: 'login', component: LoginComponent },

  // Dualnav layout with child routes
  {
    path: '',
    component: DualnavComponent,

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { animation: 'dashboard' },
        children: [
          { path: '', redirectTo: 'myzone', pathMatch: 'full' }, // Optional default redirect
          { path: 'team', component: TeamComponent },
          { path: 'organization', component: OrganizationComponent },
          { path: 'feed', component: FeedComponent },
          { path: 'myzone', component: MyzoneComponent}, // If you're splitting main view
        ]
      },
      { path: 'profile', component: ProfileComponent , data: { animation: 'Profile' }},
      { path: 'attendance', component: AttendanceComponent, data: { animation: 'Attendance' }},
      { path: 'leave', component: LeaveComponent, data: { animation: 'Leave' }},
      { path: 'timetrack',
        component: TimetrackerComponent,
        data: { animation: 'Time Tracker' },
        children: [
          {path: '',redirectTo: 'timetrackview', pathMatch: 'full'},
          { path: 'shift', component: ShiftscheduleComponent },
          { path: 'timetrackview', component: TimetrackviewComponent},
        ],
      },
      { path: 'hr', component: HrComponent ,  data: { animation: 'Hr' },},
      {
         path: 'payroll',
         component: PayrollComponent,
          data: { animation: 'Payroll' },
         children: [
          { path: '', redirectTo: 'payrollview', pathMatch: 'full' },
          { path: 'overview', component: OverviewComponent },
          { path: 'payrollview', component: PayrollviewComponent },
         ],
        },
      {
        path: 'performance',
        component: PerformanceComponent,
         data: { animation: 'Performance' },
        children: [
          { path: '', redirectTo: 'performancesum', pathMatch: 'full' }, // Optional default redirect
          { path: 'goal', component: GoalComponent },
          { path: 'feedreview', component: FeedreviewComponent },
          { path: 'grades', component: GradesComponent },
          { path: 'audit', component: AuditComponent },
          { path: 'empaudit', component: EmpAuditComponent},
          {path: 'performancesum', component:PerformsumComponent} // If you're splgoalng main view
        ]
      },
      { path: 'setting', component: SettingComponent,  data: { animation: 'Setting' }},
      { path: 'support', component: SupportComponent,  data: { animation: 'Support' },}
      // Add more child routes here
    ]
  },


    // Dualnav Recruiter layout with child routes
  {
    path: '',
    component: RecruiterDualnavComponent,

    children: [
      {
        path: 'recruiter-dashboard',
        component: RecruiterDashboardComponent,
        canActivate: [AuthGuard],
        data: { animation: 'recruiter-dashboard' },
        children: [
          { path: '', redirectTo: 'atsmaindash', pathMatch: 'full' }, // Optional default redirect
          { path: 'log', component: RecruiterLogComponent },
          { path: 'atsmaindash', component: RecruiterMaindashboardComponent}, // If you're splitting main view
        ]
      },
      { path: 'candidate', component: RecruiterCandidatesComponent , data: { animation: 'Candidate' }},
      { path: 'tracker',
        component: RecruiterTrackerComponent,
        data: { animation: 'Tracker' },
        children: [
          {path: '',redirectTo: 'atstracker', pathMatch: 'full'},
          { path: 'interview', component: AtsInterviewComponent },
          { path: 'atstracker', component:  AtsTrackerComponent},
        ],
      },
      { path: 'hiring',
        component: RecruiterHiringComponent,
        data: { animation: 'Hiring' },
        children: [
          {path: '',redirectTo: 'atshiring', pathMatch: 'full'},
          { path: 'atsonboarding', component: RecruiterOnboardingComponent },
          { path: 'atshiring', component:  AtsHiringComponent},
        ],
      },
      { path: 'jobportal', component: RecruiterJobPortalComponent, data: { animation: 'Jobportal' }},
      { path: 'atssupport', component: RecruiterSupportComponent ,  data: { animation: 'Atssupport' },}
      // Add more child routes here
    ]
  },

  // Wildcard route must come last
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
