import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-editordercustomerdetails',
  templateUrl: './editordercustomerdetails.component.html',
  styleUrls: ['./editordercustomerdetails.component.css']
})
export class EditordercustomerdetailsComponent implements OnInit {

  order!: OrderResponse;
  addCustomerInfo: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private translate: TranslateService,
  private shoppingCart: ShoppingCartService, public dialogRef: MatDialogRef<EditordercustomerdetailsComponent>) { }

  ngOnInit() {
    this.order = this.data;
  }

  async updateCustomerInfo() {
    if (
      !this.order.orderAddressResponse.firstName ||
      !this.order.orderAddressResponse.lastName
    ) {
      this.popupMessagenotefication(this.translate.instant('FNAME_LNAME_ERROR'));
      return;
    }
    if(!this.order.orderAddressResponse.email || !this.isValidEmail(this.order.orderAddressResponse.email)){
      this.popupMessagenotefication(this.translate.instant('EMAIL_ERROR'));
      return;
    }
    if(!this.order.orderAddressResponse.phoneNumber || !this.isValidPhoneNumber(this.order.orderAddressResponse.phoneNumber)){
      this.popupMessagenotefication(this.translate.instant('PHONE_ERROR'));
      return;
    }
    this.addCustomerInfo = true;
    (await this.shoppingCart.updateCustomerInfo(
      this.order.id,
      this.order.orderAddressResponse.firstName,
      this.order.orderAddressResponse.lastName,
      this.order.orderAddressResponse.phoneNumber,
      this.order.orderAddressResponse.email
    )).subscribe(
      (data) => {
        if (data?.errors) {
          this.addCustomerInfo = false;
          return;
        }
        if (data?.data?.updateCustomerInfo) {
          this.dialogRef.close({ event: 'close', data: data?.data?.updateCustomerInfo?.data });
          this.dialog.open(SucessmsgPopupComponent, {
            backdropClass: 'notificationmodal-popup-sucess',
            data: {
              title: 'SUCCESS',
              message: data?.data?.updateCustomerInfo?.message,
            },
          });
        }
      },
      (error) => {
        this.addCustomerInfo = false;
      }
    );
  }

  private isValidPhoneNumber(phoneNumber: string): boolean {
    const phoneRegex = /^[0-9]{0,15}$/;
    return phoneRegex.test(phoneNumber);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public popupMessagenotefication(message: string) {
    this.dialog.open(NotifacationMessageComponent, {
      backdropClass: 'notificationmodal-popup',
      width: '450px',
      data: { title: 'ERROR', message: message },
    });
  }
}
