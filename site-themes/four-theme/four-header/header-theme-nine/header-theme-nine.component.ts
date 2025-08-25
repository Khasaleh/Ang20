import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/service/Address.service';
import { User } from 'src/app/models/user';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { environment } from 'src/environments/environment';
import { ShoppingCartResponse } from 'src/app/models/ShoppingCartResponse';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { DataService } from 'src/app/service/data.service';
import { AnnouncementBarResponse } from 'src/app/models/AnnouncementBarResponse';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, firstValueFrom } from 'rxjs';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { TranslateSiteService } from 'src/app/service/translate-site.service';
import { GuestFavoriteService } from 'src/app/service/guest-favorite.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { CartItemResponse } from 'src/app/models/CartItemResponse';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { StoreUsersSessionsService } from 'src/app/service/store-users-sessions.service';
import { ForgotpasswordcheckoutComponent } from 'src/app/forgotpasswordcheckout/forgotpasswordcheckout.component';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { ThemeDashboardContent } from 'src/app/models/ThemeDashboardContent';
import { DrawerControlService } from 'src/app/service/drawer-control.service';
import { GuestShoppingCartService } from 'src/app/service/guest-shopping-cart.service';
import { SubscribePopupComponent } from 'src/app/site-themes/default_theme/subscribe-popup/subscribe-popup.component';
import { ForgotpasswordforstoreComponent } from '../../forgotpasswordforstore/forgotpasswordforstore.component';
import { SignupModalCheckoutComponent } from '../../signup-modal-checkout/signup-modal-checkout.component';

declare const google: any;

@Component({
  selector: 'app-header-theme-nine',
  templateUrl: './header-theme-nine.component.html',
  styleUrls: ['./header-theme-nine.component.css']
})
export class HeaderThemeNineComponent implements OnInit {
  @ViewChild('userprofiledrawer') userProfileDrawer!: MatDrawer;
  @ViewChild('userInfoMenuTrigger') userInfoMenuTrigger!: MatMenuTrigger;
  showalerttop: boolean = true;
  showNavbar: boolean = false;
  sidenavcategory: boolean = false;
  parentcategorylist: boolean = true
  selectedDiv: number = 1;
  @ViewChild('menu') menu!: ElementRef;
  isSticky: boolean = false;
  click_tab_text: any = '';
  showcategory: any = 'Rugs';
  @ViewChild('drawer') drawer!: MatDrawer;
  searchbox3: boolean = false;
  subdomain!: string;
  user: User = this.tokenStorage.getUser();
  form: any = {};
  menuExpanded = false;
  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  awsURL = environment.awsKey;
  assetsAwsKey = environment.assetsAwsKey;
  shoppingCart!: ShoppingCartResponse | null;
  message!: string;
  isLogo = false;
  logoImage: string = "../../../assets/img/themelogoplaceholder.svg";
  totalPrice: number = 0;
  @Input() announcementBar!: AnnouncementBarResponse;
  @Input() activeTheme!: string;
  @Input() categories!: CategoryResponse[];
  keyword = '';
  searchControl = new FormControl('');
  from = 0;
  size = 20;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  products: ProductResponse[] = [];
  closed = false;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  wishlists: WishListResponse[] = [];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  selectedCat!: CategoryResponse;
  isMenuOpened = false;
  isCardOpen: boolean[] = [];
  selectedCategory!: CategoryResponse;
  hidepassword: boolean = true;
  CategoryExceed: boolean = true;
  theme3ExploreCat: boolean = false;
  field: string = 'REVIEWS';
  order: string = 'ASC';
  businessAddresses: Address[] = [];
  private cartSubscription: Subscription | undefined;
  private favSubscription: Subscription | undefined;
  reload: boolean = false;
  sessionResponse!: SessionResponse;
  private userDataSubscription!: Subscription;
  isRememberMe = false;
  isHeaderFixed = false;
  sessionUser: string = '';
  dashboardContent: ThemeDashboardContent = this.tokenStorage.getThemeDashboard()!;
  currencySymbol = this.tokenStorage.getCurrency()?.symbol;
  iframeReady = false;
  @Input() footObject:any;
  @Input() socialLinks: any;
  storeName = this.tokenStorage.getBStoreName();

