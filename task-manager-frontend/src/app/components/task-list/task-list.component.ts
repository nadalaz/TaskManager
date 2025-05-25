import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filter: 'all' | 'completed' | 'incomplete' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.applyFilter();
    });
  }

  toggleTask(task: Task): void {
    this.taskService.updateTask(task.id).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  applyFilter(): void {
    if (this.filter === 'completed') {
      this.filteredTasks = this.tasks.filter(t => t.completed);
    } else if (this.filter === 'incomplete') {
      this.filteredTasks = this.tasks.filter(t => !t.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  onFilterChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as 'all' | 'completed' | 'incomplete';
    this.filter = value;
    this.applyFilter();
  }
}
