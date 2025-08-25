import { Component, Inject, OnInit } from '@angular/core';
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
