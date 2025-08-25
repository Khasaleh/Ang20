import { Component, OnInit } from '@angular/core';
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
import { Options } from '@angular-slider/ngx-slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';
import { Router } from '@angular/router';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    RouterModule
  ],
  selector: 'app-four-theme-reviews',
  templateUrl: './four-theme-reviews.component.html',
  styleUrls: ['./four-theme-reviews.component.scss']
})
export class FourThemeReviewsComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  order!: OrderResponse;
  awsUrl = environment.awsKey;
  currency = this.tokenstorage.getCurrency()?.symbol;
  orderPrefix = this.tokenstorage.getOrderFormat()?.prefix;
  orderSuffix = this.tokenstorage.getOrderFormat()?.suffix;
  subdomain = this.tokenstorage.getBusinessURL();
  storeName = this.tokenstorage.getBStoreName();

  constructor(
    private dialog:MatDialog,
    private router: Router,
    public tokenstorage: TokenStorageService,
    private reviewService : ReviewService
    ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.order = navigation.extras.state['data'].order;
      if(this.order){
        this.order.orderDetails.forEach(async item => {
          (await this.reviewService.getReviewByProductAndCustomer(item.product.id)).subscribe(
            data => {
              if(data?.data?.getReviewByProductIdAndCustomerIdAndUserType != null){
                item.action='EDIT';
              }else{
                item.action='ADD';
              }
            }
          );
        });
      }
    }
  }
  ngOnInit(): void {

  }



  addreviewmodal(item: OrderDetailResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit_review_modal';
    dialogConfig.data = {item: item, action: 'ADD'};
    this.dialog.open(EditReviewModalComponent, dialogConfig)
    .afterClosed().subscribe(
      data => {
        if(data){
          item.action = 'EDIT';
        }
      }
    );
  }

  editreviewmodal(item: OrderDetailResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit_review_modal';
    dialogConfig.data = {item: item, action: 'EDIT'};
    this.dialog.open(EditReviewModalComponent, dialogConfig)
    .afterClosed().subscribe(
      data => {
        if(data){
          item.action = 'EDIT';
        }
      }
    );
  }

}
