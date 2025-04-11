import { Component, computed, inject, Signal } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: false,
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  ns: NotificationService = inject(NotificationService);

  taskTrigger: Signal<boolean> = computed(()=>{ return this.ns.notificationTrigger(); })
}
