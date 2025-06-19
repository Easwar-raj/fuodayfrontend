import { Component, OnInit } from '@angular/core';
import { ShiftscheduleService } from '../servicesFiles/shiftschedule.service';
import { AuthService } from '../servicesFiles/auth.service'; // Adjust path as needed

@Component({
  selector: 'app-shiftschedule',
  standalone: false,
  templateUrl: './shiftschedule.component.html',
  styleUrl: './shiftschedule.component.scss'
})
export class ShiftscheduleComponent  implements OnInit {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: any[] = [];
  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  webUserId: number | null = null;
  errorMessage = '';

  constructor(
    private shiftService: ShiftscheduleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user && user.id) {
      this.webUserId = user.id;
      this.loadShifts();
    } else {
      this.errorMessage = 'User not found in local storage.';
    }
  }

  get monthName() {
    return this.currentDate.toLocaleString('default', { month: 'long' });
  }

  loadShifts(): void {
    if (!this.webUserId) return;

    const monthStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}`;
    const payload = {
      web_user_id: this.webUserId,
      month: monthStr
    };

    this.shiftService.getMonthlySchedules(payload).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
        this.generateCalendar(res.data.shifts);
        }
      },
      error: (err) => {
        console.error('Failed to load shifts', err);
      }
    });
  }

  generateCalendar(shiftData: any[]): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    const shiftMap = new Map();
    shiftData.forEach(shift => {
      const day = new Date(shift.date).getDate();
      shiftMap.set(day, shift);
    });

    this.calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const shift = shiftMap.get(day);
      const slots = this.generateSlots(day, shift);
      this.calendarDays.push({ date: day, slots });
    }
  }

  generateSlots(day: number, shift: any): any[] {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) {
      return [{ time: 'Holiday', type: 'holiday-slot' }];
    }

    if (dayOfWeek === 6) {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      const saturdayCount = Math.floor((day + firstDay) / 7) + (firstDay === 6 ? 1 : 0);
      if (saturdayCount === 2 || saturdayCount === 4) {
        return [{ time: 'Leave', type: 'leave-slot' }];
      }
    }

    if (shift) {
      return [{
        time: `${shift.shift_start} - ${shift.shift_end}`,
        type: 'blue-slot'
      }];
    }

    return [];
  }

  addShift(day: number): void {
    if (!this.webUserId) return;

    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const shiftPayload = {
      web_user_id: this.webUserId,
      date: dateStr,
      shift_start: '09:00',
      shift_end: '18:00'
    };

    this.shiftService.addSchedule(shiftPayload).subscribe({
      next: () => this.loadShifts(),
      error: () => alert('Failed to add shift.')
    });
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.loadShifts();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth);
    this.loadShifts();
  }
}
