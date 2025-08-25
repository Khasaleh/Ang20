import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
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
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { environment } from 'src/environments/environment';
import { CatalogServiceService } from 'src/app/service/CatalogService.service'; 
import { ReviewResponse } from 'src/app/models/ReviewResponse';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ViewQrCodeComponent } from './view-qr-code/view-qr-code.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { TrackpackageComponent } from './trackpackage/trackpackage.component';
import { ProofofdeliveryComponent } from './proofofdelivery/proofofdelivery.component';
import { ProofofPickupComponent } from './ProofofPickup/ProofofPickup.component';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-four-theme-my-order',
  templateUrl: './four-theme-my-order.component.html',
  styleUrls: ['./four-theme-my-order.component.scss']
})
export class FourThemeMyOrderComponent implements OnInit {
  selectedStatus: string = 'ALL';
  selectedCheckoutType: string = 'ALL';
  returnStatus: string = null!;
  loadingOrders = false;
  noOrdersAvailable = false;
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  subdomain: string = '';
  businessId = Number(this.tokenStorage.getBusinessID()!);
  orders: OrderResponse[] = [];
  closedOrders: OrderResponse[] = [];
  user = this.tokenStorage.getUser();
  orderPrefix = this.tokenStorage.getOrderFormat()?.prefix;
  orderSuffix = this.tokenStorage.getOrderFormat()?.suffix;
  pageNum = 1;
  pageSize = 5;
  awsUrl = environment.awsKey;
  reviews: ReviewResponse[] = [];
  currency = this.tokenStorage.getCurrency()?.symbol;
  startDate = "";
  currentYear = new Date().getFullYear();
  canLoadMoreData = true;
  noOfPages!: number;
  private orderDataSubscription!: Subscription;
  differenceInDays!: number;
  isDateExceeded: boolean = false;
  updatedDate!: Date;
  endDate = "";
  firstOrderDate: string = '';
  orderYear: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public tokenStorage: TokenStorageService,
    public shoppingCart: ShoppingCartService,private sharedService: SharedService,
    public catalogService: CatalogServiceService,private cdr: ChangeDetectorRef
    ) {}

  async ngOnInit(): Promise<void> {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    if(!this.user){
      if (environment.env !== 'local') {
        this.subdomain = '';
      }
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
    }
    await this.firstOrderDateTime();
    this.onDateRangeChange('last-30-days');
    await this.getOrdersByCustomerAndBusiness();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  getUpdatedUserData() {
    this.orderDataSubscription = this.sharedService.getOrderData().subscribe(data => {
      if (data?.id) {
        this.orders = this.orders.map(order =>
          order.id === data.id ? { ...order, ...data } : order
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.orderDataSubscription) {
      this.orderDataSubscription.unsubscribe();
    }
  }

  onDateRangeChange(value: string): void {
    const today = new Date();
    if (value === 'last-30-days') {
      const last30Days = new Date();
      last30Days.setDate(today.getDate() - 30);
      this.startDate = this.formatDate(last30Days);
      this.endDate = this.formatDate(today);
    } else if (value === 'last-3-months') {
      const last3Months = new Date();
      last3Months.setMonth(today.getMonth() - 3);
      this.startDate = this.formatDate(last3Months);
      this.endDate = this.formatDate(today);
    } else if (value.startsWith('year-')) {
      const selectedYear = parseInt(value.split('-')[1], 10);
      this.startDate = `${selectedYear}-01-01`;
      this.endDate = `${selectedYear}-12-31`;
    } else {
      this.startDate = '';
      this.endDate = '';
    }
  }

  getToday(): string {
    const today = new Date();
    return this.formatDate(today);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  filterOrdersByOrderType(orderType: any){
    this.selectedCheckoutType = orderType;
    this.orders = [];
    this.getOrdersByCustomerAndBusiness();
  }

  filterOrdersByOrderStatus(orderStatus: any){
    if(orderStatus === 'RETURNED' || orderStatus === 'REFUNDED'){
      this.selectedStatus = null!;
      this.returnStatus = orderStatus;
    } else {
      this.returnStatus = null!;
      this.selectedStatus = orderStatus;
    }
    this.orders = [];
    this.getOrdersByCustomerAndBusiness();
  }

  filterOrdersByOrderDate(orderDate: any){
    this.onDateRangeChange(orderDate);
    this.orders = [];
    this.getOrdersByCustomerAndBusiness();
  }

  async firstOrderDateTime(){
    if(this.user){
      (await this.shoppingCart.firstOrderDateTime()).subscribe(
        data => {
          if(data?.errors){
            return;
          }
          if(data?.data?.firstOrderDateTime){
            this.firstOrderDate = data?.data?.firstOrderDateTime;
            if(this.firstOrderDate && this.firstOrderDate !== null){
              const dateStr = this.firstOrderDate;
              const year = dateStr.split('-')[0];
              this.orderYear = year;
            }
          }
        }
      );
    }
  }

  async getOrdersByCustomerAndBusiness() {
    if(this.selectedCheckoutType === 'ALL'){
      this.selectedCheckoutType = null!;
    }
    if(this.selectedStatus === 'ALL'){
      this.selectedStatus = null!;
    }
    if (this.user) {
        this.loadingOrders = true;
        this.noOrdersAvailable = false;
        this.pageNum = 1;
        this.canLoadMoreData = true;
        (await this.shoppingCart.getOrdersByBusinessByFilters(this.businessId, 1, 5, this.selectedCheckoutType, this.selectedStatus, this.returnStatus, this.startDate, this.endDate)).subscribe(
            data => {
                if (data?.errors) {
                    this.loadingOrders = false;
                    return;
                }
                if (data?.data?.getOrdersByBusinessByFilters) {
                    this.orders = data?.data?.getOrdersByBusinessByFilters;
                    this.closedOrders = this.orders?.filter(order => order?.status === 'DELIVERED' || order?.status === 'PICKED');
                    this.loadingOrders = false;
                    this.noOrdersAvailable = this.orders?.length === 0;
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

  getTracks(order: OrderResponse): any[] {
    return order?.orderTracks?.map((track: any) => track?.status);
  }

  getOrderSales(order: OrderResponse): any[] {
    return order?.orderDetails?.filter((sale: any) => sale?.returnPolicyType === 'SALES_RETURN_ALLOWED');
  }

  getItemReturnBlocked(order: OrderResponse): any[] {
    return order?.orderDetails?.filter((item: OrderDetailResponse) => item?.noReturnAgain === true);
  }

  async listReviewsByCustomerIdAndBusiness(){
    if(this.user){
      (await this.catalogService.listReviewsByCustomerIdAndBusiness(this.user.id, this.businessId, this.pageNum, this.pageSize)).subscribe(
        data => {
          if(data?.errors){
            return;
          }
          if(data?.data?.listReviewsByCustomerIdAndBusinessAndUserType){
            this.reviews = data?.data?.listReviewsByCustomerIdAndBusinessAndUserType;
          }
        }
      );
    }
  }

  async actionOnPendingOrder(order: any, itemId: number, status: string){
    (await this.shoppingCart.actionOnPendingOrder(order.id, itemId, status)).subscribe(
      async data => {
        if(data?.data?.actionOnPendingOrder != null){
         this.getOrdersByCustomerAndBusiness();
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
         this.getOrdersByCustomerAndBusiness();
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

  editreviewmodal(product: ProductResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = {action: 'ADD', item: product};
    this.dialog.open(EditReviewModalComponent, dialogConfig);
  }

  openDialogConfirmOrder(order: OrderResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = { 'order': order}
    const dialogRef = this.dialog.open(ConfirmOrderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if(result == 'ACCEPTED'){
        order.status = 'ACCEPTED'
      }else if(result == 'CANCELLED'){
        order.status = 'CANCELLED';
      }
     });
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

  openOrderDetailsInNewTab(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    const url = `/${this.subdomain}/order-details/${orderId}`;
    this.tokenStorage.saveOrderForOrderDetails(order);
    this.router.navigateByUrl(url, {state: {order: order, orderhistory: false}});
  }

  openReturnOrder(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    const url = `/${this.subdomain}/return-refund/${orderId}`;
    this.router.navigateByUrl(url, {state: {order: order, orderhistory: false}});
  }

  openReturnOrderDetails(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    this.tokenStorage.saveReturnOrder(order);
    const url = `/${this.subdomain}/return-refund-details`;
    this.router.navigateByUrl(url);
  }

  viewQrCode(order: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = { qrCodeImage: order.qrCodeImage };
    this.dialog.open(ViewQrCodeComponent, dialogConfig);
  }

  async loadMoreOrders() {
    if (this.loadingOrders || this.pageNum === this.noOfPages) {
      return;
    }
    this.loadingOrders = true;
    (await this.shoppingCart.getOrdersByBusinessByFilters(this.businessId, this.pageNum + 1, this.pageSize, this.selectedCheckoutType, this.selectedStatus, this.returnStatus, this.startDate, this.endDate)).subscribe(
        (data: any) => {
          if (data && data?.data && data?.data?.getOrdersByBusinessByFilters) {
            const newAudits = data?.data?.getOrdersByBusinessByFilters;
            if (newAudits?.length > 0) {
              for (const audit of newAudits) {
                if (!this.orders?.some((existingAudit) => existingAudit.id === audit.id)) {
                  this.orders.push(audit);
                }
              }
              this.noOfPages = data?.data?.getOrdersByBusinessByFilters[0]?.noOfPages;
              this.pageNum++;
            } else {
              this.canLoadMoreData = false;
            }
            this.loadingOrders = false;
          } else {
            this.loadingOrders = false;
          }
        },
        (error: any) => {
          this.loadingOrders = false;
        }
      );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const distanceToBottom = pageHeight - scrollPosition;
    if (distanceToBottom < 100 && this.canLoadMoreData) {
      this.loadMoreOrders();
    }
  }

  openTrackPackage(order: OrderResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = order;
    const dialogRef = this.dialog.open(TrackpackageComponent, dialogConfig);
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

}
