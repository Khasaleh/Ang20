import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from '../product-box/product-box.component';
import { firstValueFrom } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { DataService } from 'src/app/service/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { ThemeDashboardContent } from 'src/app/models/ThemeDashboardContent';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ProductBoxComponent,
    RouterModule
  ],
  selector: 'app-four-theme-wishlist',
  templateUrl: './four-theme-wishlist.component.html',
  styleUrls: ['./four-theme-wishlist.component.css']
})

export class FourThemeWishlistComponent implements OnInit {


  dashboardContent: ThemeDashboardContent = this.tokenStorage.getThemeDashboard()!;
  activeTheme = this.dashboardContent.themeName;
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  wishlists: WishListResponse[] = [];
  awsURL = environment.awsKey;
  subdomain!: string;
  currencySymbol! : string;
  message!: string;
  errorMessage!: string;
  businessId=Number(this.tokenStorage.getBusinessID()!);
  isLoading: boolean = false;
  sessionResponse!: SessionResponse;
  AlwaysShow: boolean = true;


  constructor(
    private wishlistService: WhishlistService,
    private catalogService: CatalogServiceService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private dataService: DataService,
    public dialog: MatDialog,private cookieDate: CookieDataServiceService
  ) {
    if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
    }
  }

  async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.currencySymbol = this.tokenStorage.getCurrency()?.symbol;
    this.dataService.notifyProductObservable$.subscribe(async itemId => {
      if (itemId) {
        const index = this.wishlists.findIndex(item => item.itemId === itemId);
        if (index !== -1) {
          this.wishlists.splice(index, 1);
        }
      }
    });
    if(this.sessionResponse.userType !== "GENERIC"){
      await this.getWhishlist();
    }
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  async getWhishlist() {
    this.isLoading = true;
    try {
      const observableRes = await this.wishlistService.getCustomerWishList();
      const res = await firstValueFrom(observableRes);
      this.wishlists = res?.data?.getCustomerWishList || [];
      this.wishlists = this.wishlists.filter(
        whishItem => whishItem?.businessId === this.businessId
      );
      const productRequests = this.wishlists.map(async whishItem => {
        try {
          const productObservable = await this.catalogService.getProductById(
            whishItem.itemId,
            this.businessId
          );
          const productRes = await firstValueFrom(productObservable);
          whishItem.productResponse =
            productRes?.data?.getProductByIdAndBusinessId || null;
          if (whishItem.productResponse) {
            whishItem.productResponse.addedToWishlist = true;
          }
        } catch (err) {
        }
      });
      await Promise.all(productRequests);
    } catch (error) {
    } finally {
      this.isLoading = false;
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

}
