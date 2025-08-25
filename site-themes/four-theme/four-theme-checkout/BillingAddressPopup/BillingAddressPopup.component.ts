import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBillingAddressPopupComponent } from '../AddBillingAddressPopup/AddBillingAddressPopup.component';

@Component({
  selector: 'app-BillingAddressPopup',
  templateUrl: './BillingAddressPopup.component.html',
  styleUrls: ['./BillingAddressPopup.component.css']
})
export class BillingAddressPopupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addBillingAddressPopup() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open( AddBillingAddressPopupComponent, { panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data && result?.data !== undefined) {
        console.log(result?.data, 'result?.data')
      }
    });
  }

}
