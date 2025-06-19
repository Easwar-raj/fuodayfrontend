import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { AdminUserService } from '../servicesFiles/admin-user.service';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent {

    achievementText = '';
    valuesText = '';
    adminUserId!: number;
    successAchievementMessage: string = '';

    constructor(@Inject(PLATFORM_ID) private platformId: Object,private adminUserService: AdminUserService) {
      const user = JSON.parse(localStorage.getItem('adminData') || '{}');
      this.adminUserId = user.id;
    }


submit() {
  const payload = {
    admin_user_id: this.adminUserId,
    achievement: this.achievementText,
    values: this.valuesText,
    action: 'create' as 'create'
  };

  this.adminUserService.saveAchievement(payload).subscribe({
    next: (res) => {
      this.successAchievementMessage = 'Updated successfully ✅';

      // Clear input fields
      this.achievementText = '';
      this.valuesText = '';

      // Auto-clear the message after 3 seconds
      setTimeout(() => {
        this.successAchievementMessage = '';
      }, 2000);
    },
    error: (err) => {
      this.successAchievementMessage = err?.error?.message || 'Submission failed.';
      setTimeout(() => {
        this.successAchievementMessage = '';
      }, 2000);
    }
  });
}

}
