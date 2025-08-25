import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RedeemPointValidationPopupComponent } from '../redeem-point-validation-popup/redeem-point-validation-popup.component';

@Component({
  selector: 'app-redeem-voucher-box',
  templateUrl: './redeem-voucher-box.component.html',
  styleUrls: ['./redeem-voucher-box.component.css']
})
export class RedeemVoucherBoxComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  redeemPoints() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(RedeemPointValidationPopupComponent, { panelClass: 'modal-medium-width' });
  }

}
