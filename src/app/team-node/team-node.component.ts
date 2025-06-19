import { Component, Input, OnInit } from '@angular/core';
import { TeamMember } from '../models/team-member.model';

@Component({
  selector: 'app-team-node',
  standalone: false,
  templateUrl: './team-node.component.html',
  styleUrl: './team-node.component.scss'
})
export class TeamNodeComponent  implements OnInit {
  @Input() member!: TeamMember;
  // Path to your images folder in assets
  imageBasePath = 'assets/images/';

  constructor() { }

  ngOnInit(): void {
    if (!this.member) {
      console.error("Tree node component initialized without a member.");
    }
  }

  toggleCollapse(member: TeamMember): void {
    member.isCollapsed = !member.isCollapsed;
  }

  // Helper to handle missing images
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = `${this.imageBasePath}default.jpg`; // Path to a default/placeholder image
  }
}
