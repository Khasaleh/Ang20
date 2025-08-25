import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { DataService } from 'src/app/service/data.service';
import { WishListResponse } from 'src/app/models/WishListResponse';

@Component({
  selector: 'app-theme-product-carousel',
  templateUrl: './theme-product-carousel.component.html',
  styleUrls: ['./theme-product-carousel.component.scss']
})
export class ThemeProductCarouselComponent implements OnInit {

@Input() data:any=[];
@Input() activeTheme!: string;
subdomain: string = '';
awsUrl = environment.awsKey;
currency = this.tokenStorage.getCurrency()?.symbol;
userWishlists: WishListResponse[] = [];
businessId = Number(this.tokenStorage.getBusinessID());
arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';
AlwaysShow: boolean = true;

constructor(
  private route: ActivatedRoute,
  private tokenStorage: TokenStorageService,
  public dialog: MatDialog, private wishlistService: WhishlistService,private dataService: DataService,
  ) { }

ngOnInit() {
  this.subdomain = this.route.snapshot.params['subdomain'];
 
  console.log(this.data.data,"checking theme carousel")
  console.log(this.data,"checking theme carousel mina")
}

replaceSpecialChars(str: string) {
  // Replace spaces and special characters with underscores
  return str.replace(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g, '_');
}

  customOptions: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true, // Add this option to enable navigation arrows
    dots: true,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`,`<img src="${this.arrowright}" alt="RIGHT">`],
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


  customOptions3: OwlOptions = {
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    autoplayHoverPause: true,
    navSpeed: 700,
    autoplay: false,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`,`<img src="${this.arrowright}" alt="RIGHT">`],
    autoplayTimeout: 3000, 
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

  pdppopup(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: id,
        subdomain: this.subdomain
    };
    dialogConfig.panelClass = 'modal-quickview-width';
    this.dialog.open(PdpQuickViewComponent, dialogConfig);
}

  async setFavItems() {
    (await this.wishlistService.getCustomerWishList()).subscribe(
      data => {
        this.userWishlists = data.data.getCustomerWishList;
        this.data?.data?.forEach((product: any) => {
          if (this.userWishlists.map(fav => fav.itemId).includes(product.id)) {
            product.addedToWishlist = true;
          }
        });
      }
    );
  }

  async addItemToFovarite(product: ProductResponse) {
    try {
      const response = await (await this.wishlistService.addItemToWishList(this.businessId, product.productId || product.id)).toPromise();

      if (response?.data?.addItemToWishList != null) {
        product.addedToWishlist = true;
        this.dataService.reset();
        this.dataService.changeCount(1);
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_ADDED_TO_WISHLIST' } });
      } else {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: '', message: response.errors[0].errorMessage }
        });
      }
    } catch (error) {
    }
  }


  async removeItemFromFovarite(product: ProductResponse) {
    try {
      const response = await (await this.wishlistService.removeItemFromWishList(this.businessId, product.productId || product.id)).toPromise();

      if (response?.data?.removeItemFromWishList != null) {
        product.addedToWishlist = false;
        this.dataService.reset();
        this.dataService.changeCount(-1);
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST' } });
      } else {
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: '', message: response.errors[0].errorMessage }
        });
      }
    } catch (error) {
    }
  }


}
