import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { PdpTheme20Component } from './pdp-theme20/pdp-theme20.component';
import { PdpTheme4Component } from './pdp-theme4/pdp-theme4.component';
import { PdpTheme13Component } from './pdp-theme13/pdp-theme13.component';
import { PdpTheme1Component } from './pdp-theme1/pdp-theme1.component';
import { PdpTheme3Component } from './pdp-theme3/pdp-theme3.component';
import { PdpTheme12Component } from './pdp-theme12/pdp-theme12.component';
import { PdpTheme19Component } from './pdp-theme19/pdp-theme19.component';
import { PdpTheme14Component } from './pdp-theme14/pdp-theme14.component';
import { PdpTheme9Component } from './pdp-theme9/pdp-theme9.component';
import { PdpTheme16Component } from './pdp-theme16/pdp-theme16.component';
import { PdpTheme5Component } from './pdp-theme5/pdp-theme5.component';
import { PdpTheme10Component } from './pdp-theme10/pdp-theme10.component';
import { PdpTheme11Component } from './pdp-theme11/pdp-theme11.component';
import { PdpTheme15Component } from './pdp-theme15/pdp-theme15.component';
import { PdpTheme2Component } from './pdp-theme2/pdp-theme2.component';
import { PdpTheme7Component } from './pdp-theme7/pdp-theme7.component';
import { PdpTheme6Component } from './pdp-theme6/pdp-theme6.component';
import { PdpTheme18Component } from './pdp-theme18/pdp-theme18.component';
import { PdpTheme17Component } from './pdp-theme17/pdp-theme17.component';
import { PdpTheme8Component } from './pdp-theme8/pdp-theme8.component';
import { PdpTheme21Component } from './pdp-theme21/pdp-theme21.component';
import { PromotionService } from 'src/app/service/promotion.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, Renderer2, Inject, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AttributeResponse } from 'src/app/models/AttributeResponse';
import { AttributeValueResponse } from 'src/app/models/AttributeValueResponse';
import { CartItemVariant } from 'src/app/models/CartItemVariant';
import { MainAttributeDto } from 'src/app/models/MainAttributeDto';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ProductVarientDTO } from 'src/app/models/ProductVarientDTO';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { DataService } from 'src/app/service/data.service';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { environment } from 'src/environments/environment';
import { StoreUsersSessionsService } from 'src/app/service/store-users-sessions.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { ActivatedRoute } from '@angular/router';
import { PdpContent } from 'src/app/models/PdpContent';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import panzoom from 'panzoom';
import { FullscreenPdpImageComponent } from './fullscreen-pdp-image/fullscreen-pdp-image.component';



@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    PdpTheme10Component,
    PdpTheme11Component,
    PdpTheme12Component,
    PdpTheme13Component,
    PdpTheme14Component,
    PdpTheme15Component,
    PdpTheme16Component,
    PdpTheme17Component,
    PdpTheme18Component,
    PdpTheme19Component,
    PdpTheme1Component,
    PdpTheme20Component,
    PdpTheme21Component,
    PdpTheme2Component,
    PdpTheme3Component,
    PdpTheme4Component,
    PdpTheme5Component,
    PdpTheme6Component,
    PdpTheme7Component,
    PdpTheme8Component,
    PdpTheme9Component,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-four-product-layout',
  templateUrl: './four-product-layout.component.html',
  styleUrls: ['./four-product-layout.component.scss']
})
export class FourProductLayoutComponent implements OnInit  {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
    @ViewChild('zoomWrapper') zoomWrapper!: ElementRef;

  private routerSubscription!: Subscription;
  isPlaying = false;
  showControls = false;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @Input() data!:PdpContent
  @Input() product!:ProductResponse;
  awsUrl = environment.awsKey;
  currentIndex:any=0;
  @Input() currencySymbol: string = '';
  currency = this.tokenStorage.getCurrency() ? this.tokenStorage.getCurrency().symbol: '';

