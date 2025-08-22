import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { SiteOptionResponse } from 'src/app/models/SiteOptionResponse';
import { ThemeDashboardContent } from 'src/app/models/ThemeDashboardContent';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import {  NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-four-new-home',
  templateUrl: './four-new-home.component.html',
  styleUrls: ['./four-new-home.component.scss']
})
export class FourNewHomeComponent implements OnInit {
  dashboardContent: ThemeDashboardContent = this.tokenStorage.getThemeDashboard()!;
  private routerSubscription!: Subscription;
  customData!: any;
  customerReviews: any[] = [];
  errorMessage:string='';

  footerMenuItems:  { text: string; item: string; list: string[] }[]=
  [{ text: "Logo Section", item: "logo",list:["../../../assets/img/items/footerlogo.svg","simply dummy text of the printing and typesetting industry."]},
  { text: "Useful Links", item: "links",list:["About Us", "Faq", "Location", "Unsubscribe", "Contact Us"] },
  { text: "Category", item: "category",list:["Men", "Women", "Kids", "Special Offer", "Best Seller"] },
  { text: "My Account", item: "account",list:["My Account", "Discount", "Return", "Orders History", "Order Tracking"] },
  { text: "Contact Info", item: "contact",list:["abc street, london, uk", "example@email.com", "+123456789"] }];
  testimonials: string[] = ["I had to attend a premier...", "These items were a perfect..."];
  footer:any={
    copyright:{
      text:'©Copyright 2023 Fazealbusiness',
      style:'LEFT_TO_RIGHT'
    },
    menu:this.footerMenuItems,
    textColor:'',
    bgColor:'',
    design:''
  }




  products = [
    {
      imgSrc: '../../assets/img/111.jpg',
      title: 'Product 1',
      price: '$50.00'
    },
    {
      imgSrc: '../../assets/img/222.jpg',
      title: 'Product 2',
      price: '$45.00'
    },
    {
      imgSrc: '../../assets/img/322.jpg',
      title: 'Product 3',
      price: '$60.00'
    },{
      imgSrc: '../../assets/img/222.jpg',
      title: 'Product 2',
      price: '$45.00'
    },
    {
      imgSrc: '../../assets/img/322.jpg',
      title: 'Product 3',
      price: '$60.00'
    },
    {
      imgSrc: '../../assets/img/444.jpg',
      title: 'Product 4',
      price: '$55.00'
    },{
      imgSrc: '../../assets/img/222.jpg',
      title: 'Product 1',
      price: '$50.00'
    },
    {
      imgSrc: '../../assets/img/111.jpg',
      title: 'Product 2',
      price: '$45.00'
    },
  ];

  subdomain = '';


@Input() productDashboredResponse: any = {
  recentlyViewedEnabled: false,
  recentlyViewedProducts : [],
};
  optionsList: string[] = [];


  constructor(private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private themeService:ThemeService
    ) { }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.optionsList = this.dashboardContent?.siteOptionsResponses?.map(siteOption => siteOption?.optionName);
    console.log(this.dashboardContent,'checking all dashboard')
    if(this.subdomain && !this.tokenStorage.getBusinessURL()){
      this.tokenStorage.saveBusinessData(this.subdomain , this.router.url.substring(1));
    }
    this.loadDashboard(this.subdomain);
    this.loadCstReview();


    // Add the class to the <body> tag
    // this.renderer.addClass(this.document.body, 'home-cst-layout-page');

