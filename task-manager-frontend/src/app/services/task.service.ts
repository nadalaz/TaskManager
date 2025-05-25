import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  addTask(title: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { title })
      .pipe(catchError(this.handleError));
  }

  updateTask(id: number): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error?.message || 'Une erreur inconnue est survenue.';
    alert(`❌ Erreur : ${message}`);
    return throwError(() => error);
  }
}
