import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { FourThemeComponent } from "./site-themes/four-theme/four-theme.component";
import { FourThemeCancelOrderReturnRefundComponent } from "./site-themes/four-theme/four-theme-cancel-order-return-refund/four-theme-cancel-order-return-refund.component";
import { FourThemeCancelOrderComponent } from "./site-themes/four-theme/four-theme-cancel-order/four-theme-cancel-order.component";
import { FourThemeCheckoutComponent } from "./site-themes/four-theme/four-theme-checkout/four-theme-checkout.component";
import { FourThemeMyOrderComponent } from "./site-themes/four-theme/four-theme-my-order/four-theme-my-order.component";
import { FourThemeProductSearchComponent } from "./site-themes/four-theme/four-theme-product-search/four-theme-product-search.component";
import { FourThemeReviewsComponent } from "./site-themes/four-theme/four-theme-reviews/four-theme-reviews.component";
import { FourThemeShoppingCartComponent } from "./site-themes/four-theme/four-theme-shopping-cart/four-theme-shopping-cart.component";
import { FourThemeWriteEditReviewsComponent } from "./site-themes/four-theme/four-theme-write-edit-reviews/four-theme-write-edit-reviews.component";
import { PlaceAnOrderComponent } from "./site-themes/four-theme/place-an-order/place-an-order.component";
import { ReturnDetailComponent } from "./site-themes/four-theme/return-detail/return-detail.component";
import { ReturnRefundStepFormComponent } from "./site-themes/four-theme/return-refund-step-form/return-refund-step-form.component";
import { ReturnRefundComponent } from "./site-themes/four-theme/return-refund/return-refund.component";
import { FourNewHomeComponent } from "./site-themes/four-theme/four-new-home/four-new-home.component";
import { FourNewProductListingPageComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component";
import { FourNewProductDetailsComponent } from "./site-themes/four-theme/four-new-product-details/four-new-product-details.component";
import { FourThemeWishlistComponent } from "./site-themes/four-theme/four-theme-wishlist/four-theme-wishlist.component";
import { FourCheckoutWithoutLoginComponent } from "./site-themes/four-theme/four-checkout-without-login/four-checkout-without-login.component";
import { BrowserHistoryComponent } from "./site-themes/four-theme/browser-history/browser-history.component";
import { TrackOrderComponent } from "./site-themes/four-theme/track-order/track-order.component";
import { ProcessPaymentComponent } from "./site-themes/four-theme/process-payment/process-payment.component";
import { FourThemeMyAccountComponent } from "./site-themes/four-theme/four-theme-my-account/four-theme-my-account.component";
import { OrderDetailsComponent } from "./site-themes/four-theme/four-theme-my-order/order-details/order-details.component";
import { PrintOrderSummaryComponent } from "./site-themes/four-theme/print-order-summary/print-order-summary.component";
import { AboutusComponent } from "./site-themes/four-theme/legal-pages/aboutus/aboutus.component";
import { TermsConditionsComponent } from "./site-themes/four-theme/legal-pages/terms-conditions/terms-conditions.component";
import { EulaComponent } from "./site-themes/four-theme/legal-pages/eula/eula.component";
import { CookiesPolicyComponent } from "./site-themes/four-theme/legal-pages/cookies-policy/cookies-policy.component";
import { ReturnPolicyComponent } from "./site-themes/four-theme/legal-pages/return-policy/return-policy.component";
import { TermsofuseComponent } from "./site-themes/four-theme/legal-pages/termsofuse/termsofuse.component";
import { ContactUsComponent } from "./site-themes/four-theme/contact-us/contact-us.component";
import { NoDomainComponent } from "./site-themes/four-theme/no-domain/no-domain.component";
import { RedeemPointsComponent } from "./site-themes/four-theme/redeem-points/redeem-points.component";
import { ReturnRefundProcessComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-process/return-refund-process.component";
import { ReturnRefundDetailsComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/return-refund-details.component";
import { ReturnRefundSlipComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/return-refund-slip/return-refund-slip.component";
import { environment } from "src/environments/environment";

let routes: Routes
if(environment.env !== 'local'){
  routes = [
    { path: 'domain-not-exist',component: NoDomainComponent},
    {
      path: '', component: FourThemeComponent, data: { title: 'Themes selected' },
      children: [
        // Theme Impacted Pages
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: FourNewHomeComponent},
        { path: 's', component: FourThemeProductSearchComponent},
        { path: 'product/:id/', component: FourNewProductDetailsComponent},
        { path: ':id/product-list', component: FourNewProductListingPageComponent},
        { path: 'category/:id', component: FourNewProductListingPageComponent},
        { path: 'category/:parent-category/:id', component: FourNewProductListingPageComponent},
        { path: 'category/:parent-category/:child-catagory/:id', component: FourNewProductListingPageComponent},
        { path: 'product/:product-name/:id', component: FourNewProductDetailsComponent},
        { path: 'my-wishlist',component: FourThemeWishlistComponent},
        { path: 'view-browser-history', component: BrowserHistoryComponent},


        // No Theme Impacted Pages
        { path: 'my-account', component: FourThemeMyAccountComponent},
        { path: 'my-order', component: FourThemeMyOrderComponent},
        { path: 'order-details/:id', component: OrderDetailsComponent},
        { path: 'print-order-summary/:id', component: PrintOrderSummaryComponent},
        { path: 'track-order', component: TrackOrderComponent},
        { path: 'terms-and-conditions', component: TermsConditionsComponent},
        { path: 'eula', component: EulaComponent},
        { path: 'cookies-policy', component: CookiesPolicyComponent},
        { path: 'return-policy', component: ReturnPolicyComponent},
        { path: 'terms-of-use', component: TermsofuseComponent},
        { path: 'contact-us', component: ContactUsComponent},
        { path: 'about-us', component: AboutusComponent},
        { path: 'viewcart', component: FourThemeShoppingCartComponent},
        { path: 'checkout', component: FourThemeCheckoutComponent},
        { path: 'checkout-guest', component: FourCheckoutWithoutLoginComponent},
        { path: 'process-payment', component: ProcessPaymentComponent},
        { path: 'cancel-order',component: FourThemeCancelOrderComponent},
        { path: 'cancel-order-return-refund',component: FourThemeCancelOrderReturnRefundComponent},
        { path: 'return-detail',component: ReturnDetailComponent},
        { path: 'return-refund/:id',component: ReturnRefundComponent},
        { path: 'return-refund-process/:id',component: ReturnRefundProcessComponent},
        { path: 'return-refund-details',component: ReturnRefundDetailsComponent},
        { path: 'return-refund-slip',component: ReturnRefundSlipComponent},
        { path: 'return-refund-stepform',component: ReturnRefundStepFormComponent},
        { path: 'write-edit-reviews',component: FourThemeWriteEditReviewsComponent},
        { path: 'place-an-order',component: PlaceAnOrderComponent},
        { path: 'redeem-points',component: RedeemPointsComponent}

      ]
    },



  ];
} else {
  routes =  [

    { path: 'domain-not-exist',component: NoDomainComponent},
    {
      path: ':subdomain', component: FourThemeComponent, data: { title: 'Themes selected' },
      children: [

        // Theme Impacted Pages
        { path: 'home', component: FourNewHomeComponent},
        { path: 's', component: FourThemeProductSearchComponent},
        { path: 'product/:id/', component: FourNewProductDetailsComponent},
        { path: ':id/product-list', component: FourNewProductListingPageComponent},
        { path: 'category/:id', component: FourNewProductListingPageComponent},
        { path: 'category/:parent-category/:id', component: FourNewProductListingPageComponent},
        { path: 'category/:parent-category/:child-catagory/:id', component: FourNewProductListingPageComponent},
        { path: 'product/:product-name/:id', component: FourNewProductDetailsComponent},
        { path: 'my-wishlist',component: FourThemeWishlistComponent},
        { path: 'view-browser-history', component: BrowserHistoryComponent},


        // No Theme Impacted Pages
        { path: 'my-account', component: FourThemeMyAccountComponent},
        { path: 'my-order', component: FourThemeMyOrderComponent},
        { path: 'order-details/:id', component: OrderDetailsComponent},
        { path: 'print-order-summary/:id', component: PrintOrderSummaryComponent},
        { path: 'track-order', component: TrackOrderComponent},
        { path: 'terms-and-conditions', component: TermsConditionsComponent},
        { path: 'eula', component: EulaComponent},
        { path: 'cookies-policy', component: CookiesPolicyComponent},
        { path: 'return-policy', component: ReturnPolicyComponent},
        { path: 'terms-of-use', component: TermsofuseComponent},
        { path: 'contact-us', component: ContactUsComponent},
        { path: 'about-us', component: AboutusComponent},
        { path: 'viewcart', component: FourThemeShoppingCartComponent},
        { path: 'checkout', component: FourThemeCheckoutComponent},
        { path: 'checkout-guest', component: FourCheckoutWithoutLoginComponent},
        { path: 'process-payment', component: ProcessPaymentComponent},
        { path: 'cancel-order',component: FourThemeCancelOrderComponent},
        { path: 'cancel-order-return-refund',component: FourThemeCancelOrderReturnRefundComponent},
        { path: 'return-detail',component: ReturnDetailComponent},
        { path: 'return-refund/:id',component: ReturnRefundComponent},
        { path: 'return-refund-process/:id',component: ReturnRefundProcessComponent},
        { path: 'return-refund-details',component: ReturnRefundDetailsComponent},
        { path: 'return-refund-slip',component: ReturnRefundSlipComponent},
        { path: 'return-refund-stepform',component: ReturnRefundStepFormComponent},
        { path: 'write-edit-reviews',component: FourThemeWriteEditReviewsComponent},
        { path: 'place-an-order',component: PlaceAnOrderComponent},
        { path: 'redeem-points',component: RedeemPointsComponent}

      ]
    },



  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
