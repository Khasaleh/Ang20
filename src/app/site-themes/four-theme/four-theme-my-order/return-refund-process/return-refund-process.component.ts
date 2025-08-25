import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReturnReasonsDetailsComponent } from '../return-reasons-details/return-reasons-details.component';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { Address } from 'src/app/models/address';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { StorehoursComponent } from '../../four-theme-checkout/storehours/storehours.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-return-refund-process',
  templateUrl: './return-refund-process.component.html',
  styleUrls: ['./return-refund-process.component.css']
})
export class ReturnRefundProcessComponent implements OnInit {

  selectedImages: { file: File; url: string }[] = [];
  selectedReason: string = '';
  returnQuantity: string = ''
  packagingCondition: string = '';
  DeliveryOptions: string = '';
  RefundOptions: string = '';
  subdomain: string = '';
  order!: OrderResponse;
  awsUrl = environment.awsKey;
  currency = this.tokenStorage.getCurrency()?.symbol;
  returnReason: string = '';
  businessAddresses: Address[] = [];
  businessHours: any[] = [];
  updatedDate!: Date;
  imagesObject: any[] = [];
  refundSubTotal: number = 0.0;
  shippingAndHandling: number = 0.0;
  totalEstimatedRefund: number = 0.0;
  taxRefund: number = 0.0;
  restockingFee: number = 0.0;
  disableButton: boolean = false;
  returnResolutionTypes: any[] = [];
  isReturning: boolean = false;
  loadingOrders = false;
  noOrdersAvailable = false;
  orderId!: number;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  user = this.tokenStorage.getUser();

  constructor(private router: Router, private route: ActivatedRoute,public dialog: MatDialog,private shoppingCart: ShoppingCartService,
     private tokenStorage: TokenStorageService, private businessSettings: BusinessSettingService,) { }


