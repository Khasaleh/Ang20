import { AfterViewInit, Component, ElementRef, Inject, ViewChild, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-fullscreen-pdp-image',
  templateUrl: './fullscreen-pdp-image.component.html',
  styleUrls: ['./fullscreen-pdp-image.component.css']
})
export class FullscreenPdpImageComponent implements OnInit {

   @ViewChild('imgRef', { static: false }) imgRef!: ElementRef<HTMLImageElement>;

  private scale = 1;
  private lastScale = 1;
  private startX = 0;
  private startY = 0;
  private translateX = 0;
  private translateY = 0;



  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) { }

  ngOnInit() {
  }


  ngAfterViewInit() {
    const img = this.imgRef.nativeElement;

    let initialDistance = 0;

    img.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        initialDistance = this.getDistance(e.touches[0], e.touches[1]);
        this.lastScale = this.scale;
      } else if (e.touches.length === 1) {
        this.startX = e.touches[0].clientX - this.translateX;
        this.startY = e.touches[0].clientY - this.translateY;
      }
    });

    img.addEventListener('touchmove', (e) => {
      e.preventDefault(); // prevent scroll

      if (e.touches.length === 2) {
        const newDistance = this.getDistance(e.touches[0], e.touches[1]);
        this.scale = Math.max(1, this.lastScale * (newDistance / initialDistance));
      } else if (e.touches.length === 1 && this.scale > 1) {
        this.translateX = e.touches[0].clientX - this.startX;
        this.translateY = e.touches[0].clientY - this.startY;
      }

      this.applyTransform(img);
    });

    img.addEventListener('touchend', () => {
      // Optional: Reset pan if needed
    });
  }

  private getDistance(touch1: Touch, touch2: Touch): number {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private applyTransform(img: HTMLElement) {
  if (this.scale > 1) {
    img.style.transform = `scale(${this.scale}) translate(${this.translateX / this.scale}px, ${this.translateY / this.scale}px)`;
  } else {
    img.style.transform = 'none'; // Reset to normal view
  }
}


}

 