import { Component, ViewChild } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent], // ✅ Tu dois importer TaskFormComponent ici
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild(TaskListComponent) taskList!: TaskListComponent;

  onTaskAdded(): void {
    this.taskList.loadTasks();
  }
}
