import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BreadcrumbService } from 'src/app/shared/services/breadcrumb.service';
import { SeoService } from 'src/app/shared/services/seo.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CartItemsComponent } from '../cart-items/cart-items.component';
import { QuoteItemsComponent } from '../quote-items/quote-items.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
    standalone: true,
    imports: [CommonModule, MatTabsModule, CartItemsComponent, QuoteItemsComponent, TranslateModule],
})
export class ShoppingCartComponent implements OnInit {
  public cartData: any;
  public quoteData: any;
  public selectedTab: 'cart' | 'quote' = 'cart';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private breadcrumbService: BreadcrumbService,
    private seoService: SeoService,
    private titleService: Title,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.sendBreadcrumb(['Shopping Cart']);
    this.getCartData();
    this.getQuoteData();
    this.updateMeta();
  }

  getCartData() {
    this.shoppingCartService.getCartItems().subscribe(
      (data) => {
        this.cartData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  getQuoteData() {
    this.shoppingCartService.getQuoteItems().subscribe(
      (data) => {
        this.quoteData = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  updateMeta() {
    this.titleService.setTitle(
      this.translate.instant('shopping_cart_page_title')
    );
    this.seoService.updateMetaTags(
      this.translate.instant('shopping_cart_page_meta_description'),
      this.translate.instant('shopping_cart_page_meta_keywords'),
      this.translate.instant('shopping_cart_page_meta_og_title'),
      this.translate.instant('shopping_cart_page_meta_og_description'),
      this.translate.instant('shopping_cart_page_meta_og_image'),
      this.translate.instant('shopping_cart_page_meta_og_url')
    );
  }
  onTabChange(event: any) {
    this.selectedTab = event.index === 0 ? 'cart' : 'quote';
  }
  navigateToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
