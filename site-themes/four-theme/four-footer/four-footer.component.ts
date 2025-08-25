import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SubscribeMarketingComponent } from '../subscribe-marketing/subscribe-marketing.component';
import { UnsubscribeMarketingComponent } from '../unsubscribe-marketing/unsubscribe-marketing.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';


@Component({
  selector: 'app-four-footer',
  templateUrl: './four-footer.component.html',
  styleUrls: ['./four-footer.component.scss']
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
