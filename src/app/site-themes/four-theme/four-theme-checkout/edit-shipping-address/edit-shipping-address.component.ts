import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from 'src/app/service/Address.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-edit-shipping-address',
  templateUrl: './edit-shipping-address.component.html',
  styleUrls: ['./edit-shipping-address.component.css']
})
export class EditShippingAddressComponent implements OnInit {
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
  AddressInstructions: boolean = true;
  shortName: string = '';


  constructor(private dialog: MatDialog, private addressService: AddressService, private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<EditShippingAddressComponent>,private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: any) {

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
  this.selectedCountry = country;
  this.selectedState = null;
  this.selectedCity = null;

  this.countryName = country?.name || '';
  this.shortName = country?.shortName || '';

  if (country?.id) {
    this.getAllStatesOfCountry(country.id);
  }
}

 stateSelected(state: any) {
  this.selectedState = state;
  this.selectedCity = null;

  if (state?.id) {
    this.getAllCitiesOfState(state.id);
  }
}

}
