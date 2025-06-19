import { Component } from '@angular/core';
import { ProjectteamService } from '../servicesFiles/projectteam.service';

// Define the TeamMember interface
interface TeamMember {
  member_id: string;
  member: string;
  role: string;
}

@Component({
  selector: 'app-projectteam',
  standalone: false,
  templateUrl: './projectteam.component.html',
  styleUrl: './projectteam.component.scss'
})
export class ProjectteamComponent {
  adminUserId: number = 0;

  projectData = {
    name: '',
    domain: '',
    project_manager_id: '',
    project_manager_name: '',
    progress: '',
    client: '',
    comment: '',
    deadline:'',
    team: [] as TeamMember[],
    action: 'create'
  };

  constructor(private projectteamService: ProjectteamService) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
  }



  addTeamMember() {
    this.projectData.team.push({
      member_id: '',
      member: '',
      role: ''
    });
  }

  submitProject() {
    const payload = {
      ...this.projectData,
      admin_user_id: this.adminUserId
    };

    this.projectteamService.saveProject(payload).subscribe({
      next: (res) => console.log('Project created successfully:', res),
      error: (err) => console.error('Error:', err)
    });
  }
}

