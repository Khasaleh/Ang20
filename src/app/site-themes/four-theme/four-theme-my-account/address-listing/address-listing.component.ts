import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddAddressComponent } from '../add-address/add-address.component';
import { EditAddressComponent } from '../edit-address/edit-address.component';
import { Address } from 'src/app/models/user';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { AddressService } from 'src/app/service/Address.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule
  ],
  selector: 'app-address-listing',
  templateUrl: './address-listing.component.html',
  styleUrls: ['./address-listing.component.css']
})
export class AddressListingComponent implements OnInit {

  @Input() address!: any;
  @Output() deleteAddressEvent = new EventEmitter<Address>();
  user = this.tokenStorageService.getUser();
  constructor(public dialog: MatDialog, private tokenStorageService: TokenStorageService, private sharedService: SharedService,
    public addressService:AddressService,
  ) { }

  ngOnInit() {
  }

  addAddressPopup(){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddAddressComponent,{ panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.sharedService.setUserData(this.user);
      }
    });
  }

  editAddressPopup(address: Address){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditAddressComponent,{ panelClass: 'modal-x-medium-width', data: address });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.data) {
        this.sharedService.setUserData(this.user);
      }
    });
  }

  deleteUserAddress(addressId: number) {
    if(addressId == undefined){
      addressId = this.address.id;
    }
    this.addressService.deleteAddress(addressId, this.user.id).subscribe(
      (response) => {
        if(response.errors) return;
        this.dialog.open(SucessmsgPopupComponent, {
          backdropClass: 'notificationmodal-popup-sucess',
           data: { title: 'SUCCESS', message: 'ADDRESS_DELETE_SUCCESS_ONLY'
            }
        });
        this.deleteAddressEvent.emit(this.address);
      });
  }

}
