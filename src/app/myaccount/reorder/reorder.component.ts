import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reorder',
  template: '<p>reorder works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class ReorderComponent {
  constructor(public dialogRef: MatDialogRef<ReorderComponent>) {}
}
