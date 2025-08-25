import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { FourProductDetailsCustomerReviewsComponent } from '../four-product-details-customer-reviews/four-product-details-customer-reviews.component';
import { Component, Input, OnInit } from '@angular/core';
import { PdpContent } from 'src/app/models/PdpContent';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { environment } from 'src/environments/environment';
import { ChartType } from 'chart.js';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { MainAttributeDto } from 'src/app/models/MainAttributeDto';
import { ProductVarientDTO } from 'src/app/models/ProductVarientDTO';
import { ProductService } from 'src/app/service/product.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    FourProductDetailsCustomerReviewsComponent,
    MatTabsModule,
    TranslateModule
  ],
  selector: 'app-four-product-info',
  templateUrl: './four-product-info.component.html',
  styleUrls: ['./four-product-info.component.scss']
})
export class FourProductInfoComponent implements OnInit {
  @Input() data!:PdpContent;
  @Input() product!:ProductResponse;
  awsUrl=environment.awsKey;
  @Input() productReviews : any[] = [];
  @Input() pageType!:string;
  @Input() activeTheme:string='';
  sanitizedDescription!: SafeHtml;
  themeName: string = 'FourthTheme';
  chartData: any;
  chartType: ChartType = 'line';
  chartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Month'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price'
        }
      }
    }
  };
  mainSku!:MainAttributeDto;
  sku!:ProductVarientDTO;
  user = this.tokenStorageService.getUser();

  constructor(private sharedService: SharedService, private productService : ProductService,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
  ) { }

  async ngOnInit() {
     this.sanitizeDescription();
    this.sharedService.getMainSku().subscribe(mainSku => {
      this.mainSku = mainSku
    })
    this.sharedService.getSku().subscribe(sku => {
      this.sku = sku
    })
    await this.createProductBrowseHistory();
    this.getThemeName();
    this.setupChartData();
  }

   sanitizeDescription() {
    if (this.product?.description) {
      this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(this.product.description);
    }
  }

  ngOnChanges() {
    this.sanitizeDescription();  
  }

  async createProductBrowseHistory() {
    if (this.user) {
      (await this.productService
        .createProductBrowseHistory(Number(this.tokenStorageService.getBusinessID()), this.product.id))
        .subscribe(r => {
          if (r?.errors){
            return;
          }
        });
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

  setupChartData() {
    const labels = this.product?.priceHistory?.map(item => item?.month);
    const oldPriceData = this.product?.priceHistory?.map(item => item?.oldPrice);
    const newPriceData = this.product?.priceHistory?.map(item => item?.price);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'New Price',
          data: newPriceData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
        }
      ]
    };
  }

  calculatePercentage(oldPrice: number | null, price: number): string {
    if (oldPrice === null || oldPrice === 0) {
        return '-';
    }
    const percentage = ((price - oldPrice) / oldPrice) * 100;
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
}

}
