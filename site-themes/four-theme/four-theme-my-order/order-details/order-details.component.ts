import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';
import { EditReviewModalComponent } from '../../edit-review-modal/edit-review-modal.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { EditordercustomerdetailsComponent } from '../editordercustomerdetails/editordercustomerdetails.component';
import { EditordershippingaddressComponent } from '../editordershippingaddress/editordershippingaddress.component';
import { EditorderpaymentmethodComponent } from '../editorderpaymentmethod/editorderpaymentmethod.component';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { EditorderpickupinfoComponent } from '../editorderpickupinfo/editorderpickupinfo.component';
import { ProofofdeliveryComponent } from '../proofofdelivery/proofofdelivery.component';
import { ProofofPickupComponent } from '../ProofofPickup/ProofofPickup.component';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { EditpickupinfoforreserveComponent } from '../editpickupinfoforreserve/editpickupinfoforreserve.component';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  subdomain: string = '';
  businessId = Number(this.tokenStorage.getBusinessID()!);
  order!: OrderResponse;
  user = this.tokenStorage.getUser();
  orderPrefix = this.tokenStorage.getOrderFormat()?.prefix;
  orderSuffix = this.tokenStorage.getOrderFormat()?.suffix;
  awsUrl = environment.awsKey;
  currency = this.tokenStorage.getCurrency()?.symbol;
  orderHistory: boolean = false;
  differenceInDays!: number;
  isDateExceeded: boolean = false;
  updatedDate!: Date;
  sessionResponse!: SessionResponse;
  orderId!: number;
  loadingOrders = false;
  noOrdersAvailable = false;
  paymentId: string = '';
  token: string = '';
  payerId: string = '';

  constructor( private route: ActivatedRoute, public shoppingCart: ShoppingCartService,private router: Router, private sharedService: SharedService,
    public tokenStorage: TokenStorageService, public dialog: MatDialog,private cdr: ChangeDetectorRef,
    private cookieDate: CookieDataServiceService,) {
      if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
      }
     }

  async ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.orderId = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(async params => {
      console.log(params, 'paramssss')
      if (params && Object.keys(params).length > 0){
          const paymentId = params['paymentId'];
          const token = params['token'];
          const payerId = params['PayerID'];
          await this.getByOrderId();
          if (paymentId && token && payerId) {
            this.paymentId = paymentId;
            this.token = token;
            this.payerId = payerId;
            await this.updatePaymentValidation();
          } else{
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: 'Payment have declined!' }
            });
          }
      }
    })

    if(!this.user && (this.sessionResponse?.userType !== 'GUEST' || this.tokenStorage.getOrderForOrderDetails() == null)){
      if (environment.env !== 'local') {
        this.subdomain = '';
      }
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
    }
    if(this.user){
      this.getByOrderId();
    } else {
      this.order = this.tokenStorage.getOrderForOrderDetails();
      this.getOrderTracking();
    }
    this.orderHistory = window.history.state.orderhistory;
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  async updatePaymentValidation(){
    (await this.shoppingCart.updatePaymentValidation(this.orderId, this.paymentId, this.token, this.payerId, 'PAYPAL')).subscribe(
      data => {
        if(data?.errors){
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: {
                title: 'ERROR',
                message: data?.errors[0]?.errorMessage
            }
            });
          return;
        }
        if(data?.data?.updatePaymentValidation){
          console.log(data, 'updatePaymentValidation')
          this.dialog.open(SucessmsgPopupComponent, {
            backdropClass: 'notificationmodal-popup-sucess',
            data: {
                title: 'SUCCESS',
                message: data?.data?.updatePaymentValidation?.message
            }
        });
          this.order = data?.data?.updatePaymentValidation?.data;
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {},
            replaceUrl: true
          });
        }
      }
    );
  }

  async getOrderTracking(){
      (await this.shoppingCart.getOrderTracking(this.order?.businessOrderId.trim(), this.order?.orderAddressResponse?.email.trim())).subscribe(
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
            const order = data?.data?.getOrderTracking;
            this.order = order;
            this.tokenStorage.saveOrderForOrderDetails(order);
          }
        }
      )
  }

  async getByOrderId() {
    if (this.user) {
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
}

  async actionOnPendingOrder(itemId: number, status: string){
    (await this.shoppingCart.actionOnPendingOrder(this.order.id, itemId, status)).subscribe(
      async data => {
        if(data?.data?.actionOnPendingOrder != null){
         this.order = data?.data?.actionOnPendingOrder;
         this.cdr.detectChanges();
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
      }
    );
  }

  async cancelOrder(order: any){
    (await this.shoppingCart.cancelOrder(order.id)).subscribe(
      async data => {
        if(data?.data?.cancelOrder != null){
          this.order = data?.data?.cancelOrder?.data;
          this.cdr.detectChanges();
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
      }
    );
  }

  getTracks(order: OrderResponse): any[] {
    return order?.orderTracks?.map((track: any) => track?.status);
  }

  calculateTimePeriodDifference(item: any, order: any): any {
    const deliverDateObj = new Date(order.deliverDate);
    deliverDateObj.setDate(deliverDateObj.getDate() + item.timePeriodReturn);
    const today = new Date();
    const differenceInTime = deliverDateObj.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    this.isDateExceeded = differenceInDays < 0;
    this.updatedDate = deliverDateObj;
    this.differenceInDays = differenceInDays;
    return this.updatedDate;
}

  openPrintOrderSummary(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    this.tokenStorage.saveOrderForPrint(order);
    const url = `/${this.subdomain}/print-order-summary/${orderId}`;
    const fullUrl = this.router.serializeUrl(this.router.createUrlTree([url]));
    window.open(fullUrl, '_blank');
  }

  editreviewmodal(product: ProductResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = {action: 'ADD', item: product};
    this.dialog.open(EditReviewModalComponent, dialogConfig);
  }

  openLinkInNewTab(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    this.tokenStorage.saveOrderForPrint(order);
    const url = `/${this.subdomain}/print-order-summary/${orderId}`;
    const fullUrl = this.router.serializeUrl(this.router.createUrlTree([url]));
    window.open(fullUrl, '_blank');
  }

  editOrderCustomerDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = this.order;
    const dialogRef = this.dialog.open( EditordercustomerdetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.order = result.data;
        this.tokenStorage.saveOrderForOrderDetails(this.order);
        this.sharedService.setOrderData(this.order);
      }
     });
  }

  editOrderShippingDetails(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = this.order;
    const dialogRef = this.dialog.open( EditordershippingaddressComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.order = result.data;
        this.tokenStorage.saveOrderForOrderDetails(this.order);
        this.sharedService.setOrderData(this.order);
      }
     });
  }

  editOrderPaymentMethod() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    dialogConfig.data = this.order;
    const dialogRef = this.dialog.open( EditorderpaymentmethodComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.order = result.data;
        this.tokenStorage.saveOrderForOrderDetails(this.order);
        this.sharedService.setOrderData(this.order);
      }
     });
  }


  editPickupInformation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = this.order;
    const dialogRef = this.dialog.open( EditorderpickupinfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if(result.data){
        this.order = result.data;
        this.tokenStorage.saveOrderForOrderDetails(this.order);
        this.sharedService.setOrderData(this.order);
      }
     });
}


