import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsubscribe-marketing',
  template: '<p>unsubscribe-marketing works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class UnsubscribeMarketingComponent {
  constructor(public dialogRef: MatDialogRef<UnsubscribeMarketingComponent>) {}
}
