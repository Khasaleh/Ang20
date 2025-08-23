import { Component, Input, OnInit } from '@angular/core';
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
