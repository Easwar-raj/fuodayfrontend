import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../models/team-member.model';
import { TeamMainDataService } from '../servicesFiles/team-main-data.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-team-tree',
  standalone: false,
  templateUrl: './team-tree.component.html',
  styleUrl: './team-tree.component.scss'
})
export class TeamTreeComponent implements OnInit {
  userId!: number;
  teamTree: TeamMember[] = [];

  constructor(
    private teamMainDataService: TeamMainDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.teamMainDataService.getSpecificTeamSubtree(this.userId).subscribe({
        next: (teamTreeData) => {
          this.teamTree = teamTreeData;
        },
        error: (err) => {
          console.error("Error fetching team tree", err);
        }
      });
    } else {
      console.error("User not found");
    }
  }
}
