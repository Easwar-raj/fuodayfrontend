import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-companydata',
  standalone: false,
  templateUrl: './companydata.component.html',
  styleUrls: ['./companydata.component.scss']  // <-- fixed (styleUrls as array)
})
export class CompanydataComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  companyName! : string;
  userId! : number;
  achievementText = '';
  valuesText = '';
  adminUserId!: number;

  private isBrowser: boolean = false;

  sections = {
    'Company Description': ['about', 'services', 'industries', 'client', 'team'],
    'Achievements & Values': ['achievement', 'values'],
    'Client': ['name', 'description'],
    'Events': ['event', 'name', 'date', 'description'],
    'Feedback Questions': ['question'],
    'Heirarchy': ['level', 'title', 'experience range', 'description'],
    'Holidays': ['holiday', 'date', 'description'],
    'Industries': ['name', 'description'],
    'Job Openings': ['title', 'position', 'posted_at', 'applied', 'review', 'interview', 'reject', 'hired', 'status'],
    'Company Policies': ['title', 'policy', 'description'],
    'Projects': ['name', 'domain', 'project_manager_id', 'progress', 'client', 'comment', 'deadline'],
    'Project Teams': ['project id', 'project name', 'web user id', 'emp name', 'emp id', 'member', 'role', 'progress', 'status', 'comment'],
    'Services': ['name', 'description'],
    'Total Leaves': ['type', 'total', 'period']
  } as Record<string, string[]>; // <-- correct typing

  drawerOpen = false;
  drawerTitle = '';
  drawerFields: string[] = [];
  currentEntries: { [key: string]: string[][] } = {}; // Holds table rows

  // constructor() {
  //   for (let key in this.sections) {
  //     this.currentEntries[this.generateId(key)] = [];
  //   }
  // }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.userId = user.id;
        this.companyName = user.company_word;
      }
    }
  }


  openDrawer(title: string) {
    this.drawerOpen = true;
    this.drawerTitle = title;
    this.drawerFields = this.sections[title] || [];
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  submitForm(form: any) {
    if (!form.valid) {
      return; // prevent invalid form submission
    }
    const tableId = this.generateId(this.drawerTitle);
    const values = this.drawerFields.map(field => form.value[field] || '');
    this.currentEntries[tableId].push(values);
    this.closeDrawer();
    form.resetForm();
  }

  generateId(title: string): string {
    return title.replace(/\s+/g, '_');
  }

  logout() {
  }
}
