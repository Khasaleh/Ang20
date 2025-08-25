import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { ShoppingCartResponse } from 'src/app/models/ShoppingCartResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { DataService } from 'src/app/service/data.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-theme-shopping-cart',
  templateUrl: './four-theme-shopping-cart.component.html',
  styleUrls: ['./four-theme-shopping-cart.component.scss']
})
export class FourThemeShoppingCartComponent implements OnInit, OnDestroy {

  shoppingCart!: ShoppingCartResponse;
  awsURL = environment.awsKey;
  totalPrice: number = 0;
  totalDiscount: number = 0;
  totalDiscounrPrice: number = 0;
  total : number = 0;
  subdomain!: string;
  currencySymbol = '$';
  isDiscountPrice: boolean = true;
  isTotalPrice: boolean = false;
  promocode! : string;
  promoCodeErrorMessage! : string;
  isFailed = false;
  isPromoExist: boolean = false;
  isSuccess = false;
  successMessage! :string;
  discountPrice! : number;
  promotionResponse! : any;
  businessId: any;
  isShowCatalogPromotions = false;
  isLoggedIn = false;
  private cartSubscription: Subscription | undefined;
  sessionResponse!: SessionResponse;
  businessID = Number(this.tokenStorage.getBusinessID());
  cartMessages: any[] = [];
  loadingItems: boolean = true;
  noItemsAvailable: boolean = false;
  user = this.tokenStorage.getUser();
  quantityLoading: boolean = false;
  allPromotionResponses: any[] = [];


