import { Component, Input, OnInit } from '@angular/core';
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
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { DataService } from 'src/app/service/data.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { TranslateService } from '@ngx-translate/core';
import { WishListResponse } from 'src/app/models/WishListResponse';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    TranslateModule
  ],
  selector: 'app-product-box-list',
  templateUrl: './product-box-list.component.html',
  styleUrls: ['./product-box-list.component.css']
})
export class ProductBoxListComponent implements OnInit {

  @Input() attrValues!: string[];
  @Input() product: any;
  subdomain = '';
  awsUrl = environment.awsKey;
  businessId = Number(this.tokenStorage.getBusinessID());
  currency = this.tokenStorage.getCurrency()?.symbol;
  ratingValue : number = 0;
  @Input() activeTheme!: string;
  @Input() isQuickView!: boolean | undefined;
  firstTimeCalled = false;

  constructor(private catalogService: CatalogServiceService,
    private route: ActivatedRoute,private router: Router,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog, private wishlistService: WhishlistService,private dataService: DataService ) { }

  ngOnInit() {
    this.ratingValue = this.roundOffReview(this.product.averageReview);
    this.subdomain = this.route.snapshot.params['subdomain'];
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = '/'+this.subdomain;
    }
  }

  navigateTOProduct(){
    localStorage.setItem('filter-attrs', JSON.stringify(this.attrValues));
    if(environment.env !== 'local'){
      this.router.navigateByUrl('product/' +  this.product.url + '/' + this.product?.id || this.product?.productId);
    } else {
      this.router.navigateByUrl(this.subdomain, '/product/' + this.product.url + '/' + this.product?.id || this.product?.productId);
    }
  }

  // Validations Configurations & Null Pointers
  getProductName(): string {
    return this.product.name || this.product.productName;
  }
  getReviewCount(): number {
    return isNaN(this.product.reviewCount) || this.product.reviewCount === null ? 0 : this.product.reviewCount;
  }
  getReviewValidation() {
    if (isNaN(this.product.averageReview) || this.product.averageReview === null) {
      this.product.averageReview = 0;
    }
  }


  pdppopup(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: id,
        subdomain: this.subdomain,
        attrValues: this.attrValues
    };
    dialogConfig.panelClass = 'modal-quickview-width';
    this.dialog.open(PdpQuickViewComponent, dialogConfig);
  }


  async addItemToFovarite(product: ProductResponse) {
    this.firstTimeCalled = true;
    (await this.wishlistService.addItemToWishList(this.businessId, product.id)).subscribe(
      data => {
        console.log(product, 'product')
        if (data.data.addItemToWishList != null) {
          console.log(product,"checking product data")
          console.log(data,"checking wishlist data")
          product.addedToWishlist = true;
          this.dataService.reset();
          this.dataService.changeCount(1);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_ADDED_TO_WISHLIST' } });
          this.dataService.notifyOther({ refresh: true });
          this.firstTimeCalled = false;
        } else {
          this.firstTimeCalled = false;
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data.errors[0].errorMessage }
          });
        }
      }
    );
    }

    async removeItemFromFovarite(product: ProductResponse) {
      this.firstTimeCalled = true;
    (await this.wishlistService.removeItemFromWishList(this.businessId, product.id)).subscribe(
      data => {
        if (data.data.removeItemFromWishList != null) {
          product.addedToWishlist = false;
          this.dataService.reset();
          this.dataService.changeCount(-1);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST' } });
          this.firstTimeCalled = false;
        } else {
          this.firstTimeCalled = false;
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data.errors[0].errorMessage }
          });
        }
      }
    );
    }

    roundOffReview(review: number): number {
      return Math.round(review);
    }

}
