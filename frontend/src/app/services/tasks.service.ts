import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private httpClient: HttpClient) {}

  insert(task: Partial<Task>): Observable<Task> {
    return this.httpClient.post<Task>(`${environment.baseUrl}/tasks`, task);
  }

  update(taskId: string, task: Partial<Task>): Observable<Task> {
    return this.httpClient.put<Task>(
      `${environment.baseUrl}/tasks/${taskId}`,
      task
    );
  }

  delete(taskId: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/tasks/${taskId}`);
  }

  getByPage(page: number, size: number = 10): Observable<Task[]> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size);
    return this.httpClient.get<Task[]>(`${environment.baseUrl}/tasks/paging`, {
      params,
    });
  }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.baseUrl}/tasks`);
  }
}
