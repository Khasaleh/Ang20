import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductSearchService } from 'src/app/shared/services/product-search.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatTabsModule,
        ProductListComponent,
        ProductGridComponent,
        ProductFiltersComponent,
        MatIconModule,
    ],
})
export class ProductSearchComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private subscription: Subscription;
  public searchResults: any;
  public currentView: 'grid' | 'list' = 'grid';
  public filterData: any = {};
  public pageTitle: string;
  public showFilter: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productSearchService: ProductSearchService,
    private seoService: SeoService,
    private titleService: Title,
    private translate: TranslateService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.filterData = { ...params };
      this.productSearchService.setFilterData(this.filterData);
      this.getSearchResults();
    });
    this.productSearchService.filterData$.subscribe((data) => {
      this.filterData = data;
      this.updateUrl();
    });
  }
  ngAfterViewInit(): void {
    this.updateBreadcrumb();
  }
  updateBreadcrumb() {
    if (this.filterData.search) {
      this.breadcrumbService.sendBreadcrumb([
        {
          label: 'Search',
          url: '/search',
        },
        {
          label: this.filterData.search,
          url: '',
        },
      ]);
    } else if (this.filterData.category_id) {
      const category = this.searchResults?.filters.find(
        (f) => f.filter_code === 'category_id'
      );
      if (category) {
        const breadcrumb = category.filter_values
          .filter((v) => v.is_applied)
          .map((v) => ({
            label: v.value,
            url: `/search?category_id=${v.id}`,
          }));
        this.breadcrumbService.sendBreadcrumb(breadcrumb);
      }
    } else {
      this.breadcrumbService.sendBreadcrumb(['Search']);
    }
  }
  getSearchResults() {
    this.productSearchService.getProducts(this.filterData).subscribe(
      (data) => {
        this.searchResults = data;
        this.pageTitle = data.search_title;
        this.updateMeta();
        this.updateBreadcrumb();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateMeta() {
    this.titleService.setTitle(this.pageTitle);
    this.seoService.updateMetaTags(
      this.searchResults.meta_description,
      this.searchResults.meta_keywords,
      this.searchResults.og_title,
      this.searchResults.og_description,
      this.searchResults.og_image,
      this.searchResults.og_url
    );
  }
  updateUrl() {
    this.router.navigate(['/search'], { queryParams: this.filterData });
  }

  onViewChange(view: 'grid' | 'list') {
    this.currentView = view;
  }
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
