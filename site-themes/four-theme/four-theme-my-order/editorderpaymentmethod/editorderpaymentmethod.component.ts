import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { environment } from 'src/environments/environment';

declare var Finix: any;

@Component({
  selector: 'app-editorderpaymentmethod',
  templateUrl: './editorderpaymentmethod.component.html',
  styleUrls: ['./editorderpaymentmethod.component.css']
})
export class EditorderpaymentmethodComponent implements OnInit {
  paymentMethod: string = '';
  order!: OrderResponse;
  mode: string = '';
  @ViewChild('finixFormContainer', { static: false }) finixFormContainer!: ElementRef;
  getOnBoardingForm: any;
  finixApplicationId: string = '';
  createdFinixIdentity: any;
  createdPaymentInstrument: any;
  createdAuthorization: any;
  captureAmount!: number;
  finixSessionKey: string = '';
  isFinixPay: boolean = false;
  businessID = Number(this.tokenStorage.getBusinessID());
  user = this.tokenStorage.getUser();
  businessPayments: string[] = [];
  isFazealPayEnabled = false;
  isPayPalEnabled = false;
  isCODEnabled: boolean = false;
  paypalUrl: string = '';
  paypalLoading: boolean = false;
  isPaymentLoading: boolean = false;
  firstTimeCalled: boolean = false;
  isLoading: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private translate: TranslateService,
  private tokenStorage: TokenStorageService,private businessSettingService: BusinessSettingService,
  private shoppingCart: ShoppingCartService, public dialogRef: MatDialogRef<EditorderpaymentmethodComponent>) { }

  async ngOnInit() {
    this.order = this.data;
    await this.getOnboardingFormLink();
    await this.getPaymentMethods();
    await this.createPaymentIntentForUpdatePayment();
  }

  getPaymentMethods() {
    this.businessSettingService.getBusinessPaymentMethodsForCustomerSide(this.businessID).subscribe(
      data => {
        console.log(data);
        this.businessPayments = data?.data?.getBusinessPaymentMethodsForCustomerSide;
        if (this.businessPayments?.length > 0 && this.businessPayments?.includes('FAZEAL_PAY')) {
          this.isFazealPayEnabled = true;
        }
        if (this.businessPayments?.length > 0 && this.businessPayments?.includes('PAYPAL')) {
          this.isPayPalEnabled = true;
        }
        if (this.businessPayments?.length > 0 && this.businessPayments?.includes('CASH_ON_DELIVERY')) {
          this.isCODEnabled = true;
        }
      }
    );
  }

  async getOnboardingFormLink(){
    this.isLoading = true;
    (await this.shoppingCart.getOnboardingFormLink()).subscribe(
      data => {
        if(data?.errors){
          this.isLoading = false;
          return;
        }
        if(data?.data?.getOnboardingFormLinkForCustomer){
          this.getOnBoardingForm = data?.data?.getOnboardingFormLinkForCustomer;
          if (this.getOnBoardingForm?.merchantId && this.getOnBoardingForm?.merchantId !== null && this.getOnBoardingForm?.status === 'APPROVED') {
            this.isFinixPay = true;
            this.finixApplicationId = this.getOnBoardingForm?.applicationId;
            this.initializeFinix();
            this.isLoading = false;
          }
        }
      }
    );
  }

  private initializeFinix() {
    if (typeof Finix === 'undefined') {
        console.error('Finix SDK not loaded');
        return;
    }

    if (!this.getOnBoardingForm?.merchantId) {
        console.error('Merchant ID not available');
        return;
    }

    if(environment.env === 'prod') {
        this.mode = 'live';
    } else {
        this.mode = 'sandbox';
    }

    const FinixAuth = Finix.Auth(this.mode, this.getOnBoardingForm.merchantId);
    console.log(this.getOnBoardingForm.merchantId, 'this.getOnBoardingForm.merchantId')
    console.log(Finix.Auth(this.mode, this.getOnBoardingForm.merchantId), 'Finix.Auth(this.mode, this.getOnBoardingForm.merchantId)')
    console.log(FinixAuth.getSessionKey(), 'FinixAuth.getSessionKey()')
    const form = Finix.CardTokenForm('finix-form', {
        showAddress: true,
        onSubmit: () => {
            this.isPaymentLoading = true;
            form.submit(this.mode, this.finixApplicationId, (err: any, res: any) => {
                if (err) {
                    console.error('Error:', err);
                    this.isPaymentLoading = false;
                    return;
                }
                const token = res?.data?.id;
                this.finixSessionKey = FinixAuth.getSessionKey();
                this.createFinixIdentity(token);
            });
        }
    });
}

    async createFinixIdentity(token: string){
      this.isPaymentLoading = true;
        (await this.shoppingCart.createFinixIdentity('', '', '', '', '', '', '', '', '')).subscribe(
          data => {
            if(data?.errors){
              this.isPaymentLoading = false;
              return;
            }
            if(data?.data?.createFinixIdentity){
              console.log(data, 'createFinixIdentity')
              this.createdFinixIdentity = data?.data?.createFinixIdentity;
              this.createFinixPaymentInstruments(token, this.createdFinixIdentity.id);
            }
          }
        );
       }

       async createFinixPaymentInstruments(token: string, identityId: string){
        this.isPaymentLoading = true;
        (await this.shoppingCart.createPaymentInstruments(token, "TOKEN", identityId)).subscribe(
          data => {
            if(data?.errors){
              this.isPaymentLoading = false;
              return;
            }
            if(data?.data?.createPaymentInstruments){
              console.log(data, 'createPaymentInstruments')
              this.createdPaymentInstrument = data?.data?.createPaymentInstruments;
              this.createAuthorization();
            }
          }
        );
       }

       async createAuthorization() {
        const amount = (this.order.total * 100).toFixed(0);
        this.captureAmount = Number(amount);
        this.isPaymentLoading = true;
        (await this.shoppingCart.createAuthorization(
            this.captureAmount,
            this.createdPaymentInstrument.currency,
            this.getOnBoardingForm?.merchantId,
            this.createdPaymentInstrument.id,
            this.finixSessionKey != undefined ?  this.finixSessionKey : ''
        )).subscribe(
          (data) => {
            if(data?.errors){
              const errorMessage = data?.errors[0]?.errorMessage;
              let failureMessage = 'The transaction was declined';
              let failureCode = 'GENERIC_DECLINE';
              if (errorMessage) {
                try {
                    const embeddedErrorMatch = errorMessage.match(/"failure_message"\s*:\s*"([^"]+)"/);
                    const codeMatch = errorMessage.match(/"failure_code"\s*:\s*"([^"]+)"/);
                    if (embeddedErrorMatch && embeddedErrorMatch[1]) {
                        failureMessage = embeddedErrorMatch[1];
                    }
                    if (codeMatch && codeMatch[1]) {
                        failureCode = codeMatch[1];
                    }
                } catch (e) {
                    console.error('Error parsing error message:', e);
                }
              }
              this.showErrorDialog(
                  this.translate.instant(failureCode),
                  failureMessage
              );
              this.isPaymentLoading = false;
              return;
            }
            if (data?.data?.createAuthorization?.id) {
                console.log(data, 'createAuthorization');
                this.createdAuthorization = data?.data?.createAuthorization;
                this.updatePaymentValidation("FINIX");
            }
          });
    }


    async updatePaymentValidation(paymentType: string){
      this.firstTimeCalled = true;
      (await this.shoppingCart.updatePaymentValidation(this.order.id, '', this.createdAuthorization != undefined ? this.createdAuthorization?.id : '', '', paymentType)).subscribe(
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
            this.isPaymentLoading = false;
            this.firstTimeCalled = false;
            return;
          }
          if(data?.data?.updatePaymentValidation){
            console.log(data, 'updatePaymentValidation')
            this.dialogRef.close({ event: 'close', data: data?.data?.updatePaymentValidation?.data });
            this.dialog.open(SucessmsgPopupComponent, {
              backdropClass: 'notificationmodal-popup-sucess',
              data: {
                  title: 'SUCCESS',
                  message: data?.data?.updatePaymentValidation?.message
              }
          });
          this.firstTimeCalled = false;
          }
        }
      );
    }


    async createPaymentIntentForUpdatePayment(){
      this.paypalLoading = true;
      (await this.shoppingCart.createPaymentIntentForUpdatePayment(this.order.id, 'PAYPAL', this.user?.firstName + ' ' + this.user?.lastName, this.user?.email,
        '', '', '', '', this.user?.country ? this.user?.country?.name : '',
        this.order.subtotal, this.order.tax, this.order.shippingCost)).subscribe(data => {
          if(data.errors){
            this.paypalLoading = false;
            return;
          }
          console.log(data)
          this.paypalLoading = false;
          this.paypalUrl = data?.data?.createPaymentIntentForUpdatePayment?.paypalRedirectUrl;
        })
    }

    async redirectToPaypal(){
      window.location.href = this.paypalUrl;
    }

    private showErrorDialog(title: string, message: string) {
        this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: {
                title: title,
                message: message
            }
        });
    }

}
