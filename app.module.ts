import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { AngularMaterialModule } from "./angular-material.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpLoaderFactory, NgxTranslateModule } from "./translate/translate.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { MatButtonModule } from '@angular/material/button';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatChipsModule } from "@angular/material/chips";
import { MatGridListModule } from "@angular/material/grid-list";
import { A11yModule } from "@angular/cdk/a11y";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { CdkStepperModule } from "@angular/cdk/stepper";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatBadgeModule } from "@angular/material/badge";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTreeModule } from "@angular/material/tree";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { SubscribePopupComponent } from "./site-themes/default_theme/subscribe-popup/subscribe-popup.component";
import { authInterceptorProviders } from "./service/auth.intercepor.service";
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule  } from '@angular-material-components/moment-adapter';
import { ChartsizePopupComponent } from "./site-themes/default_theme/product-detail/chartsize-popup/chartsize-popup.component";
import { CommonModule, DatePipe } from "@angular/common";
import { MdbCarouselModule } from "mdb-angular-ui-kit/carousel";
import { ProductReviewImagepopupComponent } from "./site-themes/default_theme/product-detail/product-review-imagepopup/product-review-imagepopup.component";
import { FourThemeComponent } from "./site-themes/four-theme/four-theme.component";
import { FourThemeProductSearchComponent } from "./site-themes/four-theme/four-theme-product-search/four-theme-product-search.component";
import { FourThemeShoppingCartComponent } from "./site-themes/four-theme/four-theme-shopping-cart/four-theme-shopping-cart.component";
import { FourThemeCheckoutComponent } from "./site-themes/four-theme/four-theme-checkout/four-theme-checkout.component";
import { PlaceAnOrderComponent } from "./site-themes/four-theme/place-an-order/place-an-order.component";
import { FourThemeMyOrderComponent } from "./site-themes/four-theme/four-theme-my-order/four-theme-my-order.component";
import { FourThemeReviewsComponent } from "./site-themes/four-theme/four-theme-reviews/four-theme-reviews.component";
import { FourThemeWriteEditReviewsComponent } from "./site-themes/four-theme/four-theme-write-edit-reviews/four-theme-write-edit-reviews.component";
import { ReturnRefundComponent } from "./site-themes/four-theme/return-refund/return-refund.component";
import { ReturnRefundStepFormComponent } from "./site-themes/four-theme/return-refund-step-form/return-refund-step-form.component";
import { ReturnDetailComponent } from "./site-themes/four-theme/return-detail/return-detail.component";
import { FourThemeCancelOrderComponent } from "./site-themes/four-theme/four-theme-cancel-order/four-theme-cancel-order.component";
import { FourThemeCancelOrderReturnRefundComponent } from "./site-themes/four-theme/four-theme-cancel-order-return-refund/four-theme-cancel-order-return-refund.component";
import { OrderDetailPrintModalComponent } from "./site-themes/four-theme/order-detail-print-modal/order-detail-print-modal.component";
import { FourHeaderComponent } from "./site-themes/four-theme/four-header/four-header.component";
import { FourFooterComponent } from "./site-themes/four-theme/four-footer/four-footer.component";
import { ThanksForloginModalComponent } from "./site-themes/four-theme/thanks-forlogin-modal/thanks-forlogin-modal.component";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FourMainHeaderEspotComponent } from "./site-themes/four-theme/four-main-header-espot/four-main-header-espot.component";
import { FourNewHomeComponent } from "./site-themes/four-theme/four-new-home/four-new-home.component";
import { ThemeProductCarouselComponent } from "./site-themes/four-theme/theme-product-carousel/theme-product-carousel.component";
import { CarouselModule } from "ngx-owl-carousel-o";
import { FourThemePopularCategoriesComponent } from "./site-themes/four-theme/four-theme-popular-categories/four-theme-popular-categories.component";
import { RouterModule } from "@angular/router";
import { FourRecentlyViewedComponent } from "./site-themes/four-theme/four-recently-viewed/four-recently-viewed.component";
import { FourEspotBannerComponent } from "./site-themes/four-theme/four-espot-banner/four-espot-banner.component";
import { FourThemeTextsliderEspotComponent } from "./site-themes/four-theme/four-theme-textslider-espot/four-theme-textslider-espot.component";
import { StripHtmlTagsPipe } from "./pipes/strip-html-tag.pipe";
import { FourCustomerReviewsComponent } from "./site-themes/four-theme/four-customer-reviews/four-customer-reviews.component";
import { FourBrandLogosSliderComponent } from "./site-themes/four-theme/four-brand-logos-slider/four-brand-logos-slider.component";
import { FourNewProductListingPageComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-new-product-listing-page.component";
import { FourReleatedProductsComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-releated-products/four-releated-products.component";
import { FourFooterBannerComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-footer-banner/four-footer-banner.component";
import { FourContentAreaComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-content-area/four-content-area.component";
import { FourBreadcrumsComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-breadcrums/four-breadcrums.component";
import { FourBestSellingProductsComponent } from "./site-themes/four-theme/four-new-product-listing-page/four-best-selling-products/four-best-selling-products.component";
import { FourNewProductDetailsComponent } from "./site-themes/four-theme/four-new-product-details/four-new-product-details.component";
import { FourProductLayoutComponent } from "./site-themes/four-theme/four-new-product-details/four-product-layout/four-product-layout.component";
import { FourProductInfoComponent } from "./site-themes/four-theme/four-new-product-details/four-product-info/four-product-info.component";
import { FourProductDetailsCustomerReviewsComponent } from "./site-themes/four-theme/four-new-product-details/four-product-details-customer-reviews/four-product-details-customer-reviews.component";
import { SucessmsgPopupComponent } from "./sucessmsg-popup/sucessmsg-popup.component";
import { NotifacationMessageComponent } from "./notifacation-message/notifacation-message.component";
import { EditReviewModalComponent } from "./site-themes/four-theme/edit-review-modal/edit-review-modal.component";
import { FourThemeWishlistComponent } from "./site-themes/four-theme/four-theme-wishlist/four-theme-wishlist.component";
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ReplaceSpecialCharsPipe } from './pipes/replace-special-chars.pipe';
import { FourCheckoutWithoutLoginComponent } from "./site-themes/four-theme/four-checkout-without-login/four-checkout-without-login.component";
import { SignupModalCheckoutComponent } from "./site-themes/four-theme/signup-modal-checkout/signup-modal-checkout.component";
import { StoreLocationModalComponent } from "./site-themes/four-theme/store-location-modal/store-location-modal.component";
import { DeleteGuestContactInfoComponent } from "./site-themes/four-theme/delete-guest-contact-info/delete-guest-contact-info.component";
import { BrowserHistoryComponent } from "./site-themes/four-theme/browser-history/browser-history.component";
import { TrackOrderComponent } from "./site-themes/four-theme/track-order/track-order.component";
import { ConfirmOrderComponent } from "./site-themes/four-theme/four-theme-my-order/confirm-order/confirm-order.component";
import { CountrysearchPipe } from "./service/countrysearch.pipe";
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { OtheruserMessageComponent } from "./chat-widget/otheruser-message/otheruser-message.component";
import { CurrentuserMessageComponent } from "./chat-widget/currentuser-message/currentuser-message.component";
import { ChatSendMessageComponent } from "./chat-widget/chat-send-message/chat-send-message.component";
import { MessageRecommendationsComponent } from "./chat-widget/message-recommendations/message-recommendations.component";
import { PdpQuickViewComponent } from "./site-themes/four-theme/pdp-quick-view/pdp-quick-view.component";
import { ForgotpasswordcheckoutComponent } from './forgotpasswordcheckout/forgotpasswordcheckout.component';
import { ChatViewComponent } from "./chat-widget/chat-view/chat-view.component";
import { GuestDataInfoComponent } from "./chat-widget/guest-data-info/guest-data-info.component"; 
import { ProcessPaymentComponent } from "./site-themes/four-theme/process-payment/process-payment.component";
import { TextShowMoreLessComponent } from "./chat-widget/text-show-more-less/text-show-more-less.component";
import { AttachementPreviewComponent } from "./chat-widget/attachment-preview/attachement-preview/attachement-preview.component";
import { FourThemeMyAccountComponent } from "./site-themes/four-theme/four-theme-my-account/four-theme-my-account.component";
import { AddAddressComponent } from "./site-themes/four-theme/four-theme-my-account/add-address/add-address.component";
import { AddressListingComponent } from "./site-themes/four-theme/four-theme-my-account/address-listing/address-listing.component";
import { EditAddressComponent } from "./site-themes/four-theme/four-theme-my-account/edit-address/edit-address.component";
import { AddPaymentComponent } from "./site-themes/four-theme/four-theme-my-account/add-payment/add-payment.component";
import { PaymentListingComponent } from "./site-themes/four-theme/four-theme-my-account/payment-listing/payment-listing.component";
import { UnsubscribedwarningComponent } from "./site-themes/four-theme/four-theme-my-account/unsubscribedwarning/unsubscribedwarning.component";
import { OrderDetailsComponent } from "./site-themes/four-theme/four-theme-my-order/order-details/order-details.component";
import { PrintOrderSummaryComponent } from "./site-themes/four-theme/print-order-summary/print-order-summary.component";
import { SubscribeMarketingComponent } from "./site-themes/four-theme/subscribe-marketing/subscribe-marketing.component";
import { AboutusComponent } from "./site-themes/four-theme/legal-pages/aboutus/aboutus.component";
import { TermsConditionsComponent } from "./site-themes/four-theme/legal-pages/terms-conditions/terms-conditions.component";
import { EulaComponent } from "./site-themes/four-theme/legal-pages/eula/eula.component";
import { CookiesPolicyComponent } from "./site-themes/four-theme/legal-pages/cookies-policy/cookies-policy.component";
import { ReturnPolicyComponent } from "./site-themes/four-theme/legal-pages/return-policy/return-policy.component";
import { TermsofuseComponent } from "./site-themes/four-theme/legal-pages/termsofuse/termsofuse.component";
import { UnsubscribeMarketingComponent } from "./site-themes/four-theme/unsubscribe-marketing/unsubscribe-marketing.component";
import { ContactUsComponent } from "./site-themes/four-theme/contact-us/contact-us.component";
import { AnnouncementBarComponent } from "./site-themes/four-theme/announcement-bar/announcement-bar.component";
import { NoDomainComponent } from "./site-themes/four-theme/no-domain/no-domain.component";
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { ProductBoxComponent } from "./site-themes/four-theme/product-box/product-box.component";
import { ProductBoxListComponent } from "./site-themes/four-theme/product-box-list/product-box-list.component";
import { ForgotpasswordforstoreComponent } from "./site-themes/four-theme/forgotpasswordforstore/forgotpasswordforstore.component";
import { CookiesbarComponent } from "./site-themes/four-theme/cookiesbar/cookiesbar.component";
import { CustomPaginatorComponent } from "./site-themes/four-theme/custom-paginator/custom-paginator.component";
import { RedeemPointsComponent } from "./site-themes/four-theme/redeem-points/redeem-points.component";
import { RedeemPointValidationPopupComponent } from "./site-themes/four-theme/redeem-points/redeem-point-validation-popup/redeem-point-validation-popup.component";
import { RedeemPointProductComponent } from "./site-themes/four-theme/redeem-points/redeem-point-product/redeem-point-product.component";
import { RedeemProductsPopupComponent } from "./site-themes/four-theme/redeem-points/redeem-products-popup/redeem-products-popup.component";
import { RedeemVoucherBoxComponent } from "./site-themes/four-theme/redeem-points/redeem-voucher-box/redeem-voucher-box.component";
import { ShippingAddressPopupComponent } from "./site-themes/four-theme/four-theme-checkout/shipping-address-popup/shipping-address-popup.component";
import { AddShippingAddressComponent } from "./site-themes/four-theme/four-theme-checkout/add-shipping-address/add-shipping-address.component";
import { AddCardPopupComponent } from "./site-themes/four-theme/four-theme-checkout/add-card-popup/add-card-popup.component";
import { PickOrderPersonPopupComponent } from "./site-themes/four-theme/four-theme-checkout/pick-order-person-popup/pick-order-person-popup.component";
import { BillingAddressPopupComponent } from "./site-themes/four-theme/four-theme-checkout/BillingAddressPopup/BillingAddressPopup.component";
import { AddBillingAddressPopupComponent } from "./site-themes/four-theme/four-theme-checkout/AddBillingAddressPopup/AddBillingAddressPopup.component";
import { ReviewImageViewComponent } from "./site-themes/four-theme/four-new-product-details/reviewImageView/reviewImageView.component";
import { FormattedDatePipePipe } from "./pipes/FormattedDatePipe.pipe";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdown, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgChartsModule } from 'ng2-charts';
import { StorehoursComponent } from "./site-themes/four-theme/four-theme-checkout/storehours/storehours.component";
import { EditShippingAddressComponent } from "./site-themes/four-theme/four-theme-checkout/edit-shipping-address/edit-shipping-address.component";
import { EditbillingaddresspopupComponent } from "./site-themes/four-theme/four-theme-checkout/editbillingaddresspopup/editbillingaddresspopup.component";
import { ViewQrCodeComponent } from "./site-themes/four-theme/four-theme-my-order/view-qr-code/view-qr-code.component";
import { TrackpackageComponent } from "./site-themes/four-theme/four-theme-my-order/trackpackage/trackpackage.component";
import { EditordercustomerdetailsComponent } from "./site-themes/four-theme/four-theme-my-order/editordercustomerdetails/editordercustomerdetails.component";
import { EditordershippingaddressComponent } from "./site-themes/four-theme/four-theme-my-order/editordershippingaddress/editordershippingaddress.component";
import { EditorderpaymentmethodComponent } from "./site-themes/four-theme/four-theme-my-order/editorderpaymentmethod/editorderpaymentmethod.component";
import { ProofofdeliveryComponent } from "./site-themes/four-theme/four-theme-my-order/proofofdelivery/proofofdelivery.component";
import { ProofofPickupComponent } from "./site-themes/four-theme/four-theme-my-order/ProofofPickup/ProofofPickup.component";
import { EditorderpickupinfoComponent } from "./site-themes/four-theme/four-theme-my-order/editorderpickupinfo/editorderpickupinfo.component";
import { ReturnRefundProcessComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-process/return-refund-process.component";
import { ReturnRefundDetailsComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/return-refund-details.component";
import { ReturnReasonsDetailsComponent } from "./site-themes/four-theme/four-theme-my-order/return-reasons-details/return-reasons-details.component";
import { ReturnReasonsBoxComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/return-reasons-box/return-reasons-box.component";
import { ViewReturnImagesComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/view-return-images/view-return-images.component";
import { ReturnRefundSlipComponent } from "./site-themes/four-theme/four-theme-my-order/return-refund-details/return-refund-slip/return-refund-slip.component";
import { NgxBarcode6Module } from 'ngx-barcode6';
import { HeaderThemeFirstComponent } from "./site-themes/four-theme/four-header/header-theme-first/header-theme-first.component";
import { HeaderThemeTwoComponent } from "./site-themes/four-theme/four-header/header-theme-two/header-theme-two.component";
import { HeaderThemeThreeComponent } from "./site-themes/four-theme/four-header/header-theme-three/header-theme-three.component";
import { HeaderThemeFourComponent } from "./site-themes/four-theme/four-header/header-theme-four/header-theme-four.component";
import { HeaderThemeFiveComponent } from "./site-themes/four-theme/four-header/header-theme-five/header-theme-five.component";
import { HeaderThemeSevenComponent } from "./site-themes/four-theme/four-header/header-theme-seven/header-theme-seven.component";
import { HeaderThemeSixComponent } from "./site-themes/four-theme/four-header/header-theme-six/header-theme-six.component";
import { HeaderThemeEightComponent } from "./site-themes/four-theme/four-header/header-theme-eight/header-theme-eight.component";
import { HeaderThemeTenComponent } from "./site-themes/four-theme/four-header/header-theme-ten/header-theme-ten.component";
import { HeaderThemeNineComponent } from "./site-themes/four-theme/four-header/header-theme-nine/header-theme-nine.component";
import { HeaderThemeElevenComponent } from "./site-themes/four-theme/four-header/header-theme-eleven/header-theme-eleven.component";
import { EditpickupinfoforreserveComponent } from "./site-themes/four-theme/four-theme-my-order/editpickupinfoforreserve/editpickupinfoforreserve.component";
import { HeaderThemeTwelveComponent } from "./site-themes/four-theme/four-header/header-theme-twelve/header-theme-twelve.component";
import { HeaderThemeThirteenComponent } from "./site-themes/four-theme/four-header/header-theme-thirteen/header-theme-thirteen.component";
import { HeaderThemeFourteenComponent } from "./site-themes/four-theme/four-header/header-theme-fourteen/header-theme-fourteen.component";
import { PdpTheme1Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme1/pdp-theme1.component";
import { PdpTheme2Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme2/pdp-theme2.component";
import { PdpTheme3Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme3/pdp-theme3.component";
import { PdpTheme4Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme4/pdp-theme4.component";
import { PdpTheme5Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme5/pdp-theme5.component";
import { PdpTheme6Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme6/pdp-theme6.component";
import { PdpTheme7Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme7/pdp-theme7.component";
import { PdpTheme8Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme8/pdp-theme8.component";
import { PdpTheme9Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme9/pdp-theme9.component";
import { PdpTheme10Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme10/pdp-theme10.component";
import { PdpTheme11Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme11/pdp-theme11.component";
import { PdpTheme12Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme12/pdp-theme12.component";
import { PdpTheme13Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme13/pdp-theme13.component";
import { QuickviewTheme1Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme1/quickview-theme1.component";
import { QuickviewTheme2Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme2/quickview-theme2.component";
import { QuickviewTheme3Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme3/quickview-theme3.component";
import { QuickviewTheme4Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme4/quickview-theme4.component";
import { QuickviewTheme5Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme5/quickview-theme5.component";
import { QuickviewTheme6Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme6/quickview-theme6.component";
import { QuickviewTheme7Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme7/quickview-theme7.component";
import { QuickviewTheme8Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme8/quickview-theme8.component";
import { QuickviewTheme9Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme9/quickview-theme9.component";
import { QuickviewTheme10Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme10/quickview-theme10.component";
import { QuickviewTheme11Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme11/quickview-theme11.component";
import { QuickviewTheme12Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme12/quickview-theme12.component";
import { QuickviewTheme13Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme13/quickview-theme13.component";
import { QuickviewTheme14Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme14/quickview-theme14.component";
import { PdpTheme14Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme14/pdp-theme14.component";
import { PdpTheme15Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme15/pdp-theme15.component";
import { QuickviewTheme15Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme15/quickview-theme15.component";
import { HeaderThemeFifteenComponent } from "./site-themes/four-theme/four-header/header-theme-fifteen/header-theme-fifteen.component";
import { QuickviewTheme16Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme16/quickview-theme16.component";
import { PdpTheme16Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme16/pdp-theme16.component";
import { HeaderThemeSixteenComponent } from "./site-themes/four-theme/four-header/header-theme-sixteen/header-theme-sixteen.component";
import { PdpTheme17Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme17/pdp-theme17.component";
import { QuickviewTheme17Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme17/quickview-theme17.component";
import { HeaderThemeSeventeenComponent } from "./site-themes/four-theme/four-header/header-theme-seventeen/header-theme-seventeen.component";
import { HeaderThemeEighteenComponent } from "./site-themes/four-theme/four-header/header-theme-eighteen/header-theme-eighteen.component";
import { PdpTheme18Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme18/pdp-theme18.component";
import { QuickviewTheme18Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme18/quickview-theme18.component";
import { HeaderThemeNineteenComponent } from "./site-themes/four-theme/four-header/header-theme-nineteen/header-theme-nineteen.component";
import { PdpTheme19Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme19/pdp-theme19.component";
import { QuickviewTheme19Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme19/quickview-theme19.component";
import { HeaderThemeTwentyComponent } from "./site-themes/four-theme/four-header/header-theme-twenty/header-theme-twenty.component";
import { HeaderThemeTwentyoneComponent } from "./site-themes/four-theme/four-header/header-theme-twentyone/header-theme-twentyone.component";
import { PdpTheme20Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme20/pdp-theme20.component";
import { PdpTheme21Component } from "./site-themes/four-theme/four-new-product-details/four-product-layout/pdp-theme21/pdp-theme21.component";
import { QuickviewTheme20Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme20/quickview-theme20.component";
import { QuickviewTheme21Component } from "./site-themes/four-theme/pdp-quick-view/quickview-theme21/quickview-theme21.component";
import { FinixPaymentCheckoutComponent } from "./site-themes/four-theme/four-theme-checkout/finix-payment-checkout/finix-payment-checkout.component";
import { ViewStoreLocationComponent } from "./site-themes/four-theme/place-an-order/view-store-location/view-store-location.component";
import { FullscreenPdpImageComponent } from "./site-themes/four-theme/four-new-product-details/four-product-layout/fullscreen-pdp-image/fullscreen-pdp-image.component";
 

@NgModule({
  declarations: [
    AppComponent,
      SubscribePopupComponent,
      ChartsizePopupComponent,
      ProductReviewImagepopupComponent,
      FourThemeComponent,
      FourThemeProductSearchComponent,
      FourThemeShoppingCartComponent,
      FourThemeCheckoutComponent,
      PlaceAnOrderComponent,
      FourThemeMyOrderComponent,
      FourThemeReviewsComponent,
      FourThemeWriteEditReviewsComponent,
      ReturnRefundComponent,
      ReturnRefundStepFormComponent,
      ReturnDetailComponent,
      FourThemeCancelOrderComponent,
      FourThemeCancelOrderReturnRefundComponent,
      OrderDetailPrintModalComponent,
      FourHeaderComponent,
      FourFooterComponent,
      ThanksForloginModalComponent,
      FourNewHomeComponent,
      FourMainHeaderEspotComponent,
      FourThemePopularCategoriesComponent,
      ThemeProductCarouselComponent,
      FourRecentlyViewedComponent,
      FourEspotBannerComponent,
      FourThemeTextsliderEspotComponent,
      StripHtmlTagsPipe,
      FourCustomerReviewsComponent,
      FourBrandLogosSliderComponent,
      FourNewProductListingPageComponent,
      FourReleatedProductsComponent,
      FourFooterBannerComponent,
      FourContentAreaComponent,
      FourBreadcrumsComponent,
      FourBestSellingProductsComponent,
      FourNewProductDetailsComponent,
      FourProductLayoutComponent,
      FourProductInfoComponent,
      FourProductDetailsCustomerReviewsComponent,
      SucessmsgPopupComponent,
      NotifacationMessageComponent,
      EditReviewModalComponent,
      FourThemeWishlistComponent,
      ReplaceSpecialCharsPipe,
      FourCheckoutWithoutLoginComponent,
      SignupModalCheckoutComponent,
      StoreLocationModalComponent,
      DeleteGuestContactInfoComponent,
      BrowserHistoryComponent,
      TrackOrderComponent,
      ConfirmOrderComponent,
      CountrysearchPipe,
      ChatWidgetComponent,
      OtheruserMessageComponent,
      CurrentuserMessageComponent,
      ChatSendMessageComponent,
      MessageRecommendationsComponent,
      PdpQuickViewComponent,
      ProcessPaymentComponent,
      ChatViewComponent,
      GuestDataInfoComponent, 
      TextShowMoreLessComponent,
      AttachementPreviewComponent, 
      FourThemeMyAccountComponent,
      AddAddressComponent,
      AddressListingComponent,
      EditAddressComponent,
      AddPaymentComponent,
      PaymentListingComponent,
      UnsubscribedwarningComponent,
      OrderDetailsComponent,
      PrintOrderSummaryComponent,
      SubscribeMarketingComponent,
      AboutusComponent,
      TermsConditionsComponent,
      EulaComponent,
      CookiesPolicyComponent,
      ReturnPolicyComponent,
      TermsofuseComponent,
      UnsubscribeMarketingComponent,
      ContactUsComponent,
      AnnouncementBarComponent,
      NoDomainComponent,
      ProductBoxComponent,
      ProductBoxListComponent,
      ForgotpasswordforstoreComponent,
      CookiesbarComponent,
      CustomPaginatorComponent,
      RedeemPointsComponent,
      RedeemPointValidationPopupComponent,
      RedeemPointProductComponent,
      RedeemProductsPopupComponent,
      RedeemVoucherBoxComponent,
      ShippingAddressPopupComponent,
      AddShippingAddressComponent,
      AddCardPopupComponent,
      PickOrderPersonPopupComponent,
      BillingAddressPopupComponent,
      AddBillingAddressPopupComponent,
      ReviewImageViewComponent,
      FormattedDatePipePipe,
      StorehoursComponent,
      EditShippingAddressComponent,
      EditbillingaddresspopupComponent,
      ViewQrCodeComponent,
      TrackpackageComponent,
      EditordercustomerdetailsComponent,
      EditordershippingaddressComponent,
      EditorderpaymentmethodComponent,
      ProofofdeliveryComponent,
      ProofofPickupComponent,
      EditorderpickupinfoComponent,
      ReturnRefundProcessComponent,
      ReturnRefundDetailsComponent,
      ReturnReasonsDetailsComponent,
      ReturnReasonsBoxComponent,
      ViewReturnImagesComponent,
      ReturnRefundSlipComponent,
      HeaderThemeFirstComponent,
      HeaderThemeTwoComponent,
      HeaderThemeThreeComponent,
      HeaderThemeFourComponent,
      HeaderThemeFiveComponent,
      HeaderThemeSixComponent,
      HeaderThemeSevenComponent,
      HeaderThemeEightComponent,
      HeaderThemeNineComponent,
      HeaderThemeTenComponent,
      HeaderThemeElevenComponent,
      EditpickupinfoforreserveComponent,
      HeaderThemeTwelveComponent,
      HeaderThemeThirteenComponent,
      HeaderThemeFourteenComponent,
      HeaderThemeFifteenComponent,
      HeaderThemeSixteenComponent,
      HeaderThemeSeventeenComponent,
      HeaderThemeEighteenComponent,
      HeaderThemeNineteenComponent,
      HeaderThemeTwentyComponent,
      HeaderThemeTwentyoneComponent,
      PdpTheme1Component,
      PdpTheme2Component,
      PdpTheme3Component,
      PdpTheme4Component,
      PdpTheme5Component,
      PdpTheme6Component,
      PdpTheme7Component,
      PdpTheme8Component,
      PdpTheme9Component,
      PdpTheme10Component,
      PdpTheme11Component,
      PdpTheme12Component,
      PdpTheme13Component,
      PdpTheme14Component,
      PdpTheme15Component,
      PdpTheme16Component,
      PdpTheme17Component,
      PdpTheme18Component,
      PdpTheme19Component,
      PdpTheme20Component,
      PdpTheme21Component,
      QuickviewTheme1Component,
      QuickviewTheme2Component,
      QuickviewTheme3Component,
      QuickviewTheme4Component,
      QuickviewTheme5Component,
      QuickviewTheme6Component,
      QuickviewTheme7Component,
      QuickviewTheme8Component,
      QuickviewTheme9Component,
      QuickviewTheme10Component,
      QuickviewTheme11Component,
      QuickviewTheme12Component,
      QuickviewTheme13Component,
      QuickviewTheme14Component,
      QuickviewTheme15Component,
      QuickviewTheme16Component,
      QuickviewTheme17Component,
      QuickviewTheme18Component,
      QuickviewTheme19Component,
      QuickviewTheme20Component,
      QuickviewTheme21Component,
      FinixPaymentCheckoutComponent,
      ViewStoreLocationComponent,
      FullscreenPdpImageComponent
   ],
  imports: [
    NgSelectModule,
    
    NgxBarcode6Module,
    CommonModule,
    FormsModule,
    BrowserModule,
    Ng2ImgMaxModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxTranslateModule,
    AngularEditorModule,
    CanvasJSAngularChartsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularMaterialModule,
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    HttpClientModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxMatNativeDateModule,
    MdbCarouselModule,
    NgxSliderModule,
    CarouselModule,
    RouterModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbDropdown,
    NgxImageZoomModule,
    NgChartsModule
    ],
  exports: [
    StripHtmlTagsPipe,
  ],
  providers: [
   authInterceptorProviders,DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
