import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TeamService } from '../servicesFiles/team.service';
import { AuthService } from '../servicesFiles/auth.service';
import { ProjectService } from '../servicesFiles/project.service';
import { TeamMember } from '../models/team-member.model';
import { TeamMainDataService } from '../servicesFiles/team-main-data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit {
  department: string = '';
  teamMembers: any[] = [];
  userId!: number; // Replace with actual logged-in user ID
  // Replace with actual logged-in user ID
  errorMessage: string = '';
  userName!: string;
  userMail!: string;
  profilePhoto!: string | null;
  private isBrowser: boolean = false;
  handledProjects: any[] = [];
  empId: string = '';
    styleName:string='';
backgroundStyle: string = '';
    // To display the chart from the user's image:
  teamRoots$: Observable<TeamMember[]> | undefined;


  constructor(@Inject(PLATFORM_ID) private platformId: Object,private projectService: ProjectService,private teamService: TeamService, private authService: AuthService, private teamMainDataService : TeamMainDataService) {}
  isOpen = false;

  toggleArrow() {
    const icon = document.getElementById('dropdownIcon');
    if (icon) {
      this.isOpen = !this.isOpen;
      icon.classList.toggle('rotate-up', this.isOpen);

      // Optional: Auto-reset after 1 second
      setTimeout(() => {
        this.isOpen = false;
        icon.classList.remove('rotate-up');
      }, 1000);
    }
  }
  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;
        this.userName = user.name;
        this.empId = user.emp_id;
        this.profilePhoto = user.employee_details.profile_photo;
        this.userMail = user.email;
          this.styleName = user.admin_user.company_word;

          // Set background image conditionally
      if (this.styleName === 'ar') {
        this.backgroundStyle = 'url("/assets/images/fuoday/bg/welbg-areg.png")';

      } else {
        this.backgroundStyle = 'url("/assets/images/fuoday/bg/welbg.png")';
      }

      }
    }

    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.teamRoots$ = this.teamMainDataService.getSpecificTeamSubtree(this.userId);
    this.teamService.getTeamByUserId(this.userId).subscribe({

      next: (response) => {
        if (response.status === 'Success') {
          this.department = response.data.department;
          this.teamMembers = response.data.team_members;
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch Team data.';
        console.error(err);
      }
    });
    this.projectService.getHandledProjects(this.userId).subscribe({
      next: (response) => {
        if (response.status === 'Success') {
        this.handledProjects = response.data;
        }
      },
      error: (error) => {
        console.error('Failed to fetch projects', error);
      }
    });
  }else {
    this.errorMessage = 'User not found in local storage.';
  }
}
}