  constructor(private tokenStorage: TokenStorageService,
  private shoppingCartService: ShoppingCartService,
  private route: ActivatedRoute,
  private translate: TranslateService,
  public dialog: MatDialog,private cookieService: CookieDataServiceService,
  private router: Router,private dataService: DataService,
  ) {
    if (this.tokenStorage.getUser()) {
      this.isLoggedIn = true;
    }
    if(this.businessID &&  cookieService.getCookie(this.businessID!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessID!.toString()));
    }
  }

  async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    if(!this.user && this.sessionResponse.userType !== 'GUEST'){
      this.router.navigate([this.subdomain+'/home']);
    }
    if(this.subdomain){
      await this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
    }
    this.currencySymbol = this.tokenStorage.getCurrency()?.symbol;
    this.dataService.notifyRemoveItemsObservable$.subscribe(async itemId => {
      if (itemId) {
        const index = this.shoppingCart?.cartItemResponseList?.findIndex(item => item.id === itemId);
        if (index !== -1) {
          this.shoppingCart?.cartItemResponseList.splice(index, 1);
          this.noItemsAvailable = this.shoppingCart?.cartItemResponseList?.length === 0;
        }
      }
    });
    if(this.sessionResponse.userType !== "GENERIC"){
      this.listUserCartItems(true);
    }
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  ngOnDestroy() {
    this.cartSubscription?.unsubscribe();
  }

  async listUserCartItems(showLoader: boolean = true){
    if (showLoader) {
      this.loadingItems = true;
    }
    this.noItemsAvailable = false;

    (await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID()))).subscribe(
      data => {
        if (data?.errors) {
          this.loadingItems = false;
          return;
        }

        this.isShowCatalogPromotions = false;
        if(data?.data?.listUserCartItems){
          this.shoppingCart = data?.data?.listUserCartItems;
          this.shoppingCart?.cartItemResponseList?.forEach(cartItem => {
            if(cartItem?.cartItemPromotionResponses?.length > 0){
              this.isShowCatalogPromotions = true;
            }
          });
          this.getCartMessages();
          this.allPromotionResponses = [
            ...(this.shoppingCart?.appliedOrderPromotions || []),
            ...(this.shoppingCart?.appliedShippingPromotions || [])
          ];
          this.noItemsAvailable = this.shoppingCart?.cartItemResponseList?.length === 0;
        } else {
          this.noItemsAvailable = true;
        }

        this.loadingItems = false;
      },
      error => {
        this.loadingItems = false;
        this.noItemsAvailable = true;
      }
    );
  }


  async getCartMessages(){
    (await this.shoppingCartService.getCartMessages()).subscribe(
      data => {
        if(data?.data?.getCartMessages){
          this.cartMessages = data?.data?.getCartMessages;
        }
      }
    );
  }

  async removeItemFromCart(itemId: any, cartId: any, item: any){
    (await this.shoppingCartService.removeItemFromCart(itemId, cartId)).subscribe(
      data => {
        if(data?.data?.removeItemFromCart){
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
            data:{title:'', message: data?.data?.removeItemFromCart?.message}});
            this.dataService.notifyOther({refresh: true});
          if(this.sessionResponse.userType !== "GENERIC"){
            this.listUserCartItems(false);
          }
        }
      }
    );
  }

  async removeAllItemsFromCart(){
    this.shoppingCart?.cartItemResponseList?.forEach(async item => {
      (await this.shoppingCartService.removeItemFromCart(item.id, this.shoppingCart.id)).subscribe(
        data => {
          if(data?.data?.removeItemFromCart){
            this.dataService.notifyOther({ refresh: true });
            this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
              data:{title:'', message: data?.data?.removeItemFromCart?.message}});
              this.dataService.notifyOther({refresh: true});
            if(this.sessionResponse.userType !== "GENERIC"){
              this.listUserCartItems(false);
            }
          }
        }
      );
    })
  }

  onChangesQuantity(event: Event, item: any) {
    const input = event.target as HTMLInputElement;
    if (parseFloat(input.value) <= 0) {
      input.value = '1';
      item.quantity = 1;
    }
  }

  async updateQuantity(item: any, cartId: any) {
    if (item.promotionItem) {
      return;
    }

    const quantity = item.quantity;
    this.quantityLoading = true;

    (await this.shoppingCartService.updateItemQuantity(item.id, cartId, quantity)).subscribe(
      data => {
        if (data?.data?.updateItemQuantity != null) {
          this.dialog.open(SucessmsgPopupComponent, {
            backdropClass: 'notificationmodal-popup-sucess',
            data: {
              title: '',
              message: data?.data?.updateItemQuantity?.message
            }
          });

          this.dataService.notifyOther({ refresh: true });

          if (this.sessionResponse.userType !== "GENERIC") {
            this.listUserCartItems(false);
          }
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage }
          });
        }

        this.quantityLoading = false;
      },
      error => {
        this.quantityLoading = false;
      }
    );
  }



  applyPromocode(promocode : string){
    if(promocode){
      this.shoppingCartService.applyOrderAndShippingPromocodeOnCart(this.shoppingCart.businessId,this.shoppingCart.id,promocode, false).subscribe(
        data => {
          console.log(data)
          if(data?.data?.applyOrderAndShippingPromocodeOnCart == null){
            this.promoCodeErrorMessage= data?.errors[0]?.errorMessage;
            this.promocode = '';
            this.isPromoExist = false;
            this.isFailed= true;
            setTimeout(() => {
              this.isFailed= false;
              this.promoCodeErrorMessage='';
            }, 3000);
            return;
          }
          this.isSuccess=true;
          this.isShowCatalogPromotions = true;
          this.successMessage=data?.data?.applyOrderAndShippingPromocodeOnCart?.message;
          if(this.sessionResponse.userType !== "GENERIC"){
            this.listUserCartItems(true);
          }
          this.promocode = '';
          setTimeout(() => {
            this.isSuccess= false;
            this.successMessage='';
          }, 3000);

        }
      );

    }
  }

  removeAppliedPromocodeOnCart(promocode : string){
    this.shoppingCartService.removeAppliedPromocodeOnCart(promocode).subscribe(
      data => {
        if(data?.data?.removeAppliedPromocodeOnCart){
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
            data:{title:'', message: data?.data?.removeAppliedPromocodeOnCart?.message}});
          if(this.sessionResponse.userType !== "GENERIC"){
            this.listUserCartItems(false);
          }
        }
      }
    );
  }

}
