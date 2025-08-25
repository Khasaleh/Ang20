import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Component, HostListener, OnInit } from '@angular/core';
import { CurrencyResponse } from 'src/app/models/CurrencyResponse';
import { PdpContent } from 'src/app/models/PdpContent';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ProductService } from 'src/app/service/product.service';
import { GuestFavoriteService } from 'src/app/service/guest-favorite.service';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { DataService } from 'src/app/service/data.service';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-browser-history',
  templateUrl: './browser-history.component.html',
  styleUrls: ['./browser-history.component.scss']
})
export class BrowserHistoryComponent implements OnInit {
  pdpResponse!: PdpContent;
  product!: ProductResponse;
  businessId: number = Number(this.tokenStorageService.getBusinessID())
  pageNum: number = 1;
  sortField: string = 'addedDate';
  sortDir: string = 'desc';
  historyProductsInfo: ProductBrowseHistory[] = []
  currency!: CurrencyResponse;
  awsUrl = environment.awsKey;
  loading: boolean = false;
  AlwaysShow: boolean = true;
  userWishlists: WishListResponse[] = [];
  subdomain = '';
  sessionResponse!: SessionResponse;
  user = this.tokenStorageService.getUser();
  filterType: string = 'ALL';
  canLoadMoreData = true;
  noOfPages!: number;
  themeName: string = 'FourthTheme';
  firstTimeCalled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private tokenStorageService: TokenStorageService,
    private guestFavoriteService: GuestFavoriteService,
    private wishlistService: WhishlistService,
    public dialog: MatDialog,
    private dataService: DataService,
    private cookieService: CookieDataServiceService,private router: Router,
  ) {
    if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
    }
  }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    if(!this.user){
      if (environment.env !== 'local') {
        this.subdomain = '';
      }
      this.router.navigate([this.subdomain+'/home']);
    }
    this.currency = this.tokenStorageService.getCurrency();
    this.getThemeName();
    this.loadHistory();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  filterProducts(filterType: any){
    this.filterType = filterType;
    this.historyProductsInfo = [];
    this.canLoadMoreData = true;
    this.loadHistory();
  }

  async loadHistory(): Promise<void> {
    this.loading = true;
    (await this.productService.listUserProductsBrowseHistory(
      this.businessId, 1, 8, this.sortField, this.sortDir, this.filterType)).subscribe(response => {
        if (response?.errors) {
          this.loading = false;
          return;
        }
        const formattedProducts = response?.data?.listUserProductsBrowseHistory?.map((historyItem: { productResponse: { price: string; salePrice: string; }; }) => {
          return {
            ...historyItem,
            productResponse: {
              ...historyItem.productResponse,
              price: historyItem.productResponse.price ? +parseFloat(historyItem.productResponse.price).toFixed(2) : null,
              salePrice: historyItem.productResponse.salePrice ? +parseFloat(historyItem.productResponse.salePrice).toFixed(2) : null
            }
          };
        });

        this.historyProductsInfo = [...this.historyProductsInfo, ...formattedProducts];
        if(this.sessionResponse.userType !== "GENERIC"){
          this.setFavItems();
        }
        this.loading = false;
      });
  }

  async addItemToFovarite(product: ProductResponse) {
    if (!this.tokenStorageService.getUser()) {
      product.addedToWishlist = true
      this.guestFavoriteService.addToFavorite(product)
      return
    }
    this.firstTimeCalled = true;
    (await this.wishlistService.addItemToWishList(this.businessId, product.id)).subscribe(
      data => {
        if (data?.data?.addItemToWishList != null) {
          product.addedToWishlist = true;
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
            data: { title: '', message: data?.data?.addItemToWishList?.message } });
            this.firstTimeCalled = false;
          this.dataService.notifyOther({ refresh: true });
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

  async setFavItems() {
    if (this.tokenStorageService.getUser()) {
      (await this.wishlistService.getCustomerWishList()).subscribe(
        data => {
          this.userWishlists = data?.data?.getCustomerWishList;
          this.historyProductsInfo?.forEach(product => {
            if (this.userWishlists.map(fav => fav.itemId).includes(product?.productResponse?.id)) {
              product.productResponse.addedToWishlist = true;
            }
          })
        }
      );
    }
  }


  async removeItemFromFovarite(product: ProductResponse) {
    this.firstTimeCalled = true;
    (await this.wishlistService.removeItemFromWishList(this.businessId, product.id)).subscribe(
      data => {
        if (data?.data?.removeItemFromWishList != null) {
          product.addedToWishlist = false;
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
            data: { title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST' } });
            this.firstTimeCalled = false;
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

  async loadMoreProductsBrowseHistory() {
    if (this.loading || this.pageNum === this.noOfPages) {
      return;
    }
    this.loading = true;
    (await this.productService.listUserProductsBrowseHistory(this.businessId, this.pageNum + 1, 8, this.sortField, this.sortDir, this.filterType)).subscribe(
      (data) => {
        if (data && data?.data && data?.data?.listUserProductsBrowseHistory) {
          const formattedProducts = data?.data?.listUserProductsBrowseHistory?.map((historyItem: { productResponse: { price: string; salePrice: string; }; }) => {
            return {
              ...historyItem,
              productResponse: {
                ...historyItem.productResponse,
                price: historyItem.productResponse.price ? +parseFloat(historyItem.productResponse.price).toFixed(2) : null,
                salePrice: historyItem.productResponse.salePrice ? +parseFloat(historyItem.productResponse.salePrice).toFixed(2) : null
              }
            };
          });
          if (formattedProducts?.length > 0) {
            for (const audit of formattedProducts) {
              if (!this.historyProductsInfo?.some((existingAudit) => existingAudit.id === audit.id)) {
                this.historyProductsInfo.push(audit);
              }
            }
            this.noOfPages = data?.data?.listUserProductsBrowseHistory[0]?.noOfPages;
            this.pageNum++;
          } else {
            this.canLoadMoreData = false;
          }
          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollPosition = window.pageYOffset + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const distanceToBottom = pageHeight - scrollPosition;
    if (distanceToBottom < 100 && this.canLoadMoreData) {
      this.loadMoreProductsBrowseHistory();
    }
  }

  pdppopup(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: id,
        subdomain: this.subdomain
    };
    dialogConfig.panelClass = 'modal-quickview-width';
    this.dialog.open(PdpQuickViewComponent, dialogConfig);
}

getThemeName(): void {
  let storeKey;
  if(environment.env !== 'local'){
    storeKey = window.location.hostname;
  } else {
    const path = window.location.pathname;
    storeKey = path.split('/')[1];
  }

  const themeDashboard = sessionStorage.getItem('theme-dashboard' + `_${storeKey}`);
  if (themeDashboard) {
    const themeDashboardObj = JSON.parse(themeDashboard);
    this.themeName = themeDashboardObj.themeName;
  }
}

}

export interface ProductBrowseHistory {
  id: string;
  customerId: string;
  businessId: string;
  addedDate: string;
  productResponse: ProductResponse;
}

export interface ProductResponse {
  id: number;
  productName: string;
  mainImageUrl: string;
  quantity: number;
  price: number;
  salePrice: number;
  averageReview: number;
  reviewsCount: number;
  reviewsResponse: ReviewsResponse;
  addedToWishlist: boolean;
}

export interface ReviewsResponse {
  reviewResponses: ReviewResponse[];
}

export interface ReviewResponse {
  id: string;
  headline: string;
  comment: string;
  rating: number;
  customerId: string;
  reviewTime: string;
  userName: string;
  profileImageUrl: string;
  userEmail: string;
  imageUrl: string;
  productName: string;
}
