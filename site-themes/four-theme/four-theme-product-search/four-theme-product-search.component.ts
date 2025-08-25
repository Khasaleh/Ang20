import { ChangeDetectorRef, Component,  ElementRef,  OnInit, ViewChild  } from '@angular/core';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';
import { BrandResponse } from 'src/app/models/BrandResponse';
import { Options } from '@angular-slider/ngx-slider';
import { AttributeResponse } from 'src/app/models/AttributeResponse';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { DataService } from 'src/app/service/data.service';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { ThemeService } from 'src/app/service/theme.service';
import { SlpContent } from 'src/app/models/SlpContent';

@Component({
  selector: 'app-four-theme-product-search',
  templateUrl: './four-theme-product-search.component.html',
  styleUrls: ['./four-theme-product-search.component.scss']
})
export class FourThemeProductSearchComponent implements OnInit  {

  from = 0;
  size = 12;
  businessId = Number(this.tokenStorage.getBusinessID());
  currency = this.tokenStorage.getCurrency()?.symbol;
  products: ProductResponse[] = [];
  search = '';
  awsUrl = environment.awsKey;
  subdomain = '';
  rating!: number|null;
  skeletonArray = new Array(9);  
  brandsNames: string[] = [];
  gta!: number|any;
  lte!: number|any;
  attributes: AttributeResponse[] = [];
  mainAttrValue = '';
  attrValue: string[] = [];
  selectedBrands: string[] = [];
  visibleBrands: any[] = [];
  maxVisibleBrands: number = 6;
  userWishlists: WishListResponse[] = [];
  view: string = 'grid';
  slpSearchData: any;
  minPrice: any;
  maxPrice: any;
  avgRating!: number;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  @ViewChild('slider', { static: false }) sliderElement!: ElementRef;
  totalCounts!: number;
  min: number|any;
  max: number|any;
  filtersOnMobile: boolean = true;
  currentPage: number = 0;
  sessionResponse!: SessionResponse;
  currentUrl!: string;
  isFirstResponse: boolean = true;
  firstGta: any;
  firstLta: any;
  themeName: string = 'FourthTheme';
  slpContent!: SlpContent;
  field: string = 'REVIEWS';
  order: string = 'ASC';
  pageEvent!: PageEvent;
  isLoading: boolean = false;


