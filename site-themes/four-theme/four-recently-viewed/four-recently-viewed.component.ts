import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PlpResponse } from 'src/app/models/PlpResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpQuickViewComponent } from '../pdp-quick-view/pdp-quick-view.component';
import { PdpContent } from 'src/app/models/PdpContent';
import { SharedService } from 'src/app/service/shared-service/shared.service';

@Component({
  selector: 'app-four-recently-viewed',
  templateUrl: './four-recently-viewed.component.html',
  styleUrls: ['./four-recently-viewed.component.scss']
})
export class FourRecentlyViewedComponent implements OnInit {
  @Input() data:any=[];
  @Input() categoryId:any
  @Input() activeTheme!:string;
  awsUrl = environment.awsKey;
  subdomain = this.tokenStorage.getBusinessURL();
  subdomainonly : string = "";
  plpResponse!: PlpResponse;
  loading: boolean = true;
  errorMessage:string='';
  user = this.tokenStorage.getUser();
  currency = this.tokenStorage.getCurrency()?.symbol;
  productResponse: any = {
    recentlyViewedEnabled: false,
    recentlyViewedProducts : [],
};


@Input() productDashboredResponse: any = {
  recentlyViewedEnabled: false,
  recentlyViewedProducts : [],
};

@Input() dashboredListResponse: any = {
  recentlyViewedEnabled: false,
  recentlyViewedProducts : [],
};
recentlyViewed: any[] = [];

@Input() displayPlpSection:boolean=false;
@Input() displayDashBoredSection:boolean=false;

@Input() pageType!:string;
productPdpResponse: any = {
  recentlyViewedEnabled: false,
  recentlyViewedProducts : [],
};
pdpContent!: PdpContent;

arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';
  customOptions: OwlOptions = {
    loop: false,
    margin: 0,
    nav: true, // Add this option to enable navigation arrows
    dots: true,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
  }
  id: any;
  isLoading: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    public dialog: MatDialog, private sharedService: SharedService
    ) { }



  async ngOnInit() {
    this.subdomainonly = this.route.snapshot.params['subdomain'];
    this.route.params.subscribe(async routeParam => {
        const businessURL = await this.tokenStorage.getBusinessURL();
        if (this.subdomainonly && !businessURL) {
            this.tokenStorage.saveBusinessData(this.subdomainonly, this.router.url.substring(1));
        }
        const currentUrl = this.router.url;
        if (currentUrl.includes('product')) {
          this.id = this.categoryId;
        } else {
          this.id = routeParam['id']
        }
        await this.loadPlp(this.subdomainonly, this.id);
    });
    this.subdomain = this.route.snapshot.params['subdomain'];
    if (this.subdomain && !this.tokenStorage.getBusinessURL()) {
      this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
    }
    this.loadRecentlyViewedDashbored(this.subdomain);
    this.getPdpContent(this.subdomain);
    this.sharedService.getReloadObservable().subscribe(data => {
      if(data){
        this.user = this.tokenStorage.getUser();
      }
    })
    
    console.log(this.data,"checking what is data")
}

async loadPlp(siteUrl: string, id: number) {
  this.displayPlpSection = true;
  this.displayDashBoredSection = false;
  try {
    if(id){
      const data = await this.themeService.getBusinessProductListingPageContentBySiteUrl(siteUrl, id).toPromise();
      if (data?.errors) return;
      this.productResponse = data?.data?.getBusinessProductListingPageContentBySiteUrl;
      if (this.productResponse.recentlyViewedProductSliderStyle === "LEFT_AND_RIGHT_ARROWS") {
        this.customOptions.dots = false;
        this.customOptions.nav = true;
        this.customOptions.navText = [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`];
      } else if (this.productResponse.recentlyViewedProductSliderStyle === "DOTS") {
        this.customOptions.dots = true;
        this.customOptions.nav = false;
        this.customOptions.navText = ['', ''];
      } else if (this.productResponse.recentlyViewedProductSliderStyle === "NO_ARROWS_NO_DOTS") {
        this.customOptions.dots = false;
        this.customOptions.nav = false;
      }
    }
  } catch (error) {
    this.displayPlpSection = false;
  }
}

pdppopup(id: number) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data = {
      id: id,
      subdomain: this.subdomainonly
  };
  dialogConfig.panelClass = 'modal-quickview-width';
  this.dialog.open(PdpQuickViewComponent, dialogConfig);
}


private handleDataError(errors: any[]) {
  if (errors && errors[0] && errors[0]?.errorMessage) {
    this.errorMessage = errors[0]?.errorMessage;
  } else {
    this.errorMessage = "An unknown error occurred.";
  }
}

loadRecentlyViewedDashbored(subdomain :any){
  this.displayDashBoredSection = true;
  this.displayPlpSection = false;
  this.themeService.getThemeDashboardContentBySiteUrl(this.subdomain!).subscribe(
    ({data,errors})=>{
      if(!data || !data?.getThemeDashboardContentBySiteUrl){
        this.handleDataError(errors);
      }
      if (data?.getThemeDashboardContentBySiteUrl) {
        this.dashboredListResponse = data?.getThemeDashboardContentBySiteUrl;
        console.log(this.dashboredListResponse,"checking home data")
        this.displayPlpSection = false;
        this.displayDashBoredSection = true;
         
      }
    }
  );
}


getPdpContent(siteUrl: any) {
  this.themeService.getPdpContentBySiteUrl(siteUrl)
    .subscribe(
      ({ data, errors }) => {
        if (!data || !data?.getPdpContentBySiteUrl) {
          this.handleDataError(errors);
        }
        if (data && data?.getPdpContentBySiteUrl) {
          this.pdpContent = data?.getPdpContentBySiteUrl;
          this.productPdpResponse = data?.getPdpContentBySiteUrl;
        }
      }
    );
}

}
