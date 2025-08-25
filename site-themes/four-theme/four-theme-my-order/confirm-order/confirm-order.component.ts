import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {

  order!: OrderResponse;
  message!: string;
  errorMessage!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {order: any},
              private dialogRef: MatDialogRef<ConfirmOrderComponent>,
              public dialog: MatDialog,
              public shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    this.order = this.data.order;
  }

  onClickAvailable(id: number){
    this.order.orderDetails.forEach(details => {
      if(details.id == id){
        if(details.available){
          details.available = false;
        }else{
          details.available = true;
        }
      }
    });
  }

  confirmOrder(status: string){
    this.shoppingCart.updateOrderStatus(this.order.id, status).subscribe(data => {
      console.log(data)
      if(data.data.updateOrderStatus != null){
        this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess', data:{title:'', message: 'Order Status Changed To ' + status}});
        setTimeout(() => {
          this.dialogRef.close(status);
           }, 2000);
      }
    });
  }


}
