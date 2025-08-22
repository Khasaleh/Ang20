import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-editorderpickupinfo',
  templateUrl: './editorderpickupinfo.component.html',
  styleUrls: ['./editorderpickupinfo.component.css']
})
export class EditorderpickupinfoComponent implements OnInit {
  filterDates = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date ? date >= today : false;
  };

  pickupPerson: string = '';
  order!: OrderResponse;
  addCustomerInfo: boolean = false;
  pickupDetails!: FormGroup;
  isTimeCorrect: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,private fb: FormBuilder,
  private translate: TranslateService,
  private shoppingCart: ShoppingCartService, public dialogRef: MatDialogRef<EditorderpickupinfoComponent>) { }

  ngOnInit() {
    this.order = this.data;
    const pickupTime = new Date(this.order.pickupTime);
    if (isNaN(pickupTime.getTime())) {
      throw new Error('Invalid pickupTime format');
    }
    const pickupDate = pickupTime.toISOString().split('T')[0];
    const pickupTimeFormatted = pickupTime.toTimeString().split(' ')[0].slice(0, 5);
    this.pickupDetails = this.fb.group({
      pickupDate: [pickupDate, Validators.required],
      pickupTime: [pickupTimeFormatted, Validators.required],
    });
  }

  get getControl(): { [key: string]: AbstractControl; } {
    return this.pickupDetails.controls;
  }


  async updatePickupInfo() {
    if (!this.order.pickUpPersonResponse.firstName || !this.order.pickUpPersonResponse.lastName) {
      this.popupMessagenotefication(this.translate.instant('FNAME_LNAME_ERROR'));
      return;
    }
    if (!this.order.pickUpPersonResponse.email || !this.isValidEmail(this.order.pickUpPersonResponse.email)) {
      this.popupMessagenotefication(this.translate.instant('EMAIL_ERROR'));
      return;
    }
    if (!this.order.pickUpPersonResponse.phoneNumber || !this.isValidPhoneNumber(this.order.pickUpPersonResponse.phoneNumber)) {
      this.popupMessagenotefication(this.translate.instant('PHONE_ERROR'));
      return;
    }
    const pickupDateValue = this.pickupDetails.get('pickupDate')?.value;
    const pickupTimeValue = this.pickupDetails.get('pickupTime')?.value;
    if (!pickupDateValue || !pickupTimeValue) {
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'Please update correct details' }
      });
      return;
    }
    this.addCustomerInfo = true;
    try {
      const isTimeAvailable = await this.checkTimeAvailable();
      if (!isTimeAvailable) {
        this.addCustomerInfo = false;
        return;
      }
      const [hours, minutes] = pickupTimeValue.split(':');
      const combinedDateTime = new Date(pickupDateValue);
      combinedDateTime.setHours(Number(hours), Number(minutes));
      const browserLocale = navigator.language || 'en-US';
      const formattedDateTime = formatDate(combinedDateTime, 'yyyy-MM-dd HH:mm:ss', browserLocale);
      (await this.shoppingCart.updatePickUpInfo(
        this.order.id,
        this.order?.pickUpPersonResponse?.firstName,
        this.order?.pickUpPersonResponse?.lastName,
        this.order?.pickUpPersonResponse?.phoneNumber,
        this.order?.pickUpPersonResponse?.email,
        formattedDateTime
      )).subscribe(
        data => {
          if (data?.errors) {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
            });
            this.addCustomerInfo = false;
            return;
          }
          if (data?.data?.updatePickUpInfo) {
            this.dialogRef.close({ event: 'close', data: data?.data?.updatePickUpInfo?.data });
            this.dialog.open(SucessmsgPopupComponent, {
              backdropClass: 'notificationmodal-popup-sucess',
              data: {
                title: 'SUCCESS',
                message: data?.data?.updatePickUpInfo?.message
              }
            });
          }
        }
      );
    } catch (error) {
      this.addCustomerInfo = false;
    }
}

async checkTimeAvailable(): Promise<boolean> {
    const pickupDateValue = this.pickupDetails.get('pickupDate')?.value;
    const pickupTimeValue = this.pickupDetails.get('pickupTime')?.value;
    if (!pickupDateValue || !pickupTimeValue) {
      return false;
    }
    try {
      const [hours, minutes] = pickupTimeValue.split(':');
      const combinedDateTime = new Date(pickupDateValue);
      combinedDateTime.setHours(Number(hours), Number(minutes));
      const browserLocale = navigator.language || 'en-US';
      const formattedDateTime = formatDate(combinedDateTime, 'yyyy-MM-ddTHH:mm:ss', browserLocale);
      const response = await lastValueFrom(
        await this.shoppingCart.isTimeAvailable(formattedDateTime)
      );
      if (response?.errors) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: response?.errors[0]?.errorMessage }
        });
        return false;
      }
      if (response?.data?.isTimeAvailable?.timeAvailable === false) {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: this.translate.instant('PLEASE_SELECT_BUSINESS_TIME') }
        });
        return false;
      }
      return response?.data?.isTimeAvailable?.timeAvailable === true;
    } catch (error) {
      console.error('Error checking time availability:', error);
      return false;
    }
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
