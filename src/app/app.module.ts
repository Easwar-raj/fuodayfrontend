import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DualnavComponent } from './dualnav/dualnav.component';
import { ProfileComponent } from './profile/profile.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LeaveComponent } from './leave/leave.component';
import { HrComponent } from './hr/hr.component';
import { TimetrackerComponent } from './timetracker/timetracker.component';
import { PayrollComponent } from './payroll/payroll.component';
import { PerformanceComponent } from './performance/performance.component';
import { SettingComponent } from './setting/setting.component';
import { SupportComponent } from './support/support.component';
import { TeamComponent } from './team/team.component';
import { OrganizationComponent } from './organization/organization.component';
import { FeedComponent } from './feed/feed.component';
import { MyzoneComponent } from './myzone/myzone.component';
import { ServiceComponent } from './service/service.component';
import { GoalComponent } from './goal/goal.component';
import { PerformsumComponent } from './performsum/performsum.component';
import { GradesComponent } from './grades/grades.component';
import { OverviewComponent } from './overview/overview.component';
import { PayrollviewComponent } from './payrollview/payrollview.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShiftscheduleComponent } from './shiftschedule/shiftschedule.component';
import { TimetrackviewComponent } from './timetrackview/timetrackview.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CompanydataComponent } from './companydata/companydata.component';
import { EmployeedataComponent } from './employeedata/employeedata.component';
import { AdminnavComponent } from './adminnav/adminnav.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { AboutComponent } from './about/about.component';
import { ClientImgComponent } from './client-img/client-img.component';
import { CompanyPolicyComponent } from './company-policy/company-policy.component';
import { EventComponent } from './event/event.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HeirarchyComponent } from './heirarchy/heirarchy.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { IndustriesComponent } from './industries/industries.component';
import { JobopeningsComponent } from './jobopenings/jobopenings.component';
import { ProjectteamComponent } from './projectteam/projectteam.component';
import { MainserviceComponent } from './mainservice/mainservice.component';
import { TotalleaveComponent } from './totalleave/totalleave.component';
import { WebuserComponent } from './webuser/webuser.component';
import { WebuserempComponent } from './webuseremp/webuseremp.component';
import { AuthInterceptor } from './auth.interceptor';
import { FeedreviewComponent } from './feedreview/feedreview.component';
import { TeamNodeComponent } from './team-node/team-node.component';
import { TeamTreeComponent } from './team-tree/team-tree.component';
import { RecruiterDashboardComponent } from './atsPack/recruiter-dashboard/recruiter-dashboard.component';
import { RecruiterDualnavComponent } from './atsPack/recruiter-dualnav/recruiter-dualnav.component';
import { RecruiterMaindashboardComponent } from './atsPack/recruiter-maindashboard/recruiter-maindashboard.component';
import { RecruiterLogComponent } from './atsPack/recruiter-log/recruiter-log.component';
import { RecruiterCandidatesComponent } from './atsPack/recruiter-candidates/recruiter-candidates.component';
import { RecruiterTrackerComponent } from './atsPack/recruiter-tracker/recruiter-tracker.component';
import { RecruiterInterviewComponent } from './atsPack/recruiter-interview/recruiter-interview.component';
import { RecruiterHiringComponent } from './atsPack/recruiter-hiring/recruiter-hiring.component';
import { RecruiterOnboardingComponent } from './atsPack/recruiter-onboarding/recruiter-onboarding.component';
import { RecruiterJobPortalComponent } from './atsPack/recruiter-job-portal/recruiter-job-portal.component';
import { RecruiterSupportComponent } from './atsPack/recruiter-support/recruiter-support.component';
import { AtsTrackerComponent } from './atsPack/ats-tracker/ats-tracker.component';
import { AtsInterviewComponent } from './atsPack/ats-interview/ats-interview.component';
import { AtsHiringComponent } from './atsPack/ats-hiring/ats-hiring.component';
import { AuditComponent } from './audit/audit.component';
import { EmpAuditComponent } from './emp-audit/emp-audit.component';


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DualnavComponent,
    ProfileComponent,
    AttendanceComponent,
    LeaveComponent,
    HrComponent,
    TimetrackerComponent,
    PayrollComponent,
    PerformanceComponent,
    SettingComponent,
    SupportComponent,
    TeamComponent,
    OrganizationComponent,
    FeedComponent,
    MyzoneComponent,
    ServiceComponent,
    GoalComponent,
    PerformsumComponent,
    GradesComponent,
    OverviewComponent,
    PayrollviewComponent,
    ShiftscheduleComponent,
    TimetrackviewComponent,
    AdminComponent,
    AdminLoginComponent,
    CompanydataComponent,
    EmployeedataComponent,
    AdminnavComponent,
    EmployeedetailComponent,
    AchievementsComponent,
    ClientImgComponent,
    AboutComponent,
    CompanyPolicyComponent,
    EventComponent,
    FeedbackComponent,
    HeirarchyComponent,
    HolidaysComponent,
    IndustriesComponent,
    JobopeningsComponent,
    ProjectteamComponent,
    MainserviceComponent,
    TotalleaveComponent,
    WebuserComponent,
    WebuserempComponent,
    FeedreviewComponent,
    TeamNodeComponent,
    TeamTreeComponent,
    RecruiterDashboardComponent,
    RecruiterDualnavComponent,
    RecruiterMaindashboardComponent,
    RecruiterLogComponent,
    RecruiterCandidatesComponent,
    RecruiterTrackerComponent,
    RecruiterInterviewComponent,
    RecruiterHiringComponent,
    RecruiterOnboardingComponent,
    RecruiterJobPortalComponent,
    RecruiterSupportComponent,
    AtsTrackerComponent,
    AtsInterviewComponent,
    AtsHiringComponent,
    AuditComponent,
    EmpAuditComponent,

  ],
  imports: [

    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
     NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
