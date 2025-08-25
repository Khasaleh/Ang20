import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupModalCheckoutComponent } from '../signup-modal-checkout/signup-modal-checkout.component';
import { StoreLocationModalComponent } from '../store-location-modal/store-location-modal.component';
import { DeleteGuestContactInfoComponent } from '../delete-guest-contact-info/delete-guest-contact-info.component';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { OrderIdFormatResponse } from 'src/app/models/OrderIdFormatResponse';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { GuestShoppingCartService } from 'src/app/service/guest-shopping-cart.service';
import { ShoppingCartResponse } from 'src/app/models/ShoppingCartResponse';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { creditCardType } from '../four-theme-checkout/four-theme-checkout.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { DataService } from 'src/app/service/data.service';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { AddressService } from 'src/app/service/Address.service';
import { ShippingResponse } from 'src/app/models/ShippingResponse';
import { ForgotpasswordcheckoutComponent } from 'src/app/forgotpasswordcheckout/forgotpasswordcheckout.component';

@Component({
  selector: 'app-four-checkout-without-login',
  templateUrl: './four-checkout-without-login.component.html',
  styleUrls: ['./four-checkout-without-login.component.scss']
})
export class FourCheckoutWithoutLoginComponent implements OnInit {
  setaddress: any;
  update_contact_info: boolean = false;
  list_contact_info: boolean = false;
  sameasshippingtwo: any = "same as shipping";
  sameasshipping: any;
  activeColumn: number = 1;
  searchText: string = '';
  phoneCode: number = 1;
  activepayment_two: any = 'cashondelivery';
  anotherform: boolean = false;
  paymentcard: boolean = false;
  paymentcard_two: boolean = false;
  paymenttypecard: boolean = false;
  paymenttypecardradiotwo: boolean = false;
  activeMeAnother: string = 'me';
  activepayment: string = 'cashondelivery';
  cardpayment: string = 'visacard';
  shippingaddress: string = 'addnewaddress';
  activepaymentradiotwo: string = 'cashondeliveryradiotwo';
  cardpaymentradiotwo: string = 'visacardradiotwo';
  paymentcardradiotwo: boolean = false;
  paymenttypecardradiothree: boolean = false;
  paymentcardradiothree: boolean = false;
  cardpaymentradiothree: string = 'visacardradiothree';
  activepaymentradiothree: string = 'cashondeliveryradiothree';
  showPassword: boolean = false;

  add_address_shipping: any = true;
  update_address_shipping: any = false;
  list_shipping_info: any = false;
  mapselect: boolean = true;
  addressForm!: FormGroup;
  billingaddressForm!: FormGroup;

  form: any = {};
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  user: any = {};
  fzealUserTxt: string = '';
  fzealPassTxt: string = '';
  userTypeShow: boolean = true;
  // @ViewChild(AgmMap) map!: AgmMap;

