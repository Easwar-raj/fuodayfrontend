import { Component } from '@angular/core';
import { PerformanceService } from '../servicesFiles/performance.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-performsum',
  standalone: false,
  templateUrl: './performsum.component.html',
  styleUrl: './performsum.component.scss'
})
export class PerformsumComponent {
  userId!: number;
  UserName:string = '';
  performanceData: any = null;
performance_score: any;
loading = true;
errorMessage = '';
greeting: string = '';
radius = 30;
circumference = 2 * Math.PI * this.radius;
   constructor(
      private performanceService: PerformanceService,
      private authService: AuthService
    ) {}

    ngOnInit(): void {

      const user = this.authService.getUserData();
      if (user) {
        this.userId = user.id;
        this.UserName = user.name;
      this.performanceService.getProfile(this.userId).subscribe({
  next: (response) => {
    if (response.status === 'Success') {
        this.performanceData = response.data;
        this.loading = false;
    }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load performance data';
        console.error(error);
        this.loading = false;
      }
    });
      }
      this.setGreeting();
    }
    setGreeting(): void {
  const hour = new Date().getHours();
  if (hour < 12) {
    this.greeting = 'Good Morning';
  } else if (hour < 18) {
    this.greeting = 'Good Afternoon';
  } else {
    this.greeting = 'Good Evening';
  }
}
  getColor(key: unknown): string {
    const keyStr = String(key).toLowerCase();
    switch (keyStr) {
      case 'on-site': return '#4caf50'; // green
      case 'leave': return '#f44336';   // red
      case 'work from home': return '#2196f3'; // blue
      case 'half day': return '#ff9800'; // orange
      case 'unknown': return '#9e9e9e'; // gray
      default: return '#607d8b'; // fallback
    }
  }

getOffset(value: unknown): number {
  const num = Number(value);
  const percent = Math.min(Math.max(num, 0), 100);
  return this.circumference * (1 - percent / 100);
}

}


