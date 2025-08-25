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
import { AddressService } from 'src/app/service/Address.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule
  ],
  selector: 'app-editbillingaddresspopup',
  templateUrl: './editbillingaddresspopup.component.html',
  styleUrls: ['./editbillingaddresspopup.component.css']
})
export class EditbillingaddresspopupComponent implements OnInit {
  userInfo: any = this.tokenStorageService.getUser();
  message: any;
  errormessage: any;
  addressDesc!: string;
  route!: string;
  addressLine2!: string;
  countryName: any;
  stateName: any;
  cityName: any;
  zipCode!: string;
  streetNumber!: string;
  addressId!:number
  addAddressSuccessful!: boolean;
  addAddressFail!: boolean;
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  addressButton: boolean = false;
  errorMessage: any;
  countries: any[] = [];
  cities: any[] = [];
  states: any[] = [];
  selectedState : any;
  selectedCountry: any;
  selectedCity: any;
  address: any;


  constructor(private dialog: MatDialog, private addressService: AddressService, private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<EditbillingaddresspopupComponent>,private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: any) {

     }

  async ngOnInit() {
    this.address = this.data;
    await this.getAllCountries();
    this.selectedCountry = this.countries?.filter((e) => {
      return e.name == this.data?.country;
    })[0];
    await this.getAllStatesOfCountry(this.selectedCountry?.id);
    this.selectedState = this.states?.filter((e) => {
      return e.name == this.data?.state;
    })[0];
    await this.getAllCitiesOfState(this.selectedState?.id);
    this.selectedCity = this.cities?.filter((e) => {
      return e.name == this.data?.city;
    })[0];
  }

  updateAddress() {
    this.address = { addressDescription: '', addressLine1: this.address.addressLine1, addressLine2: this.address.addressLine2 !== undefined || this.address.addressLine2 !== null ? this.address.addressLine2 : '',
       country: this.selectedCountry.name, state:this.selectedState.name, city:this.selectedCity.name,
      zipCode: this.address.zipCode, defaultBilling: true, defaultShipping: false, userId: this.userInfo ? this.userInfo.id : null, businessId: this.businessId,
      fazealUserId: false, longitude: null, latitude: null, addressInstruction: this.address.addressInstruction }
      this.addAddressSuccessful = true;
      this.addAddressFail = false;
      this.dialogRef.close({ event: 'close', data: this.address });
      this.dialog.open(SucessmsgPopupComponent, {
        backdropClass: 'notificationmodal-popup-sucess',
          data: { title: 'SUCCESS', message: 'ADDRESS_UPDATE_SUCCESS_ONLY'
          }
      });
  }

  public async getAllCountries() {
    await this.addressService.getAllCountriesForBusiness().toPromise().then(
      data => {
        if (data?.data?.getAllCountries == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.countries = data?.data?.getAllCountries;
      }
    )
  }

  private async getAllStatesOfCountry(id : number) {
    await this.addressService.getAllStatesOfCountry(id).toPromise().then(
      data => {
        if (data?.data?.getAllStatesOfCountry == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.states = data?.data?.getAllStatesOfCountry;
      }
    );
  }
  private async getAllCitiesOfState(id : number) {
    await this.addressService.getAllCitiesOfState(id).toPromise().then(
      data => {
        if (data?.data?.getAllCitiesOfState == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.cities = data?.data?.getAllCitiesOfState;
      }
    );
  }

  countrySelected(country: any) {
    if (country && country.id) {
      this.cdr.detectChanges();
      this.getAllStatesOfCountry(country.id);
    }
  }

  stateSelected(state : any){
    if(state && state.id){
      this.selectedState = state;
      this.getAllCitiesOfState(state.id);
      this.cdr.detectChanges();
    }
  }

}
