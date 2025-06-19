import { Component, computed } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule, NgClass } from '@angular/common';
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    NgClass
  ],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(10px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))]),
    ]),
  ],
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  notifications = computed(() => this.notificationService.notifications())

  constructor(public notificationService: NotificationService) {}

  getIconByType(type: string): string {
    switch (type) {
      case "success":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        `
      case "error":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        `
      case "warning":
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        `
      case "info":
      default:
        return `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        `
    }
  }

  getNotificationClasses(type: string): string {
    const baseClasses = "flex w-full max-w-sm overflow-hidden rounded-lg shadow-md"

    switch (type) {
      case "success":
        return `${baseClasses} bg-green-50 border-l-4 border-green-500`
      case "error":
        return `${baseClasses} bg-red-50 border-l-4 border-red-500`
      case "warning":
        return `${baseClasses} bg-yellow-50 border-l-4 border-yellow-500`
      case "info":
      default:
        return `${baseClasses} bg-blue-50 border-l-4 border-blue-500`
    }
  }

  getIconClasses(type: string): string {
    switch (type) {
      case "success":
        return "text-green-500"
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "info":
      default:
        return "text-blue-500"
    }
  }

  close(id: string): void {
    this.notificationService.remove(id)
  }
}
