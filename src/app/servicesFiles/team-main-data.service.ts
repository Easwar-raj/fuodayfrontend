import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TeamMember } from '../models/team-member.model';

@Injectable({
  providedIn: 'root'
})
export class TeamMainDataService {

  private baseUrl = 'https://backend.fuoday.com/api/hrms/home/getreportees';

  constructor(private http: HttpClient) {}

  getSpecificTeamSubtree(userId?: number): Observable<TeamMember[]> {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // Call to backend endpoint that returns ALL team members, not just for a specific user
    return this.http.get<any>(`${this.baseUrl}/${userId}`, { headers }).pipe(
      map(response => {
        const data = response.data as TeamMember[];

        // Add children array and isCollapsed flag to each member
        const members: { [key: number]: TeamMember } = {};
        data.forEach(member => {
          members[member.id] = {
            ...member,
            children: [],
            isCollapsed: false
          };
        });

        const roots: TeamMember[] = [];

        // Build the tree by assigning children to their parents
        Object.values(members).forEach(member => {
          if (member.parentId && members[member.parentId]) {
            members[member.parentId].children!.push(member);
          } else {
            roots.push(member); // parentId is 0 or invalid → treat as root
          }
        });

        return roots;
      })
    );
  }
}
