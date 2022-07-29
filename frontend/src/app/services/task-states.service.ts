import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskStatesService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<TaskState[]> {
    return this.httpClient.get<TaskState[]>(`${environment.baseUrl}/task-states`)
  }
}
