import { Component, OnInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HomeAboutService } from '../servicesFiles/homeabout.service';
import { AuthService } from '../servicesFiles/auth.service';

@Component({
  selector: 'app-organization',
  standalone: false,
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  userId!: number; // Replace with logged-in user's ID
  aboutDescription: string = '';
  achievements: any[] = [];

  servicesDescription: string = '';
  services: any[] = [];

  industriesDescription: string = '';
  industries: any[] = [];

  clientsDescription: string = '';
  clients: any[] = [];
  ofc_logo:string = '';
  private isBrowser: boolean = false;

  teamDescription: string = '';
  teamByDepartment: { [key: string]: any[] } = {};
    styleName:string='';
backgroundStyle: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private homeAboutService: HomeAboutService,private authService: AuthService) {}

  ngOnInit(): void {
     if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
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
      this.ofc_logo = user.admin_user.logo;
      this.homeAboutService.getAbout(this.userId).subscribe({
        next: (response) => {
           if (response.status === 'Success') {
            this.aboutDescription = response.data.description;
            this.achievements = response.data.about;
        }
        },

    });

    this.homeAboutService.getServices(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
      this.servicesDescription = response.data.description;
      this.services = response.data.services;
        }
      },
    });

    this.homeAboutService.getIndustries(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
      this.industriesDescription = response.data.description;
      this.industries = response.data.industries;
          }
        },
    });

    this.homeAboutService.getClients(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
      this.clientsDescription = response.data.description;
      this.clients = response.data.clients;
          }
        },
    });

    this.homeAboutService.getTeamDescription(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'Success') {
      this.teamDescription = response.data.description;
      this.teamByDepartment = response.data.team;
          }
        },
    });
  }
}
}
