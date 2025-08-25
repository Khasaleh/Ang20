import { Component, Input, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubscribeMarketingComponent } from '../subscribe-marketing/subscribe-marketing.component';
import { UnsubscribeMarketingComponent } from '../unsubscribe-marketing/unsubscribe-marketing.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-four-footer',
  templateUrl: './four-footer.component.html',
  styleUrls: ['./four-footer.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    CarouselModule,
    NgxSliderModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbDropdown,
    NgChartsModule,
    NgxBarcode6Module,
    TranslateModule,
  ],
})
export class FourFooterComponent implements OnInit {
  landUrl = environment.landingUrl;
  subdomain!: string;
  isLogo = false;
  logoImage : string = "../../../assets/img/logo.png";
  awsURL = environment.assetsAwsKey;
  @Input() data:any;
  businessId = Number(this.tokenStorage.getBusinessID())!;
  limit: number = 6;
  @Input() socialLinks: any;
  businessID = Number(this.tokenStorage.getBusinessID());
  businessPayments: string[] = [];
  isFazealPayEnabled: boolean = false;
  isPayPalEnabled: boolean = false;
  isCODEnabled: boolean = false;
  getOnBoardingForm: any;

  constructor(
    public dialog: MatDialog,
    private tokenStorage: TokenStorageService,
    private businessSetting : BusinessSettingService,
    private route: ActivatedRoute,private shoppingCart: ShoppingCartService,
    ) { }

  async ngOnInit(): Promise<void> {
    this.subdomain = this.route.snapshot.params['subdomain'];
    await this.loadPaymentMethods();
    await this.getOnboardingFormLink();
  }

  subscribeMarketing() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-xl-medium-width';
    this.dialog.open(SubscribeMarketingComponent, dialogConfig);
  }

  unsubscribeMarketing() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-xl-medium-width';
    this.dialog.open(UnsubscribeMarketingComponent, dialogConfig);
  }

  loadMoreCategories(): void {
    this.limit += 6; // Increase the limit by 6 or any number you prefer
  }


  loadPaymentMethods() {
    this.businessSetting.getBusinessPaymentMethodsForCustomerSide(this.businessID).subscribe(
      result => {
        console.log(result,"payment methods")
        this.businessPayments = result?.data?.getBusinessPaymentMethodsForCustomerSide;
        if(this.businessPayments?.includes('PAYPAL')){
          this.isPayPalEnabled = true;
        }
        if(this.businessPayments?.includes('CASH_ON_DELIVERY')){
          this.isCODEnabled = true;
        }
      }
    );

  }

  async getOnboardingFormLink(){
    (await this.shoppingCart.getOnboardingFormLink()).subscribe(
      data => {
        if(data?.errors){
          return;
        }
        if(data?.data?.getOnboardingFormLinkForCustomer){
          this.getOnBoardingForm = data?.data?.getOnboardingFormLinkForCustomer;
          if (this.getOnBoardingForm?.merchantId && this.getOnBoardingForm?.merchantId !== null && this.getOnBoardingForm?.status === 'APPROVED') {
            this.isFazealPayEnabled = true;
          }
        }
      }
    );
  }



}