  async ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.orderId = this.route.snapshot.params['id'];
    await this.getByOrderId();
    if(!this.user){
      if(environment.env !== 'local'){
        this.subdomain = '';
      }
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      return;
    }
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
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
                  this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnPolicyType?.toString() !== 'SALES_ARE_FINAL');
                  this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.noReturnAgain === false);
                  this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.quantity > 0);
                  this.order.orderDetails = this.order?.orderDetails?.filter(order => {
                    if (order.returnQuantity > 0) {
                      order.quantity = order.quantity - order.returnQuantity;
                      return order.quantity > 0;
                    }
                    return true;
                  });
                  if (this.order.orderDetails.length == 0) {
                    this.popupError('There are no items for return!');
                    return;
                  }
                  if (this.order?.orderDetails) {
                    this.order?.orderDetails?.forEach(prod => {
                      prod.returnReasonType = '';
                      prod.returnPackagingType = '';
                      prod.returnReason = '';
                      prod.returnImages = [];
                      prod.refundSubTotal = 0.0;
                      prod.shippingAndHandling = 0.0;
                      prod.totalEstimatedRefund = 0.0;
                      prod.taxRefund = 0.0;
                      prod.restockingFee = 0.0;
                    });
                  }
                  this.getReturnResolutionTypes();
                  this.listBusinessAddresses();
                  this.getBusinessHoursOfOperation();
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

  getQuantityOptions(quantity: number): number[] {
    return Array.from({ length: quantity }, (_, i) => i + 1);
  }

  returnReasonsDetails(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = this.order;
    const dialogRef = this.dialog.open(ReturnReasonsDetailsComponent, dialogConfig);
  }


  onFileSelected(event: Event, prod: OrderDetailResponse): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            prod.returnSelectedImages = Array.from(files);
            prod.returnImages.push(e.target.result as string);
            this.selectedImages.push({
              file,
              url: e.target.result as string
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(prod: OrderDetailResponse, index: number): void {
    this.selectedImages?.splice(index, 1);
    prod?.returnImages?.splice(index, 1);
    prod?.returnSelectedImages?.splice(index, 1);
  }

  listBusinessAddresses(){
    this.businessSettings.getBusinessAddressesByBusinessId(Number(this.tokenStorage.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
      }
    });
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

   async getReturnResolutionTypes(){
    (await this.shoppingCart.getReturnResolutionTypes(this.order.id)).subscribe(
      data => {
        if(data?.data?.getReturnResolutionTypes != null){
          this.returnResolutionTypes = data?.data?.getReturnResolutionTypes;
        }
      }
    );
   }

   getOpenCloseMessage(): string {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();
    const todayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[todayIndex]);
    if (todayInfo?.isOpen === 'YES') {
      if (todayInfo?.allDay) {
        return `<p class='font-weight-500 text-black m-0'>Today <span class="text-success-lighter font-weight-600">Open</span> 24 hours</p>`;
      } else {
        const currentTime = new Date();
        const closingTime = this.getTimeFromHours(
          todayInfo?.endingHours,
          todayInfo?.endingMinute,
          todayInfo?.amORPmEndingHours
        );
        if (currentTime < closingTime) {
          return `<p class='font-weight-500 text-black m-0'>Today <span class="text-success-lighter font-weight-600">Open</span> until ${todayInfo?.endingHours}:${todayInfo?.endingMinute} ${todayInfo?.amORPmEndingHours}</p>`;
        } else {
          const nextOpenDayInfo = this.findNextOpenDayInfo(todayIndex + 1);
          if (nextOpenDayInfo.dayInfo) {
            return `<p class='font-weight-500 text-black m-0'>Today <span class="text-danger font-weight-600">Closed</span>, next <span class="text-success">Open</span> ${nextOpenDayInfo.daysUntilOpen} from ${this.formatHours(nextOpenDayInfo.dayInfo)}</p>`;
          } else {
            return `<p class='font-weight-500 text-black m-0'><span class="text-danger font-weight-600">Closed</span> for the week</p>`;
          }
        }
      }
    }
    for (let i = 1; i < daysOfWeek.length; i++) {
      const index = (todayIndex + i) % 7;
      const dayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[index]);
      if (dayInfo?.isOpen === 'YES') {
        const daysUntilOpen = i === 1 ? 'Tomorrow' : daysOfWeek[index];
        if (dayInfo?.allDay) {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">Open</span> 24 hours</p>`;
        } else {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">Open</span> from ${this.formatHours(dayInfo)}</p>`;
        }
      }
    }
    return `<p class='font-weight-500 text-black m-0'><span class="text-danger font-weight-600">Closed</span> for the week</p>`;
  }

  getTimeFromHours(hours: string, minutes: string, period: string): Date {
    const time = new Date();
    const hours24 = period === 'PM' && +hours !== 12 ? +hours + 12 : +hours;
    time.setHours(hours24);
    time.setMinutes(+minutes);
    time.setSeconds(0);
    return time;
  }

  findNextOpenDayInfo(startIndex: number): { daysUntilOpen: string, dayInfo: any } {
    for (let i = 0; i < 7; i++) {
      const nextIndex = (startIndex + i) % 7;
      const nextDayInfo = this.businessHours?.find(day => day.days === ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][nextIndex]);
      if (nextDayInfo && nextDayInfo.isOpen === 'YES') {
        const daysUntilOpen = i === 0 ? 'Tomorrow' : nextDayInfo.days;
        return { daysUntilOpen, dayInfo: nextDayInfo };
      }
    }
    return { daysUntilOpen: 'later this week', dayInfo: null };
  }

  formatHours(dayInfo: any): string {
    return `${dayInfo?.startingHours}:${dayInfo?.startingMinute} ${dayInfo?.amORPmStartingHours} - ${dayInfo?.endingHours}:${dayInfo?.endingMinute} ${dayInfo?.amORPmEndingHours}`;
  }

  calculateTimePeriodDifference(item: any, order: any): boolean {
    const deliverDateObj = new Date(order.deliverDate);
    deliverDateObj.setDate(deliverDateObj.getDate() + item.timePeriodReturn);
    const today = new Date();
    const differenceInTime = deliverDateObj.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    this.updatedDate = deliverDateObj;
    return differenceInDays < 0;
}

  toggleCheckbox(prod: OrderDetailResponse, event: any) {
    if (event.checked) {
      prod.isSelected = true;
      this.onActionChange(prod);
    } else {
      prod.isSelected = false;
      this.refundSubTotal -= prod.refundSubTotal;
      this.shippingAndHandling -= prod.shippingAndHandling;
      this.totalEstimatedRefund -= prod.totalEstimatedRefund;
      this.taxRefund -= prod.taxRefund;
      this.restockingFee -= prod.restockingFee;
      prod.refundSubTotal = 0.0;
      prod.shippingAndHandling = 0.0;
      prod.totalEstimatedRefund = 0.0;
      prod.taxRefund = 0.0;
      prod.restockingFee = 0.0;
      const index = this.imagesObject.findIndex(
        (item) => item.image === prod?.product?.mainImageUrl
      );
      if (index > -1) {
        this.imagesObject.splice(index, 1);
      }
    }
  }

  onActionChange(prod: OrderDetailResponse){
    const index = this.imagesObject.findIndex(
      (item) => item.image === prod?.product?.mainImageUrl
    );
    if (index > -1) {
      this.imagesObject[index].quantity = prod.returnQuantity;
    } else if (prod.returnQuantity) {
      this.imagesObject.push({ image: prod?.product?.mainImageUrl, quantity: prod.returnQuantity });
    }
    if(prod.isSelected){
      this.order?.orderDetails?.forEach(prod => {
        this.refundSubTotal -= prod.refundSubTotal;
        this.shippingAndHandling -= prod.shippingAndHandling;
        this.totalEstimatedRefund -= prod.totalEstimatedRefund;
        this.taxRefund -= prod.taxRefund;
        this.restockingFee -= prod.restockingFee;
      });
      let totalQuantity = prod.acceptedQuantity + prod.quantityDifference;
      prod.shippingAndHandling = (prod.surcharge / totalQuantity) * prod.returnQuantity;
      if(this.order.orderType !== 'ORDER_ONLINE_SHIP_TO_HOME'){
        prod.shippingAndHandling = 0.0;
      }
      prod.refundSubTotal = (prod.salePrice * prod.returnQuantity);
      if (prod.returnFeeType === 'FIXED'){
        prod.restockingFee = prod.returnFee * prod.returnQuantity;
      }
      if (prod.returnFeeType === 'PERCENTAGE'){
        prod.restockingFee = (prod.returnFee/100.00) * prod.refundSubTotal;
      }
      const promoRefund = (prod.promotionDiscount / totalQuantity) * prod.returnQuantity;
      prod.refundSubTotal -= promoRefund;
      const salesTax = (prod.tax / totalQuantity) * prod.returnQuantity;
      const shippingCost = this.order.shippingCost;
      const newShippingCost = this.order.shippingCost - prod.shippingAndHandling;
      let shippingTaxRefund = 0.0;
      if(shippingCost && shippingCost !== null){
        const shippingDifference = shippingCost- newShippingCost;
        if(shippingDifference > 0) {
          shippingTaxRefund = (this.order.shippingTax / shippingCost) * shippingDifference;
        }
      }
      prod.taxRefund = shippingTaxRefund + salesTax;

      if(this.order.orderPromotionDiscounts !== null && this.order.orderPromotionDiscounts > 0) {
          const orderTotalWithoutPromotionApplied = this.order.total + this.order.orderPromotionDiscounts;
          const totalOrderPromotionRefund = ((this.order.orderPromotionDiscounts * (prod.refundSubTotal + salesTax)) / orderTotalWithoutPromotionApplied);
          prod.refundSubTotal = prod.refundSubTotal - totalOrderPromotionRefund;
        }
      prod.totalEstimatedRefund = prod.shippingAndHandling + shippingTaxRefund + salesTax + prod.refundSubTotal - prod.restockingFee;
    }
    this.order?.orderDetails?.forEach(prod => {
      this.refundSubTotal += prod.refundSubTotal;
      this.shippingAndHandling += prod.shippingAndHandling;
      this.totalEstimatedRefund += prod.totalEstimatedRefund;
      this.taxRefund += prod.taxRefund;
      this.restockingFee += prod.restockingFee;
    });
  }

  async initiateReturn(orderId: number, resolutionType: string, deliveryType: string): Promise<void> {
  this.isReturning = true;

  const selectedProducts = this.order?.orderDetails?.filter((prod: any) => prod.isSelected);
  const invalidProduct = selectedProducts?.find((prod: any) => {
    return (
      prod.returnQuantity == null ||
      (prod.returnReasonType == null || !prod.returnReasonType) ||
      (prod.returnPackagingType == null || !prod.returnPackagingType) ||
      (!prod.returnReason || prod.returnReason == null) ||
      (!prod.returnSelectedImages || prod.returnSelectedImages.length === 0)
    );
  });

  if (invalidProduct) {
    this.popupError('All selected products must have valid quantity, reason, packaging, detailed information, and at least one image.');
    this.isReturning = false;
    return;
  }

  if (selectedProducts?.length === 0) {
    this.popupError('Please select at least one item for return');
    this.isReturning = false;
    return;
  }

  if (!resolutionType || resolutionType === '') {
    this.popupError('Please Select Preferred Resolution');
    this.isReturning = false;
    return;
  }

  if (!deliveryType || deliveryType === '') {
    this.popupError('Please Select Options for Delivery');
    this.isReturning = false;
    return;
  }

  const returnProducts = selectedProducts?.map((prod: any) => ({
    id: prod.id,
    quantity: prod.returnQuantity,
    reason: prod.returnReasonType,
    packaging: prod.returnPackagingType,
    detailedInfo: prod.returnReason,
    images: prod.returnSelectedImages,
  }));

  try {
    this.disableButton = true;
    const response = await (await this.shoppingCart.initiateReturnRequest(orderId, returnProducts, resolutionType, deliveryType)).toPromise();
    if (response?.errors) {
      this.disableButton = false;
      this.popupError(response?.errors[0]?.errorMessage);
      this.isReturning = false;
      return;
    }

    if (environment.env !== 'local') {
      this.subdomain = '';
    }

    this.tokenStorage.saveReturnOrder(response?.data?.initiateReturnRequest?.data);
    this.router.navigateByUrl(`/${this.subdomain}/return-refund-details`);
  } catch (error) {
    this.popupError('Something went wrong. Please try again later.');
  } finally {
    this.isReturning = false;
    this.disableButton = false;
  }
}


  private popupError(message: string) {
    this.dialog.open(NotifacationMessageComponent, {
      backdropClass: 'notificationmodal-popup',
      width: '450px',
      data: { title: 'ERROR', message: message }
    });
  }


   viewStoreHours(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.panelClass = 'modal-medium-width';
      dialogConfig.data = this.businessHours;
      this.dialog.open( StorehoursComponent, dialogConfig);
    }

    viewRequestStatus() {
        this.router.navigateByUrl(`/${this.subdomain}/return-refund-details`);
    }

}
