import { MatFormFieldModule } from '@angular/material/form-field';
import { formatDate } from '@angular/common';
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
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    TranslateModule
  ],
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
