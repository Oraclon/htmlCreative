import { Component } from '@angular/core';
export enum TaskStatus
{
  Pending,
  Started,
  Finished
}
export enum Severity
{
  Low,
  Medium,
  High
}
export interface Task
{
  id: number,
  status: TaskStatus,
  value: string
}
export interface Project
{
  id: number,
  selected: boolean,
  name: string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tasks';
  tasks: Task[] = [...Array(10).keys()].map(x=> this._createDemoTask());
  projects: Project[]= [...Array(10).keys()].map(x=> this._createDemoProject());

  statusLocs: typeof TaskStatus = TaskStatus;
  currentItem!: Task;
  statuses: TaskStatus[] = [TaskStatus.Pending, TaskStatus.Started, TaskStatus.Finished];

  private _createDemoTask():Task
  {
    let random: number = Math.round(Math.random() * 10000);
    let item: Task = {
      id: random,
      status: TaskStatus.Pending,
      value: `Task-${random}`
    }
    return item;
  }
  private _createDemoProject():Project
  {
    let random: number = Math.round(Math.random() * 10000);
    let project: Project = {
      id: random,
      selected: false,
      name: `This is project Proj-${random}`
    };
    return project;
  }

  onDrag(task:Task)
  {
    this.currentItem = task;
  }
  onDrop(event: any, status: TaskStatus)
  {
    event.preventDefault();
    const selection: Task | undefined = this.tasks.find(x=> x.id == this.currentItem.id);
    if(selection != undefined)
      selection.status = status;
  }
  onDragOver(event: any)
  {
    event.preventDefault();
  }

  filterData(status: TaskStatus): Task[]
  {
    return this.tasks.filter(x=> x.status == status);
  }
  addNewTask():void
  {
    let newTask: Task = this._createDemoTask();
    this.tasks.push(newTask);
  }
  addNewProject():void
  {
    this.projects.push(this._createDemoProject());
  }
  loadProject(project:Project):void
  {
    this.projects = this.projects.map(x=> {x.selected = false; return x;});
    project.selected = true;
  }
}
