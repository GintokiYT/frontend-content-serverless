import { Injectable, signal } from '@angular/core';
import { Notification, NotificationType } from '../types';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications = signal<Notification[]>([])

  show(message: string, type: NotificationType = "info", duration = 5000): string {
    const id = this.generateId()

    const notification: Notification = {
      id,
      message,
      type,
      duration,
      autoClose: duration > 0,
    }

    this.notifications.update((notifications) => [...notifications, notification])

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id)
      }, duration)
    }

    return id
  }

  success(message: string, duration = 5000): string {
    return this.show(message, "success", duration)
  }

  error(message: string, duration = 5000): string {
    return this.show(message, "error", duration)
  }

  warning(message: string, duration = 5000): string {
    return this.show(message, "warning", duration)
  }

  info(message: string, duration = 5000): string {
    return this.show(message, "info", duration)
  }

  remove(id: string): void {
    this.notifications.update((notifications) => notifications.filter((notification) => notification.id !== id))
  }

  clear(): void {
    this.notifications.set([])
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9)
  }
}
