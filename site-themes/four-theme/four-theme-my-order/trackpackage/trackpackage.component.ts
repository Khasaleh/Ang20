import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trackpackage',
  templateUrl: './trackpackage.component.html',
  styleUrls: ['./trackpackage.component.css']
})
export class TrackpackageComponent implements OnInit {
  order!: OrderResponse;
  awsUrl = environment.awsKey;
  orderTracking: any;
  loadingOrders = false;
  subdomain!: string;
  noOrdersAvailable = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public shoppingCart: ShoppingCartService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.order = this.data;
    this.getShipEngineOrderTrackingByTrackingNumberAndBusinessId();
  }

  convertUtcToLocal(utcDate: any): string {
    const date = new Date(utcDate);
    return date.toLocaleString();
  }

  async getShipEngineOrderTrackingByTrackingNumberAndBusinessId(){
    this.loadingOrders = true;
    this.noOrdersAvailable = false;
     (await this.shoppingCart.getShipEngineOrderTrackingByTrackingNumberAndBusinessId(this.order.trackingId)).subscribe(
        data => {
          console.log(data, 'dataaaaaa')
          if(data?.errors){
            this.loadingOrders = false;
            this.noOrdersAvailable = true;
            return;
          }
          if(data?.data?.getShipEngineOrderTrackingByTrackingNumberAndBusinessId){
            this.orderTracking = data?.data?.getShipEngineOrderTrackingByTrackingNumberAndBusinessId;
            this.loadingOrders = false;
            this.noOrdersAvailable = false;
          }
        }
      );
    }
}
