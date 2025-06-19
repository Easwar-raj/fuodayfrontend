import { Component, OnInit } from '@angular/core';
import { SupportService } from '../servicesFiles/support.service';
import { AuthService } from '../servicesFiles/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Ticket {
  ticket: string;
  category?: string;
  priority: string;
  assigned_to?: string;
  date: string;
  emp_name: string;
}

@Component({
  selector: 'app-support',
  standalone: false,
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss'
})
export class SupportComponent implements OnInit {
  ticketData: { [status: string]: Ticket[] } = {};
  groupedTicket = {};
  userId!: number;
  webId!: number;
  showPopup = false;
  errorMessage: string = '';
  ticketForm!: FormGroup;

  constructor(
    private supportService: SupportService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserData();
    if (user) {
      this.userId = user.id;
      this.webId = user.employee_details.web_user_id;

      // ✅ Now initialize form with web_user_id
      this.ticketForm = this.fb.group({
        web_user_id: [this.webId],
        ticket: ['', Validators.required],
        category: [''],
        assigned_to_id: [''],
        assigned_to: [''],
        priority: ['', Validators.required],
        date: ['', Validators.required],
        status: ['']
      });

      this.supportService.getTicketsByUserId(this.userId).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.ticketData = response.data;
            this.groupedTicket = response.data.groupedTickets;
            console.log("Tickets : ", this.groupedTicket);
          }
        },
        error: (err) => {
          this.errorMessage = 'Failed to fetch Ticket data.';
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'User not found in local storage.';
    }
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  submitTicket() {
    if (this.ticketForm.invalid) return;

    this.supportService.addTicket(this.ticketForm.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.ticketForm.reset();
        this.closePopup();
      },
      error: (err) => {
        alert(err.error.message || 'Failed to create ticket');
      }
    });
  }

  getKeyAsString(key: unknown): string {
    return typeof key === 'string' ? key : '';
  }
}
