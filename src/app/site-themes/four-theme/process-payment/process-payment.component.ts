import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbRatingModule, NgbCarouselModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { PlaceOrderDto } from 'src/app/models/PlaceOrderDto';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { OrderIdFormatResponse } from 'src/app/models/OrderIdFormatResponse';
import { environment } from 'src/environments/environment';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { DataService } from 'src/app/service/data.service';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { MatDialog } from '@angular/material/dialog';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    TranslateModule
  ],
  selector: 'app-process-payment',
  templateUrl: './process-payment.component.html',
  styleUrls: ['./process-payment.component.css']
})
export class ProcessPaymentComponent implements OnInit {

  placeOrderDto!: PlaceOrderDto;
  sessionResponse!: SessionResponse;
  orderIdFormat!: OrderIdFormatResponse;
  order!: OrderResponse;
  subdomain: string = '';
  placeOrderRequest: any;
  orderResponse!: OrderResponse;
  paymentId: string = '';
  token: string = '';
  payerId: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,public dialog: MatDialog,
    private shoppingCartService: ShoppingCartService,private dataService: DataService,
    private cookieDate: CookieDataServiceService,private catalogService: CatalogServiceService) { }

  async ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.placeOrderDto = this.tokenStorage.getUserOrderInfo()!;
    this.placeOrderRequest = this.tokenStorage.getPlaceOrderRequest()!;
    this.route.queryParams.subscribe(async params => {
      const paymentId = params['paymentId'];
      const token = params['token'];
      const payerId = params['payerId'];

      if (paymentId && token && payerId) {
        this.paymentId = paymentId;
        this.token = token;
        this.payerId = payerId;
        this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.placeOrderDto.businessId!.toString()));
        await this.placeOrder();
      } else{
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: 'Payment have declined!' }
        });
        if (environment.env !== 'local') {
          this.subdomain = '';
        }
        this.router.navigate([this.subdomain ? `/${this.subdomain}/checkout` : '/checkout']);
      }
  })
     setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }


  placeOrder(){
   if (environment.env !== 'local') {
    this.subdomain = '';
   }
   this.shoppingCartService.completePaypalPayment(this.payerId, this.paymentId, this.token, this.placeOrderDto.businessId, this.placeOrderDto.orderId,
    this.sessionResponse.id).subscribe(
      async data => {
        if(data?.errors){
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: 'Payment didnt go through!' }
          });
          this.router.navigate([this.subdomain ? `/${this.subdomain}/checkout` : '/checkout']);
          return;
        }
        if(data?.data?.completePaypalPayment){
            this.shoppingCartService.placeOrder(Number(this.tokenStorage.getBusinessID()), this.placeOrderRequest.shoppingCartId, this.placeOrderRequest.paymentMethod,
            this.placeOrderRequest.addressId? this.placeOrderRequest.addressId : null, this.placeOrderRequest.orderType, this.placeOrderRequest.paymentToken, this.placeOrderRequest.orderId,
            this.placeOrderRequest.pickupPerson, this.placeOrderRequest.formattedDateTime!, this.placeOrderRequest.firstName, this.placeOrderRequest.lastName, this.placeOrderRequest.email, this.placeOrderRequest.phoneNumber,null,
            this.placeOrderRequest.cardNumber, this.placeOrderRequest.expMonth, this.placeOrderRequest.expYear, this.placeOrderRequest.cvc, this.placeOrderRequest.cardType ? this.placeOrderRequest.cardType : null, this.placeOrderRequest.selectedCardId ? this.placeOrderRequest.selectedCardId : null,
            this.placeOrderRequest.totalApplicableTaxes, this.placeOrderRequest.totalSurchargesTaxes, this.placeOrderRequest.selectedAddress? this.placeOrderRequest.selectedAddress:null,
            this.placeOrderRequest.userType, this.placeOrderRequest.userId, this.placeOrderRequest.billingAddress? this.placeOrderRequest.billingAddress:null, '', 0).subscribe(
              async data => {
                if(data?.errors){
                  this.router.navigate([this.subdomain ? `/${this.subdomain}/checkout` : '/checkout']);
                  return;
                }
                if(data?.data?.placeOrder != null){
                  this.orderResponse = data?.data?.placeOrder?.data;
                  this.catalogService.updateLastOrderId(Number(this.tokenStorage.getBusinessID())).subscribe(
                    data => {});
                  this.dialog.open(SucessmsgPopupComponent,
                    { backdropClass: 'notificationmodal-popup-sucess',
                      data: { title: 'SUCCESS', message: data?.data?.placeOrder?.message
                    }
                    });
                  this.router.navigateByUrl(this.subdomain + '/place-an-order',{state: {order: this.orderResponse, orderFormat: this.orderResponse.businessOrderId }});
                  this.dataService.notifyOther({refresh: true});
                } else {
                  this.dialog.open(NotifacationMessageComponent, {
                    backdropClass: 'notificationmodal-popup',
                    width: '450px',
                    data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
                  });
                  this.router.navigate([this.subdomain ? `/${this.subdomain}/checkout` : '/checkout']);
                  return;
                }
      }
    );
        }
      }
    );
  }
}
