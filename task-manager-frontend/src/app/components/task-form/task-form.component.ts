import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  taskForm: FormGroup;

  @Output() taskAdded = new EventEmitter<void>(); // 🔄 Permet d’alerter le parent

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return;

    const title = this.taskForm.value.title;
    this.taskService.addTask(title).subscribe(() => {
      this.taskForm.reset();           // 🧽 Vider le formulaire
      this.taskAdded.emit();          // 🔔 Notifier le composant parent (ex. task-list)
    });
  }
}
