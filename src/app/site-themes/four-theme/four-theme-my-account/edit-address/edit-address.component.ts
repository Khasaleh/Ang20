import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Address } from 'src/app/models/user';
import { AddressService } from 'src/app/service/Address.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {

  userInfo: any = this.tokenStorageService.getUser();
  message: any;
  errormessage: any;
  address!: Address;
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

  constructor(public addressService:AddressService,
    private tokenStorageService: TokenStorageService,private cdr: ChangeDetectorRef,
    private dialog: MatDialog, public dialogRef: MatDialogRef<EditAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

   async ngOnInit() {
  this.address = this.data;

  await this.getAllCountries();

  const selectedCountryObj = this.countries.find(e => e.name === this.data?.country);
  this.selectedCountry = selectedCountryObj?.id;

  await this.getAllStatesOfCountry(this.selectedCountry);

  const selectedStateObj = this.states.find(e => e.name === this.data?.state);
  this.selectedState = selectedStateObj?.id;

  await this.getAllCitiesOfState(this.selectedState);

  const selectedCityObj = this.cities.find(e => e.name === this.data?.city);
  this.selectedCity = selectedCityObj?.id; // Only the ID
}

 updateAddress(addressId: number) {
  if (addressId === undefined) {
    addressId = this.address.id;
  }

  const selectedCountryObj = this.countries.find(c => c.id === this.selectedCountry);
  const selectedStateObj = this.states.find(s => s.id === this.selectedState);
  const selectedCityObj = this.cities.find(c => c.id === this.selectedCity);

  this.addressButton = true;

  this.addressService.updateAddress(
    addressId,
    this.address.addressDescription,
    this.address.addressLine1,
    this.address.addressLine2,
    selectedCountryObj?.name,
    selectedStateObj?.name,
    selectedCityObj?.name,
    this.address.zipCode,
    this.address.streetNumber,
    this.userInfo.id,
    this.businessId,
    false,
    null,
    null,
    ''
  ).subscribe(response => {
    this.addressButton = false;

    if (response.errors) {
      return;
    }

    this.addAddressSuccessful = true;
    this.addAddressFail = false;
    this.dialogRef.close({ event: 'close', data: response?.data?.updateAddress?.data });
    this.dialog.open(SucessmsgPopupComponent, {
      backdropClass: 'notificationmodal-popup-sucess',
      data: {
        title: 'SUCCESS',
        message: 'ADDRESS_UPDATE_SUCCESS_ONLY'
      }
    });
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

   onCityChange(cityId: number) {
   this.selectedCity = cityId;
  const city = this.cities.find(c => c.id === cityId);
  this.cityName = city ? city.name : '';
   }
}
