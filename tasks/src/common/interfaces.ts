import { Severity, TaskStatus } from "./enums"

export interface Task
{
  id: number,
  status: TaskStatus,
  value: string
    severity: Severity
}
export interface Project
{
  id: number,
  selected: boolean,
  name: string
}