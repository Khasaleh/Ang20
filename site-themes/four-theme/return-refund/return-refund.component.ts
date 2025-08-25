import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrackpackageComponent } from '../four-theme-my-order/trackpackage/trackpackage.component';


@Component({
  selector: 'app-return-refund',
  templateUrl: './return-refund.component.html',
  styleUrls: ['./return-refund.component.scss']
})
export class ReturnRefundComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  subdomain: string = '';
  order!: OrderResponse;
  loadingOrders = false;
  noOrdersAvailable = false;
  orderId!: number;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public shoppingCart: ShoppingCartService, public tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.orderId = this.route.snapshot.params['id'];
    this.getByOrderId();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  openReturnOrder(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    const url = `/${this.subdomain}/return-refund-process/${orderId}`;
    this.router.navigateByUrl(url, {state: {order: order}});
  }

  async getByOrderId() {
      this.loadingOrders = true;
      this.noOrdersAvailable = false;
        (await this.shoppingCart.getByOrderId(this.orderId, this.businessId)).subscribe(
            data => {
                if (data?.errors) {
                    this.loadingOrders = false;
                    return;
                }
                if (data?.data?.getOrdersByCustomerAndBusinessAndOrderId) {
                    this.order = data?.data?.getOrdersByCustomerAndBusinessAndOrderId;
                    this.loadingOrders = false;
                } else {
                    this.loadingOrders = false;
                    this.noOrdersAvailable = true;
                }
            },
            error => {
                this.loadingOrders = false;
                this.noOrdersAvailable = true;
            }
        );
}

 openTrackPackage(order: OrderResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = order;
    const dialogRef = this.dialog.open(TrackpackageComponent, dialogConfig);
  }


}
