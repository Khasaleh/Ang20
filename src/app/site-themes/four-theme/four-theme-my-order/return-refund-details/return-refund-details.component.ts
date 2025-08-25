import { TranslateModule } from '@ngx-translate/core';
import { ReturnReasonsBoxComponent } from './return-reasons-box/return-reasons-box.component';
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
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReturnReasonsBoxComponent,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-return-refund-details',
  templateUrl: './return-refund-details.component.html',
  styleUrls: ['./return-refund-details.component.css']
})
export class ReturnRefundDetailsComponent implements OnInit {
  subdomain: string = '';
  order!: OrderResponse;
  qrCodeImage: string = '';
  awsURL = environment.awsKey;
  businessDetail :any;
  currency = this.tokenService.getCurrency().symbol;
  returnOrderTracks: any[] = [];
  currentStatus: string = '';
  refundSubTotal: number = 0.0;
  shippingAndHandling: number = 0.0;
  totalEstimatedRefund: number = 0.0;
  taxRefund: number = 0.0;
  restockingFee: number = 0.0;

  constructor( private route: ActivatedRoute,
    private router: Router,private tokenService: TokenStorageService) { }


  ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.order = this.tokenService.getReturnOrder();
    if(!this.order){
      this.router.navigate([this.subdomain+'/home']);
    }
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnPolicyType?.toString() !== 'SALES_ARE_FINAL');
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnQuantity > 0);
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.quantity > 0);
    this.returnOrderTracks = this.order?.returnOrderTracks?.map((track: any) => track?.status);
    this.currentStatus = this.returnOrderTracks[this.returnOrderTracks?.length - 1];
    this.order?.orderDetails?.forEach(order => this.calculateSummary(order));
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }


  calculateSummary(prod: OrderDetailResponse){
      let totalQuantity = prod.acceptedQuantity + prod.quantityDifference;
      if(prod.returnOrderStatus !== 'ITEM_REJECTED'){
        let returnQuantity = prod.returnQuantity;
        if(prod.acceptedReturnQuantity !== null){
           returnQuantity = prod.acceptedReturnQuantity;
        }
        prod.shippingAndHandling = (prod.surcharge / totalQuantity) * returnQuantity;
        if(this.order.orderType !== 'ORDER_ONLINE_SHIP_TO_HOME'){
          prod.shippingAndHandling = 0.0;
        }
        prod.refundSubTotal = (prod.salePrice * returnQuantity);
        if (prod.returnFeeType === 'FIXED'){
          prod.restockingFee = prod.returnFee * returnQuantity;
        }
        if (prod.returnFeeType === 'PERCENTAGE'){
          prod.restockingFee = (prod.returnFee/100.00) * prod.refundSubTotal;
        }
        const promoRefund = (prod.promotionDiscount / totalQuantity) * returnQuantity;
        prod.refundSubTotal -= promoRefund;
        const salesTax = (prod.tax / totalQuantity) * returnQuantity;
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
        this.refundSubTotal += prod.refundSubTotal;
        this.shippingAndHandling += prod.shippingAndHandling;
        this.totalEstimatedRefund += prod.totalEstimatedRefund;
        this.taxRefund += prod.taxRefund;
        this.restockingFee += prod.restockingFee;
      }
  }

  openLinkInNewTab() {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    this.tokenService.saveReturnOrder(this.order);
    const url = `/${this.subdomain}/return-refund-slip`;
    const fullUrl = this.router.serializeUrl(this.router.createUrlTree([url]));
    window.open(fullUrl, '_blank');
  }

  openLabel() {
    const fullUrl = this.awsURL + this.order?.returnLabelUrl;
    window.open(fullUrl, '_blank');
  }


  getLabelUrl(): string {
    return this.awsURL + this.order?.returnLabelUrl; // Construct the URL
  }

  onOrderUpdated(orderData: OrderResponse){
    this.order = orderData;
    this.order.orderDetails = this.order?.orderDetails.filter(order => order?.returnPolicyType?.toString() !== 'SALES_ARE_FINAL');
    this.returnOrderTracks = this.order?.returnOrderTracks?.map((track: any) => track?.status);
    this.currentStatus = this.returnOrderTracks[this.returnOrderTracks?.length - 1];
    this.tokenService.saveReturnOrder(this.order);
  }


  viewAndDownloadFile(): void {
    const fileUrl = `${this.awsURL}${this.order?.returnLabelUrl}`; // Dynamic URL
    const fileName = 'return-label.png'; // Desired filename for download

    // Fetch the file
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('File fetch failed');
        }
        return response.blob();
      })
      .then(blob => {
        // Trigger file download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click(); // Trigger the download
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url); // Clean up

        // Open the file in a new tab
        window.open(fileUrl, '_blank');
      })
      .catch(error => console.error('Error handling file:', error));
  }



}
