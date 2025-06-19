import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { TotalleaveService } from '../servicesFiles/totalleave.service';

@Component({
  selector: 'app-totalleave',
  standalone: false,
  templateUrl: './totalleave.component.html',
  styleUrl: './totalleave.component.scss'
})
export class TotalleaveComponent {
  adminUserId: string = '';
  leaveData: any = {
    admin_user_id: '',
    type: '',
    total: '',
    period: '',
    action: 'create'
  };
  message: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private leaveService: TotalleaveService
  ) {
    const user = JSON.parse(localStorage.getItem('adminData') || '{}');
    this.adminUserId = user.id;
    this.leaveData.admin_user_id = this.adminUserId;
  }

  onSubmit() {
    this.leaveService.saveTotalLeave(this.leaveData).subscribe({
      next: (res: any) => this.message = res.message,
      error: (err: any) => this.message = err?.error?.message || 'Something went wrong.'
    });
  }
}
