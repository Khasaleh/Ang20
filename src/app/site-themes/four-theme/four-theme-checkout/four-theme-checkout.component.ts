import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { CommonModule, DatePipe, DOCUMENT } from '@angular/common';
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
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule, ThemePalette } from '@angular/material/core';
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
import { formatDate } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardResponse } from 'src/app/models/CardResponse';
import { OrderIdFormatResponse } from 'src/app/models/OrderIdFormatResponse';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ShoppingCartResponse } from 'src/app/models/ShoppingCartResponse';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/service/Address.service';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { DataService } from 'src/app/service/data.service';
import { PromotionService } from 'src/app/service/promotion.service';
import { environment } from 'src/environments/environment';
import { StoreLocationModalComponent } from '../store-location-modal/store-location-modal.component';
import { DeleteGuestContactInfoComponent } from '../delete-guest-contact-info/delete-guest-contact-info.component';
import { ShippingResponse } from 'src/app/models/ShippingResponse';
import { EstimateShippingResponse } from 'src/app/models/EstimateShippingResponse';
import { StripeServiceService } from 'src/app/service/stripe-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { PlaceOrderDto } from 'src/app/models/PlaceOrderDto';
import { Subject, Subscription, firstValueFrom, take} from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/models/user';
import { ForgotpasswordcheckoutComponent } from 'src/app/forgotpasswordcheckout/forgotpasswordcheckout.component';
import { SignupModalCheckoutComponent } from '../signup-modal-checkout/signup-modal-checkout.component';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { AddShippingAddressComponent } from './add-shipping-address/add-shipping-address.component';
import { AddCardPopupComponent } from './add-card-popup/add-card-popup.component';
import { PickOrderPersonPopupComponent } from './pick-order-person-popup/pick-order-person-popup.component';
import { AddBillingAddressPopupComponent } from './AddBillingAddressPopup/AddBillingAddressPopup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { StorehoursComponent } from './storehours/storehours.component';
import { EditShippingAddressComponent } from './edit-shipping-address/edit-shipping-address.component';
import { EditbillingaddresspopupComponent } from './editbillingaddresspopup/editbillingaddresspopup.component';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { TranslateSiteService } from 'src/app/service/translate-site.service';




declare var Finix: any; // Declare Finix for TypeScript


export function creditCardType(cc: string) {
  let amex = new RegExp('^3[47][0-9]{13}$');
  let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
  let cup = new RegExp('^62[0-9]{14}$');
  let mastercard = new RegExp('^5[1-5][0-9]{14}$');
  let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
  let disco1 = new RegExp('^6011[0-9]{12}$');
  let disco2 = new RegExp('^64[4-9][0-9]{13}$');
  let disco3 = new RegExp('^65[0-9]{14}$');
  let diners = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$');
  let jcb = new RegExp('^35(?:2[89]|[3-8][0-9])[0-9]{12}$');
  let elo = new RegExp('^((636368)|(438935)|(504175)|(451416)|(509048)|(509067)|(509049)|(509069)|(509050)|(509074)|(509068)|(509040)|(509045)|(509060)|(509057)|(509042)|(509046)|(509066)|(509047)|(509062)|(509040)|(509043)|(509064)|(509040))\\d{10,12}$');

  if (visa.test(cc)) {
    return 'VISA';
  }
  if (amex.test(cc)) {
    return 'AMEX';
  }
  if (mastercard.test(cc) || mastercard2.test(cc)) {
    return 'MASTERCARD';
  }
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
    return 'DISCOVER';
  }
  if (diners.test(cc)) {
    return 'DINERS';
  }
  if (jcb.test(cc)) {
    return 'JCB';
  }
  if (cup.test(cc)) {
    return 'CHINA_UNION_PAY';
  }
  if (elo.test(cc)) {
    return 'ELO';
  }
  return undefined;
}

@Component({
  selector: 'app-four-theme-checkout',
  templateUrl: './four-theme-checkout.component.html',
  styleUrls: ['./four-theme-checkout.component.scss'],
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
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
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
    TranslateModule
  ],
})
export class FourThemeCheckoutComponent implements OnInit {

  @ViewChild('cardElement') cardElement!: ElementRef;
  stripe: any;
  card: any;
  cardErrors!: string;
  isFinixPay: boolean = false;

