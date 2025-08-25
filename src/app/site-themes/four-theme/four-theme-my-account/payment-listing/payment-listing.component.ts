import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { CCInfo } from 'src/app/models/user';
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
  selector: 'app-payment-listing',
  templateUrl: './payment-listing.component.html',
  styleUrls: ['./payment-listing.component.css']
})
export class PaymentListingComponent implements OnInit {

  @Input() payment!: CCInfo;
  @Output() deletePaymentEvent = new EventEmitter<CCInfo>();
  user = this.tokenStorageService.getUser();
  constructor(public dialog: MatDialog, private tokenStorageService: TokenStorageService, private sharedService: SharedService,
    public addressService:AddressService
  ) { }

  ngOnInit() {
  }

  addPaymentPopup(){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddPaymentComponent,{ panelClass: 'modal-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.result) {
        this.user.paymentDetails.push(result?.result);
        this.tokenStorageService.saveUser(this.user, true);
        this.sharedService.setUserData(this.user);
      }
    });
  }

  deletePayment(ccId: number) {
    this.addressService.deletePayment(ccId, this.user.id).subscribe(
      (response) => {
        if(response?.errors) return;
        this.dialog.open(SucessmsgPopupComponent, {
          backdropClass: 'notificationmodal-popup-sucess',
           data: { title: 'SUCCESS', message: 'PAYMENT_DELETE_SUCCESS_ONLY'
            }
        });
        this.deletePaymentEvent.emit(this.payment);
      });
  }

}
