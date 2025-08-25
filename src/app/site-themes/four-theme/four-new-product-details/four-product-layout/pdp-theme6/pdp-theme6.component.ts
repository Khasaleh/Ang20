import { PromotionService } from 'src/app/service/promotion.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild, Renderer2, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-pdp-theme6',
  templateUrl: './pdp-theme6.component.html',
  styleUrls: ['./pdp-theme6.component.css']
})
export class PdpTheme6Component implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  private routerSubscription!: Subscription;
  isPlaying = false;
  showControls = false;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  @Input() data!:PdpContent
  @Input() product!:ProductResponse;
  @Input() currencySymbol !: string;
  awsUrl = environment.awsKey;
  currentIndex:any=0;
  currency = this.tokenStorage.getCurrency() ? this.tokenStorage.getCurrency().symbol: '';

  attributeNames!: string[];
  showVideo: boolean = false;
  mainImage!: string;
  color!: string;
  productImages!: string[];
  filteredValues: string[] = [];
  imagepath:string='./assets/img/default-product.png'
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
    loop: true,
    items:4,
    margin: 20,
    autoWidth:true,
    nav: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3
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
  @Output() productSkuChanges = new EventEmitter<ProductResponse>();
  filterList!: string[];

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
         const storedFilters = localStorage.getItem('filter-attrs');
        if (storedFilters && storedFilters !== 'undefined') {
          this.filterList = JSON.parse(storedFilters);
        }
        await this.loadProductDate(productId, this.filterList);
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
        this.price = this.product.price;
        if((this.product?.priceVary == null || !this.product?.priceVary)){
          this.salePrice = value.price;
        }
        if(this.product?.priceVary == true && value?.productVarientDTOs?.length == 0){
          this.salePrice = value.price;
        }
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
    this.productSkuChanges.emit(this.product);
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

    if (value.price && value.price > 0) {
      this.price = this.product.price;
      this.salePrice = value.price;
      this.product.minPrice = null!;
      this.product.maxPrice = null!;
    } else {
        this.price = this.product.price;
    }
    this.noOfProducts = value?.availableQuantity;
    this.productSkuChanges.emit(this.product);
  }

  loadProductDate(productId: number, filters: string[]) {
    this.catalogService.getProductByIdAndBusinessIdAndFilters(productId, this.businessID, filters).subscribe(
      async data => {
        if (!data || !data?.data?.getProductByIdAndBusinessIdAndFilters) {
          return;
        }
        this.product = data?.data?.getProductByIdAndBusinessIdAndFilters;
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
    this.firstTimeCalled = true;
    (await this.wishlistService.addItemToWishList(Number(this.tokenStorage.getBusinessID()), itemId)).subscribe(
      data => {
        if(data?.data?.addItemToWishList != null){
          this.product.addedToWishlist = true;
          this.firstTimeCalled = false;
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
          this.firstTimeCalled = false;
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
    this.firstTimeCalled = true;
    (await this.wishlistService.removeItemFromWishList(Number(this.tokenStorage.getBusinessID()), itemId)).subscribe(
      data => {
        if(data?.data?.removeItemFromWishList != null){
          this.product.addedToWishlist = false;
          this.firstTimeCalled = false;
          this.dataService.notifyOther({refresh: true});
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess', data:{ title: 'SUCCESS', message: 'PRODUCT_REMOVED_FROM_WISHLIST'}});
        }else {
          this.firstTimeCalled = false;
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



}
