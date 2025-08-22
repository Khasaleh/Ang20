import { Component, Input, OnInit } from '@angular/core';
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
