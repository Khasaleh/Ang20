import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AddressService } from 'src/app/service/Address.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule
  ],
  selector: 'app-AddBillingAddressPopup',
  templateUrl: './AddBillingAddressPopup.component.html',
  styleUrls: ['./AddBillingAddressPopup.component.css']
})
export class AddBillingAddressPopupComponent implements OnInit {
  AddressInstructions: boolean = false;
  order!: OrderResponse;
  errorMessage: any;
  countries: any[] = [];
  cities: any[] = [];
  states: any[] = [];
  selectedState : any;
  selectedCountry: any;
  selectedCity: any;
  addAddressSuccessful: boolean = false;
  countryName: string = '';
  stateName: string = '';
  cityName: string = '';
  sessionResponse!: SessionResponse;
  isFazealUser: boolean = false;
  shortName: string = '';
  AddressOnMap: boolean = false;
  addressInstruction: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  addAddressFail: boolean = false;
  addressButton: boolean = false;
  address!: any;
  user = this.tokenStorageService.getUser();
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  postalCode: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private cdr: ChangeDetectorRef,
  private addressService: AddressService,private cookieService: CookieDataServiceService,
  private tokenStorageService: TokenStorageService, public dialogRef: MatDialogRef<AddBillingAddressPopupComponent>) {
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

   onCityChange(cityId: any) {
     this.selectedCity = cityId.name;
     const city = this.cities.find(c => c.id === cityId.id);
     this.cityName = city ? city.name : '';
   }


  saveUserAddress() {
    console.log(this.stateName, this.selectedCity, this.countryName, this.shortName, this.postalCode, this.addressLine1)
    this.addressButton = true;
    const addressInstruction = this.addressInstruction ? this.addressInstruction?.trim() : '';
    const addressLine1 = this.addressLine1 ? this.addressLine1?.trim() : '';
    const addressLine2 = this.addressLine2 ? this.addressLine2?.trim() : '';
    const country = this.countryName ? this.countryName?.trim() : '';
    const shortName = this.shortName ? this.shortName?.trim() : '';
    const state = this.stateName ? this.stateName?.trim() : '';
    const city = this.cityName ? this.cityName?.trim() : '';
    const postalCode = this.postalCode ? this.postalCode?.trim() : '';
    if (
      (!country ||
      !addressLine1 ||
      !state ||
      !city ||
      !postalCode)
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
      zipCode: postalCode, defaultBilling: true, defaultShipping: false, userId: this.user ? this.user.id : null, businessId: this.businessId,
      fazealUserId: this.isFazealUser, addressInstruction }
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