  private routerSubscription!: Subscription;
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
  });
  anotherform:boolean=false;
  paymentcard:boolean=false;
  paymenttypecard:boolean=false;
  paymenttypecardradiotwo:boolean=false;
  activeColumn: number = 2;
  activeMeAnother:string='me';
  activepayment:string='cashondelivery';
  cardpayment:string='visacard';
  shippingaddress:string='addnewaddress';
  activepaymentradiotwo:string='cashondeliveryradiotwo';
  cardpaymentradiotwo:string='visacardradiotwo';
  paymentcardradiotwo:boolean=false;
  paymenttypecardradiothree:boolean=false;
  hidenewpassword: boolean = true;
  paymentcardradiothree:boolean=false;
  cardpaymentradiothree:string='visacardradiothree';
  activepaymentradiothree:string='cashondeliveryradiothree';
  @ViewChild('menu') menu!: ElementRef;
  initializingPayment: boolean = false;

  shoppingCart!: ShoppingCartResponse;
  awsURL = environment.awsKey;
  subdomain!: string;
  showAddressInfo = false;
  showCreditInfo = false;
  orderType!: string;
  paymentMethod!: string;
  addressId!: number;
  message!: string;
  errorMessage!: string;
  businessAddresses: Address[] = [];
  showEmailform: boolean = true;
  paymentHandler: any = null;
  paymentToken!: string;
  cardForm!: FormGroup;
  orderIdFormat!: OrderIdFormatResponse;
  pickupPerson!: string;
  showPickupPerson = false;
  showPickupInfo = false;
  showPickupDate = false;
  pickupDetails!: FormGroup;
  isSubmitted = false;
  orderResponse!: OrderResponse;
  currencySymbol ='$';
  promocode! : string;
  promoCodeErrorMessage! : string;
  isFailed = false;
  isPromoExist: boolean = false;
  discountPrice! : number;
  promotionResponse! : any;
  totalPrice: number = 0;
  disabled = false;
  showSpinners = true;
  showSeconds = true;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  touchUi = true;
  enableMeridian = true;
  disableMinute = false;
  color:ThemePalette = 'accent';
  renderer: any;
  userCards: CardResponse[] = [];
  selectedCard!: CardResponse|null;
  cardType!: string;
  buttonDisabled = false;
  orderOnlinePickupFromStore = true;
  orderOnlineShipHome = true;
  reserveOnlineOrTryInStore = true;

  update_contact_info:boolean=false;
  list_contact_info:boolean=false;
  sameasshippingtwo:any="same as shipping";
  sameasshipping:any;
  searchText: string = '';
  phoneCode: number = 1;
  add_address_shipping:any=true;
  update_address_shipping:any=false;
  list_shipping_info:any=false;
  setaddress:any;
  selectedAddress!: any|null;
  businessID = Number(this.tokenStorage.getBusinessID());
  mapselect:boolean = false;
  shippingRates: ShippingResponse[] = [];
  shippingNotAvailable = false;
  selectedShippingRates!: ShippingResponse;
  totalShippingRate = 0;
  estimateShippingResponse: EstimateShippingResponse[] = [];
  address: string | undefined = '';
  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 5;
  markerLatitude: number = 0;
  markerLongitude: number = 0;
  mapClickListener: any;
  mappp: any;
  addressForm!: FormGroup;
  countrytext:boolean=true;
  selectedcode:boolean=false;
  addAddress: boolean = false;
  businessPayments: string[] = [];
  isStripeEnabled = false;
  isFazealPayEnabled = false;
  isPayPalEnabled = false;
  sessionResponse!: SessionResponse;
  isPaid = false;
  paypalUrl!: string;
  user = this.tokenStorage.getUser();
  BillingAddressBox: boolean = false;
  userTypeShow: boolean = true;
  fzealUserTxt: string = '';
  fzealPassTxt: string = '';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  showPassword: boolean = false;
  isSubmittedBillingDetails = false;
  businessAddressesOn = false;
  reloadSubscription!: Subscription;
  enabledMultipleCheckouts: boolean = false;
  personDetails: any;
  paymentDetails: any;
  billingAddresses: any[] = [];
  shippingAddresses: any[] = [];
  addressNotSelected: boolean = false;
  billingAddress: any;
  agreeTermsAndConditions: boolean = false;
  isCODEnabled: boolean = false;
  storeUserTxt: string = '';
  storePassTxt: string = '';
  businessHours: any[] = [];
  allAddresses: any[] = [];
  shippingId!: number;
  filterDates = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };
  allItemPromotionResponses: any[] = [];
  private destroy$ = new Subject<void>();
  loading: boolean = false;
  assetsAwsKey = environment.assetsAwsKey;
  placeOrderDone: boolean = false;
   logoImage: string = '';
  getOnBoardingForm: any;
  finixApplicationId: string = '';
  createdFinixIdentity: any;
  createdPaymentInstrument: any;
  createdAuthorization: any;
  captureAmount!: number;
  isFinixPayBox: boolean = false;
  isFinixFormActive: boolean = false
  finixSessionKey: string = '';
  checkoutAddressError: string = '';
  isCheckoutApiStarted: boolean = false;
  promotionExpanded: boolean = false;
   mode: string = '';
  @ViewChild('finixFormContainer', { static: false }) finixFormContainer!: ElementRef;
  isTimeCorrect: boolean = false;
  checkoutCartInProgress = false;
  isOrderIdNull: boolean = true;
  isSummarySpinner: boolean = false;
  checkOutEmail: string = '';
  checkOutUserTypeByEmail: string = '';
  isEmailInvalid: boolean = false;
  firstTimeCalled: boolean= false;
  isContinueGuest: boolean = false;
  checkOutTypePassword: string = '';
  @ViewChild('guestForm') guestForm!: NgForm;
  isShippingEnabled: boolean = false;
  matchedAddress = { addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  zipCode: '',
  phoneNumber: '',
  email: '',
  firstName: '',
  lastName: ''};
  validateAddressMessages: any[] = [];
  validateAddressFailed: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderernew: Renderer2,
    private tokenStorage: TokenStorageService,
    private shoppingCartService: ShoppingCartService,
    private catalogService: CatalogServiceService,
    private route: ActivatedRoute,
    private promotionService : PromotionService,
    private router: Router,
    private addressService: AddressService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private dataService: DataService,
    private businessSettings: BusinessSettingService,
    public dialog: MatDialog,
    private stripeService: StripeServiceService,
    private cookieService: CookieDataServiceService,
    private authService: AuthService,
    public translateSite: TranslateSiteService,
    private businessSettingService: BusinessSettingService,private sharedService: SharedService,
    )
    {
      let subdomainForSite;
          if(environment.env !== 'local'){
            subdomainForSite = window.location.hostname;
          } else {
            subdomainForSite = this.route.snapshot.params['subdomain'];
          }
          if (subdomainForSite) {
            this.translateSite.setSiteLanguage(subdomainForSite);
          }

      if(this.businessID &&  cookieService.getCookie(this.businessID!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessID!.toString()));
      }

      if(!this.sessionResponse || this.sessionResponse?.userType !== 'GUEST'){
        if(!this.user || this.user === null){
          this.sessionResponse = new SessionResponse();
          this.sessionResponse.id = 1;
          this.sessionResponse.userType = 'GENERIC';
          this.cookieService.setCookie(this.businessID!.toString(), JSON.stringify(this.sessionResponse), 1);
          this.userTypeShow = true;
        }
      }
      if (this.sessionResponse?.userType === 'GUEST') {
        const guestAddress = this.getGuestAddress();
        if (guestAddress) {
          this.shippingAddresses = [guestAddress];
        }
      }
    }

   async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];

      // Add the class immediately (not inside setTimeout)
  this.renderernew.addClass(this.document.body, 'checkout-optimized');

  // Listen for route changes and remove the class
  this.routerSubscription = this.router.events.subscribe((event) => {
    if (event instanceof NavigationStart) {
      this.renderernew.removeClass(this.document.body, 'checkout-optimized');
    }
  });


     this.cardForm = this.fb.group({
       nameOnCard: ['', [Validators.required]],
       cardNumber: ['', [Validators.required]],
       expMonth: ['', [Validators.required]],
       expYear: ['', [Validators.required]],
       cvc: [''],
     });
     this.pickupDetails = this.fb.group({
       pickupDate: ['', [Validators.required]],
       pickupTime: ['', [Validators.required]],
     });
     if (environment.env !== 'local') {
       this.subdomain = window.location.hostname;
     } else {
       this.subdomain = this.route.snapshot.params['subdomain'];
     }
     this.currencySymbol = this.tokenStorage.getCurrency()?.symbol;
     this.orderType = 'ORDER_ONLINE_PICK_IN_STORE';
     this.paymentMethod = 'COD';
     this.pickupPerson = 'FAZEAL_CUSTOMER';
     this.isCheckoutApiStarted = true;
     this.reloadSubscription = this.sharedService
       .getReloadObservable()
       .subscribe(() => {
         this.loadUserType();
       });
     await this.loadUserType();
     await this.getStoreLogo();
     this.getCheckOutTypeById();
     this.isShipEngineEnabled();
     await this.getOnboardingFormLink();
     if (this.user && this.user?.userType === 'FAZEAL_REGISTERED') {
       this.loadAddresses(true);
     }
     if (this.user && this.user?.userType === 'STORE_REGISTERED') {
       this.loadAddresses(false);
     }
     this.personDetails = {
       firstName: this.user?.firstName,
       lastName: this.user?.lastName,
       email: this.user?.email,
       phoneNumber: this.user?.phone,
     };
     if (
       this.personDetails.phoneNumber === undefined ||
       this.personDetails.phoneNumber === 'null'
     ) {
       this.personDetails.phoneNumber = '';
     }
     if (this.sessionResponse?.userType !== 'GENERIC') {
       this.listUserCartItems();
     }
     this.getBusinessHoursOfOperation();
     this.getOrderIdFormatByBusinessId();
     this.listBusinessAddresses();
     this.initForm();
     this.getEnablePickInStoreAddressStatus();
     if (this.sessionResponse?.userType !== 'GENERIC') {
       this.refreshAddToCart();
     }
     setTimeout(() => {
       window.scrollTo({ top: 0, behavior: 'smooth' });
     }, 50);

   }

   private getGuestAddress(): any {
     const storageItem = localStorage.getItem('guest-address');
     if (!storageItem) return null;
     const storageData = JSON.parse(storageItem);
     const now = new Date().getTime();
     if (now > storageData.expirationTime) {
       localStorage.removeItem('guest-address');
       return null;
     }
     return storageData.data;
   }

   async getCheckoutUserTypeByEmail(){
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.checkOutEmail.trim() || !emailPattern.test(this.checkOutEmail.trim())) {
      this.isEmailInvalid = true;
      console.log(this.isEmailInvalid, 'this.isEmailInvalid')
      return;
    }
    console.log(this.isEmailInvalid, 'this.isEmailInvalid')
    this.isEmailInvalid = false;
    this.firstTimeCalled = true;
    (await this.shoppingCartService.getCheckoutUserTypeByEmail(this.checkOutEmail.trim())).subscribe(
      data => {
        console.log(data?.data?.getCheckoutUserTypeByEmail, 'data?.data?.getCheckoutUserTypeByEmail')
        if(data?.errors){
          this.firstTimeCalled = false;
          return;
        }
        if(data?.data?.getCheckoutUserTypeByEmail){
          this.firstTimeCalled = false;
          this.checkOutUserTypeByEmail = data?.data?.getCheckoutUserTypeByEmail;
          this.showEmailform = false;
        }
      }
    );
  }


    InitializingTokenNew() {
    setTimeout(() => {
      if (typeof Finix === 'undefined') {
          console.error('Finix SDK not loaded. Ensure it is included in index.html');
          this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: this.translate.instant('Finix SDK not loaded. Ensure it is included in index.html') }
        });
        return;
      }
    this.mode = environment.env === 'prod' ? 'live' : 'sandbox';
    try {
      const formElement = document.getElementById('finix-form');
      if (!formElement) {
        console.error('Finix form container not found');
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: this.translate.instant('Finix form container not found') }
        });
        return;
      }

      const FinixAuth = Finix.Auth(this.mode, this.getOnBoardingForm?.merchantId);
      const form = Finix.CardTokenForm('finix-form', {
        showAddress: true,
        onSubmit: () => {
          this.initializingPayment = true;
          form.submit(this.mode, this.finixApplicationId, (err: any, res: any) => {
            this.initializingPayment = false;
            if (err) {
              console.error('Error:', err);
              this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: err }
            });
            return;
            }
            const token = res?.data?.id;
            const sessionKey = FinixAuth.getSessionKey();
            this.finixSessionKey = sessionKey;
            this.createFinixIdentity(token);
          });
        }
      });
    } catch (error) {
      console.error('Finix initialization error:', error);
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'Finix initialization error:', message: error }
      });
      this.initializingPayment = false;
    }
  }, 100);
}


   ngOnDestroy(): void {
    this.reloadSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();

    // Prevent memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    // Also remove class if component is destroyed directly
    this.renderernew.removeClass(this.document.body, 'checkout-optimized');
  }


   getStoreLogo() {
    this.businessSettings.getStoreLogoBySiteUrl(this.subdomain).subscribe(
      data => {
        if (data.data?.getStoreLogoBySiteUrl == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.logoImage = data.data?.getStoreLogoBySiteUrl
      }
    );
  }

   async loadUserType(){
    this.sessionResponse = JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!));
    if(this.sessionResponse.userType == 'GENERIC'){
      this.userTypeShow = true;
      return;
    }
    if(this.sessionResponse.userType == 'GUEST'){
      const guest = sessionStorage.getItem('guestInfo');
      if(guest){
        let guestInfo = JSON.parse(guest);
        this.user = new User();
        this.user.firstName= guestInfo.firstName;
        this.user.lastName= guestInfo.lastName;
        this.user.email= guestInfo.email;
        this.user.phone= guestInfo.phone;
        this.userTypeShow = false;
        return;
      } else {
        this.userTypeShow = true;
        return;
      }
    }
    if(this.sessionResponse.userType == 'STORE_REGISTERED' || this.sessionResponse.userType == 'FAZEAL_REGISTERED'){
      this.userTypeShow = false;
      return;
    } else {
      this.userTypeShow = true;
      return;
    }
   }

   loadStripeDta() {
    this.businessSettings.getBusinessPaymentMethodsForCustomerSide(this.businessID).subscribe(
      data => {
        console.log(data);
        this.businessPayments = data?.data?.getBusinessPaymentMethodsForCustomerSide;

        // Set payment method availability flags
        if (this.businessPayments.length > 0 && this.businessPayments.includes('FAZEAL_PAY')) {
          this.isFazealPayEnabled = true;
        }
        if (this.businessPayments.length > 0 && this.businessPayments.includes('PAYPAL')) {
          this.isPayPalEnabled = true;
        }
        if (this.businessPayments.length > 0 && this.businessPayments.includes('CASH_ON_DELIVERY')) {
          this.isCODEnabled = true;
        }

        if (this.businessPayments.length === 3) {
          this.activepayment = 'CASH_ON_DELIVERY';
          this.paymentMethod = 'COD';
        }
        else if (this.businessPayments.length === 2) {
          if (this.businessPayments.includes('FAZEAL_PAY') && this.businessPayments.includes('PAYPAL')) {
            this.activepayment = 'FAZEAL_PAY';
            this.paymentMethod = 'CREDIT_CARD';
          }
          else if (this.businessPayments.includes('CASH_ON_DELIVERY') && this.businessPayments.includes('PAYPAL')) {
            this.activepayment = 'CASH_ON_DELIVERY';
            this.paymentMethod = 'COD';
          }
          else if (this.businessPayments.includes('CASH_ON_DELIVERY') && this.businessPayments.includes('FAZEAL_PAY')) {
            this.activepayment = 'CASH_ON_DELIVERY';
            this.paymentMethod = 'COD';
          }
        }
        else if (this.businessPayments.length === 1) {
          if (this.businessPayments.includes('PAYPAL')) {
            this.activepayment = 'PAYPAL';
            this.paymentMethod = 'PAYPAL';
          }
          else if (this.businessPayments.includes('FAZEAL_PAY')) {
            this.activepayment = 'FAZEAL_PAY';
            this.paymentMethod = 'CREDIT_CARD';
          }
          else if (this.businessPayments.includes('CASH_ON_DELIVERY')) {
            this.activepayment = 'CASH_ON_DELIVERY';
            this.paymentMethod = 'COD';
          }
        }
        if (!this.activepayment && this.businessPayments.length > 0) {
          this.activepayment = this.businessPayments[0];
          if(this.activepayment == 'FAZEAL_PAY'){
            this.paymentMethod = 'CREDIT_CARD';
          }
          else if(this.activepayment == 'PAYPAL'){
            this.paymentMethod = 'PAYPAL';
          }
          else if(this.activepayment == 'CASH_ON_DELIVERY'){
            this.paymentMethod = 'COD';
          }
        }
      }
    );
  }


   setupStripe() {
    const elements = this.stripe.elements();
    this.card = elements?.create('card');
    this.card.mount(this.cardElement?.nativeElement);
    this.card.on('change', (event: any) => {
      this.cardErrors = event.error ? event.error.message : '';
    });
  }

   async listUserCartItems(){
    (await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID()))).subscribe(
      async data => {
        if(data?.data?.listUserCartItems){
          this.shoppingCart = data?.data?.listUserCartItems;
          this.loadStripeDta();
          if(this.shippingId && this.shippingId !== null){
            this.getCheckoutCart(this.orderType, this.selectedAddress?.state, this.selectedAddress?.city, this.selectedAddress?.zipCode, this.shippingId,
              this.selectedAddress?.streetNumber + ' ' + this.selectedAddress?.addressLine1+ ', ' +
              this.selectedAddress?.state + ', '+ this.selectedAddress?.city + ' ' + this.selectedAddress?.zipCode + ', '+ this.selectedAddress?.country,
              this.selectedAddress?.longitude !== undefined ? this.selectedAddress.longitude : null,
              this.selectedAddress?.latitude !== undefined ? this.selectedAddress.latitude : null, []);
          } else {
            await this.getCheckoutCart(this.orderType, '','','',null!,'',null!,null!, []);
          }
        }
      }
    );
   }

 async getCheckoutCart(
  orderType: string,
  state: string,
  city: string,
  zipcode: string,
  shippingId: number,
  address: string,
  longitude: number,
  latitude: number,
  promoCodes: string[]
): Promise<void> {
  return new Promise(async (resolve) => {
  this.checkoutAddressError = '';
  if (this.checkoutCartInProgress) {
    resolve();
    return;
  }
  if (this.promocode && this.shoppingCart?.manualPromoCodes?.length > 0 && this.shoppingCart?.rejectedPromoCodes?.length == 0) {
    this.dialog.open(NotifacationMessageComponent, {
      backdropClass: 'notificationmodal-popup',
      width: '450px',
      data: { title: 'ERROR', message: this.translate.instant('Promocode has already been applied') }
    });
    this.isSummarySpinner = false;
    resolve();
    return;
  }
  this.checkoutCartInProgress = true;
  this.isSummarySpinner = true;
  try {
    (await this.shoppingCartService.getCheckoutCart(
      orderType, state, city, zipcode, shippingId, address, longitude, latitude, promoCodes
    )).subscribe({
      next: (data) => {
        this.checkoutCartInProgress = false;
        resolve();
        if (data?.errors) {
          if (data?.errors[0].errorCode === 'STATE_NOT_FOUND') {
            this.checkoutAddressError = data?.errors[0]?.errorMessage;
            this.isOrderIdNull = true;
          }
          if (data?.errors && data?.errors[0].errorCode !== 'STATE_NOT_FOUND') {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
            });
            this.isSummarySpinner = false;
            this.isOrderIdNull = true;
            return;
          }
        }
        if (data?.data?.getCheckoutCart) {
          this.shoppingCart = data?.data?.getCheckoutCart;
          this.isOrderIdNull = this.shoppingCart.orderId == null;
          if (this.shoppingCart?.rejectedPromoCodes?.length > 0 &&
              this.shoppingCart?.rejectedPromoCodes?.includes(this.promocode)) {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: this.translate.instant('PROMO_CODE_DIDNT_APPLIED_SUCCESS') }
            });
            this.isSummarySpinner = false;
            return;
          }
          if (this.promocode && !this.shoppingCart?.rejectedPromoCodes?.includes(this.promocode)) {
            this.dialog.open(SucessmsgPopupComponent, {
              backdropClass: 'notificationmodal-popup-sucess',
              data: {
                title: 'SUCCESS',
                message: this.translate.instant('PROMO_CODE_APPLIED_SUCCESS')
              }
            });
            this.loading = true;
            this.promotionExpanded = true;
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }

          this.allItemPromotionResponses = [];
          this.shoppingCart?.cartItemResponseList?.forEach(item => {
            item?.cartItemPromotionResponses?.forEach(prom => {
              this.allItemPromotionResponses.push(prom);
            });
          });
          this.promocode = '';
        }
        this.isSummarySpinner = false;
      },
      error: (err) => {
        this.checkoutCartInProgress = false;
        console.error('API Error:', err);
        this.isSummarySpinner = false;
        this.isOrderIdNull = true;
        resolve();
      }
    });
  } catch (error) {
    this.checkoutCartInProgress = false;
    console.error('Error in getCheckoutCart:', error);
    this.isSummarySpinner = false;
    resolve();
  }
})
}




   listBusinessAddresses(){
    this.businessSettings.getBusinessAddressesByBusinessId(Number(this.tokenStorage.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
        // if(this.businessAddresses?.length > 0){
        //   this.setActiveAddress(this.businessAddresses[0], 0);
        // }
      }
    });
   }

   getOrderIdFormatByBusinessId(){
    this.catalogService.getOrderIdFormatByBusinessId(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data?.data?.getOrderIdFormatByBusinessId != null){
          this.orderIdFormat = data?.data?.getOrderIdFormatByBusinessId;
        }
      }
    );
   }

   async isShipEngineEnabled(){
    (await this.shoppingCartService.isShipEngineEnabled()).subscribe(
      data => {
        console.log(data?.data?.isShipEngineEnabled, 'data?.data?.isShipEngineEnabled')
        if(data?.data?.isShipEngineEnabled != null){
          this.isShippingEnabled = data?.data?.isShipEngineEnabled;
        }
      }
    );
   }

   async validateShipEngineAddress(shippingAddress: any): Promise<boolean> {
    this.validateAddressMessages = [];
    this.validateAddressFailed = false;

    try {
      const result = await (await this.shoppingCartService.validateShipEngineAddressForCst(
        shippingAddress.firstName.trim() + ' ' + shippingAddress.lastName.trim(),
        shippingAddress.phoneNumber,
        shippingAddress.addressLine1,
        shippingAddress.addressLine2,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.zipCode,
        shippingAddress.country
      )).toPromise();

      console.log(result?.data?.validateShipEngineAddressForCst, 'data?.data?.validateShipEngineAddress');

      if (result?.errors) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: result?.errors[0]?.errorMessage }
        });
        this.validateAddressFailed = true;
        return false;
      }

      if (result?.data?.validateShipEngineAddressForCst[0].messages?.length > 0) {
        this.validateAddressMessages = result?.data?.validateShipEngineAddressForCst[0].messages;
      }

      const matchedAddress = result?.data?.validateShipEngineAddressForCst[0].matched_address;
      this.matchedAddress.addressLine1 = matchedAddress.address_line1;
      this.matchedAddress.addressLine2 = matchedAddress.address_line2;
      this.matchedAddress.city = matchedAddress.city_locality;
      this.matchedAddress.state = matchedAddress.state_province;
      this.matchedAddress.country = matchedAddress.country_code;
      this.matchedAddress.zipCode = matchedAddress.postal_code;
      this.matchedAddress.phoneNumber = matchedAddress.phone;
      this.matchedAddress.email = shippingAddress.email;
      this.matchedAddress.firstName = shippingAddress.firstName;
      this.matchedAddress.lastName = shippingAddress.lastName;

      this.dialog.open(SucessmsgPopupComponent, {
        backdropClass: 'notificationmodal-popup-sucess',
        data: { title: '', message: 'Address Validated Success' }
      });

      this.validateAddressFailed = false;
      return true;
    } catch (error) {
      console.error('Error validating address:', error);
      this.validateAddressFailed = true;
      return false;
    }
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

   getCheckOutTypeById() {
    this.businessSettings.getCheckOutTypeById(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data?.errors){
          return;
        }
        if (data?.data?.getCheckOutTypeById) {
          this.orderOnlinePickupFromStore = data?.data?.getCheckOutTypeById.orderOnlinePickupFromStore;
          this.orderOnlineShipHome = data?.data?.getCheckOutTypeById?.orderOnlineShipHome;
          this.reserveOnlineOrTryInStore = data?.data?.getCheckOutTypeById?.reserveOnlineOrTryInStore;

          // Check the number of available methods
          const availableMethods = [
            this.orderOnlinePickupFromStore,
            this.orderOnlineShipHome,
            this.reserveOnlineOrTryInStore
          ].filter(method => method).length;

          // Set orderType and active column based on availability
          if (availableMethods === 1) {
            if (this.orderOnlinePickupFromStore) {
              this.orderType = 'ORDER_ONLINE_PICK_IN_STORE';
          //    this.getCheckoutCart(this.orderType, '','','',null!,'',null!,null!, []);
              this.setActiveColumn(1);
            } else if (this.orderOnlineShipHome) {
              this.orderType = 'ORDER_ONLINE_SHIP_TO_HOME';
              this.setActiveColumn(2);
            } else if (this.reserveOnlineOrTryInStore) {
              this.orderType = 'RESERVE_ONLINE_TRY_IN_STORE';
          //      this.getCheckoutCart(this.orderType, '','','',null!,'',null!,null!, []);
              this.setActiveColumn(3);
            }
          } else if (availableMethods === 3) {
            // If all 3 methods are available, set active column to 3
            this.orderType = 'ORDER_ONLINE_SHIP_TO_HOME';
        //      this.getCheckoutCart(this.orderType, '','','',null!,'',null!,null!, []);
            this.setActiveColumn(2);
          } else {
            // If multiple but not all, apply the first true condition
            if (this.orderOnlinePickupFromStore && this.orderOnlineShipHome) {
              this.orderType = 'ORDER_ONLINE_SHIP_TO_HOME';
              this.setActiveColumn(2);
            }

            else if (this.orderOnlineShipHome && this.reserveOnlineOrTryInStore) {
              this.orderType = 'ORDER_ONLINE_SHIP_TO_HOME';
              this.setActiveColumn(2);
            }

             else if (this.orderOnlinePickupFromStore && this.reserveOnlineOrTryInStore) {
              this.orderType = 'ORDER_ONLINE_PICK_IN_STORE';
              this.setActiveColumn(1);
            }
          }
          this.isCheckoutApiStarted = false;
        }
      });
  }



  setActiveColumn(columnNumber: number) {
    this.activeColumn = columnNumber;
  }

  anotherstep(step:any,columnText: string, pickupPerson: string){
    this.anotherform = step;
    this.activeMeAnother = columnText;
    this.pickupPerson = pickupPerson;
  }

  paymentmethodcard(payment:any,columnText: string){
    this.paymentcard = payment;
    this.activepayment = columnText;
    if(columnText == 'CASH_ON_DELIVERY') {
      this.isFinixPayBox = false;
      this.BillingAddressBox = false;
      this.isFinixFormActive = false;
    }
    if(columnText == 'PAYPAL') {
      this.isFinixPayBox = false;
      this.BillingAddressBox = true;
      this.isFinixFormActive = false;
    }
    if(columnText == 'FAZEAL_PAY'){
      this.isFinixPay = true;
      this.isFinixPayBox = true;
      this.isFinixFormActive = true;
      this.InitializingTokenNew();
    }
  }

  paymentmethodcardRadioTwo(payment:any,columnText: string){
    this.paymentcardradiotwo = payment;
    this.activepaymentradiotwo = columnText;
  }

  paymentmethodcardRadioThree(payment:any,columnText: string){
    this.paymentcardradiothree = payment;
    this.activepaymentradiothree = columnText;
  }

  paymenttype(paymentcard:any,columnText: string, card: CardResponse|null){
    this.paymenttypecard = paymentcard;
    this.cardpayment = columnText;
    if(this.cardpayment == 'visacard'){
      this.selectedCard = card;
    }
  }


  shippingaddresstoggle(paymentcard:any,columnText: string){
    this.shippingaddress = columnText
  }

  onMenuOpened() {
    const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    if (menuPanel) {
      menuPanel.classList.add('countrycode-panel');
    }
  }
  onMenuClosed() {
    const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    if (menuPanel) {
      menuPanel.classList.remove('custom-menu-panel');
    }
  }

  get getControl(): { [key: string]: AbstractControl; } {
    return this.pickupDetails.controls;
  }

  get getCardControl(): { [key: string]: AbstractControl; } {
    return this.cardForm.controls;
  }

 async toggleAddressInfo(show: any, orderType: string) {
  this.loading = true;
  this.isCheckoutApiStarted = true;
  this.promocode = '';

  if (orderType === 'ORDER_ONLINE_PICK_IN_STORE') {
    this.showAddressInfo = false;
    this.showPickupInfo = true;
    this.showPickupDate = true;
    this.paymentMethod = 'COD';
    this.activepayment = this.businessPayments[0];
    this.paymentcard = false;
    this.pickupDetails.get('pickupDate')?.setValue(null);
    this.pickupDetails.get('pickupTime')?.setValue(null);
    await this.getCheckoutCart(orderType, '', '', '', null!, '', null!, null!, []);
    }
    else if(orderType == 'ORDER_ONLINE_SHIP_TO_HOME'){
      this.showAddressInfo = true;
      this.showPickupInfo = false;
      this.showPickupDate = false;
      // this.selectedAddress = null;
      this.paymentMethod = 'COD';
      this.activepayment = this.businessPayments[0];
      this.paymentcard = false;
      this.pickupDetails.get('pickupDate')?.setValue(null);
      this.pickupDetails.get('pickupTime')?.setValue(null);
      if(this.selectedAddress && this.selectedAddress !== null && this.selectedAddress !== undefined){
         await this.getCheckoutCart(orderType, this.selectedAddress?.state, this.selectedAddress?.city, this.selectedAddress?.zipCode, this.shippingId !== undefined ? this.shippingId : null!,
          this.selectedAddress?.streetNumber + ' ' + this.selectedAddress?.addressLine1+ ', ' +
          this.selectedAddress?.state + ', '+ this.selectedAddress?.city + ' ' + this.selectedAddress?.zipCode + ', '+ this.selectedAddress?.country,
          this.selectedAddress?.longitude !== undefined ? this.selectedAddress.longitude : null,
          this.selectedAddress?.latitude !== undefined ? this.selectedAddress.latitude : null, [])
      } else{
        this.getCheckoutCart(orderType, '','','',null!,'',null!,null!, []);
      }
    }else if(orderType == 'RESERVE_ONLINE_TRY_IN_STORE'){
      this.showAddressInfo = false;
      this.showPickupInfo = false;
      this.showPickupDate = true;
      this.paymentMethod = 'COD';
      this.activepayment = this.businessPayments[0];
      this.paymentcard = false;
      this.pickupDetails.get('pickupDate')?.setValue(null);
      this.pickupDetails.get('pickupTime')?.setValue(null);
      this.getCheckoutCart(orderType, '','','',null!,'',null!,null!, []);
      // if(this.businessAddresses.length > 0){
      //   this.setActiveAddress(this.businessAddresses[0], 0);
      // }
    }
    this.orderType = orderType;
    this.loadStripeDta();
    setTimeout(() => {
      this.loading = false;
      this.isCheckoutApiStarted = false;
      if(orderType === 'ORDER_ONLINE_PICK_IN_STORE'){
         if (!this.isOrderIdNull) {
           if (
             (!this.isCODEnabled && this.isFinixPay && this.isPayPalEnabled) ||
             (!this.isCODEnabled && this.isFinixPay && !this.isPayPalEnabled)
           ) {
             this.paymentmethodcard(true, 'FAZEAL_PAY');
             console.log('function initiated');
           }
         }
      }
    }, 500);
  }

  toggleCreditInfo(show: any, paymentMethod: string){
    this.showCreditInfo = show;
    this.paymentMethod = paymentMethod;
    if(this.paymentMethod == 'PAYPAL'){
      this.errorMessage = '';
      const address = this.billingAddress?.addressLine1;
      const firstName = this.personDetails?.firstName;
      const lastName = this.personDetails?.lastName;
      const email = this.personDetails?.email;
      if(this.personDetails?.phoneNumber === undefined || this.personDetails?.phoneNumber === 'null'){
        this.personDetails.phoneNumber = '';
      }
      const phoneNumber = this.personDetails?.phoneNumber;
      const country = this.billingAddress?.country ? this.billingAddress?.country : this.billingAddress?.shortName;
      const city = this.billingAddress?.city;
      const state = this.billingAddress?.state;
      const zipCode = this.billingAddress?.zipCode;
      let formattedDateTime;
      const pickupDateValue = this.pickupDetails.get('pickupDate')?.value;
      const pickupTimeValue = this.pickupDetails.get('pickupTime')?.value;
      if (pickupDateValue && pickupTimeValue) {
        const [hours, minutes] = pickupTimeValue.split(':');
        const combinedDateTime = new Date(pickupDateValue);
        combinedDateTime.setHours(Number(hours), Number(minutes));
        const browserLocale = navigator.language || 'en-US';
        formattedDateTime = formatDate(combinedDateTime, 'yyyy-MM-ddTHH:mm:ss', browserLocale);
      }
      let tax = 0;
      let shipping = 0;
      let subTotal = 0;
      tax = this.shoppingCart.totalApplicableTaxes;
      shipping = this.shoppingCart.shippingCost;
      subTotal = this.shoppingCart.totalPrice - (tax + shipping);
      this.shoppingCartService.createPaymentIntent(this.sessionResponse.id, Number(this.tokenStorage.getBusinessID()!), this.sessionResponse.userType,
      'PAYPAL', firstName + ' '+lastName, email, address ? address : '', zipCode ? zipCode : '', city ? city : '', state ? state : '', country ? country : '',
      subTotal, tax, shipping).subscribe(data => {
        console.log(data)
        this.paypalUrl = data?.data?.createPaymentIntent?.paypalRedirectUrl;
        let placeOrderDto = new PlaceOrderDto();
        placeOrderDto.businessId = Number(this.tokenStorage.getBusinessID());
        placeOrderDto.cartId = this.shoppingCart.id;
        placeOrderDto.paymentType = this.paymentMethod;
        placeOrderDto.addressId = this.addressId;
        placeOrderDto.orderType = this.orderType;
        placeOrderDto.orderId = this.shoppingCart.orderId;
        placeOrderDto.pickupPerson = this.pickupPerson;
        placeOrderDto.pickupTime = formattedDateTime!;
        placeOrderDto.pickUpPersonDTO = {firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber};
        placeOrderDto.tax = this.shoppingCart.totalApplicableTaxes;
        placeOrderDto.surcharges = this.shoppingCart.totalSurchargesTaxes;
        this.tokenStorage.saveUserOrderInfo(placeOrderDto);

      })
    }else if(this.paymentMethod == 'PAYPAL' && !this.paypalUrl){
      this.errorMessage = 'PAYPAL Url not configured!';
      return;
    } else if(this.paymentMethod == 'COD'){
      this.billingAddress = null;
    }
  }

  saveBillingAddress(address: any){
    this.billingAddress = address;
    this.isSubmittedBillingDetails = true;
    if(this.paymentMethod == 'PAYPAL'){
      this.errorMessage = '';
      this.toggleCreditInfo(false, 'PAYPAL');
    }else if(this.paymentMethod == 'PAYPAL' && !this.paypalUrl){
      this.errorMessage = 'Paypal Url not configured!';
      return;
    }
  }

  toggleMe(pickupPerson: string){
    this.showPickupPerson = !this.showPickupPerson;
    this.personDetails.firstName = this.user?.firstName;
    this.personDetails.lastName = this.user?.lastName;
    this.personDetails.email = this.user?.email;
    if(this.user?.phone === undefined || this.user?.phone === 'null'){
      this.user.phone = '';
    }
    this.personDetails.phoneNumber = this.user?.phone;
    this.pickupPerson = pickupPerson;
  }

  togglePickupPerson(show: any, pickupPerson: string){
    this.showPickupPerson = show;
    this.pickupPerson = pickupPerson;
  }

  selectAddress(addressId: number){
    this.addressId = addressId;
  }

  async checkTimeAvailable() {
    let formattedDateTime;
    const pickupDateValue = this.pickupDetails.get('pickupDate')?.value;
    const pickupTimeValue = this.pickupDetails.get('pickupTime')?.value;
    if (!pickupDateValue || !pickupTimeValue) {
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: 'Missing date or time value' }
      });
      return;
    }
    try {
      let hours: number;
      let minutes: number;
      if (typeof pickupTimeValue === 'string' && pickupTimeValue.match(/[AP]M/i)) {
        const timeParts = pickupTimeValue.split(/:| /);
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1], 10);
        const period = pickupTimeValue.toUpperCase().includes('PM') ? 'PM' : 'AM';
        if (period === 'PM' && hours < 12) {
          hours += 12;
        }
        if (period === 'AM' && hours === 12) {
          hours = 0;
        }
      } else {
        const timeParts = pickupTimeValue.split(':');
        hours = parseInt(timeParts[0], 10);
        minutes = parseInt(timeParts[1] || '0', 10);
      }
      if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: 'Invalid time values' }
        });
        return;
      }
      const combinedDateTime = new Date(pickupDateValue);
      if (isNaN(combinedDateTime.getTime())) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: 'Invalid date value' }
        });
        return;
      }
      combinedDateTime.setHours(hours, minutes, 0, 0);
      formattedDateTime = formatDate(combinedDateTime, 'yyyy-MM-ddTHH:mm:ss', 'en-US');

      (await this.shoppingCartService.isTimeAvailable(formattedDateTime)).subscribe(
        data => {
          if (data?.errors) {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
            });
            this.isTimeCorrect = false;
            return;
          }

          if (data?.data?.isTimeAvailable?.timeAvailable === false) {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: this.translate.instant('PLEASE_SELECT_BUSINESS_TIME') }
            });
            this.isTimeCorrect = false;
            return;
          }

          this.isTimeCorrect = true;
        },
        error => {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: 'Failed to check time availability' }
          });
          this.isTimeCorrect = false;
        }
      );
    } catch (error) {
      console.error('Error processing date/time:', error);
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: 'Invalid date or time format' }
      });
      this.isTimeCorrect = false;
    }
  }

  async placeOrder(): Promise<boolean>{
    this.isSubmitted = true;
    if(this.orderType == null){
      this.errorMessage = 'PLEASE_SELECT_ORDER_TYPE';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.paymentMethod == null){
      this.errorMessage = 'PLEASE_SELECT_PAYMENT_METHOD';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.orderType == 'ORDER_ONLINE_PICK_IN_STORE' && this.pickupPerson == 'ANOTHER_PERSON' && (this.personDetails?.firstName == '' ||
    this.personDetails?.lastName == '' || this.personDetails?.email == '' ||
    this.personDetails?.phoneNumber == '')){
      this.errorMessage = 'PLEASE_SELECT_PICKUP_PERSON_DETAILS';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.orderType == 'ORDER_ONLINE_SHIP_TO_HOME' && !this.selectedAddress){
      this.errorMessage = 'PLEASE_SELECT_SHIPPING_ADDRESS';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.orderType == 'ORDER_ONLINE_SHIP_TO_HOME' && this.shippingNotAvailable){
      this.errorMessage = 'SHIPPING_IS_NOT_AVAILABLE_TO_YOUR_ADDRESS';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if((this.paymentMethod == 'PAYPAL') && !this.paypalUrl){
      this.errorMessage = 'Paypal URL not configured!';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if((this.orderType == 'ORDER_ONLINE_PICK_IN_STORE' || this.orderType == 'RESERVE_ONLINE_TRY_IN_STORE') && this.pickupDetails.get('pickupDate')!.value == ''){
      this.errorMessage = 'PLEASE_SELECT_PICKUP_DATE';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if((this.orderType == 'ORDER_ONLINE_PICK_IN_STORE' || this.orderType == 'RESERVE_ONLINE_TRY_IN_STORE') && this.pickupDetails.get('pickupTime')!.value == ''){
      this.errorMessage = 'PLEASE_SELECT_PICKUP_TIME';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.paymentMethod == 'CREDIT_CARD' && this.isFinixPay == true && (!this.createdAuthorization?.id || this.createdAuthorization.id == null)){
      this.errorMessage = 'YOu should complete the Credit Card form first!';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }

    let formattedDateTime;
    try {
        formattedDateTime = this.processPickupDateTime();
    } catch (error) {
        this.buttonDisabled = false;
        this.errorMessage = 'Invalid date or time format';
        setTimeout(() => {
          this.errorMessage = '';
          }, 4000);
        return false;
    }

    const firstName = this.personDetails?.firstName !== undefined ? this.personDetails?.firstName : '';
    const lastName = this.personDetails?.lastName !== undefined ? this.personDetails?.lastName : '';
    const email = this.personDetails?.email;
    if(this.personDetails?.phoneNumber === undefined || this.personDetails?.phoneNumber === 'null'){
      this.personDetails.phoneNumber = '';
    }
    const phoneNumber = this.personDetails?.phoneNumber;
    let nameOnCard: string = '';
    let cardNumber: string = '';
    let expMonth:string = '';
    let expYear: string = '';
    let cvc: string = '';
    if(this.paymentDetails){
      nameOnCard = this.paymentDetails?.cardHolderName;
      cardNumber = this.paymentDetails?.cardNumberWithoutSpaces;
      let parts: string[] = this.paymentDetails?.expiryDate?.split('/');
      expMonth = parts[0];
      expYear = parts[1];
      cvc = this.paymentDetails?.cvv;
    }
    if((!phoneNumber || phoneNumber === '') && this.sessionResponse.userType === 'FAZEAL_REGISTERED'){
      this.errorMessage = 'Phone number must be provided from social user settings';
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }

    if(cardNumber != '' && this.isFazealPayEnabled){
      this.checkCardType();
    }

    const orderDetails = {
      businessId: Number(this.tokenStorage.getBusinessID()),
      shoppingCartId: this.shoppingCart.id,
      paymentMethod: this.paymentMethod,
      addressId: this.addressId ? this.addressId : null,
      orderType: this.orderType,
      paymentToken: this.paymentToken,
      orderId: this.shoppingCart.orderId,
      pickupPerson: this.pickupPerson,
      formattedDateTime: formattedDateTime!,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      cardNumber: cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc,
      cardType: this.cardType ? this.cardType : null,
      selectedCardId: this.selectedCard?.id ? this.selectedCard?.id : null,
      totalApplicableTaxes: this.shoppingCart.totalApplicableTaxes,
      totalSurchargesTaxes: this.shoppingCart.totalSurchargesTaxes,
      selectedAddress: this.selectedAddress ? this.selectedAddress : null,
      userType: this.sessionResponse.userType,
      userId: this.sessionResponse.id,
      billingAddress: this.billingAddress ? this.billingAddress : null
    };
    this.tokenStorage.savePlaceOrderRequest(orderDetails);

    if(this.paymentMethod == 'PAYPAL'){
      return true;
    }
    if((this.validateAddressMessages.length > 0 || this.validateAddressFailed) && this.orderType == 'ORDER_ONLINE_SHIP_TO_HOME'){
      this.errorMessage = 'Shipping Address not Valid!';
      this.initializingPayment = false;
      setTimeout(() => {
        this.errorMessage = '';
         }, 4000);
      return false;
    }
    if(this.orderType == 'RESERVE_ONLINE_TRY_IN_STORE'){
      this.paymentMethod = 'COD';
    }
    let addressPassed;
    if(this.orderType == 'ORDER_ONLINE_PICK_IN_STORE'){
      addressPassed = this.selectedAddress;
    }
    if(this.orderType == 'ORDER_ONLINE_SHIP_TO_HOME'){
      addressPassed = this.matchedAddress;
    }
    if((this.orderType == 'ORDER_ONLINE_PICK_IN_STORE' || this.orderType == 'RESERVE_ONLINE_TRY_IN_STORE')){
      addressPassed = {firstName: this.user?.firstName, lastName: this.user?.lastName, phoneNumber: this.user?.phone, email: this.user?.email};
    }
    this.buttonDisabled = true;
    this.shoppingCartService.placeOrder(Number(this.tokenStorage.getBusinessID()), this.shoppingCart.id, this.paymentMethod,
    this.addressId? this.addressId : null, this.orderType, this.paymentToken, this.shoppingCart.orderId,
    this.pickupPerson, formattedDateTime!, firstName, lastName, email, phoneNumber,null,
    cardNumber, expMonth, expYear, cvc, this.cardType ? this.cardType : null, this.selectedCard?.id ? this.selectedCard?.id : null, this.shoppingCart.totalApplicableTaxes, this.shoppingCart.totalSurchargesTaxes, addressPassed? addressPassed:null,
    this.sessionResponse.userType, this.sessionResponse.id, this.billingAddress? this.billingAddress:null,
    this.createdAuthorization ? this.createdAuthorization.id : '', this.captureAmount ? this.captureAmount : 0).subscribe(
      async data => {
        if(data.errors){
          this.buttonDisabled = false;
          this.initializingPayment = false;
          return;
        }
        if(data?.data?.placeOrder != null){
          this.placeOrderDone = true;
          this.message = data?.data?.placeOrder?.message;
          this.orderResponse = data?.data?.placeOrder?.data;
          // if(this.promotionResponse?.id){
          //   this.promotionService.increaseAppliedCount(this.promotionResponse.id,Number(this.tokenStorage.getBusinessID())).subscribe(
          //     data => {
          //     }
          //   );
          // }
          // this.catalogService.updateLastOrderId(Number(this.tokenStorage.getBusinessID())).subscribe(
          //   data => {
          //   }
          // );

          if(this.paymentMethod == 'PAYPAL'){
            return true;
          }
          if (environment.env !== 'local') {
            this.subdomain = '';
          }
          this.router.navigateByUrl(this.subdomain + '/place-an-order',{state: {order: this.orderResponse, orderFormat: this.orderIdFormat }});
          //this.dataService.notifyOther({refresh: true});
          this.sharedService.notifyRefreshShoppingCart();
          return true;
        }else {
          this.placeOrderDone = false;
          this.errorMessage = data?.errors[0]?.errorMessage;
          this.buttonDisabled = false;
          setTimeout(() => {
            this.errorMessage = '';

             }, 3000);
             return false;
        }
      }
    );
    return true;
  }

  private processPickupDateTime(): string | undefined {
    const pickupDateValue = this.pickupDetails.get('pickupDate')?.value;
    const pickupTimeValue = this.pickupDetails.get('pickupTime')?.value;
    if (!pickupDateValue || !pickupTimeValue) return undefined;
    const { hours, minutes } = this.normalizeTime(pickupTimeValue);
    const combinedDateTime = new Date(pickupDateValue);
    combinedDateTime.setHours(hours, minutes);
    return formatDate(combinedDateTime, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
}


private normalizeTime(timeString: string): { hours: number, minutes: number } {
  if (!timeString) {
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: 'Pickup Time is empty!' }
      });
      return { hours: 0, minutes: 0 };
  }
  const cleanTime = timeString.trim().toUpperCase();
  let hours: number;
  let minutes: number;
  let isPM = false;
  if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
      const period = cleanTime.includes('PM') ? 'PM' : 'AM';
      const timeWithoutPeriod = cleanTime.replace(/[AP]M/, '').trim();
      const [h, m] = timeWithoutPeriod.split(':').map(Number);
      if (isNaN(h) || h < 1 || h > 12) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: `Invalid hour value: ${h}` }
        });
      }
      if (isNaN(m) || m < 0 || m > 59) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: `Invalid minute value: ${m}` }
        });
      }
      hours = h;
      if (period === 'PM' && hours < 12) {
          hours += 12;
      } else if (period === 'AM' && hours === 12) {
          hours = 0;
      }
      minutes = m;
  } else {
      const [h, m] = cleanTime.split(':').map(Number);
      if (isNaN(h) || h < 0 || h > 23) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: `Invalid hour value: ${h}` }
        });
      }
      if (isNaN(m) || m < 0 || m > 59) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: `Invalid minute value: ${m}` }
        });
      }
      hours = h;
      minutes = m || 0;
  }
  return { hours, minutes };
}

  applyPromocode(){
    let promoCodes = [];
    promoCodes.push(this.promocode);
    this.getCheckoutCart(this.orderType, this.selectedAddress?.state, this.selectedAddress?.city, this.selectedAddress?.zipCode,
      this.shippingId !== undefined ? this.shippingId : null!,
      this.selectedAddress?.streetNumber + ' ' + this.selectedAddress?.addressLine1+ ', ' +
      this.selectedAddress?.state + ', '+ this.selectedAddress?.city + ' ' + this.selectedAddress?.zipCode + ', '+ this.selectedAddress?.country,
      this.selectedAddress?.longitude !== undefined ? this.selectedAddress.longitude : null,
      this.selectedAddress?.latitude !== undefined ? this.selectedAddress.latitude : null, promoCodes)
  }

  checkCardType(){
    this.cardType = creditCardType(this.paymentDetails?.cardNumberWithoutSpaces)!;
  }

  storelocationmodal(address: Address){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'store_location_modal';
    dialogConfig.data = address;
    this.dialog.open(StoreLocationModalComponent, dialogConfig);
  }

  selectMobileCode(list : any){
    this.phoneCode = list.code;
    this.countrytext = false;
    this.selectedcode = true;
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  onMenuClosedCountry() {
    this.searchText = '';
  }
  deletepopup(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'delete_modal';
    this.dialog.open(DeleteGuestContactInfoComponent, dialogConfig);
  }

  async setActiveAddress(address: any, index: any) {
    this.addressNotSelected = false;
    this.setaddress = index;
    this.selectedAddress = address;
    this.selectedAddress.firstName = this.user?.firstName;
    this.selectedAddress.lastName = this.user?.lastName;
    this.selectedAddress.phoneNumber = this.user?.phone;
    this.selectedAddress.email = this.user?.email;
    this.totalShippingRate = 0;

    if (this.isShippingEnabled) {
      await this.validateShipEngineAddress(this.selectedAddress);
      if (this.validateAddressFailed || this.validateAddressMessages.length > 0) {
        return;
      }
    }

    await this.getCheckoutCart(
      this.orderType,
      this.selectedAddress?.state,
      this.selectedAddress?.city,
      this.selectedAddress?.zipCode,
      null!,
      this.selectedAddress?.streetNumber + ' ' + this.selectedAddress?.addressLine1 + ', ' +
      this.selectedAddress?.state + ', ' + this.selectedAddress?.city + ' ' + this.selectedAddress?.zipCode + ', ' +
      this.selectedAddress?.country,
      this.selectedAddress?.longitude !== undefined ? this.selectedAddress.longitude : null,
      this.selectedAddress?.latitude !== undefined ? this.selectedAddress.latitude : null,
      []
    );

    await this.getListOfBusinessShippingRates();
  }

  getListOfBusinessShippingRates(){
    this.shippingNotAvailable = false;
    this.addressService.listAllShippingRatesByStateNameAndBusinessId(this.businessID, this.selectedAddress?.state)
    .subscribe(data => {
      if(data?.data?.listAllShippingRatesByStateNameAndBusinessId){
        this.shippingRates = data?.data?.listAllShippingRatesByStateNameAndBusinessId;
        if(this.shippingRates?.length == 0){
          this.shippingNotAvailable = true;
        }
        if (this.shippingRates.length > 0) {
          this.setActiveShippingRate(this.shippingRates[0]);

      }
    }
    });
  }

  convertShippingDays(shippingDays: string): string | null {
    const currentDate = new Date();
    let startDate: Date;
    let endDate: Date;
    switch (shippingDays) {
      case 'SAME_DAY':
        startDate = endDate = currentDate;
        break;

      case 'NEXT_BUSINESS_DAY':
        startDate = endDate = this.getNextBusinessDay(currentDate);
        break;

      case 'ONE_DAY':
        startDate = currentDate;
        startDate = endDate = this.addDays(currentDate, 1);
        break;

      case 'ONE_TO_TWO_DAYS':
        startDate = currentDate;
        endDate = this.addDays(currentDate, 2);
        break;

      case 'ONE_TO_THREE_DAYS':
        startDate = currentDate;
        endDate = this.addDays(currentDate, 3);
        break;

      case 'THREE_TO_FIVE_DAYS':
        startDate = currentDate;
        endDate = this.addDays(currentDate, 5);
        break;

      case 'FIVE_TO_TEN_DAYS':
        startDate = currentDate;
        endDate = this.addDays(currentDate, 10);
        break;

      default:
        return null;
    }

    if(startDate == endDate){
      return `${this.formatDate(startDate)}`;
    }
    return `${this.formatDate(this.addDays(startDate, 1))} - ${this.formatDate(endDate)}`;
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getNextBusinessDay(date: Date): Date {
    let result = new Date(date);
    result.setDate(result.getDate() + 1);
    if (result.getDay() === 6) {
      result.setDate(result.getDate() + 2);
    } else if (result.getDay() === 0) {
      result.setDate(result.getDate() + 1);
    }
    return result;
  }

  formatDate(date: Date): string {
    const options = { day: 'numeric', month: 'long' };
    return date.toLocaleDateString();
  }


 async setActiveShippingRate(rate: ShippingResponse) {
  this.addressNotSelected = false;

  if (!this.selectedAddress) {
    this.addressNotSelected = true;
    return;
  }

  this.totalShippingRate = 0;
  this.selectedShippingRates = rate;

  let products: { productId: number; skuId: number | null }[] = [];
  this.shoppingCart?.cartItemResponseList?.forEach(item =>
    products.push({ productId: item.productId, skuId: item.skuId ? item.skuId : null })
  );

  this.shippingId = rate.id;

  await this.getCheckoutCart(
    this.orderType,
    this.selectedAddress?.state,
    this.selectedAddress?.city,
    this.selectedAddress?.zipCode,
    rate.id,
    this.selectedAddress?.addressLine1 + ' ' + this.selectedAddress?.addressLine2 + ', ' +
    this.selectedAddress?.state + ', ' + this.selectedAddress?.city + ' ' + this.selectedAddress?.zipCode + ', ' +
    this.selectedAddress?.country,
    this.selectedAddress?.longitude !== undefined ? this.selectedAddress.longitude : null,
    this.selectedAddress?.latitude !== undefined ? this.selectedAddress.latitude : null,
    []
  );

 if (!this.isOrderIdNull) {
  if (
    (!this.isCODEnabled && this.isFinixPay && this.isPayPalEnabled) ||
    (!this.isCODEnabled && this.isFinixPay && !this.isPayPalEnabled)
  ) {
    this.paymentmethodcard(true, 'FAZEAL_PAY');
    console.log('function initiated');
  }
}
}


  initForm() {
    this.addressForm = this.fb.group({
      country: [this.selectedAddress?.country],
      state: [this.selectedAddress?.state],
      city: [this.selectedAddress?.city],
      zipcode: [this.selectedAddress?.zipCode],
      phoneNumber: [this.selectedAddress?.phoneNumber],
      streetNumber: [this.selectedAddress?.streetNumber],
      poBox: [this.selectedAddress?.poBox],
      formattedAddress: [this.selectedAddress?.addressLine1],
    });
  }

  refreshAddToCart() {
  this.dataService.getReflectCartItems().pipe(
    take(1)
  ).subscribe(res => {
    if (res) {
      this.listUserCartItems();
    }
  });
}

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,16}[a-zA-Z0-9]$/;
    if (!usernamePattern.test(username)) {
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: this.translate.instant('THE_USERNAME_IS_NOT_VALID') }
      });
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: this.translate.instant('EMAIL_ERROR') }
        });
        return false;
    }
    return true;
}

   async loginFazealUser() {
    const username = this.fzealUserTxt.trim();
    const password = this.fzealPassTxt.trim();
    if (!this.validateUsername(username)) {
      return;
    }
    const loginData = await firstValueFrom(this.authService.login(username, password, "SOCIAL", this.businessID, this.tokenStorage.getRememberMe()));
    if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
      const errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: errorMessage }
      });
      this.isLoginFailed = true;
      this.userTypeShow = true;
      return;
    }
    const data = loginData?.data?.authenticateUser;
    this.authService.setLoggedIn();
    this.user = new User();
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.username = data.username;
    this.user.id = data.id;
    this.user.userType = 'FAZEAL_REGISTERED';
    this.user.profile = data.profile;
    this.user.coverPhoto = data.cover;
    this.user.email = data.email;
    this.user.isSubscribed = false;
    this.user.phone = data.phone;
    this.user.addressList = data.addressList;
    this.user.paymentDetails = data.paymentDetails;
    this.isLoggedIn = true;
    this.isLoginFailed = false;

    this.cookieService.deleteUserCookie('user');
    this.cookieService.setUserCookie(data?.firstName + ' ' + data?.lastName, 1);
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveRefreshToken(data.refreshToken);
    this.tokenStorage.saveUser(this.user, true);
    this.sharedService.setUserData(this.user);
    sessionStorage.removeItem('guestInfo');

    this.sharedService.triggerReload();
    this.sessionResponse = JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!));
    if (this.sessionResponse.userType == 'GUEST') {
      this.shoppingCartService.cartMerge(Number(this.tokenStorage.getBusinessID()!), this.user.id, this.sessionResponse.id, 'FAZEAL_REGISTERED')
        .subscribe(async data => {
          if (data.data.cartMerge) {
            this.sessionResponse.id = this.user.id;
            this.sessionResponse.userType = 'FAZEAL_REGISTERED';
            this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
            this.loadSubscribeModal();
            // await this.loadCartAndFav()
            return;
          }
        });
    }

    this.sessionResponse.id = this.user.id;
    this.sessionResponse.userType = 'FAZEAL_REGISTERED';
    this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
    this.ngOnInit();
    this.userTypeShow = false;
  }

  async loginStoreUser() {
    const username = this.storeUserTxt.trim();
    const password = this.storePassTxt.trim();
    if (!this.validateEmail(username)) {
      return;
    }
    const loginData = await firstValueFrom(this.authService.login(username, password, "STORE", this.businessID, this.tokenStorage.getRememberMe()));
    if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
      const errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: errorMessage }
      });
      this.isLoginFailed = true;
      this.userTypeShow = true;
      return;
    }
    const data = loginData?.data?.authenticateUser;
    this.authService.setLoggedIn();
    this.user = new User();
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.phone = data.phoneNumber;
    this.user.id = data.id;
    this.user.email = data.email;
    this.user.userType = 'STORE_REGISTERED';
    this.user.phone = data.phone;
    this.user.addressList = data.addressList;
    this.user.paymentDetails = data.paymentDetails;
    this.user.accessToken = data.accessToken;
    this.user.refreshToken = data.refreshToken;
    this.user.profile = data.profile;
    this.user.countryCode = data.countryCode;
    this.user.emailVerified = data.emailVerified;
    this.isLoggedIn = true;
    this.isLoginFailed = false;

    this.cookieService.deleteUserCookie('user');
    this.cookieService.setUserCookie(data?.firstName + ' ' + data?.lastName, 1);
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveRefreshToken(data.refreshToken);
    this.tokenStorage.saveUser(this.user, true);
    this.userTypeShow = false;
    this.sharedService.setUserData(this.user);
    sessionStorage.removeItem('guestInfo');

    this.sharedService.triggerReload();
    this.sessionResponse = JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!)!);
    if (this.sessionResponse.userType == 'GUEST') {
      this.shoppingCartService.cartMerge(Number(this.tokenStorage.getBusinessID()!), this.user.id, this.sessionResponse.id, 'STORE_REGISTERED')
        .subscribe(async data => {
          if (data.data.cartMerge) {
            this.sessionResponse.id = this.user.id;
            this.sessionResponse.userType = 'STORE_REGISTERED';
            this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
            this.loadSubscribeModal();
            // await this.loadCartAndFav()
            return;
          }
        });
    }
    this.sessionResponse.id = this.user.id;
    this.sessionResponse.userType = 'STORE_REGISTERED';
    this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
    this.ngOnInit();
    this.userTypeShow = false;
  }


  async loginByCheckoutType() {
    const username = this.checkOutEmail.trim();
    const password = this.checkOutTypePassword.trim();
    // if (!this.validateUsername(username)) {
    //   return;
    // }
    this.firstTimeCalled = true;
    const loginData = await firstValueFrom(this.authService.login(username, password, this.checkOutUserTypeByEmail, this.businessID, this.tokenStorage.getRememberMe()));
    if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
      const errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: errorMessage }
      });
      this.isLoginFailed = true;
      this.userTypeShow = true;
      this.firstTimeCalled = false;
      return;
    }
    const data = loginData?.data?.authenticateUser;
    this.authService.setLoggedIn();
    this.user = new User();
    this.user.firstName = data.firstName;
    this.user.lastName = data.lastName;
    this.user.username = data.username;
    this.user.id = data.id;
    this.user.userType = this.checkOutUserTypeByEmail;
    this.user.profile = data.profile;
    this.user.coverPhoto = data.cover;
    this.user.email = data.email;
    this.user.isSubscribed = false;
    this.user.phone = data.phone;
    this.user.addressList = data.addressList;
    this.user.paymentDetails = data.paymentDetails;
    this.isLoggedIn = true;
    this.isLoginFailed = false;

    this.cookieService.deleteUserCookie('user');
    this.cookieService.setUserCookie(data?.firstName + ' ' + data?.lastName, 1);
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveRefreshToken(data.refreshToken);
    this.tokenStorage.saveUser(this.user, true);
    this.sharedService.setUserData(this.user);
    sessionStorage.removeItem('guestInfo');

    this.sharedService.triggerReload();
    this.sessionResponse = JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!));
    if (this.sessionResponse.userType == 'GUEST') {
      this.shoppingCartService.cartMerge(Number(this.tokenStorage.getBusinessID()!), this.user.id, this.sessionResponse.id, 'FAZEAL_REGISTERED')
        .subscribe(async data => {
          if (data.data.cartMerge) {
            this.sessionResponse.id = this.user.id;
            this.sessionResponse.userType = this.checkOutUserTypeByEmail;
            this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
            this.loadSubscribeModal();
            return;
          }
        });
    }

    this.sessionResponse.id = this.user.id;
    this.sessionResponse.userType = this.checkOutUserTypeByEmail;
    this.cookieService.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
    this.ngOnInit();
    this.userTypeShow = false;
    this.firstTimeCalled = false;
  }

  private loadSubscribeModal() {
    this.catalogService.getCustomer(this.tokenStorage.getUser().id, Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if (data?.data?.getCustomer == null) {
            return
        } else {
          this.user.isSubscribed = true;
          this.tokenStorage.saveUser(this.user, true);
        }
      }
    );
  }

  setUser(data: any): void {
    this.authService.setLoggedIn();
    this.user = new User();
    this.user.firstName= data.firstName,
    this.user.lastName= data.lastName,
    this.user.username= data.username,
    this.user.id= data.id,
    this.user.profilePicture= data.profile,
    this.user.coverPhoto= data.cover
    this.isLoggedIn = true;
    this.isLoginFailed = false;
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ForgotpasswordcheckoutComponent,{ panelClass: 'modal-medium-width' });
  }

  signupmodal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'signup_modal_checkout';
    const dialogRef = this.dialog.open(SignupModalCheckoutComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.event && result?.email !== '' && result?.password !== '') {
        this.checkOutEmail = result?.email;
        this.checkOutTypePassword = result?.password;
        this.checkOutUserTypeByEmail = 'STORE_REGISTERED';
        this.loginByCheckoutType();
      }
    });
  }

  continueAsGuest(guestForm: NgForm) {
    if (guestForm.invalid) {
      return;
    }
    this.user = new User();
    this.user.firstName= guestForm.value.firstName,
    this.user.lastName= guestForm.value.lastName,
    this.user.email= guestForm.value.email,
    this.user.phone= guestForm.value.phoneNumber
    sessionStorage.setItem('guestInfo', JSON.stringify(this.user));
    guestForm.reset();
    this.userTypeShow = false;
    this.getCheckOutTypeById();
    if(this.sessionResponse.userType !== "GENERIC"){
      this.listUserCartItems();
    }
    this.getOrderIdFormatByBusinessId();
    this.listBusinessAddresses();
    this.initForm();
  }

  getEnablePickInStoreAddressStatus(){
    this.loading = true;
    this.businessSettingService.getEnablePickInStoreAddressStatus(Number(this.tokenStorage.getBusinessID())).subscribe(
    data => {
      if(data?.errors){
        this.loading = false;
        return;
      }
      if(data?.data?.getEnablePickInStoreAddressStatus != null){
        this.businessAddressesOn = data?.data?.getEnablePickInStoreAddressStatus;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
        console.log('this.businessAddressesOn, this.businessAddressesOn', this.businessAddressesOn)
        if (!this.businessAddressesOn) {
          setTimeout(() => {
            this.setActiveColumn(2);
          }, 200);
        }
      }
    }
  );
 }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async placePaypalOrder(){
    const result = await this.placeOrder();
    if (result === false) {
      return;
    }
    if (result === true) {
      window.location.href = this.paypalUrl;
    }
  }



  addshippingAddressPopup() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddShippingAddressComponent, { panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data && result?.data !== undefined) {
        if(this.shippingAddresses === undefined){
          this.shippingAddresses = [];
        }
        this.shippingAddresses?.push(result?.data);
        if(this.sessionResponse?.userType == 'GUEST'){
          localStorage.removeItem('guest-address');
          const storageData = {
            data: result?.data,
            expirationTime: new Date().getTime() + 120000
          };
          localStorage.setItem('guest-address', JSON.stringify(storageData));
          this.shippingAddresses = [];
          this.shippingAddresses?.push(result?.data);
        }
        if (this.shippingAddresses.length == 1) {
          this.setActiveAddress(this.shippingAddresses[0], 0);
        }
      }
    });
  }

  addCard() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddCardPopupComponent, { panelClass: 'modal-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data && result?.data !== undefined) {
        this.paymentDetails = result?.data;
        let lastFourDigits = this.paymentDetails?.cardNumberWithoutSpaces?.slice(-4);
        let maskedDigits = 'X'.repeat(this.paymentDetails?.cardNumberWithoutSpaces?.length - 4);
        this.paymentDetails.lastFourDigits = maskedDigits + lastFourDigits;
        this.userCards.push(this.paymentDetails);
      }
    });
  }


  PickPerson() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(PickOrderPersonPopupComponent, { panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data && result?.data !== undefined) {
        this.personDetails = result?.data;
      }
    });
  }

  addBillingAddressPopup() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open( AddBillingAddressPopupComponent, { panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data && result?.data !== undefined) {
        this.billingAddress = result?.data;
        if(this.billingAddresses === undefined){
          this.billingAddresses = [];
        }
        this.billingAddresses?.push(result?.data);
        if(this.paymentMethod === 'PAYPAL'){
          this.toggleCreditInfo(false, 'PAYPAL');
        }
      }
    });
  }

  loadAddresses(fazealUser: boolean) {
    this.addressService.getUserAllAddresses(Number(this.tokenStorage.getBusinessID()), this.user.id, fazealUser).subscribe(
      data => {
        if(data.errors){
          return;
        }
        this.allAddresses = data?.data?.getAddress;
        this.getBillingAddresses();
        this.getShippingAddresses();
      }
    );
}

  getBillingAddresses(){
    this.billingAddresses = this.allAddresses?.filter(address => address?.defaultBilling == true);
  }

  getShippingAddresses(){
    this.shippingAddresses = this.allAddresses?.filter(address => address?.defaultShipping == true);
    if (this.shippingAddresses.length > 0) {
      this.setActiveAddress(this.shippingAddresses[0], 0);
    }
  }

  viewStoreHours(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = this.businessHours;
    this.dialog.open( StorehoursComponent, dialogConfig);
  }


  editShippingAddressPopup(address: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    dialogConfig.data = address;
    const dialogRef = this.dialog.open(EditShippingAddressComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        const index = this.shippingAddresses?.indexOf(address);
        if (index !== -1) {
          this.shippingAddresses[index] = result.data;
        }
        if(this.sessionResponse?.userType == 'GUEST'){
          localStorage.removeItem('guest-address');
          const storageData = {
            data: result?.data,
            expirationTime: new Date().getTime() + 120000
          };
          localStorage.setItem('guest-address', JSON.stringify(storageData));
        }
        this.setActiveAddress(this.shippingAddresses[index], index);
      }
    });
  }

  editBillingAddressPopup(address: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    dialogConfig.data = address;
    const dialogRef =  this.dialog.open(EditbillingaddresspopupComponent , dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        const index = this.billingAddresses?.indexOf(address);
        if (index !== -1) {
          this.billingAddresses[index] = result.data;
        }
      }
    });
  }

  removeTemporaryBilling(address: any) {
    const index = this.billingAddresses?.indexOf(address);
    if (index !== -1) {
      this.billingAddresses?.splice(index, 1);
    }
  }

  removeTemporaryShipping(address: any) {
    const index = this.shippingAddresses?.indexOf(address);
    if (index !== -1) {
      this.shippingAddresses?.splice(index, 1);
      localStorage.removeItem('guest-address');
    }
  }

  getOpenCloseMessage(): string {
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const todayIndex = new Date().getDay();

    // Check if today is open directly
    const todayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[todayIndex]);

    if (todayInfo?.isOpen === 'YES') {
      if (todayInfo?.allDay) {
        return `<p class='font-weight-500 text-black m-0'> ${this.translate.instant('TODAY')} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span> ${this.translate.instant('FULLHOURS')} </p>`;
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
          // Find the next open day information starting from the day after today
          const nextOpenDayInfo = this.findNextOpenDayInfo(todayIndex + 1);
          if (nextOpenDayInfo.dayInfo) {
            return `<p class='font-weight-500 text-black m-0'> ${this.translate.instant('TODAY')} <span class="text-danger font-weight-600">  ${this.translate.instant('CLOSED')} </span>,  ${this.translate.instant('SIGNUP_NEXTBTN')}  <span class="text-success"> ${this.translate.instant('OPEN')} </span> ${nextOpenDayInfo.daysUntilOpen} ${this.translate.instant('FROM')}  ${this.formatHours(nextOpenDayInfo.dayInfo)}</p>`;
          } else {
            return `<p class='font-weight-500 text-black m-0'><span class="text-danger font-weight-600"> ${this.translate.instant('CLOSED')} </span> ${this.translate.instant('FOR_THE_WEEK')} </p>`;
          }
        }
      }
    }

    // If today is not open, check the next days
    for (let i = 1; i < daysOfWeek.length; i++) {
      const index = (todayIndex + i) % 7;
      const dayInfo = this.businessHours?.find(day => day?.days === daysOfWeek[index]);

      if (dayInfo?.isOpen === 'YES') {
        const daysUntilOpen = i === 1 ? 'Tomorrow' : daysOfWeek[index];
        if (dayInfo?.allDay) {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span>  ${this.translate.instant('FULLHOURS')} </p>`;
        } else {
          return `<p class='font-weight-500 text-black m-0'>${daysUntilOpen} <span class="text-success-lighter font-weight-600">${this.translate.instant('OPEN')}</span> from ${this.formatHours(dayInfo)}</p>`;
        }
      }
    }

    return `<p class='font-weight-500 text-black m-0'>
  <span class="text-danger font-weight-600">${this.translate.instant('CLOSED')}</span>
  ${this.translate.instant('FOR_THE_WEEK')}
</p>`;


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

  async getOnboardingFormLink(){
    (await this.shoppingCartService.getOnboardingFormLink()).subscribe(
      data => {
        if(data?.errors){
          return;
        }
        if(data?.data?.getOnboardingFormLinkForCustomer){
          this.getOnBoardingForm = data?.data?.getOnboardingFormLinkForCustomer;
          if (this.getOnBoardingForm?.merchantId && this.getOnBoardingForm?.merchantId !== null && this.getOnBoardingForm?.status === 'APPROVED') {
            this.isFinixPay = true;
            this.finixApplicationId = this.getOnBoardingForm?.applicationId;
          }
        }
      }
    );
  }

  getTokenDetails(event: any) {
    const result = event;
    this.initializingPayment = true;
    this.createFinixIdentity(result.id);
  }

  getSessionKey(event: any) {
    this.finixSessionKey = event;
  }

  async createFinixIdentity(token: string){
    this.initializingPayment = true;
    (await this.shoppingCartService.createFinixIdentity(this.selectedAddress ? this.selectedAddress?.city : '', this.selectedAddress ? this.selectedAddress?.country : '',
       this.personDetails.email, this.personDetails.firstName,
       this.personDetails.lastName, this.selectedAddress?.addressLine1 ? this.selectedAddress.addressLine1 : '',
        this.selectedAddress?.addressLine2 ? this.selectedAddress.addressLine2 : '',
        this.personDetails.phoneNumber, '')).subscribe(
      data => {
        if(data?.errors){
          this.initializingPayment = false;
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
    this.initializingPayment = true;
    (await this.shoppingCartService.createPaymentInstruments(token, "TOKEN", identityId)).subscribe(
      data => {
        if(data?.errors){
          this.initializingPayment = false;
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
    this.initializingPayment = true;
    const amount = (this.shoppingCart.totalPrice * 100).toFixed(0)
    this.captureAmount = Number(amount);
    (await this.shoppingCartService.createAuthorization(
        this.captureAmount,
        this.createdPaymentInstrument.currency,
        this.getOnBoardingForm?.merchantId,
        this.createdPaymentInstrument.id,
        this.finixSessionKey
    )).subscribe(
      (data) => {
        if(data?.errors){
          this.initializingPayment = false;
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
                this.initializingPayment = false;
            }
          }
          this.showErrorDialog(
              this.translate.instant(failureCode),
              failureMessage
          );
          this.initializingPayment = false;
          return;
        }
        if (data?.data?.createAuthorization?.id) {
            console.log(data, 'createAuthorization');
            this.createdAuthorization = data?.data?.createAuthorization;
            if(this.checkoutAddressError && this.checkoutAddressError !== ''){
              this.showErrorDialog('ERROR', this.checkoutAddressError);
              this.initializingPayment = false;
              return;
            }
            this.placeOrder();
        }
      });
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

continueEmailAddress() {
this.showEmailform = false;
}

getSingleCheckoutMethodKey(): string | null {
  const isReserve = this.reserveOnlineOrTryInStore && this.businessAddressesOn;
  const isPickup = this.orderOnlinePickupFromStore && this.businessAddressesOn;
  const isShip = this.orderOnlineShipHome;

  const count = [isReserve, isPickup, isShip].filter(Boolean).length;
  if (count !== 1) return null;

  if (isReserve) return 'RESERVE_ONLINE_TRYINSTOREE';
  if (isPickup) return 'ORDER_ONLINE_PICKUP_FROM_STORE';
  if (isShip) return 'ORDER_ONLINE_SHIP_TO_HOMEE';

  return null;
}


getSingleCheckoutMethodCount(): number {
  let count = 0;
  if (this.reserveOnlineOrTryInStore && this.businessAddressesOn) count++;
  if (this.orderOnlinePickupFromStore && this.businessAddressesOn) count++;
  if (this.orderOnlineShipHome) count++;
  return count;
}

continueGuest() {
  this.isContinueGuest = true;
  setTimeout(() => {
    if (this.guestForm) {
      const emailToSet = this.checkOutEmail;
      this.guestForm.form.patchValue({ email: emailToSet });
    }
  });
}

}
