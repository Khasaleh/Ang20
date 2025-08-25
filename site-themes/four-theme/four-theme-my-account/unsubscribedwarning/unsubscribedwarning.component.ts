import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsubscribedwarning',
  templateUrl: './unsubscribedwarning.component.html',
  styleUrls: ['./unsubscribedwarning.component.css']
})
export class UnsubscribedwarningComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UnsubscribedwarningComponent>) { }

  ngOnInit() {
  }

  async unsubscribe() {
    this.dialogRef.close({ event: 'close', data: true});
  }
}
