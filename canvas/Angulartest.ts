// canvas-upload.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-canvas-upload',
  template: `
    <canvas #canvas width="300" height="200"></canvas>
    <button (click)="sendCanvas(canvas)">Send Canvas</button>
  `
})
export class CanvasUploadComponent {
  constructor(private http: HttpClient) {}

  sendCanvas(canvas: HTMLCanvasElement) {
    const imageBase64 = canvas.toDataURL("image/png");

    this.http.post('/api/canvas/upload', { imageBase64 })
      .subscribe({
        next: res => console.log("Success:", res),
        error: err => console.error("Error:", err)
      });
  }
}
