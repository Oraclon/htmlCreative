import { Injectable, signal } from "@angular/core";

@Injectable()
export class NotificationService
{
    notificationTrigger = signal<boolean>(false);

    triggerNotification(delay: number = 2000):void
    {
        this.notificationTrigger.set(true);

        let interval = setInterval(() => {
            this.notificationTrigger.set(false);
            clearInterval(interval);
        }, delay);
    }
}