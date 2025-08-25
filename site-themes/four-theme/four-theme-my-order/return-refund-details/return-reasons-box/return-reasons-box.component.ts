import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewReturnImagesComponent } from '../view-return-images/view-return-images.component';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { OrderResponse } from 'src/app/models/OrderResponse';

@Component({
  selector: 'app-return-reasons-box',
  templateUrl: './return-reasons-box.component.html',
  styleUrls: ['./return-reasons-box.component.css']
})
export class ReturnReasonsBoxComponent implements OnInit {

  @Input() prod!: OrderDetailResponse;
  @Input() order!: OrderResponse;
  @Input() orderId!: number;
  @Output() updatedOrder = new EventEmitter<OrderResponse>();
  awsURL = environment.awsKey;
  returnOrderTracks: any[] = [];
  firstTimeCalled: boolean = false;
  constructor(public dialog: MatDialog, private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    this.returnOrderTracks = this.order?.returnOrderTracks?.map((track: any) => track?.status);
  }

  async cancelItemReturn(){
    this.firstTimeCalled = true;
    (await this.shoppingCart.cancelItemReturn(this.orderId, this.prod.id)).subscribe(
      result => {
        if(result?.data?.cancelItemReturn == null){
          this.firstTimeCalled = false;
          return;
        }
        this.prod.returnOrderStatus = 'RETURN_CANCELLED';
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
          data: { title: '', message: result?.data?.cancelItemReturn?.message } });
          this.updatedOrder.emit(result?.data?.cancelItemReturn?.data);
          this.firstTimeCalled = false;
      }
    );
  }

  viewReturnImages(prod: OrderDetailResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    dialogConfig.data = prod;
    const dialogRef = this.dialog.open(ViewReturnImagesComponent, dialogConfig);
  }

}
