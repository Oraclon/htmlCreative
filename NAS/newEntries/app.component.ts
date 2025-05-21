import { Component, OnInit } from '@angular/core';
import { ProgressService } from './progress.service';
import { Observable, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  progress = 0;
  loading = false;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {}

  startTask(): void {
    this.loading = true;
    this.progressService.startTask().subscribe(
      (response) => {
        console.log(response); // Log the response
      },
      (error) => {
        console.error('Error starting task:', error);
        this.loading = false;
      }
    );

    // Poll for progress updates
    interval(1000)
      .pipe(switchMap(() => this.progressService.getProgress()))
      .subscribe(
        (progressData) => {
          this.progress = progressData.progress;
          if (this.progress >= 100) {
            this.loading = false;  // Task completed
          }
        },
        (error) => {
          console.error('Error fetching progress:', error);
        }
      );
  }

  resetProgress(): void {
    this.progressService.resetProgress().subscribe(() => {
      this.progress = 0;
      this.loading = false;
    });
  }
}
