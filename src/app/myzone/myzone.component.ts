import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser , PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AttendanceService } from '../servicesFiles/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myzone',
  standalone: false,
  templateUrl: './myzone.component.html',
  styleUrls: ['./myzone.component.scss']
})
export class MyzoneComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private platformLocation: PlatformLocation,
    private attendanceService: AttendanceService,
    private router: Router
  ) {}

  userId!: number;
  userName!: string;
  profilePhoto!: string | null;
  styleName:string='';
backgroundStyle: string = '';
  isHovered = false;
  isLoggedIn = false;
  checkinTime:string='';
showPopup = false;

  activeSideTab: string = 'general';
  activeTopTab: string = 'activities';

  loginTime: string | null = null;
  logoutTime: string | null = null;
  totalHours: string | null = null;

  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private clockInterval: any;
  private loginDate: Date | null = null;
  private isBrowser: boolean = false;
  private elapsedSeconds: number = 0;

 ngOnInit() {
  this.isBrowser = isPlatformBrowser(this.platformId);

  if (!this.isBrowser) return;

  const userData = localStorage.getItem('userData');
  if (userData) {
    const user = JSON.parse(userData);
    this.userId = user.id;
    this.userName = user.name;
    this.profilePhoto = user.profile_photo;
    this.styleName = user.admin_user?.company_word || '';

    this.backgroundStyle =
      this.styleName === 'ar'
        ? 'url("/assets/images/fuoday/bg/welbg-areg.png")'
        : 'url("/assets/images/fuoday/bg/welbg.png")';
  }

  // Confirm check-in status from backend
  if (this.userId) {
    this.attendanceService.getTodayAttendance(this.userId).subscribe({
      next: (res: any) => {
        if (res?.checkin && !res.checkout) {
          this.isLoggedIn = true;
          this.checkinTime = res.checkin;

          // Restore login timestamp based on backend time
          const now = new Date();
          const checkinDate = new Date();
          const [time, modifier] = res.checkin.split(' ');
          const [hours, minutes] = time.split(':');
          let hrs = parseInt(hours);
          const mins = parseInt(minutes);
          if (modifier.toLowerCase() === 'pm' && hrs < 12) hrs += 12;
          checkinDate.setHours(hrs, mins, 0, 0);

          this.loginDate = checkinDate;
          this.loginTime = res.checkin;

          this.elapsedSeconds = Math.floor((now.getTime() - checkinDate.getTime()) / 1000);
          this.startTimer();
        }
      },
      error: (err) => {
        console.error('Error fetching today attendance:', err);
      }
    });
  }




  // Prevent back navigation
  history.pushState(null, '', location.href);
  this.platformLocation.onPopState(() => {
    history.pushState(null, '', location.href);
  });
}

// Announcement Popup


  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  goToAuditForm() {
    this.closePopup(); // optional
    this.router.navigate(['/performance/audit']);
  }

  ngOnDestroy() {
    if (this.isBrowser && this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  toggleLogin() {

    if (!this.isLoggedIn) {
      // Login flow
      const now = new Date();
      this.loginDate = now;
      this.loginTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      // Store login time in localStorage
      localStorage.setItem('loginTimestamp', now.toISOString());
      localStorage.setItem('isLoggedIn', 'true');

      const payload = {
        web_user_id: this.userId,
        checkin: this.loginTime
      };

      this.attendanceService.addAttendance(payload).subscribe({
        next: (res: any) => {
          // console.log("Date Today : ", res);

          this.startTimer();
          this.isLoggedIn = true;
          this.totalHours = null;
          this.logoutTime = null;
        },
        error: (err) => {
          console.error('Error adding attendance:', err);
        }
      });

    } else {
      // Logout flow
      this.stopTimer();
      const now = new Date();
      this.logoutTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const hours = Math.floor(this.elapsedSeconds / 3600);
      const minutes = Math.floor((this.elapsedSeconds % 3600) / 60);
      const seconds = this.elapsedSeconds % 60;
      this.totalHours = `${this.formatTime(hours)}h ${this.formatTime(minutes)}m ${this.formatTime(seconds)}s`;

      // Clear login state
      localStorage.removeItem('loginTimestamp');
      localStorage.removeItem('isLoggedIn');

      const payload = {
        web_user_id: this.userId,
        checkout: this.logoutTime
      };

      this.attendanceService.updateAttendance(payload).subscribe({
        next: (res: any) => {
          this.isLoggedIn = false;
        },
        error: (err) => {
          console.error('Error updating checkout:', err);
        }
      });
    }
  }

  startTimer() {
    this.updateTimerDisplay();
    this.clockInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }

  updateTimerDisplay() {
    const hrs = Math.floor(this.elapsedSeconds / 3600);
    const mins = Math.floor((this.elapsedSeconds % 3600) / 60);
    const secs = this.elapsedSeconds % 60;
    this.hours = this.formatTime(hrs);
    this.minutes = this.formatTime(mins);
    this.seconds = this.formatTime(secs);
  }

  formatTime(unit: number): string {
    return unit < 10 ? '0' + unit : unit.toString();
  }

  setActiveSideTab(tab: string) {
    this.activeSideTab = tab;
  }

  setActiveTopTab(tab: string) {
    this.activeTopTab = tab;
  }
}
