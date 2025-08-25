import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-qr-code',
  templateUrl: './view-qr-code.component.html',
  styleUrls: ['./view-qr-code.component.css']
})
export class ViewQrCodeComponent implements OnInit {
  qrCodeImage!: string;
  awsUrl = environment.awsKey;
  constructor( public dialogRef: MatDialogRef<ViewQrCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.qrCodeImage = this.generateQRCode(this.data.qrCodeImage);
  }


  generateQRCode(qrCodebase64: any): string {
    return `data:image/png;base64,${qrCodebase64}`;
  }
}
