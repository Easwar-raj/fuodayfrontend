import { Component, OnInit } from '@angular/core';
import { PerformegoalService } from '../servicesFiles/performegoal.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-goal',
  standalone: false,
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent  implements OnInit{
  userId!: number;
  tasks: any[] = [];
  totalCompleted = 0;
  totalPending = 0;
  totalInProgress = 0;
  completedProject = 0;
  upcommingProject= 0 ;
  loading = true;
  errorMessage = '';
  constructor(
    private performegoalService: PerformegoalService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.performegoalService.getGoal(this.userId).subscribe({
  next: (response) => {
    if (response.status === 'Success') {
        this.tasks = response.data.tasks;
        this.totalCompleted = response.data.total_completed;
        this.totalPending = response.data.total_pending;
        this.totalInProgress = response.data.total_in_progress;
        this.completedProject = response.data.completed_project;
        this.upcommingProject = response.data.upcomming_project;

        this.loading = false;
  }
      },
      error: (error) => {
        this.errorMessage = 'Failed to load user goals.';
        console.error(error);
        this.loading = false;
      }
    });
    }
  }
}
