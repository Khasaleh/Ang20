import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryResponse } from 'src/app/models/CategoryResponse';
import { ThemeDashboardContent } from 'src/app/models/ThemeDashboardContent';
import { CatalogServiceService } from 'src/app/service/CatalogService.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-theme-popular-categories',
  templateUrl: './four-theme-popular-categories.component.html',
  styleUrls: ['./four-theme-popular-categories.component.scss']
})
export class FourThemePopularCategoriesComponent implements OnInit {
  dashboardContent: ThemeDashboardContent = this.tokenStorage.getThemeDashboard()!;
  customData!: any;
  customerReviews: any[] = [];
  dashboredListResponse!:ThemeDashboardContent;
  errorMessage:string='';
  threeInOneEnableHeadline!: boolean;
  threeInOneSliderHeadline!: string;
  @Input() data:any=[];
  @Input() activeTheme!: string;
  currency = '';
  categories: CategoryResponse[] = [];
  awsUrl = environment.awsKey;
  subdomain = '';
  itemsToShow = 3;
  isShowLikeDiv: boolean[] = [];

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogServiceService,
    private tokenStorage: TokenStorageService,
    private themeService:ThemeService
    ) { }

  ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.loadCategories();
    this.loadData();
    console.log(this.data.data,"checking data length")
  }

  loadCategories(){
    this.catalogService.findAllCategoryBySiteUrl(this.tokenStorage.getBusinessURL()!).subscribe(
      data => {
        this.categories = data?.data?.findAllCategoryBySiteUrl;
        if(this.activeTheme === 'FourthTheme'){
          if (data && data.data && data.data.length == 2) {
            this.itemsToShow = 2;
          }
          if (data && data.data && data.data.length == 1) {
            this.itemsToShow = 1;
          }
        }
        if(this.activeTheme === 'RetailTheme2'){
          this.categories?.forEach(category => this.isShowLikeDiv.push(false));
        }
      }
    );
  }
  customOptions: OwlOptions = {
    items:this.itemsToShow,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      768: {
        items: this.itemsToShow,
      },
      1200: {
        items: this.itemsToShow,
      }
    },
  }

  private handleDataError(errors: any[]) {
    if (errors && errors[0] && errors[0].errorMessage) {
      this.errorMessage = errors[0].errorMessage;
    } else {
      this.errorMessage = "An unknown error occurred.";
    }
  }


  updateThreeInOneEnableHeadline(newValue: boolean) {
    this.dashboredListResponse.threeInOneEnableHeadline = newValue;
  }

  loadData() {
    this.dashboredListResponse = this.dashboardContent;
    this.threeInOneEnableHeadline = this.dashboredListResponse?.threeInOneEnableHeadline;
    this.threeInOneSliderHeadline = this.dashboredListResponse?.threeInOneSliderHeadline;
    console.log(this.dashboardContent,"checking complete data")
    // this.themeService.getThemeDashboardContentBySiteUrl(this.subdomain).subscribe(
    //   ({ data, errors }) => {
    //     if (!data || !data.getThemeDashboardContentBySiteUrl) {
    //       this.handleDataError(errors);
    //       return;
    //     }
    //     if (data.getThemeDashboardContentBySiteUrl) {

    //     }
    //   }
    // );
  }

}
