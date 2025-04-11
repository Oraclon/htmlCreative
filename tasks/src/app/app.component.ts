import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { Severity, TaskStatus } from '../common/enums';
import { Project, Task } from '../common/interfaces';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  ts: TaskService = inject(TaskService);
  ns: NotificationService = inject(NotificationService);

  //#region [Signals]
  projects: Signal<Project[]> = computed(()=>{
    return this.ts.loadedProjects$();
  });
  tasks: Signal<Task[]> = computed(()=>{
    return this.ts.loadedTasks$();
  });
  taskTrigger: Signal<boolean> = computed(()=>{
    return this.ns.notificationTrigger();
  });
  //#endregion

  title = 'tasks';

  severity: typeof Severity = Severity;
  statusLocs: typeof TaskStatus = TaskStatus;
  currentItem!: Task;
  statuses: TaskStatus[] = [TaskStatus.Pending, TaskStatus.Started, TaskStatus.Finished];

  ngOnInit(): void {
    this.ts.loadProjects();
  }

  onDrag(task:Task)
  {
    this.currentItem = task;
  }
  onDrop(event: any, status: TaskStatus)
  {
    event.preventDefault();
    this.ts.updateTask(this.currentItem, status);
  }
  onDragOver(event: any)
  {
    event.preventDefault();
  }
  filterData(status: TaskStatus): Task[]
  {
    return this.tasks().filter(x=> x.status == status);
  }
  addNewTask():void
  {
    this.ts.addTask(); 
  }
  addNewProject():void
  {
    this.ts.addProject(); 
  }
  loadProject(project:Project):void
  {
   this.ts.selectProject(project); 
  }
}
