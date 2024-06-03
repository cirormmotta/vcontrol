import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-web-cam',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './web-cam.component.html',
  styleUrl: './web-cam.component.scss',
})
export class WebCamComponent {
  WIDTH = 200;
  HEIGHT = this.WIDTH * 0.75;

  @ViewChild('video') video!: ElementRef;

  @ViewChild('canvas', { static: false }) canvas!: ElementRef;

  @Output() capture: EventEmitter<string> = new EventEmitter<string>();
  @Input('picture') picture = '';
  error: any;
  isCaptured: boolean = false;
  
  ngOnChanges(change: SimpleChanges) {
    if (change['picture']?.currentValue) {
      this.isCaptured = true
    }
  }
  ngOnInit() {
    this.handleSize();
  }
  async ngAfterViewInit() {
    await this.setupDevices();
  }
  handleSize() {
    const windowWidth = window.innerWidth * 0.2;
    const width = windowWidth < 250 ? 250 : windowWidth;
    const height = width * 0.75;
    this.WIDTH = width;
    this.HEIGHT = height;
  }
  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = 'You have no output video device';
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  pictureCapture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.capture.next(this.canvas.nativeElement.toDataURL('image/png'));
    this.isCaptured = true;
  }
  newPictureCapture() {
    this.capture.next('');
    this.isCaptured = false;
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext('2d')
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
