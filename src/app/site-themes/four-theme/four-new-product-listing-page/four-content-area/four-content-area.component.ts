import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { FourBreadcrumsComponent } from '../four-breadcrums/four-breadcrums.component';
import { FourBestSellingProductsComponent } from '../four-best-selling-products/four-best-selling-products.component';
import { FourReleatedProductsComponent } from '../four-releated-products/four-releated-products.component';
import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbRatingModule, NgbCarouselModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { Options } from '@angular-slider/ngx-slider';
import { environment } from 'src/environments/environment';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { BrandResponse } from 'src/app/models/BrandResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { firstValueFrom } from 'rxjs';
import { WhishlistService } from 'src/app/service/whishlist.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataService } from 'src/app/service/data.service';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { PageEvent } from '@angular/material/paginator';
import { PdpQuickViewComponent } from '../../pdp-quick-view/pdp-quick-view.component';
import { AttributeResponse } from 'src/app/models/AttributeResponse';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FourBestSellingProductsComponent,
    FourBreadcrumsComponent,
    FourReleatedProductsComponent,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTooltipModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-four-content-area',
  templateUrl: './four-content-area.component.html',
  styleUrls: ['./four-content-area.component.scss']
})
export class FourContentAreaComponent implements OnInit, OnChanges {
  @Input() data: any
  isShowList: boolean = false;
  awsUrl = environment.awsKey;
  categories: CategoryResponse[] = [];
  brands: BrandResponse[] = [];
  products: ProductResponse[] = [];
  subdomain = '';
  currency = this.tokenStorage.getCurrency()?.symbol;
  gta: any = null;
  lte: any = null;
  attributes: AttributeResponse[] = [];
  attributeName: string = '';
  attributeValueName = '';
  from = 0;
  size = 12;
  category!: CategoryResponse;
  rating!: number|null;
  selectedbrands: string[] = [];
  businessId = Number(this.tokenStorage.getBusinessID()!);
  productLoaded = false;
  queryParams: string[] = []
  rangeValues: number[] = [];
  selectedAttributeValue: string[] = [];
  tempSelectedBrands: string[] = [];
  firstTime: boolean = true;
  userWishlists: WishListResponse[] = [];
  visibleBrands: any[] = [];
  maxVisibleBrands: number = 6;
  currentPage: number = 0;
  field: string = 'REVIEWS';
  order: string = 'ASC';
  totalPages!: number;
  totalPagesArray!: number[];
  totalResponses!: number;
  view: string = 'grid';
  isLoading: boolean = false;
  allproductsLoaded: boolean = false;
  plpSearchData: any;
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
  attrValue: string[] = [];
  selectedBrands: string[] = [];
  filtersOnMobile: boolean = true;
  pageEvent!: PageEvent;
  sessionResponse!: SessionResponse;
  isFirstResponse: boolean = true;
  currentUrl!: string;
  firstGta: any;
  firstLta: any;
  brandsNames: string[] = [];
  skeletonArray = new Array(9);  


  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogServiceService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private wishlistService: WhishlistService,
    public dialog: MatDialog,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,private cookieDate: CookieDataServiceService
  ) {
    if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
    }
  }

  async ngOnInit() {
    this.isLoading = true;
    this.currentUrl = this.router.url;
    this.products = [];
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    await Promise.all([this.loadCategories(), this.loadProducts()]);
    this.readQueryParams();
    this.checkingFiltersHide();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  private async loadProducts() {
    this.allproductsLoaded = false;
    const queryParamsExist = Object.keys(this.route.snapshot.queryParams).length > 0;
    if (queryParamsExist) {
      await this.searchProductsByFilters();
    } else {
      if (!this.field || this.field != 'PRICE' && this.field != 'REVIEWS') {
        this.field = 'PRICE'
      }
      this.selectedbrands = [];
    }
    this.allproductsLoaded = true;
}


  readQueryParams() {
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['rating']) {
      this.rating = Number(queryParams['rating']);
    }
    if (queryParams['brands']) {
      this.selectedbrands = queryParams['brands'].split(',');
      this.brands.forEach(brand => {
        brand.checked = this.selectedbrands.includes(brand.name);
      });
    }
    this.gta = queryParams['start'] ? Number(queryParams['start']) : null;
    this.lte = queryParams['end'] ? Number(queryParams['end']) : null;
    this.rangeValues = [this.gta, this.lte];

    if (queryParams['variants']) {
      this.selectedAttributeValue = queryParams['variants'].split(',');
    }
  }

  async loadCategories() {
    const data = await firstValueFrom(this.catalogService.findAllCategoryBySiteUrl(this.subdomain));
    if (data?.data?.findAllCategoryBySiteUrl) {
      this.categories = data?.data?.findAllCategoryBySiteUrl;
    }
  }

  loadAttributes() {
    this.category = this.data?.categoryDTO;
    this.catalogService.listAttributesByCategory(this.businessId, this.category.name).subscribe(
      data => {
        if (data?.data?.listAttributesForPlp) {
          this.attributes = data?.data?.listAttributesForPlp;
          console.log(this.attributes,"checking colors")
        }
      }
    );
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.size = event.pageSize;
    this.from = this.currentPage * this.size;
    this.searchProductsByFilters();
  }

  getCurrentRange(): string {
    const start = this.from + 1;
    const end = Math.min(this.from + this.size, this.totalResponses);
    return `${start}-${end}`;
  }

  onPageSizeChange() {
    this.allproductsLoaded = false;
    this.from = 0;
    this.products = [];
    this.searchProductsByFilters();
    this.cdr.detectChanges();
}

  sort(field: string, order: string) {
    this.field = field;
    this.order = order;
    this.searchProductsByFilters();
    this.cdr.detectChanges();
  }

  updateOptions() {
    this.options = {
      floor: this.gta,
      ceil: this.lte
    };
  }

  nextPage() {
    this.currentPage++;
    this.sort(this.field, this.order);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.sort(this.field, this.order);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.sort(this.field, this.order);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.currentUrl !== this.router.url) {
      this.currentUrl = this.router.url;
      this.subdomain = this.route.snapshot.params['subdomain'];
      if (this.subdomain !== this.tokenStorage.getBusinessURL()?.split('/')[0]) {
        await this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
        this.businessId = Number(this.tokenStorage.getBusinessID());
      }
      this.loadAttributes();
      this.resetFilters();
      await this.searchProductsByFilters();
    }
  }

  private resetFilters() {
    this.rating = null;
    this.min = null;
    this.max = null;
    this.attrValue = [];
    this.selectedBrands = [];
    this.selectedbrands = [];
    this.gta = null;
    this.lte = null;
    this.rangeValues = [];
    this.selectedAttributeValue = [];
    localStorage.removeItem('filter-attrs');
  }

  updateSliderFromInput() {
    const queryParams: any = { ...this.route.snapshot.queryParams };
    queryParams.start = this.gta;
    queryParams.end = this.lte;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    if (this.firstTime) {
      this.firstTime = false
      this.rangeValues = [this.gta, this.lte];
    }
  }

  onSliderChange() {
    this.gta = this.rangeValues[0]
    this.lte = this.rangeValues[1]
    this.updateFromToInQueryParam();
  }

  private updateFromToInQueryParam() {
    if (!this.firstTime) {
      const queryParams: any = { ...this.route.snapshot.queryParams };

      queryParams.start = this.gta;
      queryParams.end = this.lte;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
    }
    if (this.firstTime) this.firstTime = false;
  }


  searchProductsByFilters() {
    this.isLoading = true;
    this.catalogService.filterProductsOnPLP(
      this.businessId, this.category.name, this.from, this.size, this.field, this.order,
      this.rating ? this.rating : null, this.min ? this.min : null, this.max ? this.max : null, this.selectedBrands, this.attrValue
    ).subscribe(data => {
      if (data?.errors) return;
      if (data?.data?.plpSearch) {
        const uniqueProductIds = new Set(this.products?.map(product => product.id));
        this.products = [
          ...this.products?.filter(product => !uniqueProductIds.has(product.id)),
          ...data?.data?.plpSearch?.products
        ];

        if (this.products.length > 0) this.totalResponses = data?.data?.plpSearch?.totalCount;
        this.totalPages = Math.ceil(this.products[0]?.totalResponses / this.size);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        this.plpSearchData = data?.data?.plpSearch;
        this.avgRating = this.plpSearchData?.avgRating;
        this.brandsNames = this.plpSearchData?.brandNames;

        this.updateVisibleBrands();

        if (this.isFirstResponse) {
          this.gta = this.plpSearchData?.minPrice;
          this.lte = this.plpSearchData?.maxPrice;
          this.firstGta = this.plpSearchData?.minPrice;
          this.firstLta = this.plpSearchData?.maxPrice;
          this.updateOptions();
          this.isFirstResponse = false;
          this.cdr.detectChanges();
        }

        this.minPrice = this.plpSearchData?.minPrice;
        this.maxPrice = this.plpSearchData?.maxPrice;
        this.totalCounts = this.plpSearchData?.totalCount;
        this.cdr.detectChanges();

        if (this.sessionResponse?.userType !== "GENERIC" || this.sessionResponse?.userType !== undefined) {
          this.setFavItems();
        }
      }

      this.isLoading = false;
      this.allproductsLoaded = true;
    });
  }

  updateVisibleBrands() {
    this.visibleBrands = this.brandsNames.slice(0, this.maxVisibleBrands);
  }

  showMoreBrandFilters() {
    this.maxVisibleBrands += 6;
    this.updateVisibleBrands();
  }


  setselectedBrands(value: string, event: any){
    if(event.checked){
      this.selectedBrands.push(value);
    }else{
      this.selectedBrands= this.selectedBrands?.filter(brand => brand != value);
    }
    this.searchProductsByFilters();
    this.cdr.detectChanges();
  }

  isSelected(brandName: string) {
    return this.selectedBrands.includes(brandName);
  }

  clearSelectedBrands() {
    this.selectedBrands = [];
    this.searchProductsByFilters();
  }

  setPriceValue(min: number, max: number){
    this.min = min;
    this.max = max;
    this.searchProductsByFilters();
  }

  clearPriceValue(){
    this.gta = this.firstGta;
    this.lte = this.firstLta;
    this.min = null;
    this.max = null;
    this.isFirstResponse = true;
    this.searchProductsByFilters();
  }

  setAttrValue(value: string){
    if(this.attrValue?.includes(value)){
      this.attrValue = this.attrValue?.filter(val => val != value);
    }else{
      this.attrValue.push(value);
    }
    localStorage.removeItem('filter-attrs');
    this.searchProductsByFilters();
  }

  clearAttrValue(){
    this.attrValue = [];
    localStorage.removeItem('filter-attrs');
    this.searchProductsByFilters();
  }

  async setFavItems() {
      (await this.wishlistService.getCustomerWishList()).subscribe(
        data => {
          this.userWishlists = data?.data?.getCustomerWishList;
          this.products?.forEach(product => {
            if (this.userWishlists?.map(fav => fav.itemId)?.includes(product.id)) {
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

  pdppopup(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
        id: id,
        subdomain: this.subdomain
    };
    dialogConfig.panelClass = 'modal-quickview-width';
    this.dialog.open(PdpQuickViewComponent, dialogConfig);
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
    this.filtersOnMobile = !this.filtersOnMobile;
  }

}