  constructor(
    private catalogService: CatalogServiceService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,private cookieDate: CookieDataServiceService,
    private cdr: ChangeDetectorRef,private themeService: ThemeService,
    public dialog: MatDialog, private wishlistService: WhishlistService,private dataService: DataService,
    ) {
      this.maxVisibleBrands = 6;
      if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
      }
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.search = params['searchTerm'];
      if(environment.env !== 'local'){
        this.subdomain = '';
      } else {
        this.subdomain = this.route.snapshot.params['subdomain'];
      }
      this.gta = 0;
      this.lte = 100;
      this.rating = null;
      this.min = null;
      this.max = null;
      this.attrValue = [];
      this.selectedBrands = [];
      this.isFirstResponse = true;
      this.searchProductsByCategoryAndBrand(this.search);
      this.loadAttributes();
      this.loadBusinessData();
    });
    this.getSlpContent(this.subdomain);
    this.checkingFiltersHide()
    this.getThemeName();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  moveSlider() {
    if (this.sliderElement) {
      this.sliderElement.nativeElement.slider.update({ value: this.gta, highValue: this.lte });
    }
  }

  updateOptions() {
    this.options = {
      floor: this.gta,
      ceil: this.lte
    };
  }

  onPageSizeChange() {
    this.searchProductsByCategoryAndBrand(this.search);
    this.cdr.detectChanges();
  }


  loadBusinessData(){
    if(this.subdomain && !this.tokenStorage.getBusinessURL()){
      this.tokenStorage.saveBusinessData(this.subdomain , this.subdomain);
      window.setTimeout(() =>{
        this.currency = this.tokenStorage.getCurrency() ? this.tokenStorage.getCurrency()?.symbol: '';
        this.businessId = Number(this.tokenStorage.getBusinessID());
        this.searchProductsByCategoryAndBrand(this.search);
        this.loadAttributes();
      }, 2000);
    }
  }

  loadAttributes(){
    if(this.search.trim().length > 0){
      this.catalogService.listAttributesBySearchQuery(this.businessId, this.search).subscribe(
        data => {
          if(data?.data?.listAttributesBySearchQuery){
            this.attributes = data?.data?.listAttributesBySearchQuery;
            console.log(this.attributes,"checking colors")
          }
        }
      );
    }
  }

  sort(field: string, order: string) {
    this.field = field;
    this.order = order;
    this.searchProductsByCategoryAndBrand(this.search);
    this.cdr.detectChanges();
  }

  searchProductsByCategoryAndBrand(query: string) {
    if (query.trim().length > 0) {
        this.isLoading = true;  // Show loading animation
        this.products = [];      // Clear old products to prevent flicker

        this.catalogService.searchProductsByAllFiltersForSlpByBusiness(
            query, this.businessId, this.from, this.size, this.selectedBrands, this.attrValue,
            this.rating ? this.rating : null, this.min ? this.min : null, this.max ? this.max : null, this.field, this.order
        ).subscribe(
            data => {
                if (data?.data?.slpSearch?.products) {
                    this.slpSearchData = data?.data?.slpSearch;
                    this.products = data?.data?.slpSearch?.products;
                    this.avgRating = this.slpSearchData?.avgRating;
                    this.brandsNames = this.slpSearchData?.brandNames;
                    this.updateVisibleBrands();

                    if (this.isFirstResponse) {
                        this.gta = this.slpSearchData?.minPrice;
                        this.lte = this.slpSearchData?.maxPrice;
                        this.firstGta = this.slpSearchData?.minPrice;
                        this.firstLta = this.slpSearchData?.maxPrice;
                        this.updateOptions();
                        this.isFirstResponse = false;
                        this.cdr.detectChanges();
                    }

                    this.minPrice = this.slpSearchData?.minPrice;
                    this.maxPrice = this.slpSearchData?.maxPrice;
                    this.totalCounts = this.slpSearchData?.totalCount;

                    if (this.sessionResponse?.userType !== "GENERIC") {
                        this.setFavItems();
                    }
                }
                this.isLoading = false;  // Hide loading animation once data is fetched
            },
            error => {
                this.isLoading = false;  // Hide loading animation if there's an error
            }
        );
    }
}


  setAttrValue(value: string) {
    if (this.attrValue.includes(value)) {
      this.attrValue = this.attrValue.filter(val => val !== value);
    } else {
      this.attrValue.push(value);
    }
    this.searchProductsByCategoryAndBrand(this.search);
  }

  setPriceValue(min: number, max: number){
    this.min = min;
    this.max = max;
    this.searchProductsByCategoryAndBrand(this.search);
  }

  clearPriceValue(){
    this.gta = this.firstGta;
    this.lte = this.firstLta;
    this.min = null;
    this.max = null;
    this.isFirstResponse = true;
    this.searchProductsByCategoryAndBrand(this.search);
  }

  setselectedBrands(value: string, event: any){
    if(event.checked){
      this.selectedBrands.push(value);
    }else{
      this.selectedBrands= this.selectedBrands.filter(brand => brand != value);
    }
    this.searchProductsByCategoryAndBrand(this.search);
  }

  isSelected(brandName: string) {
    return this.selectedBrands.includes(brandName);
  }

  clearSelectedBrands() {
    this.selectedBrands = [];
    this.searchProductsByCategoryAndBrand(this.search);
  }

  searchProductsByCategoryAndBrandPaginated(type: string){
    if(type == 'Next'){
      this.from = this.size;
      this.size = this.size + 12;
    }else if(type == 'Previous' && this.size > 20){
      this.from = this.from - 12;
      this.size = this.size - 12;
    }
    this.searchProductsByCategoryAndBrand(this.search);
  }

  updateVisibleBrands() {
    this.visibleBrands = this.brandsNames.slice(0, this.maxVisibleBrands);
  }

  showMoreBrandFilters() {
    this.maxVisibleBrands += 6;
    this.updateVisibleBrands();
  }


  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.size = event.pageSize;
    this.from = this.currentPage * this.size;
    this.searchProductsByCategoryAndBrand(this.search);
  }

  getCurrentRange(): string {
    const start = this.from + 1;
    const end = Math.min(this.from + this.size, this.totalCounts);
    return `${start}-${end}`;
  }


  async setFavItems() {
    (await this.wishlistService.getCustomerWishList()).subscribe(
      data => {
        this.userWishlists = data?.data?.getCustomerWishList;
        this.products?.forEach((product: any) => {
          if (this.userWishlists.map(fav => fav.itemId).includes(product.id)) {
            product.addedToWishlist = true;
          }
        });
      }
    );
  }

  async addItemToFovarite(product: ProductResponse) {
  (await this.wishlistService.addItemToWishList(this.businessId, product.id)).subscribe(
    data => {
      if(data?.data?.addItemToWishList != null) {
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
  toggleView(view: string) {
    if (view === 'grid') {
      this.view = 'grid'
    } else if (view === 'list') {
      this.view = 'list'
    }
  }

  checkingFiltersHide(): void {
    if (window.innerWidth < 992) {
      this.filtersOnMobile = false
    } else {
      this.filtersOnMobile = true
    }
  }

  toggleFiltersMobile(){
    this.filtersOnMobile = !this.filtersOnMobile
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

  getSlpContent(siteUrl: string){
    this.themeService.getSlpContentBySiteUrl(siteUrl).toPromise().then(
      data => {
        if(data?.data?.getSlpContentBySiteUrl){
          this.slpContent = data?.data?.getSlpContentBySiteUrl;
        }
      }
    );
  }

}
