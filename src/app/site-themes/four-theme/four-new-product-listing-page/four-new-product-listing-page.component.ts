import { FourBreadcrumsComponent } from './four-breadcrums/four-breadcrums.component';
import { FourContentAreaComponent } from './four-content-area/four-content-area.component';
import { FourFooterBannerComponent } from './four-footer-banner/four-footer-banner.component';
import { Component, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { PlpResponse } from 'src/app/models/PlpResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FourBreadcrumsComponent,
    FourContentAreaComponent,
    FourFooterBannerComponent
  ],
  selector: 'app-four-new-product-listing-page',
  templateUrl: './four-new-product-listing-page.component.html',
  styleUrls: ['./four-new-product-listing-page.component.scss']
})
export class FourNewProductListingPageComponent implements OnInit {
  plpResponse!: PlpResponse;
  loading: boolean = true; 
  private routeSub!: Subscription;
  subdomain: string = '';
  skeletonArray = new Array(9);  

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    ) { }

    async ngOnInit() {
      if(environment.env !== 'local'){
        this.subdomain = window.location.hostname;
      } else {
        this.subdomain = this.route.snapshot.params['subdomain'];
      }
      this.routeSub = this.route.params.subscribe(async routeParam => {
        const businessURL = await this.tokenStorage.getBusinessURL();
        if (this.subdomain && !businessURL) {
          this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
        }
        await this.loadPlp(this.subdomain, routeParam['id']);
      });
    }

  loadPlp(siteUrl: string, id: number){
    if (id)
      this.themeService.getBusinessProductListingPageContentBySiteUrl(siteUrl, id).subscribe(
        data => {
          if (data?.data?.getBusinessProductListingPageContentBySiteUrl) {
            this.plpResponse = data?.data?.getBusinessProductListingPageContentBySiteUrl;
          }
        }
      );
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
