import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { PdpContent } from 'src/app/models/PdpContent';
import { ThemeDashboardContent } from 'src/app/models/ThemeDashboardContent';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { FaviconService } from 'src/app/service/fav-icon.service';
import { ThemeService } from 'src/app/service/theme.service';
import { TranslateSiteService } from 'src/app/service/translate-site.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';


@Component({
  selector: 'app-four-theme',
  templateUrl: './four-theme.component.html',
  styleUrls: ['./four-theme.component.scss']
})
export class FourThemeComponent implements OnInit, OnDestroy  {

  hideHeaderFooter: boolean = false;
  routerSubscription !: Subscription;

  footerMenuItems:  { text: string; item: string; list: any[] }[]=
  [{ text: "LOGO_SECTION", item: "logo",list:["../../../assets/img/items/footerlogo.svg",""]},
  { text: "USEFULL_LINKS", item: "links",list:["SIGNIN_ABOUTUS", "TERMS_CONDITIONS", "END_USER_LICENSE_AGREEMENT", "COOKIES_POLICY", "RETURN_POLICY", "TERMS_OF_USE"] },
  { text: "CATEGORY_ONLY", item: "category",list:[{id: 1, catName: 'Men'}, {id: 1, catName: 'Women'}] },
  { text: "MY_ACCOUNT", item: "account",list:["CONTACT_US", "PICK_A_PLAN_SUBSCRIBE", "UNSUBSCRIBE", "ORDER_TRACKING_ONLY"] }];

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
  categories: CategoryResponse[] = [];
  dashboardContent!: ThemeDashboardContent;
  pdpResponse!: PdpContent;
  subdomain: string = '';
  private themeElement!: HTMLLinkElement;
  themeNameCSS: string = '';
  themeName: string = 'FourthTheme';
  awsURL = environment.awsKey;
  assetsAwsUrl = environment.assetsAwsKey;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    public translate: TranslateService,
    private renderer: Renderer2,
    public translateSiteService:TranslateSiteService,
    private catalogService: CatalogServiceService,
    private tokenStorage: TokenStorageService,
    private favIconService: FaviconService,private cookieDate: CookieDataServiceService,
    ) { }

  async ngOnInit(): Promise<void> {
    this.checkRoute();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
      }
    });
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      const path = window.location.pathname;
      this.subdomain = path.split('/')[1];
    }

    this.themeService.getThemeDashboardContentBySiteUrl(this.subdomain).subscribe(
      data => {
        if(data?.errors) return
        if(data?.data?.getThemeDashboardContentBySiteUrl){
          this.dashboardContent = data?.data?.getThemeDashboardContentBySiteUrl;
          this.favIconService.setFavicon(this.assetsAwsUrl + this.dashboardContent?.favIcon)
          this.tokenStorage.saveThemeDashboard(this.dashboardContent);
          this.loadThemeColors();
          this.loadCategories();
          this.footer.copyright.text = this.dashboardContent?.copyrights?.text;
          this.footer.copyright.style = this.dashboardContent?.copyrights?.textDirection;

          let footerImage = '';
          if(this.dashboardContent?.footer?.footerLogoImage){
            footerImage = this.awsURL + this.dashboardContent?.footer?.footerLogoImage;
          } else{
            footerImage = this.assetsAwsUrl + this.dashboardContent?.footer?.logoImage;
          }

          this.footerMenuItems[0].list = [footerImage, this.dashboardContent?.footer?.description]
          this.footer.menu = this.footerMenuItems;
          this.footer.textColor = this.dashboardContent?.footer?.textColor;
          this.footer.bgColor = this.dashboardContent?.footer?.backgroundColor;
          this.footer.design = this.dashboardContent?.footer?.footerDesign;
        }
      }
    );
    this.getThemeName();

  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  loadPdp(siteUrl: string){
    this.themeService.getPdpContentBySiteUrl(siteUrl).subscribe(
      data => {
        if(data.data.getPdpContentBySiteUrl){
          this.pdpResponse = data.data.getPdpContentBySiteUrl;
          this.tokenStorage.savePdp(this.pdpResponse);
        }
      }
    );
  }



  loadThemeColors(){
      this.renderer.addClass(document.body, `theme-color-${this.dashboardContent.themeColorsResponse.name}`);
  }


  loadThemeCSS() {
    // Get the theme name
    console.log(this.dashboardContent.themeName,"checking theme name")
    this.themeNameCSS = this.dashboardContent.themeName;
    const url = `https://fazeal-ui-assets.s3.amazonaws.com/themes/${this.themeNameCSS}.css`;

    // Check if a theme is already loaded and remove it
    if (this.themeElement) {
      document.head.removeChild(this.themeElement);
    }

    // Create a new link element
    this.themeElement = document.createElement('link');
    this.themeElement.rel = 'stylesheet';
    this.themeElement.href = url;

    // Append the link element to the document head
    document.head.appendChild(this.themeElement);
  }

  loadCategories(){
    this.catalogService.findAllCategoryBySiteUrl(this.subdomain).subscribe(
      data => {
        this.categories = data.data.findAllCategoryBySiteUrl;
        this.footerMenuItems[2].list = [];
        this.categories?.forEach(cat => {
          this.footerMenuItems[2].list.push({id: cat.id, catName: cat.name});
        });
      }
    );
  }

  checkRoute() {
    let subdomain = this.route.snapshot.params['subdomain'];
    if (environment.env !== 'local') {
      subdomain = '';
    }
    const expectedUrl = `/${subdomain}/print-order-summary`;

    if (this.router.url === expectedUrl) {
      this.hideHeaderFooter = true;
    } else {
      this.hideHeaderFooter = false;
    }
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

}
