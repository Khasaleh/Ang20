import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-chartsize-popup',
  templateUrl: './chartsize-popup.component.html',
  styleUrls: ['./chartsize-popup.component.css']
})
export class ChartsizePopupComponent implements OnInit {

  imageUrl!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {imageUrl: any},
              private dialogRef: MatDialogRef<ChartsizePopupComponent>) { }

  ngOnInit() {
    this.imageUrl = this.data.imageUrl;
  }

}
