import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';
import { AddressService } from 'src/app/service/Address.service';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pick-order-person-popup',
  templateUrl: './pick-order-person-popup.component.html',
  styleUrls: ['./pick-order-person-popup.component.css']
})
export class PickOrderPersonPopupComponent implements OnInit {

  phoneCode: string = '1';
  searchText: string = '';
  countries: Country[] = [];
  pickupDetails!: FormGroup;

  constructor(public addressService: AddressService,private cdr: ChangeDetectorRef,private fb: FormBuilder,private dialogRef: MatDialogRef<PickOrderPersonPopupComponent>) { }

 async ngOnInit() {
  this.pickupDetails = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });
  await this.loadCountries();
  }

  get getControl(): { [key: string]: AbstractControl; } {
    return this.pickupDetails.controls;
  }

  savePerson(){
    console.log(this.pickupDetails.valid, 'savePerson');
    if(this.pickupDetails.valid){
      const firstName = this.pickupDetails.get('firstName')!.value;
      const lastName = this.pickupDetails.get('lastName')!.value;
      const email = this.pickupDetails.get('email')!.value;
      const phoneNumber = this.pickupDetails.get('phoneNumber')!.value;
      let personDetails = {firstName: firstName, lastName: lastName, email: email, phoneNumber: phoneNumber}
      this.dialogRef.close({ event: 'close', data: personDetails });
    }

  }

  selectCode(code: string) {
    this.phoneCode = code;
  }

  onMenuClosedCountry() {
    this.searchText = '';
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }


  async loadCountries() {
    const response = await firstValueFrom(this.addressService.getAllCountriesForBusiness())
    this.countries = response?.data?.getAllCountries;
    this.cdr.detectChanges();
  }


}
