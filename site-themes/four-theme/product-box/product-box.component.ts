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
import { SessionResponse } from 'src/app/models/SessionResponse';
import { StoreUsersSessionsService } from 'src/app/service/store-users-sessions.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';


@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() attrValues!: string[];
  @Input() product: any;
  @Input() activeTheme!: string;
  @Input() isQuickView!: boolean | undefined;
  subdomain = '';
  awsUrl = environment.awsKey;
  businessId = Number(this.tokenStorage.getBusinessID());
  currency = this.tokenStorage.getCurrency()?.symbol;
  ratingValue : number = 0;
  sessionResponse!: SessionResponse;
  firstTimeCalled = false;
  constructor(private catalogService: CatalogServiceService,
    private route: ActivatedRoute,private router: Router,
    private tokenStorage: TokenStorageService,private stoeSession: StoreUsersSessionsService,
    private cookieDate: CookieDataServiceService,
    public dialog: MatDialog, private wishlistService: WhishlistService,private dataService: DataService ) { }

  ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = '/'+this.subdomain;
    }
    this.ratingValue = this.roundOffReview(this.product?.averageReview);
    this.getReviewValidation();
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
    return this.product?.name || this.product?.productName;
  }
  getReviewCount(): number {
    return isNaN(this.product?.reviewCount) || this.product?.reviewCount === null ? 0 : this.product?.reviewCount;
  }
  getReviewValidation() {
    if (isNaN(this.product?.averageReview) || this.product?.averageReview === null) {
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
    dialogConfig.backdropClass = 'no-bg-scroll'; // Adding backdrop class
    this.dialog.open(PdpQuickViewComponent, dialogConfig);
  }


  async addItemToFovarite(product: ProductResponse) {
    this.firstTimeCalled = true;
    (await this.wishlistService.addItemToWishList(this.businessId, product.id || product.productId)).subscribe(
      data => {
        if (data?.data?.addItemToWishList != null) {
          product.addedToWishlist = true;
          this.firstTimeCalled = false;
          this.dataService.reset();
          this.dataService.changeCount(1);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS',
               message: 'PRODUCT_ADDED_TO_WISHLIST' } });
          this.dataService.notifyOther({ refresh: true });

          this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
          if(this.sessionResponse.userType == 'GENERIC'){
            this.stoeSession.getUserIpAddress().then(async ip => {
              (await this.stoeSession.setUserSession(ip, Number(this.tokenStorage.getBusinessID()))).subscribe(async data =>{
                this.sessionResponse = await data?.data?.setUserSession;
                await this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!,JSON.stringify(this.sessionResponse),1);
                this.dataService.notifyOther({refresh: true});
              });
            });
          }else{
            this.dataService.notifyOther({refresh: true});
          }

        } else {
          this.firstTimeCalled = false;
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage }
          });
        }
      }
    );
    }

    async removeItemFromFovarite(product: ProductResponse) {
    this.firstTimeCalled = true;
    (await this.wishlistService.removeItemFromWishList(this.businessId, product.id || product.productId)).subscribe(
      data => {
        if (data?.data?.removeItemFromWishList != null) {
          product.addedToWishlist = false;
          this.firstTimeCalled = false;
          this.dataService.reset();
          this.dataService.changeCount(-1);
          this.dataService.notifyProductId(product.id);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
            data: { title: 'SUCCESS',
            message: 'PRODUCT_REMOVED_FROM_WISHLIST' } });
        } else {
          this.firstTimeCalled = false;
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage }
          });
        }
      }
    );
    }

    roundOffReview(review: number): number {
      return isNaN(review) || review === null ? 0 : Math.round(review);
    }

}