    // Listen for route changes and remove the class when navigating away
    // this.routerSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationStart) {
    //     this.renderer.removeClass(this.document.body, 'home-cst-layout-page');
    //   }
    // });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  

  }

  loadDashboard(subdomain: string){
    if(this.dashboardContent){
      this.loadThemeColors();
      this.customData = [
        {
          label: 'MENU_MAIN_HEADER',
          section: 'mainHeader',
          img:'./assets/img/site_opt_0.svg',
          data:this.dashboardContent.mainBannersEspot,
          isShow:true
        },
        {
          label: 'THREE_IN_ONE_ESPOT',
          section: 'threein1',
          img:'./assets/img/site_opt_1.svg',
          data:this.dashboardContent.threeInOneBannersEspot,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('THREE_IN_ONE_ESPOT')
        },
        {
          label: 'FLASH_SALE',
          section: 'flashSale',
          img:'./assets/img/site_opt_2.svg',
          data:this.dashboardContent.flashSaleProducts,
          sliderTitle:this.dashboardContent.flashSaleSliderHeading,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('FLASH_SALE'),
          sliderStyle: this.dashboardContent.flashProductSliderStyle ? this.dashboardContent.flashProductSliderStyle : 'DOTS'
        },
        {
          label: 'BEST_SELLER',
          section: 'bestSeller',
          img:'./assets/img/site_opt_3.svg',
          data:this.dashboardContent.bestSellerProducts,
          sliderTitle:this.dashboardContent.bestSellerSliderHeading,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('BEST_SELLER'),
          sliderStyle: this.dashboardContent.bestSellerSliderStyle ? this.dashboardContent.bestSellerSliderStyle : 'DOTS'
        },
        {
          label: 'EXCLUSIVE_PRODUCTS',
          section: 'exclusiveProducts',
          img:'./assets/img/site_opt_4.svg',
          data:this.dashboardContent.newlyAddedProducts,
          sliderTitle:this.dashboardContent.newlyAddedSliderHeading,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('EXCLUSIVE_PRODUCTS'),
          sliderStyle: this.dashboardContent.newlyAddedSliderStyle ? this.dashboardContent.newlyAddedSliderStyle : 'DOTS'
        },
        {
          label: 'ESPOT_BANNER',
          section: 'espotBanner',
          img:'./assets/img/site_opt_7.svg',
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('ESPOT_BANNER'),
          data:this.dashboardContent.espotBanners
        },
        {
          label: 'ESPOT_TEXT_SLIDER',
          section: 'espotTextSlider',
          img:'./assets/img/site_opt_10.svg',
          data:this.dashboardContent.eSpotTextSlider,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('ESPOT_TEXT_SLIDER')
        },
        {
          label: 'TESTIMONIALS',
          section: 'testimonials',
          img:'./assets/img/site_opt_9.svg',
          data: this.dashboardContent.customerReviews,
          sliderTitle: this.dashboardContent.customerReviewSliderHeading,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('TESTIMONIALS')
        },
        {
          label: 'BRAND_LOGOS_SLIDER',
          section: 'brandLogos',
          img:'./assets/img/site_opt_4.svg',
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('BRAND_LOGOS_SLIDER'),
          data:this.dashboardContent.brandsSlider,
          sliderHeading: this.dashboardContent.brandSliderHeading,
          sliderShow: this.dashboardContent.brandShowHeading,
          sliderStyle: this.dashboardContent.brandSliderStyle ? this.dashboardContent.brandSliderStyle : 'DOTS'
        },
        {
          label: 'RECENTLY_VIEWED',
          section: 'recentlyViewed',
          img:'./assets/img/site_opt_6.svg',
          products:this.dashboardContent.recentlyViewedProducts,
          isShow:this.dashboardContent.siteOptionsResponses.map(option => option.optionName).includes('RECENTLY_VIEWED'),
          sliderStyle: this.dashboardContent.recentlyViewedSliderStyle ? this.dashboardContent.recentlyViewedSliderStyle : 'DOTS'
        }
      ];
      this.footer.copyright.text = this.dashboardContent.copyrights?.text;
      this.footer.copyright.style = this.dashboardContent.copyrights?.textDirection;
      this.footerMenuItems[0].list = [this.dashboardContent.footer.logoImage, this.dashboardContent.footer.description]
      this.footer.menu = this.footerMenuItems;
      this.footer.textColor = this.dashboardContent.footer.textColor;
      this.footer.bgColor = this.dashboardContent.footer.backgroundColor;
      this.footer.design = this.dashboardContent.footer.footerDesign;
    }

  }

  loadThemeColors(){
    if(this.dashboardContent.themeName == 'FourthTheme'){
      this.renderer.addClass(document.body, `four-${this.dashboardContent.themeColorsResponse.name}-theme`);
    }else if(this.dashboardContent.themeName == 'ClassicTheme'){
      this.renderer.addClass(document.body, `classic-${this.dashboardContent.themeColorsResponse.name}-theme`);
    }else if(this.dashboardContent.themeName == 'DefaultTheme'){
      this.renderer.addClass(document.body, `default-${this.dashboardContent.themeColorsResponse.name}-theme`);
    }
  }


  private handleDataError(errors: any[]) {
    if (errors && errors[0] && errors[0].errorMessage) {
      this.errorMessage = errors[0].errorMessage;
    } else {
      this.errorMessage = "An unknown error occurred.";
    }
  }



  loadCstReview() {
    this.customerReviews = this.dashboardContent.customerReviews;
  }
}
