import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { NotificationsComponent } from './plugins/notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [TaskService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