  languages = [
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'am', name: 'Amharic' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hy', name: 'Armenian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'eu', name: 'Basque' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bn', name: 'Bengali' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'zh-CN', name: 'Chinese (Simplified)' },
    { code: 'zh-TW', name: 'Chinese (Traditional)' },
    { code: 'co', name: 'Corsican' },
    { code: 'hr', name: 'Croatian' },
    { code: 'cs', name: 'Czech' },
    { code: 'da', name: 'Danish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'en', name: 'English' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'et', name: 'Estonian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'fr', name: 'French' },
    { code: 'fy', name: 'Frisian' },
    { code: 'gl', name: 'Galician' },
    { code: 'ka', name: 'Georgian' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'ha', name: 'Hausa' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'he', name: 'Hebrew' },
    { code: 'hi', name: 'Hindi' },
    { code: 'hmn', name: 'Hmong' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ig', name: 'Igbo' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ga', name: 'Irish' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'jv', name: 'Javanese' },
    { code: 'kn', name: 'Kannada' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'km', name: 'Khmer' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'ko', name: 'Korean' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'lo', name: 'Lao' },
    { code: 'la', name: 'Latin' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ms', name: 'Malay' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mt', name: 'Maltese' },
    { code: 'mi', name: 'Maori' },
    { code: 'mr', name: 'Marathi' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'my', name: 'Myanmar (Burmese)' },
    { code: 'ne', name: 'Nepali' },
    { code: 'no', name: 'Norwegian' },
    { code: 'ny', name: 'Nyanja (Chichewa)' },
    { code: 'or', name: 'Odia (Oriya)' },
    { code: 'ps', name: 'Pashto' },
    { code: 'fa', name: 'Persian' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'ro', name: 'Romanian' },
    { code: 'ru', name: 'Russian' },
    { code: 'sm', name: 'Samoan' },
    { code: 'gd', name: 'Scots Gaelic' },
    { code: 'sr', name: 'Serbian' },
    { code: 'st', name: 'Sesotho' },
    { code: 'sn', name: 'Shona' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'si', name: 'Sinhala' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'so', name: 'Somali' },
    { code: 'es', name: 'Spanish' },
    { code: 'su', name: 'Sundanese' },
    { code: 'sw', name: 'Swahili' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tl', name: 'Tagalog (Filipino)' },
    { code: 'tg', name: 'Tajik' },
    { code: 'ta', name: 'Tamil' },
    { code: 'tt', name: 'Tatar' },
    { code: 'te', name: 'Telugu' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ug', name: 'Uyghur' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'cy', name: 'Welsh' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'zu', name: 'Zulu' },
  ];




  constructor(public dialog: MatDialog,
    private businessSettings: BusinessSettingService,
    private drawerControlService: DrawerControlService,
    private route: ActivatedRoute,
    private catalogService: CatalogServiceService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private translate: TranslateService,
    private shoppingCartService: ShoppingCartService,
    private businessSetting: BusinessSettingService,
    private dataService: DataService,
    private router: Router,
    private wishlistService: WhishlistService,
    private guestShoppingCartService: GuestShoppingCartService,
    public translateSiteService: TranslateSiteService,
    private guestFavoriteService: GuestFavoriteService,
    public translateSite: TranslateSiteService,
    private titleService: Title,
    private stoeSession: StoreUsersSessionsService,
    private cookieDate: CookieDataServiceService,
    private sharedService: SharedService,
  ) {
    let subdomainForSite;
    if(environment.env !== 'local'){
      subdomainForSite = window.location.hostname;
    } else {
      subdomainForSite = this.route.snapshot.params['subdomain'];
    }
    if (subdomainForSite) {
      this.translateSite.setSiteLanguage(subdomainForSite);
    }
    if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
    }

  }


  toggleMenu() {
    setTimeout(() => {
      this.menuExpanded = !this.menuExpanded;
    }, 0);
  }

  @HostListener('window:click', ['$event'])
  listenToOutsideClick(event: PointerEvent) {
    const target = event.target as HTMLElement;
    const isToggler = target.getAttribute('id') === 'navbarDropdown'
    if (!this.menuExpanded || isToggler) {
      return;
    }

    this.menuExpanded = false;
  };


  async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.getUpdatedUserData();
    const businessURL = await this.tokenStorage.getBusinessURL();
    if (this.subdomain && !businessURL) {
      await this.tokenStorage.saveBusinessData(this.subdomain, this.subdomain);
      this.loadUserData();
    } else {
      this.loadUserData();
    }
    this.isRememberMe = this.tokenStorage.getRememberMe();
    this.sharedService.refreshShoppingCart$.subscribe(() => {
      this.shoppingCart = null;
    });
    this.dataService.count$.subscribe(count => {
      this.wishlists.length = this.wishlists?.length + count;
    });
    this.dataService.notifyObservable$.subscribe(notify => {
      if(notify.refresh){
        this.loadCartAndFav();
      }
    })
    // await this.loadUserData();
    this.titleService.setTitle(this.storeName ?? 'Fazeal Ecommerce Store');
    this.getStoreLogo();
    this.getStoreCategories();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchQuery) => {
        this.keyword = searchQuery!;
        this.products = [];
        if (searchQuery && searchQuery.trim().length > 0 && this.keyword.length >= 2) {
          this.searchProductsByCategoryAndBrand(this.keyword);
        }
      });

      this.checkTranslateWidget();
    this.drawerControlService.openDrawer$.subscribe(() => {
      this.userProfileDrawer.open();
    });
    this.drawerControlService.openDropdown$.subscribe(() => {
      if (this.userInfoMenuTrigger) {
        this.userInfoMenuTrigger.openMenu();
      }
    });

    this.listBusinessAddresses();


  }


  listBusinessAddresses(){
    this.businessSettings.getBusinessAddressesByBusinessId(Number(this.tokenStorage.getBusinessID()))
    .subscribe(data => {
      if(data?.data?.getBusinessAddressesByBusinessId){
        this.businessAddresses = data?.data?.getBusinessAddressesByBusinessId;
        console.log(this.businessAddresses,"checking business adddress")
        this.businessAddresses = this.businessAddresses?.filter(address => address?.addressType == 'STORE');
        if(this.businessAddresses?.length > 0){
        }
      }
    });
   }




  waitForIframeToLoad(): void {
    const maxRetries = 10; // Maximum retries to avoid infinite loop
    let attempts = 0;

    const checkInterval = setInterval(() => {
      const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;

      if (iframe && iframe.contentDocument) {
        clearInterval(checkInterval); // Stop checking
        this.iframeReady = true;
        console.log('Google Translate iframe is ready!');
      } else {
        attempts++;
        if (attempts >= maxRetries) {
          clearInterval(checkInterval); // Stop checking after max retries
          console.error('Google Translate iframe not loaded after maximum retries.');
        }
      }
    }, 500); // Check every 500ms
  }

  checkTranslateWidget(): void {
    const translateElement = document.getElementById('google_translate_element');
    if (!translateElement) {
      console.error('Google Translate widget not loaded.');
    } else {
      console.log('Google Translate widget is ready.');
    }
  }


  changeLanguage(langCode: string): void {
    let storeKey;
    if (environment.env !== 'local') {
      storeKey = window.location.hostname;
    } else {
      const path = window.location.pathname;
      storeKey = path.split('/')[1];
    }
    localStorage.setItem('selectedLang'+`_${storeKey}`, langCode);
    this.translateSite.loadGoogleTranslate(langCode);

    const googleTranslateDropdown = document.querySelector(
      '.goog-te-combo'
    ) as HTMLSelectElement;

    if (!googleTranslateDropdown) {
      console.error('Google Translate dropdown not found.');
      return;
    }
    googleTranslateDropdown.value = langCode;
    googleTranslateDropdown.dispatchEvent(new Event('change'));
    console.log(`Language changed to: ${langCode}`);
  }

  checkingCategoriesMobile(): void {
    if (window.innerWidth < 768) {
      this.CategoryExceed = true
    } else {
      this.CategoryExceed = false
    }
  }

  getUpdatedUserData() {
    this.userDataSubscription = this.sharedService.getUserData().subscribe(data => {
      if(data?.id || data?.firstName){
        this.user = data;
        if(this.user && this.user?.id){
          this.user.profile = data?.profile;
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  async loadUserData() {
    // this.businessId = Number(this.tokenStorage.getBusinessID());
    setTimeout(() => {
      const businessId = Number(this.tokenStorage.getBusinessID());
      if (this.user && this.user?.id) {
        this.user = this.tokenStorage.getUser();
        this.sessionResponse = new SessionResponse();
        this.sessionResponse.id = this.user?.id;
        this.sessionResponse.userType = this.user?.userType;
        this.cookieDate.setCookie(businessId.toString(), JSON.stringify(this.sessionResponse), 1);
        this.loadCartAndFav();
        this.isLoggedIn = true;
      } else {
        this.stoeSession.getUserIpAddress().then(async ip => {
          console.log('getUserIpAddress ====== ', ip);
          (await this.stoeSession.setUserSession(ip, businessId)).subscribe(async data => {
            this.sessionResponse = data.data.setUserSession;
            await this.cookieDate.setCookie(businessId.toString(), JSON.stringify(this.sessionResponse), 1);
            this.loadCartAndFav();
          });
        });
        this.isLoggedIn = false;
      }
    }, 500);
    // this.loadCartAndFav();
  }

  private loadSubscribeAfterMerge() {
    const modalValue = sessionStorage.getItem('check_subscribe');
    const modal = modalValue ? JSON.parse(modalValue) : false;
    if (modal) {
      this.loadSubscribeModal('FOURTH');
      sessionStorage.removeItem('check_subscribe');
    }
  }

  async loadCartAndFav() {
    this.currencySymbol = this.tokenStorage.getCurrency()?.symbol;
    this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
    if(this.sessionResponse.userType !== "GENERIC") {
      await this.getShoppingCartItems();
      await this.getUserCartItems();
      await this.getWhishlist();
    }
    if (this.reload) {
      this.reload = false;
      this.guestShoppingCartService.emptyCart()
      // window.location.reload();
    } else {
      if(this.sessionResponse.userType !== "GENERIC"){
        this.listShoppingCart();
        this.getWishListItems();
      }
    }
    this.loadSubscribeAfterMerge();

    if(this.sessionResponse.userType !== "GENERIC"){
      this.refreshAddToCart();
    }

    this.refreshAddToWishList();
  }

  getStoreLogo() {
    this.businessSetting.getStoreLogoBySiteUrl(this.subdomain).subscribe(
      data => {
        if (data.data?.getStoreLogoBySiteUrl == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          this.isLogo = false;
          return;
        }
        this.isLogo = true;
        this.logoImage = data.data?.getStoreLogoBySiteUrl
      }
    );
  }

  getStoreCategories() {
    console.log(this.categories,"header categories")
    this.categories.forEach(category => this.isShowLikeDiv.push(false));
    if (this.categories.length > 4) {
      if(window.innerWidth > 992) {
        this.CategoryExceed = true;
      }
      else {
        this.CategoryExceed = true;
      }

    }
    else if (window.innerWidth < 992) {
      this.CategoryExceed = true;
    }

    else {
      this.CategoryExceed = false;
    }
    // this.catalogService.findAllCategoryBySiteUrl(this.subdomain).subscribe(
    //   data => {
    //     this.categories = data.data.findAllCategoryBySiteUrl;

    //   }
    // );
  }

  async getUserCartItems() {
    let newPSItems: { id: number | null, skuId: number | null, quantity: number }[] = [];
    const guestList = this.guestShoppingCartService.getCartItemsByBusinessId(Number(this.tokenStorage.getBusinessID()))
    if (guestList) {
      guestList.cartItemResponseList.forEach((guestCartItem: CartItemResponse) => {
        let foundSku: CartItemResponse | undefined = this.shoppingCart?.cartItemResponseList.find(oldCartItem => oldCartItem.skuId === guestCartItem.skuId);
        let foundProduct: CartItemResponse | undefined = this.shoppingCart?.cartItemResponseList.find(oldCartItem => oldCartItem.productId === guestCartItem.productId && !oldCartItem.skuId);
        if (foundSku) {
          newPSItems.push({ id: guestCartItem.id, skuId: guestCartItem.skuId, quantity: guestCartItem.cacheQuantity })
        } else if (foundProduct) {
          newPSItems.push({ id: foundProduct.id, skuId: null, quantity: guestCartItem.cacheQuantity })
        } else {
          newPSItems.push({ id: guestCartItem.id, skuId: guestCartItem.skuId, quantity: guestCartItem.cacheQuantity })
        }
      })
    }
    if (newPSItems.length > 0) {
      this.reload = true;
      sessionStorage.setItem('check_subscribe', JSON.stringify(true))
      const r = await firstValueFrom(this.shoppingCartService.updateCartItem((Number(this.tokenStorage.getBusinessID())), newPSItems))
      if (r.errors) return;
      this.shoppingCart = r.data.updateCartItem
      // TO-DO left discount & promotion
      if (r.errors) return
      // this.router.navigate([`/${this.subdomain}`]);
      this.guestShoppingCartService.emptyCart()
      this.updateShoppingTotal();
    } else {
      if(this.sessionResponse.userType !== "GENERIC"){
        this.listShoppingCart();
      }
    }
  }

  private async listShoppingCart() {
    (await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID()))).subscribe(
      data => {
        if (data.errors) return;
        this.shoppingCart = data.data.listUserCartItems;
        this.updateShoppingTotal();
      }
    );
  }

  private updateShoppingTotal() {
    this.totalPrice = 0;
    if (this.shoppingCart?.cartItemResponseList)
      this.shoppingCart?.cartItemResponseList.forEach(cartItem => {
        if (cartItem.salePrice) {
          this.totalPrice = this.totalPrice + (cartItem.salePrice * cartItem.quantity);
        } else {
          this.totalPrice = this.totalPrice + (cartItem.price * cartItem.quantity);
        }
      });
  }

  searchProductsByCategoryAndBrand(query: string) {
    this.catalogService.searchProductsByAllFiltersForSlpByBusiness(query, this.businessId, this.from, this.size, [], [], null,null,null,
      this.field, this.order
    ).subscribe(
      data => {
        if (data?.data?.slpSearch?.products) {
          this.products = data?.data?.slpSearch?.products;
        }
      }
    )
  }

  onSearchClickn() {

    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    if (this.keyword.trim() === '') {
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      return;
    }
    const queryParams = { searchTerm: this.keyword };
    this.router.navigate([`/${this.subdomain}/s`], { queryParams });
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel();
      this.keyword = '';
    }

  }

  optionSelection(event: any) {
    if (!event.isUserInput) return;
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    this.keyword = event.source.value;
    const queryParams = { searchTerm: this.keyword };
    this.router.navigate([`/${this.subdomain}/s`], { queryParams });
    if (this.autocompleteTrigger) {
      this.autocompleteTrigger.closePanel();
      this.keyword = '';
    }
  }

  onEnterKeyPress(event: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    if (this.keyword.trim() === '') {
      this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      return;
    }
    if  (event.keyCode === 13 || event.key === 'Enter') {
      const queryParams = { searchTerm: this.keyword };
      this.router.navigate([`/${this.subdomain}/s`], { queryParams });
      if (this.autocompleteTrigger) {
        this.autocompleteTrigger.closePanel();
        this.keyword = '';
      }
    }
  }

  isShow: boolean = true

  //hiding info box
  isShowLikeDiv: boolean[] = [];
  isShowAllDiv: boolean = false;


  //onclick toggling both
  toggleLikes(index: any) {
    if (this.isShowLikeDiv[index] == true) {
      this.isShowLikeDiv[index] = false;
    } else {
      this.isShowLikeDiv = [];
      this.categories.forEach(category => this.isShowLikeDiv.push(false));
      this.isShowAllDiv = false;
      this.isShowLikeDiv[index] = true;
    }
  }

  toggleAllDev() {
    this.isShowAllDiv = !this.isShowAllDiv;
  }

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,16}[a-zA-Z0-9]$/;
    if (!usernamePattern.test(username)) {
      this.dialog.open(NotifacationMessageComponent, {
        backdropClass: 'notificationmodal-popup',
        width: '450px',
        data: { title: 'ERROR', message: this.translate.instant('USERNAME_ERROR') }
      });
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: this.translate.instant('EMAIL_ERROR') }
        });
        return false;
    }
    return true;
}

  async onSubmit(type: string, loginType: string) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    if (loginType == 'FAZEAL') {
      const { username, password } = this.form;
      if (!this.validateUsername(username)) {
        return;
      }
      const loginData = await this.authService.login(username, password, "SOCIAL", Number(this.tokenStorage.getBusinessID()), this.isRememberMe).toPromise().then(response => response).catch(e => e);
      const data = loginData?.data?.authenticateUser;
      if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
        this.errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
        this.isLoginFailed = true;
        return
      } else if (!data) {
        this.errorMessage = this.translate.instant('SIGNIN_LOGINFAILED')
        this.isLoginFailed = true;
        return
      }
      this.authService.setLoggedIn();
      this.user = new User();
      this.user.firstName = data.firstName
      this.user.lastName = data.lastName
      this.user.username = data.username
      this.user.id = data.id
      this.user.userType = 'FAZEAL_REGISTERED';
      this.user.profile = data.profile
      this.user.coverPhoto = data.cover
      this.user.email = data.email
      this.user.isSubscribed = false;
      this.user.phone = data.phone;
      this.user.addressList = data.addressList;
      this.user.paymentDetails = data.paymentDetails;

      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.cookieDate.deleteUserCookie('user');
      this.cookieDate.setUserCookie(data?.firstName + ' ' + data?.lastName, 1);
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveRefreshToken(data.refreshToken);
      this.tokenStorage.saveUser(this.user, true);
      const guestId = this.sessionResponse.id;
      await this.stoeSession.getUserIpAddress().then(async ip => {
        console.log('getUserIpAddress ====== ', ip);
        (await this.stoeSession.setLoggedUserSession(ip, Number(this.tokenStorage.getBusinessID()), this.sessionResponse.id, 'FAZEAL_REGISTERED')).subscribe(async data => {
        });
      });
      this.sessionResponse.id = this.user.id;
      this.sessionResponse.userType = 'FAZEAL_REGISTERED';
      this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);

      this.sharedService.setUserData(this.user);
      sessionStorage.removeItem('guestInfo');

      this.sharedService.triggerReload();
      console.log(this.tokenStorage.getBusinessID()!)
      this.sessionUser = this.cookieDate.getUserCookie('user');
      this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!));
      this.shoppingCartService.cartMerge(Number(this.tokenStorage.getBusinessID()!), this.user.id, guestId, 'FAZEAL_REGISTERED')
        .subscribe(async data => {
          if (data?.data?.cartMerge) {
            this.loadSubscribeModal(type);
            this.sessionResponse.id = this.user.id;
            this.sessionResponse.userType = 'FAZEAL_REGISTERED';
            this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
            this.unsubscibe()
            await this.loadCartAndFav()
            return;
          }
        });
      const currentUrl = this.router.url;
      const segments = currentUrl.split('/');
      const lastSegment = segments[segments.length - 1];
      if (lastSegment === 'checkout') {
        const currentRoute = `/${segments[1]}/checkout`;
        const navigationExtras: NavigationExtras = {
          skipLocationChange: true
        };
        this.router.navigateByUrl(currentRoute, navigationExtras);
        this.sharedService.triggerReload();
      }
      if (this.router.url.includes('order-details')) {
        this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      }
      this.loadSubscribeModal(type);

      this.unsubscibe()
      await this.loadCartAndFav()
      this.authService.notifyLogoutLoginDetector(this.user)
    } else {
      const { username, password } = this.form;
      if (!this.validateEmail(username)) {
        return;
      }
      const loginData = await this.authService.login(username, password, "STORE", Number(this.tokenStorage.getBusinessID()), this.isRememberMe).toPromise().then(response => response).catch(e => e);
      const data = loginData?.data?.authenticateUser;
      if (loginData?.errors && loginData?.errors[0]?.errorMessage) {
        this.errorMessage = loginData?.errors[0].errorMessage.replace('/]/[', '')
        this.isLoginFailed = true;
        this.dialog.open(NotifacationMessageComponent, {
          backdropClass: 'notificationmodal-popup',
          width: '450px',
          data: { title: 'ERROR', message: this.errorMessage }
        });
        return
      } else if (!data) {
        this.errorMessage = this.translate.instant('SIGNIN_LOGINFAILED')
        this.isLoginFailed = true;
        return
      }
      this.authService.setLoggedIn();
      this.user = new User();
      this.user.firstName = data.firstName
      this.user.lastName = data.lastName
      this.user.phone = data.phoneNumber
      this.user.id = data.id
      this.user.email = data.email
      this.user.userType = 'STORE_REGISTERED';
      this.user.phone = data.phone;
      this.user.addressList = data.addressList;
      this.user.paymentDetails = data.paymentDetails;
      this.user.accessToken = data.accessToken;
      this.user.refreshToken = data.refreshToken;
      this.user.profile = data.profile;
      this.user.countryCode = data.countryCode;
      this.user.emailVerified = data.emailVerified;
      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.cookieDate.deleteUserCookie('user');
      this.cookieDate.setUserCookie(data?.firstName + ' ' + data?.lastName, 1);
      this.tokenStorage.saveToken(data.accessToken);
      this.tokenStorage.saveRefreshToken(data.refreshToken);
      this.tokenStorage.saveRememberMe(this.isRememberMe);
      this.tokenStorage.saveUser(this.user, this.isRememberMe);
      const guestId = this.sessionResponse.id;
      await this.stoeSession.getUserIpAddress().then(async ip => {
        console.log('getUserIpAddress ====== ', ip);
        (await this.stoeSession.setLoggedUserSession(ip, Number(this.tokenStorage.getBusinessID()), this.sessionResponse.id, 'STORE_REGISTERED')).subscribe(async data => {
        });
      });
      this.sessionResponse.id = this.user.id;
      this.sessionResponse.userType = 'STORE_REGISTERED';
      this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
      this.sharedService.setUserData(this.user);
      sessionStorage.removeItem('guestInfo');
      this.sharedService.triggerReload();
      this.sessionUser = this.cookieDate.getUserCookie('user');
      this.sessionResponse = JSON.parse(this.cookieDate.getCookie(this.tokenStorage.getBusinessID()!)!);
      this.shoppingCartService.cartMerge(Number(this.tokenStorage.getBusinessID()!), this.user.id, guestId, 'STORE_REGISTERED')
        .subscribe(async data => {
          if (data?.data?.cartMerge) {
            this.loadSubscribeModal(type);
            this.sessionResponse.id = this.user.id;
            this.sessionResponse.userType = 'STORE_REGISTERED';
            this.cookieDate.setCookie(this.tokenStorage.getBusinessID()!, JSON.stringify(this.sessionResponse), 1);
            this.unsubscibe()
            await this.loadCartAndFav()
            return;
          }
        });
      if (this.router.url.includes('order-details')) {
        this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
      }
      this.authService.notifyLogoutLoginDetector(this.user)
      this.unsubscibe()
      await this.loadCartAndFav()
    }
  }

  public toggleRememberMe(): void {
    this.isRememberMe = !this.isRememberMe;
    this.tokenStorage.saveRememberMe(this.isRememberMe);
  }

  private loadSubscribeModal(type: string) {
    this.catalogService.getCustomer(this.tokenStorage.getUser().id, Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if (data?.data?.getCustomer == null) {
          setTimeout(() => {
            this.openloginmodal(type);
          }, 3000);
        } else {
          this.user.isSubscribed = true;
          this.tokenStorage.saveUser(this.user, true);
        }
      }
    );
  }

  async getShoppingCartItems() {
    const data = await firstValueFrom(await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID())))
    if (data?.errors) return;
    this.shoppingCart = data?.data?.listUserCartItems;
    this.totalPrice = 0;
    if (this.shoppingCart?.cartItemResponseList)
      this.shoppingCart?.cartItemResponseList?.forEach(cartItem => {
        if (cartItem.salePrice) {
          this.totalPrice = this.totalPrice + (cartItem.salePrice * cartItem.quantity);
        } else {
          this.totalPrice = this.totalPrice + (cartItem.price * cartItem.quantity);
        }
      });
  }

  async getWhishlist() {
    let added = false;
    const res = await firstValueFrom(await this.wishlistService.getCustomerWishList())
    if (res?.errors) return
    this.wishlists = res?.data?.getCustomerWishList;
    this.wishlists = this.wishlists?.filter(whishItem => whishItem.businessId == this.businessId);

    let gfl: any[] = this.guestFavoriteService.getFavoriteItemsByBusinessId(Number(this.tokenStorage.getBusinessID()))
    gfl.forEach(async i => {
      const piwl = this.wishlists.find(wl => wl.businessId === i.businessId && wl.id === i.id)
      if (!piwl) {
        const addRes = await firstValueFrom(await this.wishlistService.addItemToWishList(Number(this.tokenStorage.getBusinessID()), i.id))
        this.guestFavoriteService.removeFromFavorite(i.id)
        if (addRes?.errors) return
        this.wishlists = [...this.wishlists, ...gfl]
        added = true;
      }
    })
    if (added) {
      this.reload = true;
      sessionStorage.setItem('check_subscribe', JSON.stringify(true))
      this.dialog.open(SucessmsgPopupComponent,
        {
          backdropClass: 'notificationmodal-popup-sucess',
          data: { title: 'SUCCESS', message: 'FAV_LIST_UPDATED' }
        });
    }
  }




  async removeItemFromCart(itemId: any, cartId: any, item: any) {
    (await this.shoppingCartService.removeItemFromCart(itemId, cartId)).subscribe(
      data => {
        if (data?.data?.removeItemFromCart) {
          this.dataService.setReflectCartItems(true);
          this.dataService.notifyRemoveItem(itemId);
          this.shoppingCart?.cartItemResponseList.forEach(item => {
            if (item.id == itemId) {
              const index = this.shoppingCart?.cartItemResponseList.indexOf(item);
              this.shoppingCart?.cartItemResponseList.splice(index!, 1);
            }
          });
          this.shoppingCart = data?.data?.removeItemFromCart?.data;
          if(this.shoppingCart?.cartItemResponseList?.length == 0){
            this.shoppingCart = null!;
          }
        }

      }
    );
  }

  async logout() {
    const token = this.tokenStorage.getRefreshToken();
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    if(this.sessionResponse.userType === 'STORE_REGISTERED'){
        this.isLoggedIn = false;
        this.user.profile = '';
        this.shoppingCart = null;
        this.authService.notifyLogoutLoginDetector(undefined);
        this.tokenStorage.signOut();
        this.sessionResponse = new SessionResponse();
        this.sessionResponse.id = null!;
        this.sessionResponse.userType = 'GENERIC';
        this.cookieDate.setCookie(this.businessId!.toString(), JSON.stringify(this.sessionResponse), 1);
        this.cookieDate.deleteUserCookie('user');
        this.sessionUser = '';
        this.sharedService.setCookiesUserData();
        this.sharedService.triggerReload();
        const currentUrl = this.router.url;
        const segments = currentUrl.split('/');
        const lastSegment = segments[segments.length - 1];
        if (lastSegment === 'checkout') {
          this.router.navigate([`${segments[1]}/-guest`]);
        }
        this.unsubscibe()
        await this.loadCartAndFav()
        this.router.navigate(['/' + this.subdomain + '/home']);
        this.user = new User();
        this.wishlists = [];
        this.user.id = null!;
        this.user.profile = '';
        this.user.firstName = '';
        this.user.lastName = '';
        this.sharedService.setUserData(this.user);
        this.form = {};
        this.ngOnInit();
    } else {
      this.isLoggedIn = false;
      this.user.profile = '';
      this.shoppingCart = null;
      this.authService.notifyLogoutLoginDetector(undefined);
      this.tokenStorage.signOut();
      this.sessionResponse = new SessionResponse();
      this.sessionResponse.id = null!;
      this.sessionResponse.userType = 'GENERIC';
      this.cookieDate.setCookie(this.businessId!.toString(), JSON.stringify(this.sessionResponse), 1);
      this.cookieDate.deleteUserCookie('user');
      this.sessionUser = '';
      this.sharedService.setCookiesUserData();
      this.sharedService.triggerReload();
      const currentUrl = this.router.url;
      const segments = currentUrl.split('/');
      const lastSegment = segments[segments.length - 1];
      if (lastSegment === 'checkout') {
        this.router.navigate([`${segments[1]}/-guest`]);
      }
      this.unsubscibe()
      await this.loadCartAndFav()
      this.router.navigate(['/' + this.subdomain + '/home']);
      this.user = new User();
      this.wishlists = [];
      this.user.id = null!;
      this.user.profile = '';
      this.user.firstName = '';
      this.user.lastName = '';
      this.sharedService.setUserData(this.user);
      this.form = {};
      this.ngOnInit();
    }

  }

  unsubscibe() {
    this.cartSubscription?.unsubscribe()
    this.favSubscription?.unsubscribe()
  }

  refreshAddToCart() {
    this.dataService.notifyObservable$.subscribe(async res => {
      if (res.refresh) {
        (await this.shoppingCartService.listUserCartItems(Number(this.tokenStorage.getBusinessID()))).subscribe(
          data => {
            if (data.data.listUserCartItems) {
              this.shoppingCart = data.data.listUserCartItems;
              this.totalPrice = 0;
              this.shoppingCart?.cartItemResponseList.forEach(cartItem => {
                if (cartItem.salePrice) {
                  this.totalPrice = this.totalPrice + (cartItem.salePrice * cartItem.quantity);
                } else {
                  this.totalPrice = this.totalPrice + (cartItem.price * cartItem.quantity);
                }
              })
            } else {
             this.shoppingCart = null;
              this.totalPrice = 0;
            }

          }
        );
      }
    });
  }

  refreshAddToWishList() {
    this.dataService.notifyObservable$.subscribe(res => {
      if (res.refresh) {
        if (this.tokenStorage.getUser()) {
          this.getWishListItems();
        }
      }
    });
  }

  private async getWishListItems() {
    (await this.wishlistService.getCustomerWishList()).subscribe(
      res => {
        if (res?.data?.getCustomerWishList) {
          this.wishlists = res?.data?.getCustomerWishList;
          this.wishlists = this.wishlists.filter(whishItem => whishItem.businessId == this.businessId);
        }
      }
    );
  }

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  onMenuOpened() {
    const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    if (menuPanel) {
      menuPanel.classList.add('custom-menu-panel');
    }
  }

  onMenuClosed() {
    // const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    // if (menuPanel) {
    //   menuPanel.classList.remove('custom-menu-panel');
    // }
  }

  stopClosing(event: any, isClose: boolean) {
    if (isClose) {
      event.stopPropagation();
    }
  }


  onMenuOpenedCategory() {
    const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    if (menuPanel) {
      menuPanel.classList.add('category_menu_parent_panel');
    }
  }

  onMenuClosedCategory() {
    const menuPanel = this.menu.nativeElement.querySelector('.mat-menu-panel');
    if (menuPanel) {
      menuPanel.classList.remove('category_menu_parent_panel');
    }
  }

  public openloginmodal(type: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'thanks-login';
    dialogConfig.data = type;
    const dialogRef = this.dialog.open(SubscribePopupComponent, dialogConfig);
  }

  toggleSidenavCategory() {
    this.sidenavcategory = !this.sidenavcategory;
    this.parentcategorylist = true
  }

  onSidenavOpened() {
    this.parentcategorylist = true;
    // this.renderer.addClass(document.body, 'mat-drawer-open');
  }
  onSidenavClosed() {
    this.parentcategorylist = true;
    // this.renderer.removeClass(document.body, 'mat-drawer-open');

  }

  changetab(category: CategoryResponse) {
    this.parentcategorylist = false;
    this.selectedCat = category;
    console.log(category,"current category")
  }

  changetabrouter(category: CategoryResponse) {
    console.log(category,"current category")
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    setTimeout(() => {
      this.drawer.toggle();
      this.router.navigate([`/${this.subdomain}/category/${category.url}/${category.id}`]);
    }, 1000);
  }

  changetabrouter2(category: CategoryResponse) {
    console.log(category,"current category")
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    setTimeout(() => {
      this.categorydrawer.toggle();
      this.router.navigate([`/${this.subdomain}/category/${category.url}/${category.id}`]);
    }, 1000);
  }

  private closeCardTimeout: any;
  toggleCard(index: number, category: CategoryResponse) {
    this.selectedCategory = category;
    this.isCardOpen[index] = true;
    if (this.closeCardTimeout) {
      clearTimeout(this.closeCardTimeout);
    }
    for (let i = 0; i < this.isCardOpen.length; i++) {
      if (i !== index) {
        this.isCardOpen[i] = false;
      }
    }
  }

  toggleCard3(index: number, category: CategoryResponse) {
    this.theme3ExploreCat = false;
    this.selectedCategory = category;
    this.isCardOpen[index] = true;
    if (this.closeCardTimeout) {
      clearTimeout(this.closeCardTimeout);
    }
    for (let i = 0; i < this.isCardOpen.length; i++) {
      if (i !== index) {
        this.isCardOpen[i] = false;
      }
    }
  }


  closeCardWithDelay(index: number) {
    this.theme3ExploreCat = false;
    this.closeCardTimeout = setTimeout(() => {
      this.isCardOpen[index] = false;
    }, 100);
  }

  closeCardWithDelayNew(index: number): void {
    this.theme3ExploreCat = false;
    this.closeCardTimeout = setTimeout(() => {
      this.isCardOpen[index] = false;
    }, 100);
  }


  closeAllCards(): void {
    for (let i = 1; i <= 15; i++) {
      this.closeCardWithDelayNew(i);
    }
  }

  setSelectedCat(category: CategoryResponse) {

    this.selectedCategory = category;
  }


  forgotPassword() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ForgotpasswordcheckoutComponent, { panelClass: 'modal-medium-width' });
  }

  forgotPasswordforStore() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ForgotpasswordforstoreComponent, { panelClass: 'modal-medium-width' });
  }

  openCreateAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    this.dialog.open(SignupModalCheckoutComponent, dialogConfig);
  }


  @ViewChild('searchdrawer') searchDrawer!: MatSidenav;
  toggleSearchDrawer() {
    this.searchDrawer.toggle();
  }

  @ViewChild('categorydrawer') categorydrawer!: MatSidenav;
  toggleCategoryDrawer() {
    this.categorydrawer.toggle();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scrollPosition > 100) {
      this.isHeaderFixed = true;
    } else {
      this.isHeaderFixed = false;
    }
  }


  searchtoggle3() {
    this.searchbox3 = !this.searchbox3;
  }

  opentheme3cat(){
    this.theme3ExploreCat = !this.theme3ExploreCat ;
  }

  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
if (changes['categories'] && changes['categories'].currentValue) {
this.getStoreCategories();
}
}



@ViewChild('morecategorydrawer') morecategorydrawer!: MatSidenav;
openMoreCategories(){
this.morecategorydrawer.toggle()
}



}


