import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AttributeResponse } from 'src/app/models/AttributeResponse';
import { AttributeValueResponse } from 'src/app/models/AttributeValueResponse';
import { CartItemVariant } from 'src/app/models/CartItemVariant';
import { MainAttributeDto } from 'src/app/models/MainAttributeDto';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ProductVarientDTO } from 'src/app/models/ProductVarientDTO';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { DataService } from 'src/app/service/data.service';
import { PromotionService } from 'src/app/service/promotion.service';
import { StoreUsersSessionsService } from 'src/app/service/store-users-sessions.service';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quickview-theme3',
  templateUrl: './quickview-theme3.component.html',
  styleUrls: ['./quickview-theme3.component.css']
})

export class QuickviewTheme3Component implements OnInit {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  selectedImageIndex: number = 0;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  isPlaying = false;
  showControls = false;
  @Input() product!:ProductResponse;
  awsUrl = environment.awsKey;
  currentIndex:any=0;
  subdomain: string = '';
  @Input() currencySymbol: string = '';
  currency = this.tokenStorage.getCurrency() ? this.tokenStorage.getCurrency().symbol: '';
  showVideo: boolean = false;
  attributeNames!: string[];

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
  businessID = Number(this.tokenStorage.getBusinessID());
  themeName: string = 'FourthTheme';
  currentAttribute  !: string;
  secondAttributesList: any[] = [];
  thirdAttributesList: any[] = [];
  firstTimeThirdAttributes: any[] = [];
  isFirstTime: boolean = true;
  selectedAttributeId: number | null = null;
  selectedSecondAttributeId: number | null = null;
  selectedThirdAttributeId: number | null = null;
  firstTimeCalled: boolean = false;
  exceedQuantity: boolean = false;
  secondAttribute!: string;
  thirdAttribute!: string;
  @Output() productSkuChanges = new EventEmitter<ProductResponse>();
  @Input() attrValues!: string[];


  constructor(
    private tokenStorage: TokenStorageService,
    private shoppingCartService: ShoppingCartService,
    private dataService: DataService,
    public dialog: MatDialog,
    private wishlistService: WhishlistService,
    private promotionService: PromotionService,
    private catalogService: CatalogServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stoeSession: StoreUsersSessionsService,
    private cookieDate: CookieDataServiceService,
    private cdr: ChangeDetectorRef
    ) {
    }

  async ngOnInit() {
    this.subdomain = this.data.subdomain;
    this.quantity = 1;
    this.filteredColors = [];
    this.loadProductDate(this.data.id, this.attrValues);
    this.getThemeName();
  }

  loadProductDate(productId: number, filters: string[]){
    this.catalogService.getProductByIdAndBusinessIdAndFilters(productId, this.businessID, filters).subscribe(
      async data => {
        this.filteredColors = [];
        this.productImages = [];
        this.product = data?.data?.getProductByIdAndBusinessIdAndFilters;
        this.price = this.product?.price;
        this.salePrice = this.product?.salePrice;
        this.noOfProducts = this.product?.availableQuantity;
        this.productImages = this.product?.images;
        if(this.product && this.product?.mainAttributeDtos) {
          for(let sku of this.product?.mainAttributeDtos){
            if(sku && sku?.defaultSku){
              let attributeValue;
              if(this.product.mainAttributeDtos[0].attributeDTO.isColor){
                attributeValue = sku.attributeDTO.attributeValueName;
              } else {
                attributeValue = sku.attributeDTO.attributeValue;
              }
              await this.selectedColorAttribute(sku, attributeValue);
            }
          }
        }
      }
    );
  }

  selectedColorAttribute(value: any, attributeValue: string) {
    // Reset the `isShowEdit` property for all SKUs to false
    this.product.mainAttributeDtos.forEach(sku => sku.isShowEdit = false);

    // Toggle the `isShowEdit` property of the clicked SKU
    value.isShowEdit = !value.isShowEdit;

    // Update the selected SKU
    this.selectedMainSku = value;

    // Update the current attribute with the selected value
    this.currentAttribute = attributeValue;

    // Reset the selected attributes for the second and third loops
    this.selectedSecondAttributeId = null;
    this.selectedThirdAttributeId = null;

    // Trigger change detection to ensure the UI updates immediately
    this.cdr.detectChanges();

    // Load additional attributes if other selected product attributes exist
    if (this.product.otherSelectedProductAttributes.length > 0) {
        this.listPdpAttributesByProduct(this.product.id, this.selectedMainSku.attributeDTO.attributeValueId);
    }

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

    // Clear and set product images based on the selected SKU
    this.product.images = [...value.imageUrls];

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
  this.cdr.detectChanges();
}

  listPdpAttributesByProduct(productId: number, mainAttributeId: number){
    this.catalogService.listPdpAttributesByProduct(productId, mainAttributeId).subscribe(
      data => {
        if (data?.data?.listPdpAttributesByProduct == null) {
          return;
        }
        this.secondAttributesList = data?.data?.listPdpAttributesByProduct;
        if(this.isFirstTime){
          this.firstTimeThirdAttributes = this.product.otherSelectedProductAttributes.filter(product => product.attributeId !== this.secondAttributesList[0].productAttribute.attributeId);
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

  async addItemToCart(){
    console.log(this.selectedSku)
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
              data:{title:'', message: data?.data?.addItemToCart?.message}});
          this.firstTimeCalled = false;
          this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
          if(this.sessionResponse?.userType == 'GENERIC'){
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
        }
      }
      );
  }


  async addItemToFovarite(itemId: number){
    this.firstTimeCalled = true;
    (await this.wishlistService.addItemToWishList(Number(this.tokenStorage.getBusinessID()), itemId)).subscribe(
      async data => {
        if(data?.data?.addItemToWishList != null){
          this.product.addedToWishlist = true;
          this.firstTimeCalled = false;
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
             data:{title:'', message: data?.data?.addItemToWishList?.message}});
          this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
          if(this.sessionResponse?.userType == 'GENERIC'){
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
      async data => {
        if(data?.data?.removeItemFromWishList != null){
          this.product.addedToWishlist = false;
          this.firstTimeCalled = false;
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess', data:{title:'', message: data?.data?.removeItemFromWishList?.message}});

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

   // Scroll to the top of the div
   scrollToTop(): void {
    this.scrollContainer.nativeElement.scrollTop = 0;
  }

  // Scroll to the bottom of the div
  scrollToBottom(): void {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  getEncodedProductUrl(): string {
    return encodeURIComponent(this.product.url);
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