  attributeNames!: string[];
  showVideo: boolean = false;
  mainImage!: string;
  color!: string;
  productImages!: string[];
  filteredValues: string[] = [];
  imagepath:string='./assets/img/default-product.png'
  arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
  arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';
  images: any[] = [
    '../../../assets/img/items/gs1.png',
    '../../../assets/img/items/gs2.png',
    '../../../assets/img/items/gs3.png',
    '../../../assets/img/items/gs4.png',
    '../../../assets/img/items/gs1.png',
    '../../../assets/img/items/gs2.png',
    '../../../assets/img/items/gs3.png',
    '../../../assets/img/items/gs4.png',
  ];

  colorAttribute!: AttributeResponse;
  attributes: AttributeResponse[] = [];
  filteredAttributes: AttributeResponse[] = [];
  filteredColors: string[] = [];
  skus: number[] = [];
  awsURL = environment.awsKey;
  selectedSkuId!: number;
  selectedSkuPrice!: number;
  noOfProducts = 100;
  price = 0;
  salePrice: number = 0;
  quantity = 1;
  errorMessage!: string;
  message!: string;
  userWishlists: WishListResponse[] = [];
  selectedMainSku!: MainAttributeDto;
  selectedSku!: ProductVarientDTO;
  attrValue: CartItemVariant[] = [];
  sessionResponse!: SessionResponse;
  selectedImageIndex: number = 0;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  themeName: string = 'FourthTheme';
  currentAttribute !: string;
  secondAttributesList: any[] = [];
  thirdAttributesList: any[] = [];
  firstTimeThirdAttributes: any[] = [];
  isFirstTime: boolean = true;
  subdomain: string = '';
  selectedAttributeId: number | null = null;
  selectedSecondAttributeId: number | null = null;
  selectedThirdAttributeId: number | null = null;
  firstTimeCalled: boolean = false;
  exceedQuantity: boolean = false;
  routeSubscription!: Subscription;
  customOptions: OwlOptions = {
    loop: false,
    items:4,
    margin: 20,
    autoWidth:true,
    nav: true,
    dots: false,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
  }
  businessID = Number(this.tokenStorage.getBusinessID());
  secondAttribute!: string;
  thirdAttribute!: string;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private shoppingCartService: ShoppingCartService,
    private dataService: DataService,
    public dialog: MatDialog,
    private wishlistService: WhishlistService,
    private promotionService: PromotionService,
    private stoeSession: StoreUsersSessionsService,private route: ActivatedRoute,
    private cookieDate: CookieDataServiceService, private catalogService: CatalogServiceService,
    private cdr: ChangeDetectorRef, private sharedService: SharedService
    ) {
      if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
      }
     }

  async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain']
    this.quantity = 1;
    this.filteredColors = [];

    this.routeSubscription = this.route.params.subscribe(async (params) => {
    const productId = params['id'];
      if (productId) {
        await this.loadProductDate(productId);
         // Wait for Angular to update the view after data is loaded
        this.cdr.detectChanges();

        // Wait for DOM to update fully (wrap in setTimeout for safety)
        setTimeout(() => {
          this.initializeZoom();
        }, 0);
    }
    });

    this.getThemeName();
     // Add the class to the <body> tag
     this.renderer.addClass(this.document.body, 'pdp-detail-layout-page');

     // Listen for route changes and remove the class when navigating away
     this.routerSubscription = this.router.events.subscribe(event => {
       if (event instanceof NavigationStart) {
         this.renderer.removeClass(this.document.body, 'pdp-detail-layout-page');
       }
     });
  }

  initializeZoom() {
    if (this.zoomWrapper?.nativeElement) {
      panzoom(this.zoomWrapper.nativeElement, {
        zoomDoubleClickSpeed: 1,
        maxZoom: 5,
        minZoom: 1,
      });
    }
  }

  ngOnDestroy(): void {
    // Clean up the router subscription to avoid memory leaks
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  selectedColorAttribute(value: any, attributeValue: string) {
    // Reset the `isShowEdit` property for all SKUs to false
    this.product.mainAttributeDtos.forEach(sku => sku.isShowEdit = false);

    // Toggle the `isShowEdit` property of the clicked SKU
    value.isShowEdit = !value.isShowEdit;

    // Update the selected SKU
    this.selectedMainSku = value;

    // Clear and set product images based on the selected SKU
    this.product.images = [...value.imageUrls];
    // Update the current attribute with the selected value
    this.currentAttribute = attributeValue;

    // Reset the selected attributes for the second and third loops
    this.selectedSecondAttributeId = null;
    this.selectedThirdAttributeId = null;

    // Load additional attributes if other selected product attributes exist
    if (this.product.otherSelectedProductAttributes.length > 0) {
        this.listPdpAttributesByProduct(this.product.id, this.selectedMainSku.attributeDTO.attributeValueId);
    }
    this.sharedService.setMainSku(this.selectedMainSku);
    // Update the price and sale price if the selected SKU has a price
    if (value.price && value.price > 0) {
        this.price = value.price;
        this.salePrice = value.salePrice;
    } else {
        this.price = this.product.price;
    }

    // Ensure the main image URL is added if it exists and isn't already included
    if (value.mainImageUrl != null && !this.product.images.includes(value.mainImageUrl)) {
        this.product.mainImageUrl = value.mainImageUrl;
        this.product.images.push(value.mainImageUrl);
    }

    // Update the number of available products
    this.noOfProducts = value.availableQuantity;
    // Trigger change detection to ensure the UI updates immediately
    this.cdr.detectChanges();
}

  async selectedOtherAttribute(value: any,type: 'second' | 'third'){
    if (type === 'second') {
      this.selectedSecondAttributeId = value.productAttribute.id;
      this.secondAttribute = value.productAttribute.attributeValue;
    } else if (type === 'third') {
      this.selectedThirdAttributeId = value.productAttribute.id;
      this.thirdAttribute = value.productAttribute.attributeValue;
    }
    this.selectedSku = value;
    if(value.skuId == null){
     await this.listPdpAttributesByProductAndAttribute(this.product.id, this.selectedMainSku.attributeDTO.attributeValueId, value.productAttribute.attributeValueId);
      this.firstTimeThirdAttributes = [];
    }
    this.sharedService.setSku(this.selectedSku);

    if(value?.price && value?.price > 0){
      this.price = value?.price;
      this.salePrice = value?.salePrice;
    }

    if (value.mainImageUrl != null && !this.product.images.includes(value.mainImageUrl)) {
      this.product.mainImageUrl = value.mainImageUrl;
      this.product.images.push(value.mainImageUrl);
    }

  // Update the number of available products
    this.noOfProducts = value.availableQuantity;
    // Trigger change detection to ensure the UI updates immediately
    this.cdr.detectChanges();
  }

  onProductSkuChanges(product: any) {
    this.product = product;
    this.cdr.detectChanges();
  }

  loadProductDate(productId: number) {
    this.catalogService.getProductById(productId, this.businessID).subscribe(
      async data => {
        if (!data || !data?.data?.getProductByIdAndBusinessId) {
          return;
        }
        this.product = data?.data?.getProductByIdAndBusinessId;
        console.log(this.product,"checking prod images")
        this.price = this.product?.price;
        this.salePrice = this.product?.salePrice;
        this.noOfProducts = this.product?.quantity;
        for(let sku of this.product?.mainAttributeDtos){
          if(sku.defaultSku){
            let attributeValue;
            if(this.product.mainAttributeDtos[0].attributeDTO.isColor){
              attributeValue = sku.attributeDTO.attributeValueName;
            } else {
              attributeValue = sku.attributeDTO.attributeValue;
            }
            await this.selectedColorAttribute(sku, attributeValue);
            this.cdr.detectChanges();
          }
        }
        if(this.sessionResponse?.userType !== "GENERIC"){
          (await this.wishlistService.getCustomerWishList()).subscribe(
            data => {
              console.log(data)
              this.userWishlists = data?.data?.getCustomerWishList;
              this.userWishlists = this.userWishlists?.filter(wishItem => wishItem.itemId == this.product.id);
              if(this.userWishlists?.length == 1){
                this.product.addedToWishlist = true;
              }
            }
          );
        }
        this.cdr.detectChanges();
      }
    );
  }

  listPdpAttributesByProduct(productId: number, mainAttributeId: number){
    this.catalogService.listPdpAttributesByProduct(productId, mainAttributeId).subscribe(
      data => {
        if (data?.data?.listPdpAttributesByProduct == null) {
          return;
        }
        this.secondAttributesList = data?.data?.listPdpAttributesByProduct;
        if(this.isFirstTime){
          this.firstTimeThirdAttributes = this.product?.otherSelectedProductAttributes?.filter(product => product.attributeId !== this.secondAttributesList[0].productAttribute.attributeId);
          this.isFirstTime = false;
        }
      }
    );
  }

  listPdpAttributesByProductAndAttribute(productId: number, mainAttributeId: number, attributeId: number){
    this.catalogService.listPdpAttributesByProductAndAttribute(productId, mainAttributeId, attributeId).subscribe(
      data => {
        if (data?.data?.listPdpAttributesByProductAndAttribute == null) {
          return;
        }
        this.thirdAttributesList = data?.data?.listPdpAttributesByProductAndAttribute;
      }
    );
  }

  async addItemToCart(){
    if(this.selectedSku && !this.selectedSku.skuId && this.selectedMainSku != null && this.selectedMainSku.productVarientDTOs.length > 0){
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'ALL_ATTRIBUTES_REQUIRED' }
      });
     return;
    }
    if(this.selectedSku == null && this.selectedMainSku != null && this.selectedMainSku.productVarientDTOs.length > 0){
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'ALL_ATTRIBUTES_REQUIRED' }
      });
     return;
    }
    if(this.selectedMainSku == null && this.product.mainAttributeDtos.length > 0){
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'ALL_ATTRIBUTES_REQUIRED' }
      });
     return;
    }
    if(this.noOfProducts == 0){
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'OUT_OF_STOCK'}
      });
     return;
    }
    if(this.quantity > this.noOfProducts){
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: '', message: 'NO_ENOUGH_QUANTITY'}
      });
     return;
    }
    this.firstTimeCalled = true;
    (await this.shoppingCartService.addItemToCart(Number(this.tokenStorage.getBusinessID()), this.product.id, this.selectedSku ? this.selectedSku.skuId : null,
      this.quantity, this.price, this.product.promotionId ? this.product.promotionId : null, this.salePrice ? this.salePrice : null, this.product.categoryId ? this.product.categoryId : null,
      this.selectedMainSku ? this.selectedMainSku.skuId : null)).subscribe(
      data => {
        if(data?.errors){
          this.firstTimeCalled = false;
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
        if(data?.data?.addItemToCart != null){
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
              data:{ title: 'SUCCESS', message: 'PRODUCT_ADDED_TO_CART'}});
          this.firstTimeCalled = false;
          this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
          if(this.sessionResponse?.userType == 'GENERIC'){
            this.stoeSession.getUserIpAddress().then(async ip => {
              (await this.stoeSession.setUserSession(ip, Number(this.tokenStorage.getBusinessID()))).subscribe(async data =>{
                this.sessionResponse = await data.data.setUserSession;
                await this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!,JSON.stringify(this.sessionResponse),1);
                this.dataService.notifyOther({refresh: true});
              });
            });
          }else{
            this.dataService.notifyOther({refresh: true});
          }
        }
      }
      );
  }

  checkQuantity(event: any){
    const input = event?.target as HTMLInputElement;
    if (this.product?.availableQuantity !== null && this.quantity > this.product?.availableQuantity) {
        this.exceedQuantity = true;
        return;
    }
    if (this.selectedMainSku?.availableQuantity !== null && this.quantity > this.selectedMainSku?.availableQuantity) {
        this.exceedQuantity = true;
        return;
    }
    if (this.selectedSku?.availableQuantity !== null && this.quantity > this.selectedSku?.availableQuantity) {
        this.exceedQuantity = true;
        return;
    }
    this.exceedQuantity = false;
  }


  async addItemToFovarite(itemId: number){
    (await this.wishlistService.addItemToWishList(Number(this.tokenStorage.getBusinessID()), itemId)).subscribe(
      data => {
        if(data?.data?.addItemToWishList != null){
          this.product.addedToWishlist = true;
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess', data:{ title: 'SUCCESS', message: 'PRODUCT_ADDED_TO_WISHLIST'}});
          this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
          if(this.sessionResponse?.userType == 'GENERIC'){
            this.stoeSession.getUserIpAddress().then(async ip => {
              console.log('getUserIpAddress ====== ',ip);
              (await this.stoeSession.setUserSession(ip, Number(this.tokenStorage.getBusinessID()))).subscribe(async data =>{
                this.sessionResponse = await data.data.setUserSession;
                await this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!,JSON.stringify(this.sessionResponse),1);
                this.dataService.notifyOther({refresh: true});
              });
            });
          }else{
            this.dataService.notifyOther({refresh: true});
          }
        }else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
      }
    );
  }

  async removeItemFromFovarite(itemId: number){
    (await this.wishlistService.removeItemFromWishList(Number(this.tokenStorage.getBusinessID()), itemId)).subscribe(
      data => {
        if(data?.data?.removeItemFromWishList != null){
          this.product.addedToWishlist = false;
          this.dataService.notifyOther({refresh: true});
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess', data:{ title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST'}});
        }else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
      }
    );
  }


  selectImage(imagesrc: any,index:any) {
    this.imagepath = imagesrc;
    this.currentIndex = index;
    this.product.mainImageUrl = imagesrc;
    this.showVideo = false;
  }

  selectValue(attribute: AttributeResponse, value: AttributeValueResponse){
    attribute?.attributeValues?.forEach(valu => valu.isActive = false);
    value.isActive = true;
  }

  selectMainSku(mainSku: MainAttributeDto){
    this.product?.mainAttributeDtos?.forEach(sku => sku.isShowEdit = false);
    mainSku.isShowEdit = true;
  }

  onImageClick(index: number, image: string) {
    this.selectedImageIndex = index;
    this.product.mainImageUrl = image;
  }

  scrollToTop(): void {
    this.scrollContainer.nativeElement.scrollTop = 0;
  }
  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }



scrollToSection(sectionId: string) {
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

getThemeName(): void {
  const themeDashboard = sessionStorage.getItem('theme-dashboard');
  if (themeDashboard) {
    const themeDashboardObj = JSON.parse(themeDashboard);
    this.themeName = themeDashboardObj.themeName;
  }
}
increaseQuantity(): void {
  this.quantity++;
  this.checkQuantity(this.quantity);
}

decreaseQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }
  this.checkQuantity(this.quantity);
}

enableVideo(){
  this.showVideo = true;
}

 playVideo() {
    this.videoPlayer.nativeElement.play();
  }

  onPlay() {
    this.isPlaying = true;
    this.showControls = true;
  }

  onPause() {
    this.isPlaying = false;
    this.showControls = false;
  }

fulscreenImage() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.panelClass = ['modal-large-width', 'no-box-shadow'];
  dialogConfig.backdropClass = 'bg-full-screen';
  dialogConfig.disableClose = true;

  dialogConfig.data = {
    imageUrl: this.product?.mainImageUrl
  };

  this.dialog.open(FullscreenPdpImageComponent, dialogConfig);
}


}
