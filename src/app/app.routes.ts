import { Routes } from "@angular/router";
import { FourThemeComponent } from "./site-themes/four-theme/four-theme.component";
import { NoDomainComponent } from "./site-themes/four-theme/no-domain/no-domain.component";
import { FourNewHomeComponent } from "./site-themes/four-theme/four-new-home/four-new-home.component";

export const routes: Routes = [
    { path: 'domain-not-exist', component: NoDomainComponent },
    {
        path: ':subdomain', component: FourThemeComponent, data: { title: 'Themes selected' },
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: FourNewHomeComponent },
            {
                path: 's',
                loadComponent: () => import('./site-themes/four-theme/four-theme-product-search/four-theme-product-search.component').then(m => m.FourThemeProductSearchComponent)
            },
            {
                path: 'product/:id',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-details/four-new-product-details.component').then(m => m.FourNewProductDetailsComponent)
            },
            {
                path: ':id/product-list',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component').then(m => m.FourNewProductListingPageComponent)
            },
            {
                path: 'category/:id',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component').then(m => m.FourNewProductListingPageComponent)
            },
            {
                path: 'category/:parent-category/:id',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component').then(m => m.FourNewProductListingPageComponent)
            },
            {
                path: 'category/:parent-category/:child-catagory/:id',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component').then(m => m.FourNewProductListingPageComponent)
            },
            {
                path: 'product/:product-name/:id',
                loadComponent: () => import('./site-themes/four-theme/four-new-product-details/four-new-product-details.component').then(m => m.FourNewProductDetailsComponent)
            },
            {
                path: 'my-wishlist',
                loadComponent: () => import('./site-themes/four-theme/four-theme-wishlist/four-theme-wishlist.component').then(m => m.FourThemeWishlistComponent)
            },
            {
                path: 'view-browser-history',
                loadComponent: () => import('./site-themes/four-theme/browser-history/browser-history.component').then(m => m.BrowserHistoryComponent)
            },
            {
                path: 'my-account',
                loadComponent: () => import('./site-themes/four-theme/four-theme-my-account/four-theme-my-account.component').then(m => m.FourThemeMyAccountComponent)
            },
            {
                path: 'my-order',
                loadComponent: () => import('./site-themes/four-theme/four-theme-my-order/four-theme-my-order.component').then(m => m.FourThemeMyOrderComponent)
            },
            {
                path: 'order-details/:id',
                loadComponent: () => import('./site-themes/four-theme/four-theme-my-order/order-details/order-details.component').then(m => m.OrderDetailsComponent)
            },
            {
                path: 'viewcart',
                loadComponent: () => import('./site-themes/four-theme/four-theme-shopping-cart/four-theme-shopping-cart.component').then(m => m.FourThemeShoppingCartComponent)
            },
            {
                path: 'checkout',
                loadComponent: () => import('./site-themes/four-theme/four-theme-checkout/four-theme-checkout.component').then(m => m.FourThemeCheckoutComponent)
            },
            {
                path: 'contact-us',
                loadComponent: () => import('./site-themes/four-theme/contact-us/contact-us.component').then(m => m.ContactUsComponent)
            }
        ]
    }
];
