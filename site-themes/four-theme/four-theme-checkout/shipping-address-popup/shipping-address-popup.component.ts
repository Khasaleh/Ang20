import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddShippingAddressComponent } from '../add-shipping-address/add-shipping-address.component';

@Component({
  selector: 'app-shipping-address-popup',
  templateUrl: './shipping-address-popup.component.html',
  styleUrls: ['./shipping-address-popup.component.css']
})
export class ShippingAddressPopupComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addshippingAddressPopup() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddShippingAddressComponent, { panelClass: 'modal-x-medium-width' });
  }




}
