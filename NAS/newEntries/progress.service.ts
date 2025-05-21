import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {
  private apiUrl = 'http://localhost:5000/api/progress'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Start the long-running task
  startTask(): Observable<any> {
    return this.http.get('http://localhost:5000/api/progress/start');
  }

  // Get the current progress
  getProgress(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Reset progress (optional)
  resetProgress(): Observable<any> {
    return this.http.get('http://localhost:5000/api/progress/reset');
  }
}
