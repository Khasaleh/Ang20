import { Component, OnInit,  Renderer2, Inject } from '@angular/core';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { StorehoursComponent } from '../four-theme-checkout/storehours/storehours.component';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { TranslateService } from '@ngx-translate/core';
import { ViewStoreLocationComponent } from './view-store-location/view-store-location.component';
import { Subject, Subscription, firstValueFrom, take} from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-place-an-order',
  templateUrl: './place-an-order.component.html',
  styleUrls: ['./place-an-order.component.scss']
})
export class PlaceAnOrderComponent implements OnInit {
  orderResponse!: OrderResponse;
  renderer: any;
  businessHours: any[] = [];
  businessID = Number(this.tokenStorage.getBusinessID());
  private routerSubscription!: Subscription;
  reloadSubscription!: Subscription;
  subdomain: string = '';


  constructor( @Inject(DOCUMENT) private document: Document, private renderernew: Renderer2, private router: Router,private route: ActivatedRoute,
   public dialog: MatDialog,private translate: TranslateService, private businessSettings: BusinessSettingService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.orderResponse = window.history.state.order;
    if(!this.orderResponse || this.orderResponse == null){
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      return;
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);

    this.getBusinessHoursOfOperation();
    this.renderernew.addClass(this.document.body, 'thankyou-optimized');
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.renderernew.removeClass(this.document.body, 'thankyou-optimized');
      }
    });
  }


  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.renderernew.removeClass(this.document.body, 'checkout-optimized');
  }


  copyOrderId() {
    const orderId = this.orderResponse?.businessOrderId;
    if (orderId) {
      navigator.clipboard.writeText(orderId).then(() => {
        this.dialog.open(SucessmsgPopupComponent, {
          backdropClass: 'notificationmodal-popup-sucess',
          data: {
            title: 'COPIED',
            message: 'ORDER_ID_IS_COPIED'
          }
        });
      }).catch(err => {
        console.error('Failed to copy order ID: ', err);
      });
    }
  }



  viewStoreHours(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'modal-medium-width';
      dialogConfig.data = this.businessHours;
      this.dialog.open( StorehoursComponent, dialogConfig);
  }

  viewStoreLocation(){
    const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'modal-x-medium-width';
      this.dialog.open( ViewStoreLocationComponent, dialogConfig);
  }

   getBusinessHoursOfOperation(){
    this.businessSettings.getBusinessHoursOfOperation(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data?.data?.getBusinessHoursOfOperation != null){
          this.businessHours = data?.data?.getBusinessHoursOfOperation;
        }
      }
    );
   }
}
