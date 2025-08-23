import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlpResponse } from 'src/app/models/PlpResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpQuickViewComponent } from '../../pdp-quick-view/pdp-quick-view.component';
import { PdpContent } from 'src/app/models/PdpContent';
import { DataService } from 'src/app/service/data.service';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';

@Component({
  selector: 'app-four-best-selling-products',
  templateUrl: './four-best-selling-products.component.html',
  styleUrls: ['./four-best-selling-products.component.scss']
})
export class FourBestSellingProductsComponent implements OnInit {
  @Input() data:any
  @Input() categoryId:any
  themeName: string = 'FourthTheme';
  awsUrl = environment.awsKey;
  currency = this.tokenStorage.getCurrency().symbol;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  @Input() pageType!:string;

  plpResponse!: PlpResponse;
  loading: boolean = true;
  errorMessage:string='';
  subdomain = '';
  productResponse: any = {
    bestsellerProductsEnabled: false,
    bestSellerProducts: [],

};
  pdpContent!: PdpContent;
  productPdpResponse: any = {
    bestsellerProductsEnabled: false,
    bestSellerProducts: [],
  };

sliderStyle:string = 'DOTS';
arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';
userWishlists: WishListResponse[] = [];
sessionResponse!: SessionResponse;
AlwaysShow: boolean = true;
  id: any;



  customOptions: OwlOptions = {
    loop: false,
    margin: 20,
    nav: true,
    dots: true,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
  }






  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private tokenStorage: TokenStorageService,
    private router: Router,private wishlistService: WhishlistService,private dataService: DataService,
    public dialog: MatDialog,private cookieDate: CookieDataServiceService
    ) {
      if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
      }
     }
    async ngOnInit() {
      if(environment.env !== 'local'){
        this.subdomain = window.location.hostname;
      } else {
        this.subdomain = this.route.snapshot.params['subdomain'];
      }
      this.route.params.subscribe(async routeParam => {
        const businessURL = await this.tokenStorage.getBusinessURL();
        if (this.subdomain && !businessURL) {
          this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
        }
        const currentUrl = this.router.url;
        if (currentUrl.includes('product')) {
          this.id = this.categoryId;
        } else {
          this.id = routeParam['id']
        }
        await this.loadPlp(this.subdomain, this.id);
        this.getPdpContent(this.subdomain)
      });
      this.getThemeName();
    }


  

  loadPlp(siteUrl: string, id: number){
    if(id)
      this.themeService.getBusinessProductListingPageContentBySiteUrl(siteUrl, id).subscribe(
        data => {
          if(data?.data?.getBusinessProductListingPageContentBySiteUrl){
            this.plpResponse = data?.data?.getBusinessProductListingPageContentBySiteUrl;
            this.productResponse = data?.data?.getBusinessProductListingPageContentBySiteUrl;
            console.log(this.productResponse,"checking plp best selling")
             if(this.sessionResponse?.userType !== "GENERIC" || this.sessionResponse?.userType !== undefined){
              this.setFavItems();
            }
          }
        }
      );
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

  private handleDataError(errors: any[]) {
    if (errors && errors[0] && errors[0]?.errorMessage) {
      this.errorMessage = errors[0]?.errorMessage;
    } else {
      this.errorMessage = "An unknown error occurred.";
    }
  }

  getPdpContent(siteUrl: string) {
    this.themeService.getPdpContentBySiteUrl(siteUrl)
      .subscribe(
        ({ data, errors }) => {
          if (!data || !data?.getPdpContentBySiteUrl) {
            this.handleDataError(errors);
          }
          if (data && data?.getPdpContentBySiteUrl) {
            this.pdpContent = data?.getPdpContentBySiteUrl;
            this.productPdpResponse = data?.getPdpContentBySiteUrl;
             if(this.sessionResponse?.userType !== "GENERIC" || this.sessionResponse?.userType !== undefined){
              this.setFavItems();
            }
          }
        }
      );
  }

  async setFavItems() {
    (await this.wishlistService.getCustomerWishList()).subscribe(
      data => {
        this.userWishlists = data?.data?.getCustomerWishList;
        this.productResponse?.bestSellerProducts?.forEach((product: any) => {
          if (this.userWishlists?.map(fav => fav.itemId).includes(product.id)) {
            product.addedToWishlist = true;
          }
        })
        this.productPdpResponse?.bestSellerProducts?.forEach((product: any) => {
          if (this.userWishlists?.map(fav => fav.itemId).includes(product.id)) {
            product.addedToWishlist = true;
          }
        })
      }
    );
  }

  async addItemToFovarite(product: ProductResponse) {
  (await this.wishlistService.addItemToWishList(this.businessId, product.id)).subscribe(
    data => {
      if (data?.data?.addItemToWishList != null) {
        product.addedToWishlist = true;
        this.dataService.reset();
        this.dataService.changeCount(1);
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_ADDED_TO_WISHLIST' } });
        this.dataService.notifyOther({ refresh: true });
      } else {
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
  (await this.wishlistService.removeItemFromWishList(this.businessId, product.id)).subscribe(
    data => {
      if (data?.data?.removeItemFromWishList != null) {
        product.addedToWishlist = false;
        this.dataService.reset();
        this.dataService.changeCount(-1);
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST' } });
      } else {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: '', message: data?.errors[0]?.errorMessage }
        });
      }
    }
  );
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
