import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Country } from 'src/app/models/country';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { Address } from 'src/app/models/user';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AddressService } from 'src/app/service/Address.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-add-shipping-address',
  templateUrl: './add-shipping-address.component.html',
  styleUrls: ['./add-shipping-address.component.css']
})
export class AddShippingAddressComponent implements OnInit {


  AddressInstructions: boolean = false;
  AddressOnMap: boolean = false;
  addressInstruction: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  zipCode: string = '';
  addAddressFail: boolean = false;
  addAddressSuccessful: boolean = false;
  defaultBillingOnCreateAddress: boolean = false;
  defaultShippingOnCreateAddress: boolean = false;
  address!: any;
  user = this.tokenStorageService.getUser();
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  addressButton: boolean = false;
  countries: Country[] = [];
  states: any[] = [];
  cities: any[] = [];
  selectedCountry: number | null = null;
  selectedState: number | null = null;
  selectedCity: number | null = null;
  countryName: string = '';
  stateName: string = '';
  cityName: string = '';
  sessionResponse!: SessionResponse;
  isFazealUser: boolean = false;
  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 5;
  // searchResults: google.maps.places.PlaceResult[] = [];
  markerLatitude: number = 0;
  markerLongitude: number = 0;
  mapClickListener: any
  mappp: any;
  searchText: string = '';
  shortName: string = '';


  constructor(private dialog: MatDialog, private addressService: AddressService, private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<AddShippingAddressComponent>,private cdr: ChangeDetectorRef,private cookieService: CookieDataServiceService) {
      if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
      }
     }

  async ngOnInit() {
    await this.loadCountries();
  }
 
  async loadCountries() {
   await this.addressService.getAllCountriesForBusiness().subscribe(data => {
      this.countries = data?.data?.getAllCountries;
      this.cdr.detectChanges();
    });
  }

  async loadStates(countryId: number) {
    await this.addressService.getAllStatesOfCountry(countryId).subscribe(data => {
       this.states = data?.data?.getAllStatesOfCountry;
       this.cdr.detectChanges();
     });
   }

   async loadCities(stateId: number) {
    await this.addressService.getAllCitiesOfState(stateId).subscribe(data => {
       this.cities = data?.data?.getAllCitiesOfState;
       this.cdr.detectChanges();
     });
   }

   onCountryChange(countryId: number) {
    this.selectedCountry = countryId;
    this.selectedState = null;
    this.selectedCity = null;
    this.stateName = '';
    this.cityName = '';
    this.states = [];
    this.cities = [];
    const country = this.countries.find(c => c.id === countryId);
    this.countryName = country ? country.name : '';
    this.shortName = country ? country.shortName : '';
    if (countryId) {
      this.loadStates(countryId);
    }
  }

  onStateChange(stateId: number) {
    this.selectedState = stateId;
    this.selectedCity = null;
    this.cityName = '';
    this.cities = [];
    const state = this.states.find(s => s.id === stateId);
    this.stateName = state ? state.name : '';
    if (stateId) {
      this.loadCities(stateId);
    }
  }

  onCityChange(cityId: number) {
    this.selectedCity = cityId;
    const city = this.cities.find(c => c.id === cityId);
    this.cityName = city ? city.name : '';
  }

  saveUserAddress() {
    this.addressButton = true;
    const addressInstruction = this.addressInstruction ? this.addressInstruction?.trim() : '';
    const addressLine1 = this.addressLine1 ? this.addressLine1?.trim() : '';
    const addressLine2 = this.addressLine2 ? this.addressLine2?.trim() : '';
    const country = this.countryName ? this.countryName?.trim() : '';
    const shortName = this.shortName ? this.shortName?.trim() : '';
    const state = this.stateName ? this.stateName?.trim() : '';
    const city = this.cityName ? this.cityName?.trim() : '';
    const zipCode = this.zipCode ? this.zipCode?.trim() : '';
    if (
      (!country ||
      !addressLine1 ||
      !state ||
      !city ||
      !zipCode)
    ) {
      this.addAddressFail = true;
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: 'ALL_ADDRESS_INFO_REQUIRED' }
      });
      this.addressButton = false;
      return;
    }
    if(this.sessionResponse.userType === 'FAZEAL_REGISTERED'){
      this.isFazealUser = true;
    } else {
      this.isFazealUser = false;
    }
    this.addressButton = true;
    this.address = { addressDescription: 'description',addressLine1: addressLine1, addressLine2: addressLine2 !== undefined || addressLine2 !== null ? addressLine2 : '', shortName: shortName, country: country, state:state, city:city,
      zipCode: zipCode, defaultBilling: false, defaultShipping: true, userId: this.user ? this.user.id : null, businessId: this.businessId,
      fazealUserId: this.isFazealUser, longitude: this.longitude, latitude: this.latitude, addressInstruction }
    this.addAddressSuccessful = true;
    this.addAddressFail = false;
    this.dialogRef.close({ event: 'close', data: this.address });
    this.dialog.open(SucessmsgPopupComponent, {
      backdropClass: 'notificationmodal-popup-sucess',
        data: { title: 'SUCCESS', message: 'ADDRESS_SUCCESS_ONLY'
        }
    });
  }

}
