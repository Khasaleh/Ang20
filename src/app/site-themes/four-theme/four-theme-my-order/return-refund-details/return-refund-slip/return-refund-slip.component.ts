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
import { Address } from 'src/app/models/address';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-return-refund-slip',
  templateUrl: './return-refund-slip.component.html',
  styleUrls: ['./return-refund-slip.component.css']
})
export class ReturnRefundSlipComponent implements OnInit {

  order!: OrderResponse;
  businessAddresses: Address[] = [];
  qrCodeImage!: string;
  currency = this.tokenService.getCurrency()?.symbol;
  businessDetails: any;
  awsURL = environment.awsKey;
  constructor(private tokenService: TokenStorageService, private businessSettingService: BusinessSettingService) { }

  ngOnInit() {
    this.order = this.tokenService.getReturnOrder();
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnPolicyType?.toString() !== 'SALES_ARE_FINAL');
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.returnQuantity > 0);
    this.order.orderDetails = this.order?.orderDetails?.filter(order => order?.quantity > 0);
    this.qrCodeImage = this.generateQRCode(this.order.returnQrCode);
    this.getBusinessDetails();
    this.listBusinessAddresses();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  getBusinessDetails(){
    this.businessSettingService.getBusinessDetailsById(Number(this.tokenService.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessDetailsById){
        this.businessDetails = data?.data?.getBusinessDetailsById;
      }
    });
   }
  listBusinessAddresses(){
    this.businessSettingService.getBusinessAddressesByBusinessId(Number(this.tokenService.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
      }
    });
   }

   generateQRCode(qrCodebase64: any): string {
    return `data:image/png;base64,${qrCodebase64}`;
  }

  print_slip() {
    window.print();
  }

}
