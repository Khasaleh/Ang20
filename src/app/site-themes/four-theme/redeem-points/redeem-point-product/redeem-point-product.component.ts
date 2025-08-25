import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RedeemProductsPopupComponent } from '../redeem-products-popup/redeem-products-popup.component';

@Component({
  standalone: true,
  selector: 'app-redeem-point-product',
  templateUrl: './redeem-point-product.component.html',
  styleUrls: ['./redeem-point-product.component.css']
})
export class RedeemPointProductComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }


  redeemProduct() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(RedeemProductsPopupComponent, { panelClass: 'modal-redeem-product' });
  }

}
