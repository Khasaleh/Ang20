import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
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
import { environment } from 'src/environments/environment';

declare var Finix: any; // Declare Finix for TypeScript

@Component({
  standalone: true,
  selector: 'app-finix-payment-checkout',
  templateUrl: './finix-payment-checkout.component.html',
  styleUrls: ['./finix-payment-checkout.component.css']
})
export class FinixPaymentCheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('finixFormContainer', { static: false }) finixFormContainer!: ElementRef;
  @Input() finixApplicationId!: string;
  @Input() merchantId!: string;
  @Output() tokenEmitter = new EventEmitter<any>();
  @Output() finixSessionKeyEmitter = new EventEmitter<any>();
  mode: string = '';

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (typeof Finix === 'undefined') {
      console.error('Finix SDK not loaded. Ensure it is included in index.html');
      return;
    }
    if(environment.env === 'prod'){
      this.mode = 'live';
    } else {
      this.mode = 'sandbox';
    }
    const FinixAuth = Finix.Auth(this.mode, this.merchantId);
    const form = Finix.CardTokenForm('finix-form', {
      showAddress: true,
      onSubmit: () => {
        form.submit(this.mode, this.finixApplicationId, (err: any, res: any) => {
          if (err) {
            console.error('Error:', err);
            return;
          }
          const token = res?.data?.id;
          const sessionKey = FinixAuth.getSessionKey();
          this.tokenEmitter.emit(res.data);
          this.finixSessionKeyEmitter.emit(sessionKey);
          console.log(res,"checking response of token")
        });
      }
    });
  }
}
