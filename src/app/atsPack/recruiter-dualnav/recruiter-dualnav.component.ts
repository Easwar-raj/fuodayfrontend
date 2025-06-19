import { Component, ElementRef, ViewChild, OnInit, OnDestroy ,Inject, PLATFORM_ID  } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../servicesFiles/auth.service';
import { ChatbotService } from '../../servicesFiles/chatbot.service'; // adjust path if needed

@Component({
  selector: 'app-recruiter-dualnav',
  standalone: false,
  templateUrl: './recruiter-dualnav.component.html',
  styleUrl: './recruiter-dualnav.component.scss'
})
export class RecruiterDualnavComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  userId!: number;
  user_id!: number;
  admin_user_id!: number;
  organizationBrand: string = '';
  organizationLogo: string = '';
  empID: string = '';
  userName!: string;
  userMail! : string;
  userRole: string = '';
  profilePhoto: string = ''; // default | null;
  isProfilePopupOpen: boolean = false;
isPopupOpen: boolean = false;
  inChatMode: boolean = false;
  message: string = '';
  chatHistory: { type: 'user' | 'bot'; text: string }[] = [];
  chatLogo:string='';
  styleName:string='';
 constructor(
  public router: Router,
  private authService: AuthService,
  @Inject(PLATFORM_ID) private platformId: Object,
  private chatbotService: ChatbotService
) {}

togglePopup(): void {
    this.isPopupOpen = !this.isPopupOpen;
    if (!this.isPopupOpen) {
      this.inChatMode = false;
      this.chatHistory = []; // Optional: clear chat on close
    }
  }

  startChat(): void {
    this.inChatMode = true;
  }

  backToWelcome(): void {
    this.inChatMode = false;
  }

sendMessage(msg?: string): void {
  const finalMsg = msg || this.message.trim();
  if (finalMsg) {
    this.chatHistory.push({ type: 'user', text: finalMsg });
    this.scrollToBottom(); // 👈 Scroll after user message

    // Show loading message
    const typingIndex = this.chatHistory.push({ type: 'bot', text: 'typing...' }) - 1;
    this.scrollToBottom(); // 👈 Scroll after "typing..."

    const payload = {
      user_id: String(this.userId),
      admin_user_id: String(this.admin_user_id),
      message: finalMsg,
      chatHistory: this.chatHistory.map(chat => ({
        role: chat.type,
        message: chat.text
      }))
    };

    this.chatbotService.sendChatPayload(payload).subscribe({
      next: (res) => {
        const botReply = res?.message || "Thanks for your message!";
        this.chatHistory[typingIndex] = { type: 'bot', text: botReply }; // ✅ Replace loading
        this.scrollToBottom(); // 👈 Scroll after final bot response
      },
      error: (err) => {
        console.error('Chat API error:', err);
        this.chatHistory[typingIndex] = { type: 'bot', text: "Something went wrong. Please try again." };
        this.scrollToBottom(); // 👈 Even on error
      }
    });

    this.message = '';
  }
}

scrollToBottom(): void {
  setTimeout(() => {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll error:', err);
    }
  }, 100); // Slight delay ensures DOM update
}
  // Profile Login Popup update

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
      this.admin_user_id = user.admin_user_id;
      this.userName = user.name;
      this.userMail = user.email;
      this.organizationBrand = user.admin_user.brand_logo;
      this.organizationLogo = user.admin_user.logo;
      this.empID = user.emp_id;
      this.profilePhoto = user.employee_details.profile_photo;
      this.userRole = user.role;
      this.chatLogo = user.admin_user.chat_logo;
      this.styleName = user.admin_user.company_word;

      // ✅ Normalize styleName (replace spaces with dashes)
      const styleClass = this.styleName.replace(/\s+/g, '-').toLowerCase();

      // ✅ Add classes to body
      const body = document.body;
      body.classList.add('light-theme'); // Default theme
      body.classList.add(styleClass);    // Add styleName as class
    }

    // Optional: Add saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(`${savedTheme}-theme`);
    }
  }
}

setTheme(theme: 'light' | 'dark') {
  const body = document.body;
  body.classList.remove('light-theme', 'dark-theme');
  body.classList.add(`${theme}-theme`);
  localStorage.setItem('theme', theme);
}

  @ViewChild('popupRef') popupRef!: ElementRef;



  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // Logout

  onSignOut() {
    this.authService.logout().subscribe({
      next: () => {
        this.clearSession();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.clearSession(); // Even if API fails, clear storage
        this.router.navigate(['/login']);
      }
    });
  }

  clearSession() {
    localStorage.clear();
    sessionStorage.clear();
  }

  //  Login Popup



  toggleProfilePopup(event: MouseEvent) {
    event.stopPropagation(); // prevent closing when clicking inside
    this.isProfilePopupOpen = !this.isProfilePopupOpen;
  }

  handleOutsideClick(event: MouseEvent) {
    if (this.isProfilePopupOpen && this.popupRef && !this.popupRef.nativeElement.contains(event.target)) {
      this.isProfilePopupOpen = false;
    }
  }
}
