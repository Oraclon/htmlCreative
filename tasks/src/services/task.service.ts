import { inject, Injectable, signal, ɵbypassSanitizationTrustUrl } from "@angular/core";
import { Project, Task } from "../common/interfaces";
import { Severity, TaskStatus } from "../common/enums";
import { NotificationService } from "./notification.service";

@Injectable()
export class TaskService
{
    ns: NotificationService = inject(NotificationService);

    selectedProject!: Project;
    loadedProjects$ = signal<Project[]>([]);
    loadedTasks$ = signal<Task[]>([]);

    private _createDemoTask():Task
    {
        let random: number = Math.round(Math.random() * 10000);
        let item: Task = {
            id: random,
            status: TaskStatus.Pending,
            value: `Task-${random}`,
            severity: Severity.Low
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

    //#region [Projects]
    loadProjects():void
    {
        this.loadedProjects$.set([...Array(10).keys()].map(x=> this._createDemoProject()));
    }
    addProject():void
    {
        let newProject = this._createDemoProject();
        this.loadedProjects$.update((x:Project[])=>[...x, newProject]);
    }
    selectProject(project: Project):void
    { 
        this.ns.triggerNotification(1000);
        this.selectedProject = project;
        let projectsCleared = this.loadedProjects$().map((x:Project)=> {x.selected = false; return x});
        this.loadedProjects$.set(projectsCleared);
        project.selected = true;

        this.loadTasks(project);
    }
    //#endregion
    
    //#region [Tasks]
    loadTasks(project:Project):void
    {
        this.loadedTasks$.set([...Array(10).keys()].map(x=> this._createDemoTask()));
    }
    addTask():void
    {
        let newTask = this._createDemoTask();
        this.loadedTasks$.update((tasks:Task[])=> [...tasks, newTask]);
        console.log(this.selectedProject);
    }
    updateTask(task: Task, status: TaskStatus):void
    {
        this.ns.triggerNotification();
        let sendModel = {
            task: task,
            status: status
        }

        const record: Task | undefined = this.loadedTasks$().find((x:Task)=> x.id == task.id);
        if(record != undefined)
            record.status = status;
    }
    //#endregion
}