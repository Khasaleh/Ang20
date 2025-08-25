import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { City, Country, State } from 'src/app/models/country';
import { Address } from 'src/app/models/user';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AddressService } from 'src/app/service/Address.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule
  ],
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  placeName: string = '';
  streetNumber: any;
  route: any;
  cityName: any;
  stateName: any;
  countryName: any;
  languageFileName = 'en';
  addresses: Address[] = [];
  addressSelected: boolean = false;
  country!: Country;
  state!: State;
  city!: City;
  selectedCity: any;
  addressDesc: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  zipCode: string = '';
  addAddressFail: boolean = false;
  addAddressSuccessful: boolean = false;
  defaultBillingOnCreateAddress: boolean = false;
  defaultShippingOnCreateAddress: boolean = false;
  address!: Address;
  user = this.tokenStorageService.getUser();
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  addressButton: boolean = false;
  countries : any[] = [];
  cities : any[] = [];
  states : any[] = [];
  selectedState : any;
  selectedCountry: any;
  errorMessage: any;

  constructor(private dialog: MatDialog, private addressService: AddressService, private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<AddAddressComponent>
  ) { }

  ngOnInit() {
    this.getAllCountries();
  }

  saveUserAddress() {
    this.addressButton = true;
    const addressDescription = this.addressDesc ? this.addressDesc.trim() : '';
    const addressLine1 = this.route ? this.route.trim() : '';
    const addressLine2 = this.addressLine2 ? this.addressLine2.trim() : '';
    const country = this.countryName ? this.countryName?.trim() : '';
    const state = this.stateName ? this.stateName?.trim() : '';
    const city =  this.cityName ? this.cityName?.trim() : '';
    const zipCode = this.zipCode ? this.zipCode.trim() : '';
    const streetNumber = this.streetNumber ? this.streetNumber.trim() : '';
    let defaultBilling = this.defaultBillingOnCreateAddress;
    let defaultShipping = this.defaultShippingOnCreateAddress;
    if (
      (country !== 'JO') &&
      (!addressDescription ||
      !addressLine1 ||
      !country ||
      !state ||
      !city ||
      !zipCode ||
      !streetNumber)
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
    if(defaultBilling == undefined){
      defaultBilling = false;
    }
    if(defaultShipping == undefined){
      defaultShipping = false;
    }
    this.addressButton = true;
    this.addressService
      .saveAddress(
        addressDescription,
        addressLine1,
        addressLine2,
        country,        // already string
        state,          // already string
        city, 
        zipCode,
        streetNumber,
        defaultBilling,
        defaultShipping,
        this.user.id,
        this.businessId, false, null, null, ''
      )
      .subscribe(
        response => {
          if(response?.errors){
            this.addressButton = false;
            return;
          }
          this.address = response?.data?.saveAddress?.data;
          this.addAddressSuccessful = true;
          this.addAddressFail = false;
          this.dialogRef.close({ event: 'close', data: this.address });
          setTimeout(() => {
            this.addAddressSuccessful = false;
            this.addAddressFail = false;
          }, 1000);
          this.dialog.open(SucessmsgPopupComponent, {
            backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS', message: 'ADDRESS_SUCCESS_ONLY'
              }
          });
        });
  }

  public getAllCountries() {
    this.addressService.getAllCountriesForBusiness().subscribe(
      data => {
        if (data?.data?.getAllCountries == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return null;
        }
        this.countries = data?.data?.getAllCountries;
        return this.countries;
      }
    )
  }

  private getAllStatesOfCountry(id : number) {
    this.addressService.getAllStatesOfCountry(id).subscribe(
      data => {
        if (data?.data?.getAllStatesOfCountry == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.states = data?.data?.getAllStatesOfCountry;
      }
    );
  }
  private getAllCitiesOfState(id : number) {
    this.addressService.getAllCitiesOfState(id).subscribe(
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
      this.selectedCountry = country;
      this.getAllStatesOfCountry(country.id);
    }
  }

  stateSelected(state : any){
    if(state && state.id){
      this.selectedState = state;
      this.getAllCitiesOfState(state.id);
    }
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
     if (countryId) {
       this.getAllStatesOfCountry(countryId);
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
       this.getAllCitiesOfState(stateId);
     }
   }

   onCityChange(cityId: any) {
     this.selectedCity = cityId.name;
     const city = this.cities.find(c => c.id === cityId.id);
     this.cityName = city ? city.name : '';
   }


}
