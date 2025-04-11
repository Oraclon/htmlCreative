import { Component, computed, inject, Input, Signal } from '@angular/core';
import { Severity, TaskStatus } from '../../../common/enums';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../common/interfaces';

@Component({
  selector: 'app-task-item',
  standalone: false,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  ts: TaskService = inject(TaskService);
  statusLocs: typeof TaskStatus = TaskStatus;
  severity: typeof Severity = Severity;
  @Input("task") task !: Task;
}