editPickupInformationReserve() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = 'modal-medium-width';
  dialogConfig.data = this.order;
  const dialogRef = this.dialog.open( EditpickupinfoforreserveComponent, dialogConfig);
  dialogRef.afterClosed().subscribe((result) => {
    if(result.data){
      this.order = result.data;
      this.tokenStorage.saveOrderForOrderDetails(this.order);
      this.sharedService.setOrderData(this.order);
    }
   });
}


seeProofofDelivery(order: OrderResponse) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = 'modal-medium-width';
  dialogConfig.data = order;
  const dialogRef = this.dialog.open(ProofofdeliveryComponent, dialogConfig);
}

seeProofofPickup(order: OrderResponse) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = 'modal-medium-width';
  dialogConfig.data = order;
  const dialogRef = this.dialog.open(ProofofPickupComponent, dialogConfig);
}
openReturnOrder(order: any) {
  if (environment.env !== 'local') {
    this.subdomain = '';
  }
  const orderId = order.id;
  const url = `/${this.subdomain}/return-refund/${orderId}`;
  this.router.navigateByUrl(url, {state: {order: order, orderhistory: false}});
}

convertUtcToLocal(utcDate: any): string {
  utcDate = utcDate + '.00Z'
  const date = new Date(utcDate);
  return date.toLocaleString();
}

openReturnOrderDetails(order: any) {
  if (environment.env !== 'local') {
    this.subdomain = '';
  }
  this.tokenStorage.saveReturnOrder(order);
  const url = `/${this.subdomain}/return-refund-details`;
  this.router.navigateByUrl(url);
}

getOrderSales(order: OrderResponse): any[] {
  return order?.orderDetails?.filter((sale: any) => sale?.returnPolicyType === 'SALES_RETURN_ALLOWED');
}

getItemReturnBlocked(order: OrderResponse): any[] {
  return order?.orderDetails?.filter((item: OrderDetailResponse) => item?.noReturnAgain === true);
}


}
