import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { DrawerControlService } from 'src/app/service/drawer-control.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  businessOrderId: string = '';
  email: string = '';
  subdomain: string = '';
  user = this.tokenStorage.getUser();
  businessId = Number(this.tokenStorage.getBusinessID()!);
  sessionResponse!: SessionResponse;

  constructor(public shoppingCart: ShoppingCartService,private drawerControlService: DrawerControlService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private tokenStorage: TokenStorageService,private cookieDate: CookieDataServiceService,
  ) {
    if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
    }
  }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }


  async getOrderTracking(){
      (await this.shoppingCart.getOrderTracking(this.businessOrderId.trim(), this.email.trim())).subscribe(
        data => {
          if(data?.errors){
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: '', message: data?.errors[0]?.errorMessage}
            });
            return;
          }
          if(data?.data?.getOrderTracking){
            if(this.sessionResponse.userType !== 'FAZEAL_REGISTERED' && this.sessionResponse.userType !== 'STORE_REGISTERED'){
              this.sessionResponse = new SessionResponse();
              this.sessionResponse.id = 1;
              this.sessionResponse.userType = 'GUEST';
              this.cookieDate.setCookie(this.businessId!.toString(), JSON.stringify(this.sessionResponse), 1);
            }
            const order = data?.data?.getOrderTracking;
            const orderId = data?.data?.getOrderTracking.id;
            if (environment.env !== 'local') {
              this.subdomain = '';
            }
            const url = `/${this.subdomain}/order-details/${orderId}`;
            this.tokenStorage.saveOrderForOrderDetails(order);
            this.router.navigateByUrl(url, {state: {order: order, orderhistory: true}});
          }
        }
      )
  }

  openUserProfileDrawerAndDropdown() {
    this.drawerControlService.triggerOpenDrawer();
    this.drawerControlService.triggerOpenDropdown();
  }


}
