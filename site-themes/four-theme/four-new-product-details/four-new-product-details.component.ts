import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeResponse } from 'src/app/models/AttributeResponse';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { PdpContent } from 'src/app/models/PdpContent';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { WishListResponse } from 'src/app/models/WishListResponse';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ReviewService } from 'src/app/service/review.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-new-product-details',
  templateUrl: './four-new-product-details.component.html',
  styleUrls: ['./four-new-product-details.component.scss']
})
export class FourNewProductDetailsComponent implements OnInit {
  // @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  // @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @Input() data:any
  @Input() activeTheme:string=''
  @Input() pageType!:string;
  // config: SwiperConfigInterface = {
  //   slidesPerView: 'auto',
  //   keyboard: true,
  //   mousewheel: true,
  //   scrollbar: false,
  //   navigation: true,
  //   pagination: false,
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 3,
  //       spaceBetween: 5,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //       spaceBetween: 5,
  //     },
  //     1024: {
  //       slidesPerView: 4,
  //       spaceBetween: 5,
  //     }
  //   },
  // };
  // configGallery: SwiperConfigInterface = {

  //   slidesPerView: 'auto',
  //   keyboard: true,
  //   mousewheel: true,
  //   scrollbar: false,
  //   navigation: true,
  //   pagination: false,
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //     },
  //     1024: {
  //       slidesPerView: 4,
  //       spaceBetween: 20,
  //     }
  //   },
  // };
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

  pdpResponse!: PdpContent;
  product!: ProductResponse;
  awsURL = environment.awsKey;
  attributes: AttributeResponse[] = [];
  attributeNames: string[] = [];
  colorAttribute!: AttributeResponse;
  l1Category!: CategoryResponse;
  l2Category!: CategoryResponse;
  l3Category!: CategoryResponse;
  mainImage!: string;
  color!: string;
  productImages: string[] = [];
  filteredValues: string[] = [];
  selectedSkuId!: number;
  selectedSkuPrice!: number;
  message!: string;
  errorMessage!: string;
  quantity = 1;
  filteredColors: string[] = [];
  subdomain!: string;
  currencySymbol : string = '';
  imageObject: Array<any> = [];
  customerCanReview = false;
  similarProducts: ProductResponse[] = [];
  siteUrl = this.tokenStorage.getBusinessURL()!;
  noOfProducts = 100;
  userWishlists!: WishListResponse[];
  selectedColor!: string;
  price!: Number;
  salePrice!: number;
  isDiscount = false;
  imagePopup: any;
  mainImageIndex : number = 0;
  productReviews : any[] = [];
  pageNum = 1;
  pageSize = 50;
  public disabled: boolean = false;
  currentIndex:any=0;
  imagepath:any = '../../../assets/img/items/gs1.png';
  businessID = Number(this.tokenStorage.getBusinessID());
  isProductAvailable: boolean = true;
  isLoading: boolean = true;


  constructor(private route: ActivatedRoute,
    private themeService: ThemeService,
    private catalogService: CatalogServiceService,
    private tokenStorage: TokenStorageService,
    private reviewService : ReviewService,
    private router: Router,private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.route.params.subscribe(async routeParam => {
      if (this.subdomain && !this.tokenStorage.getBusinessURL()) {
        await this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
        this.currencySymbol = this.tokenStorage.getCurrency() ? this.tokenStorage.getCurrency()?.symbol : '';
      }
      this.loadPdp(this.subdomain); 
      this.quantity = 1;
      this.businessID = Number(this.tokenStorage.getBusinessID());
      if (this.businessID && routeParam['id']) {
        this.loadProductDate(routeParam['id']);
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);  
    });
  }


  loadPdp(siteUrl: string){
    this.themeService.getPdpContentBySiteUrl(siteUrl).subscribe(
      data => {
        if(data?.data?.getPdpContentBySiteUrl){
          this.pdpResponse = data?.data?.getPdpContentBySiteUrl;
        }
      }
    );
  }

  loadProductDate(productId: number) {
    if (!productId) {
      return;
    }

    // Start loading
    this.isLoading = true;  

    this.catalogService.getProductById(productId, this.businessID).subscribe(
      data => {
        console.log(this.data, "checking mainobj");

        // Check if data is undefined or null
        if (!data || !data?.data?.getProductByIdAndBusinessId) {
          this.isProductAvailable = false; // Set the variable to false
          this.isLoading = false; // Stop loading
          return;
        }

        this.isProductAvailable = true; // Set to true if product data is available
        this.imageObject = [];
        this.filteredColors = [];
        this.productImages = [];
        this.product = data?.data?.getProductByIdAndBusinessId;
        console.log(this.product, "checking product data");

        this.price = this.product?.price;
        this.salePrice = this.product?.salePrice;
        this.productImages = this.product?.images;

        this.product?.images?.forEach(image => {
          this.imageObject.push({ image: this.awsURL + image, thumbImage: this.awsURL + image });
        });

        // Stop loading after product data is fetched
        this.isLoading = false;
        this.cdr.detectChanges();
        this.loadReviews(productId);
      },
      error => {
        this.isProductAvailable = false; // Set the variable to false if there's an error
        this.isLoading = false; // Stop loading
        console.error("Error fetching product data:", error);
      }
    );
}


  loadReviews(productId: number) {
    this.reviewService.getAllReviewOfProduct(productId, this.pageNum, this.pageSize).subscribe(
      data => {
        console.log(data);
        if (!data?.data?.getAllReviewOfProduct) {
          return;
        }
        this.productReviews = data?.data?.getAllReviewOfProduct;
      }
    );
  }

  selectImage(imagesrc: any,index:any) {
    this.imagepath = imagesrc;
    this.currentIndex = index;
  }
  public toggleSlidesPerView(): void {
    // if (this.config.slidesPerView !== 1) {
    //   this.config.slidesPerView = 1;
    // } else {
    //   this.config.slidesPerView = 2;
    // }
  }
}
