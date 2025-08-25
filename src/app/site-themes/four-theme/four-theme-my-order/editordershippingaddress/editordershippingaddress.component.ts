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
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AddressService } from 'src/app/service/Address.service';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule
  ],
  selector: 'app-editordershippingaddress',
  templateUrl: './editordershippingaddress.component.html',
  styleUrls: ['./editordershippingaddress.component.css']
})

export class EditordershippingaddressComponent implements OnInit {

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
  isShippingEnabled: boolean = false;
  validateAddressMessages: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private cdr: ChangeDetectorRef,
  private addressService: AddressService,
  private shoppingCart: ShoppingCartService, public dialogRef: MatDialogRef<EditordershippingaddressComponent>) { }

  async ngOnInit() {
    this.order = this.data;
    this.isShipEngineEnabled();
    await this.getAllCountries();
    this.selectedCountry = this.countries?.filter((e) => {
      return e.name == this.order?.orderAddressResponse?.country || e.shortName == this.order?.orderAddressResponse?.country;
    })[0];
    await this.getAllStatesOfCountry(this.selectedCountry?.id);
    this.selectedState = this.states?.filter((e) => {
      return e.name == this.order?.orderAddressResponse?.state || e.shortName == this.order?.orderAddressResponse?.state;
    })[0];
    await this.getAllCitiesOfState(this.selectedState?.id);
    this.selectedCity = this.cities?.filter((e) => {
      return e.name == this.order?.orderAddressResponse?.city || e.name?.toUpperCase() == this.order?.orderAddressResponse?.city;
    })[0];
  }

  async isShipEngineEnabled(){
    (await this.shoppingCart.isShipEngineEnabled()).subscribe(
      data => {
        if(data?.data?.isShipEngineEnabled != null){
          this.isShippingEnabled = data?.data?.isShipEngineEnabled;
        }
      }
    );
   }


   async validateShipEngineAddress(shippingAddress: any): Promise<boolean> {
    this.validateAddressMessages = [];
    try {
        const response = await (await this.shoppingCart.validateShipEngineAddressForCst(
          `${shippingAddress.firstName} ${shippingAddress.lastName}`,
          shippingAddress.phoneNumber,
          shippingAddress.addressLine1,
          shippingAddress.addressLine2,
          this.selectedCity.name,
          this.selectedState.name,
          shippingAddress.postalCode,
          this.selectedCountry.name
        )).toPromise();
        if (response?.errors) {
          this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: response?.errors[0]?.errorMessage }
            });
            this.addAddressSuccessful = false;
            return false;
        }
        const validationResult = response?.data?.validateShipEngineAddressForCst[0];
        if (validationResult?.messages?.length > 0) {
            this.validateAddressMessages = validationResult.messages;
            this.addAddressSuccessful = false;
            return false;
        }
        if (validationResult?.matched_address) {
            const matchedAddress = validationResult.matched_address;
            this.order.orderAddressResponse.addressLine1 = matchedAddress.address_line1 || '';
            this.order.orderAddressResponse.addressLine2 = matchedAddress.address_line2 || '';
            this.selectedCity.name = matchedAddress.city_locality;
            this.selectedState.name = matchedAddress.state_province;
            this.selectedCountry.name = matchedAddress.country_code;
            this.order.orderAddressResponse.postalCode = matchedAddress.postal_code;
            this.order.orderAddressResponse.phoneNumber = matchedAddress.phone;
        }
        return true;
    } catch (error) {
        console.error('Validation error:', error);
        this.addAddressSuccessful = false;
        return false;
    }
}

async updateAddress() {
    this.addAddressSuccessful = true;
    this.order.orderAddressResponse.addressLine1 = this.order?.orderAddressResponse?.addressLine1 ?? '';
    this.order.orderAddressResponse.addressLine2 = this.order?.orderAddressResponse?.addressLine2 ?? '';
    try {
        if (this.isShippingEnabled) {
            const isValid = await this.validateShipEngineAddress(this.order.orderAddressResponse);
            if (!isValid || this.validateAddressMessages.length > 0) {
                return;
            }
        }
        const response = await (await this.shoppingCart.updateShippingAddress(
          this.order.id,
          this.order.orderAddressResponse.addressLine1,
          this.order.orderAddressResponse.addressLine2,
          this.selectedCountry.name,
          this.selectedCity.name,
          this.selectedState.name,
          this.order.orderAddressResponse.postalCode,
          this.order.orderAddressResponse.phoneNumber
        )).toPromise();
        if (response?.errors) {
            this.addAddressSuccessful = false;
            return;
        }
        if (response?.data?.updateShippingAddress) {
            this.dialogRef.close({ event: 'close', data: response?.data?.updateShippingAddress?.data });
            this.dialog.open(SucessmsgPopupComponent, {
                backdropClass: 'notificationmodal-popup-success',
                data: {
                    title: 'SUCCESS',
                    message: response?.data?.updateShippingAddress?.message
                }
            });
        }
    } catch (error) {
        console.error('Update error:', error);
        this.addAddressSuccessful = false;
    }
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
