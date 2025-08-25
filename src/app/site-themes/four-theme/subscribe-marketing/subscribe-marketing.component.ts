import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subscribe-marketing',
  template: '<p>subscribe-marketing works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class SubscribeMarketingComponent {
  constructor(public dialogRef: MatDialogRef<SubscribeMarketingComponent>) {}
}