  address: string | undefined = '';
  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 5;
  // searchResults: google.maps.places.PlaceResult[] = [];
  markerLatitude: number = 0;
  markerLongitude: number = 0;
  mapClickListener: any
  mappp: any
  guestInfo: any = {};
  addressDTO: Address = new Address();
  countrytext:boolean=true;
  selectedcode:boolean=false;
  cardForm!: FormGroup;
  orderIdFormat!: OrderIdFormatResponse;
  pickupPerson!: string;
  pickupDetails!: FormGroup;
  subdomain!: string;
  currencySymbol ='$';
  orderType!: string;
  paymentMethod!: string;
  businessAddresses: Address[] = [];
  tax = 0.0;
  surcharges = 0.0;
  shippingTax = 0.0;
  isSubmitted = false;
  businessId = Number(this.tokenStorage.getBusinessID());
  shoppingCart!: ShoppingCartResponse;
  private cartSubscription: Subscription | undefined;
  awsURL = environment.awsKey;
  totalShippingRate = 0;
  cardType!: string;
  buttonDisabled = false;
  isPromoExist: boolean = false;
  message!: string;
  orderResponse!: OrderResponse;
  selectedAddress!: Address;
  shippingNotAvailable = false;
  shippingRates: ShippingResponse[] = [];
  selectedShippingRates!: ShippingResponse;
  orderOnlinePickupFromStore = true;
  orderOnlineShipHome = true;
  reserveOnlineOrTryInStore = true;
  BillingAddressBox: boolean = false;
  BillingAddressBoxNew: boolean = false;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private businessSettings: BusinessSettingService,
    private guestShoppingCartService: GuestShoppingCartService,
    private shoppingCartService: ShoppingCartService,
    private dataService: DataService,
    private catalogService: CatalogServiceService,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.checkUserType();
    this.initForm();
    this.checkLoginUser();
    this.listBusinessAddresses();
    this.getOrderIdFormatByBusinessId()
 //   this.getLocation();
    this.getCheckOutTypeById();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }
  checkLoginUser(){
    const sessionstorage = sessionStorage.getItem('auth-user');
    const currentUrl = this.router.url;
    const segments = currentUrl.split('/');
    const lastSegment = segments[segments.length - 1];
    if (sessionstorage && lastSegment === 'checkout-guest') {
      this.router.navigate([`${segments[1]}/checkout`]);
    }else{
      this.router.navigate([`${segments[1]}/checkout-guest`]);
    }
  }
  checkUserType(): void {
    const storedGuestInfo = sessionStorage.getItem('guestInfo');
    if (this.tokenStorage.getUser()) {
      this.userTypeShow = false;
    } else if (storedGuestInfo) {
      this.guestInfo = JSON.parse(storedGuestInfo);
      this.listUserCartItems();
      this.userTypeShow = false;
    }
  }

  getCheckOutTypeById() {
    this.businessSettings.getCheckOutTypeById(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data.data.getCheckOutTypeById){
          this.orderOnlinePickupFromStore = data.data.getCheckOutTypeById.orderOnlinePickupFromStore;
          this.orderOnlineShipHome = data.data.getCheckOutTypeById.orderOnlineShipHome;
          this.reserveOnlineOrTryInStore = data.data.getCheckOutTypeById.reserveOnlineOrTryInStore;
          if(!this.orderOnlinePickupFromStore){
            this.setActiveColumn(2);
          }
          if(!this.orderOnlineShipHome){
            this.setActiveColumn(3);
          }
        }
      });
   }

  async listUserCartItems(){
    (await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID()))).subscribe(
      data => {
        this.shoppingCart = data.data.listUserCartItems;
        this.shoppingCart.totalPromoitionDiscount = this.shoppingCart.orderLevelPromotionResponses.map(promo => promo.discountAmount).reduce((acc, num) => acc + num, 0);
      }
    );
   }


  setActiveColumn(columnNumber: number) {
    this.activeColumn = columnNumber;
  }

  signupmodal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'signup_modal_checkout';
    this.dialog.open(SignupModalCheckoutComponent, dialogConfig);
  }

  storelocationmodal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'store_location_modal';
    this.dialog.open(StoreLocationModalComponent, dialogConfig);
  }

  deletepopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'delete_modal';
    this.dialog.open(DeleteGuestContactInfoComponent, dialogConfig)
    .afterClosed().subscribe(result => {
      if(result){
        this.addressDTO = new Address();
        this.addressForm.reset();
        this.searchText = '';
        this.list_shipping_info = false;
        this.add_address_shipping = true;
        this.shippingNotAvailable = true;
      }
    });
  }

  anotherstep(step:any,columnText: string, pickupPerson: string){
    this.anotherform = step;
    this.activeMeAnother = columnText;
    this.pickupPerson = pickupPerson;
  }

  selectMobileCode(list: any) {
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

  paymentmethodcard_one(payment: any, columnText: string) {
    this.paymentcard = payment;
    this.activepayment = columnText;
    if(columnText == 'cashondelivery') {
      this.BillingAddressBox = false;
    }
    if(columnText == 'creditcard') {
      this.BillingAddressBox = true;
    }
  }
  paymentmethodcard_two(payment: any, columnText: string) {
    this.paymentcard_two = payment;
    this.activepayment_two = columnText;
    if(columnText == 'cashondelivery') {
      this.BillingAddressBoxNew = false;
    }
    if(columnText == 'creditcard') {
      this.BillingAddressBoxNew = true;
    }
  }

  paymentmethodcardRadioTwo(payment: any, columnText: string) {
    this.paymentcardradiotwo = payment;
    this.activepaymentradiotwo = columnText;
  }

  paymentmethodcardRadioThree(payment: any, columnText: string) {
    this.paymentcardradiothree = payment;
    this.activepaymentradiothree = columnText;
  }

  paymenttype(paymentcard: any, columnText: string) {
    this.paymenttypecard = paymentcard;
    this.cardpayment = columnText;
  }

  shipping_address_one(shipping: any) {
    this.sameasshipping = shipping;
    this.mapselect = true;
 //   this.getLocation()
    this.initForm()
  }

  billig_address_one(shipping: any) {
    this.sameasshipping = shipping;
    this.mapselect = true;
 //  this.getLocation()
    this.initForm()
  }

  initForm() {
    this.addressForm = this.fb.group({
      country: [this.addressDTO.country],
      state: [this.addressDTO.state],
      city: [this.addressDTO.city],
      zipcode: [this.addressDTO.zipCode],
      phoneNumber: [this.addressDTO.phoneNumber],
      streetNumber: [this.addressDTO.streetNumber],
      poBox: [this.addressDTO.poBox],
      formattedAddress: [this.addressDTO.addressLine1],
    });
    this.billingaddressForm = this.fb.group({
      country: [this.addressDTO.country],
      state: [this.addressDTO.state],
      city: [this.addressDTO.city],
      zipcode: [this.addressDTO.zipCode],
      phoneNumber: [this.addressDTO.phoneNumber],
      streetNumber: [this.addressDTO.streetNumber],
      poBox: [this.addressDTO.poBox],
      formattedAddress: [this.addressDTO.addressLine1],
    });
    this.cardForm = this.fb.group({
      nameOnCard: ['', [Validators.required]],
      cardNumber: ['', [Validators.required]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
      cvc: ['']
    });
    this.pickupDetails = this.fb.group({
      pickupDate: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.currencySymbol = this.tokenStorage.getCurrency()?.symbol;
    this.orderType = 'ORDER_ONLINE_PICK_IN_STORE';
    this.paymentMethod = 'COD';
    this.pickupPerson = 'FAZEAL_CUSTOMER';
  }


  billing_address_two(shipping: any) {
    this.sameasshippingtwo = shipping;
  }

  addcontactinfo() {
    this.anotherform = false;
    this.update_contact_info = false;
    this.list_contact_info = true;
  }
  editcontactinfo() {
    this.anotherform = false;
    this.list_contact_info = false;
    this.update_contact_info = true;
  }

  updatecontactinfo() {
    this.anotherform = false;
    this.update_contact_info = false;
    this.list_contact_info = true;
  }

  cancelupdateinfo() {
    this.anotherform = false;
    this.update_contact_info = false;
    this.list_contact_info = true;
  }

  setActiveAddress(address:Address){
    this.setaddress = address.addressId;
    this.selectedAddress = address;
    this.totalShippingRate = 0;
    this.shippingTax = 0;
    this.generateTaxRate();
    this.generateSurcharges();
    // if(this.userAddresses.map(address => address.addressId).includes(this.selectedAddress.addressId)){
    //   this.getListOfBusinessShippingRates();
    // }
  }

  generateTaxRate(){
    this.addressService.getTaxByCityAndStateAndZipCode(this.businessId, 'SALE_TAX', this.selectedAddress.city, this.selectedAddress.state,
    this.selectedAddress.zipCode).subscribe(
      data => {
        console.log(data);
        if(data.data.getTaxByCityAndStateAndZipCode != null){
          const taxRate = data.data.getTaxByCityAndStateAndZipCode.taxRate;
          this.tax = this.shoppingCart ? this.shoppingCart.totalPrice * (taxRate/100): 0;
          console.log(this.tax)
        }
      }
    );
  }

  generateSurcharges(){
    this.addressService.getTaxByCityAndStateAndZipCode(this.businessId, 'SURCHARGE', this.selectedAddress.city, this.selectedAddress.state,
    this.selectedAddress.zipCode).subscribe(
      data => {
        console.log(data);
        if(data.data.getTaxByCityAndStateAndZipCode != null){
          const surcharges = data.data.getTaxByCityAndStateAndZipCode.taxRate;
          this.surcharges = this.shoppingCart? this.shoppingCart.totalPrice * (surcharges/100): 0;
        }
      }
    );
  }

  generateShippingTax(){
    this.addressService.getTaxByCityAndStateAndZipCode(this.businessId, 'SHIPPING_TAX', this.selectedAddress.city, this.selectedAddress.state,
    this.selectedAddress.zipCode).subscribe(
      data => {
        if(data.data.getTaxByCityAndStateAndZipCode != null){
          const shippingTax = data.data.getTaxByCityAndStateAndZipCode.taxRate;
          this.shippingTax = this.totalShippingRate * (shippingTax/100);
        }
      }
    );
  }

  addshippinginfo() {
    this.add_address_shipping = false;
    this.update_address_shipping = false;
    this.list_shipping_info = true;
  }

  editshippinginfo() {
    this.add_address_shipping = false;
    this.update_address_shipping = true;
    this.list_shipping_info = false;
  }

  updateshippinginfo() {
    this.add_address_shipping = false;
    this.update_address_shipping = false;
    this.list_shipping_info = true;
    sessionStorage.setItem('guestAddress', JSON.stringify(this.addressDTO))
  }

  cancleshippinginfo() {
    this.add_address_shipping = true;
    this.update_address_shipping = false;
    this.list_shipping_info = true;
  }

  async loginFazealUser() {
    const username = this.fzealUserTxt.trim()
    const password = this.fzealPassTxt.trim()
    const loginData = await firstValueFrom(this.authService.login(username, password, "SOCIAL", this.businessId, this.tokenStorage.getRememberMe()));
    if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
      this.errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
      this.isLoginFailed = true;
      this.userTypeShow = true
      return
    }
    const data = loginData.data.authenticateUser;
    this.authService.setLoggedIn();
    this.setUser(data);

    this.isLoggedIn = true;
    this.isLoginFailed = false;

    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveRefreshToken(data.refreshToken);
    this.tokenStorage.saveUser(this.user, true);

    window.location.reload();
    this.userTypeShow = false
  }

  setUser(data: any): void {
    this.authService.setLoggedIn();
    this.user = {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      id: data.id,
      profilePicture: data.profile,
      coverPhoto: data.cover
    };
    this.isLoggedIn = true;
    this.isLoginFailed = false;
  }

  continueAsGuest(guestForm: NgForm) {
    if (guestForm.invalid) {
      return;
    }
    this.guestInfo = {
      firstName: guestForm.value.firstName,
      lastName: guestForm.value.lastName,
      email: guestForm.value.email,
      phoneNumber: guestForm.value.phoneNumber
    };
    sessionStorage.setItem('guestInfo', JSON.stringify(this.guestInfo));
    guestForm.reset();
    this.userTypeShow = false;
    this.checkUserType();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  updateLocationDetails(place: any) {
    this.address = place.formatted_address;
    this.latitude = place.geometry?.location.lat() || 0;
    this.longitude = place.geometry?.location.lng() || 0;
    this.searchText = place.formatted_address;
    this.markerLatitude = this.latitude;
    this.markerLongitude = this.longitude;
  }

  placeChangedCallback(place: any) {
    this.updateLocationDetails(place);
    this.addressForm.get("formattedAddress")?.setValue(place.formatted_address)
    this.populateAddressFields(place.address_components);
  }

  populateAddressFields(addressComponents: any[]) {
    this.addressForm.get('country')?.setValue('');
    this.addressForm.get('state')?.setValue('');
    this.addressForm.get('city')?.setValue('');
    this.addressForm.get('zipcode')?.setValue('');
    this.addressForm.get('streetNumber')?.setValue('');

    addressComponents.forEach(component => {
      switch (component.types[0]) {
        case 'country':
          this.addressForm.get('country')?.setValue(component.long_name);
          this.addressDTO.country = component.long_name;
          break;
        case 'administrative_area_level_1':
          this.addressForm.get('state')?.setValue(component.long_name);
          this.addressDTO.state = component.long_name;
          break;
        case 'locality':
          this.addressForm.get('city')?.setValue(component.long_name);
          this.addressDTO.city = component.long_name;
          break;
        case 'postal_code':
          this.addressForm.get('zipcode')?.setValue(component.long_name);
          this.addressDTO.zipCode = component.long_name;
          break;
        case 'route':
          this.addressForm.get('streetNumber')?.setValue(component.long_name);
          this.addressDTO.streetNumber = component.long_name;
          break;
      }
    });
    this.getListOfBusinessShippingRates(this.addressForm.get('city')?.value);


  }

  getOrderIdFormatByBusinessId(){
    this.catalogService.getOrderIdFormatByBusinessId(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data.data.getOrderIdFormatByBusinessId != null){
          this.orderIdFormat = data.data.getOrderIdFormatByBusinessId;
        }
      }
    );
   }

  setActiveShippingRate(rate: ShippingResponse){
    this.totalShippingRate = 0;
    this.selectedShippingRates = rate;
    let products:{productId: number, skuId: number|null}[] = [];
    this.shoppingCart.cartItemResponseList.forEach(item =>
      products.push({productId: item.productId, skuId: item.skuId? item.skuId: null})
      );
    this.addressService.getEstimateShipping(rate.id, null, null, this.selectedAddress.streetNumber + ' ' + this.selectedAddress.addressLine1+ ', ' +
      this.selectedAddress.state + ', '+ this.selectedAddress.city + ' ' + this.selectedAddress.zipCode + ', '+ this.selectedAddress.country,
      products, this.businessId).subscribe( data => {
        console.log(data);
        if(data.data.getEstimateShipping){
          this.totalShippingRate = data.data.getEstimateShipping.shippingRate;
          if(this.totalShippingRate > 0){
            this.generateShippingTax();
          }
        }
      });
  }

  getListOfBusinessShippingRates(state: string){
    this.shippingNotAvailable = false;
    this.addressService.listAllShippingRatesByStateNameAndBusinessId(this.businessId, state)
    .subscribe(data => {
      console.log(data)
      if(data.data.listAllShippingRatesByStateNameAndBusinessId){
        this.shippingRates = data.data.listAllShippingRatesByStateNameAndBusinessId;
        if(this.shippingRates.length == 0){
          this.shippingNotAvailable = true;
        }else{
          this.setActiveAddress(this.selectedAddress);
        }
      }
    });
  }


  // mapReadyHandler(map: any): void {
  //   this.mappp = map;
  //   this.mapClickListener = this.mappp.addListener('click', (event: google.maps.MouseEvent) => {
  //     this.markerLatitude = event.latLng.lat()
  //     this.markerLongitude = event.latLng.lng()
  //     const geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ location: event.latLng }, (results, status) => {
  //       if (status === 'OK' && results[0]) {
  //         console.log(results[0])
  //         this.updateLocationDetails(results[0]);
  //         this.addressForm.get("formattedAddress")?.setValue(results[0].formatted_address)
  //         this.addressDTO.addressDescription = results[0].formatted_address;
  //         this.populateAddressFields(results[0].address_components);
  //       } else {
  //         console.error('Geocoder failed due to: ' + status);
  //       }
  //     });
  //   });
  // }

  // onMarkerDragEnd(event: any): void {
  //   this.markerLatitude = event.latLng.lat();
  //   this.markerLongitude = event.latLng.lng();
  //   this.latitude = this.markerLatitude;
  //   this.longitude = this.markerLongitude;

  //   const geocoder = new google.maps.Geocoder();
  //   const latlng = { lat: this.latitude, lng: this.longitude };
  //   geocoder.geocode({ location: latlng }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.updateLocationDetails(results[0]);
  //         this.addressForm.get("formattedAddress")?.setValue(results[0].formatted_address)
  //         this.populateAddressFields(results[0].address_components);
  //       } else {
  //         console.error('No results found');
  //       }
  //     } else {
  //       console.error('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         this.latitude = position.coords.latitude;
  //         this.longitude = position.coords.longitude;
  //         this.markerLatitude = position.coords.latitude;
  //         this.markerLongitude = position.coords.longitude;
  //         this.zoom = this.zoom;

  //         const geocoder = new google.maps.Geocoder();
  //         const latlng = { lat: this.latitude, lng: this.longitude };
  //         geocoder.geocode({ location: latlng }, (results, status) => {
  //           if (status === 'OK') {
  //             if (results[0]) {
  //               this.updateLocationDetails(results[0]);
  //               this.addressForm.get("formattedAddress")?.setValue(results[0].formatted_address)
  //               this.populateAddressFields(results[0].address_components);
  //             } else {
  //               console.error('No address found for the location.');
  //             }
  //           } else {
  //             console.error('Geocoder failed due to: ' + status);
  //           }
  //         });
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }

  countries = [
    { name: 'Jordan', flag: 'JO',code: '400'  },
    { name: 'Saudi Arabia', flag: 'SA' ,code: '682'},
    { name: 'United States', flag: 'US' ,code: '840'},
    { name: 'Canada', flag: 'CA',code: '124' },
    { name: 'United Kingdom', flag: 'GB', code: '826' },
    // Add more countries as needed
  ];

  toggleAddressInfo(show: any, orderType: string){
    this.tax = 0;
    this.surcharges = 0;
    if(orderType == 'ORDER_ONLINE_PICK_IN_STORE'){
      if(this.businessAddresses.length > 0){
        this.setActiveAddress(this.businessAddresses[0]);
      }
    }else if(orderType == 'ORDER_ONLINE_SHIP_TO_HOME'){
      this.tax = 0;
      this.surcharges = 0;
    }else if(orderType == 'RESERVE_ONLINE_TRY_IN_STORE'){
      if(this.businessAddresses.length > 0){
        this.setActiveAddress(this.businessAddresses[0]);
      }
    }
    this.orderType = orderType;
  }

  listBusinessAddresses(){
    this.businessSettings.getBusinessAddressesByBusinessId(Number(this.tokenStorage.getBusinessID()))
    .subscribe(data => {
      if(data.data.getBusinessAddressesByBusinessId){
        this.businessAddresses = data.data.getBusinessAddressesByBusinessId;
        this.businessAddresses = this.businessAddresses.filter(address => address.addressType == 'STORE');
        if(this.businessAddresses.length > 0){
          this.setActiveAddress(this.businessAddresses[0]);
        }
      }
    });
   }

   get getControl(): { [key: string]: AbstractControl; } {
    return this.pickupDetails.controls;
  }

  get getCardControl(): { [key: string]: AbstractControl; } {
    return this.cardForm.controls;
  }

  togglePickupPerson(show: any, pickupPerson: string){
    this.pickupPerson = pickupPerson;
  }

  toggleCreditInfo(show: any, paymentMethod: string){
    this.paymentMethod = paymentMethod;
  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.orderType == null){
      this.errorMessage = 'Please Select Order Type';
      setTimeout(() => {
        this.errorMessage = '';
         }, 2000);
      return;
    }
    if(this.orderType == 'ORDER_ONLINE_SHIP_TO_HOME' && !this.addressDTO.state){
      this.errorMessage = 'Please Select Shipping Address';
      setTimeout(() => {
        this.errorMessage = '';
         }, 2000);
      return;
    }
    if(this.paymentMethod == null){
      this.errorMessage = 'Please Select Payment Method';
      setTimeout(() => {
        this.errorMessage = '';
         }, 2000);
      return;
    }
    const format = 'yyy-MM-ddTHH:mm:ss';
    const locale = 'en-US';
    const pichkpTime = this.pickupDetails.get('pickupDate')!.value != '' ? formatDate(this.pickupDetails.get('pickupDate')!.value, format, locale): '';
    const firstName = this.pickupDetails.get('firstName')!.value;
    const lastName = this.pickupDetails.get('lastName')!.value;
    const email = this.pickupDetails.get('email')!.value;
    const phoneNumber = this.pickupDetails.get('phoneNumber')!.value;
    const nameOnCard = this.cardForm.get('nameOnCard')?.value;
    const cardNumber = this.cardForm.get('cardNumber')?.value;
    const expMonth = this.cardForm.get('expMonth')?.value;
    const expYear = this.cardForm.get('expYear')?.value;
    const cvc = this.cardForm.get('cvc')?.value;
    if(cardNumber != ''){
      this.checkCardType();
    }
    let address = new Address();
    address.addressLine1 = this.addressForm.get('formattedAddress')?.value;
    address.country = this.addressForm.get('country')?.value;
    address.city = this.addressForm.get('city')?.value;
    address.state = this.addressForm.get('state')?.value;
    address.zipCode = this.addressForm.get('zipcode')?.value;
    address.streetNumber = this.addressForm.get('streetNumber')?.value;
    address.firstName = this.guestInfo.firstName;
    address.lastName = this.guestInfo.lastName;
    address.phoneNumber = this.guestInfo.phoneNumber;
    address.email = this.guestInfo.email;
    this.buttonDisabled = true;
    this.shoppingCartService.placeGuestOrder(Number(this.tokenStorage.getBusinessID()), this.paymentMethod,
       this.orderType,  this.orderIdFormat.lastOrderId + 1,
      this.pickupPerson, pichkpTime, firstName, lastName, email, phoneNumber,
      cardNumber, expMonth, expYear, cvc, this.cardType, this.tax, this.surcharges,address, this.shoppingCart.cartItemResponseList).subscribe(
        data => {
          console.log(data)
          if(data.data.placeGuestOrder != null){
            this.message = data.data.placeGuestOrder.message;
            this.orderResponse = data.data.placeGuestOrder.data;
            this.guestShoppingCartService.emptyCart();

            this.dataService.notifyOther({refresh: true});
            this.catalogService.updateLastOrderId(Number(this.tokenStorage.getBusinessID())).subscribe(
              data => {
              }
            );
            setTimeout(() => {
              this.router.navigateByUrl(this.subdomain + '/place-an-order',{state: {order: this.orderResponse, orderFormat: this.orderIdFormat }});
               }, 3000);
          }else {
            this.errorMessage = data.errors[0].errorMessage;
            this.buttonDisabled = false;
            setTimeout(() => {
              this.errorMessage = '';
               }, 3000);
          }
        }
      );
  }

  checkCardType(){
    this.cardType = creditCardType(this.cardForm.get('cardNumber')!.value)!;
  }

  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ForgotpasswordcheckoutComponent,{ panelClass: 'modal-medium-width' });
  }

}
