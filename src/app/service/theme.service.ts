import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FooterResponse } from '../models/FooterResponse';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private BASE_URL= environment.baseURL;
  constructor(private http: HttpClient) { }

  getThemeDashboardContentBySiteUrl(siteUrl: string):Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData()
    const query = `query {
        getThemeDashboardContentBySiteUrl(siteUrl: "${siteUrl}") {
          favIcon
        siteLogo
        themeName
        customerReviewsDesign
        bestSellerSliderStyle
        brandSliderStyle
        flashProductSliderStyle
        recentlyViewedSliderStyle
        enableTitle
        enableBrowserHistory
        customerReviewSliderStyle
        newlyAddedSliderStyle
        threeInOneEnableHeadline
        threeInOneSliderHeadline
        bestSellerSliderHeading
        bestSellerShowHeading
        flashSaleSliderHeading
        flashSaleShowHeading
        newlyAddedSliderHeading
        newlyAddedShowHeading
        brandSliderHeading
        brandShowHeading
        customerReviewSliderHeading
        customerReviewShowHeading
        recentlyViewedSliderHeading
        announcementBar {
            id
            description
            textColor
            backGroungColor
            scrollDown
            createDate
            updateDate
            annoucementBarStatus
        }
        topMenu {
            id
            createdDate
            updatedDate
            storeDetails
            wishlist
            signInAndSignUp
            cart
            design
            country
            language
            currency
        }
        mainBannersEspot {
            id
            businessId
            imageUrl
            categoryId
            imageDescription
            imageTitle
            imageTagline
            imageBackgroundColor
            imageType
            actionButtonText
            actionButtonRedius
            actionButtonFont
            actionButtonColor
            mainBannerDesign
            espotBannerDesign
            actionButtonFontSize
            actionButtonItalic
            actionButtonBold
            imagePosition
            titleBold
            titleItalic
            titleFont
            titleFontSize
            taglineBold
            taglineItalic
            taglineFont
            taglineFontSize
        }
        threeInOneBannersEspot {
            id
            businessId
            imageUrl
            categoryId
            imageDescription
            imageTitle
            imageTagline
            imageBackgroundColor
            imageType
            actionButtonText
            actionButtonRedius
            actionButtonFont
            actionButtonColor
            mainBannerDesign
            espotBannerDesign
            actionButtonFontSize
            actionButtonItalic
            actionButtonBold
            imagePosition
            titleBold
            titleItalic
            titleFont
            titleFontSize
            taglineBold
            taglineItalic
            taglineFont
            taglineFontSize
        }
        espotBanners {
            id
            businessId
            imageUrl
            categoryId
            imageDescription
            imageTitle
            imageTagline
            imageBackgroundColor
            imageType
            actionButtonText
            actionButtonRedius
            actionButtonFont
            actionButtonColor
            mainBannerDesign
            espotBannerDesign
            actionButtonFontSize
            actionButtonItalic
            actionButtonBold
            imagePosition
            titleBold
            titleItalic
            titleFont
            titleFontSize
            taglineBold
            taglineItalic
            taglineFont
            taglineFontSize
        }
        flashSaleProducts {
            id
            productName
            mainImageUrl
            quantity
            price
            salePrice
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        bestSellerProducts {
            id
            productId
            productName
            mainImageUrl
            price
            salePrice
            quantity
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        newlyAddedProducts {
            id
            productId
            productName
            price
            salePrice
            quantity
            mainImageUrl
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        eSpotTextSlider {
            id
            description
            textColor
            backGroundColor
            enableScroll
            status
            createdDate
            updatedDate
        }
        brandsSlider {
            brandId
            brandName
            brandLogo
        }
        footer {
            id
            footerDesign
            textColor
            backgroundColor
            logoImage
            footerLogoImage
            description
            showYoutube
            aboutUs
            faq
            location
            unsubscribe
            contactUs
            youtubeAccount
            showTwitter
            twitterAccount
            showFacebook
            facebookAccount
            showFazealSocial
            fazealSocialAccount
            showLinkedin
            linkedinAccount
            showInstagram
            instagramAccount
            showPinterest
            pinterestAccount
            contactUsPosition
            unsubscribePosition
            locationPosition
            faqPosition
            aboutUsPosition
            createdDate
            updatedDate
        }
        copyrights {
            id
            text
            textDirection
            createdDate
            updatedDate
        }
        themeColorsResponse {
            id
            name
        }
        siteOptionsResponses {
            id
            optionName
        }
        customerReviews {
            reviewId
            reviewImage
            comment
            customerName
            rating
            customerReviewsDesign
            showCustomerReviews
            customerReviewsSliderHeading
            customerReviewsRowCount
            profileImage
        }
        recentlyViewedProducts {
            id
            productId
            productName
            mainImageUrl
            price
            salePrice
            quantity
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        chatSettingResponse {
            id
            iconPosition
            iconStyle
            color
            createdDate
            updatedDate
        }
        }
      }`
    form.append('query',query)
    return this.http.post(this.BASE_URL,form)
  }

  getBusinessProductListingPageContentBySiteUrl(siteUrl: string,id: number):Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData()
    const query = `query {
        getBusinessProductListingPageContentBySiteUrl(siteUrl: "${siteUrl}", categoryId: "${id}") {
          breadcrumbsDesign
          breadcrumbsEnabled
          productsRows
          productsCols
          cartButtonEnabled
          leftPanelEnabled
          leftPanelCategoriesEnabled
          leftPanelPriceEnabled
          leftPanelColorEnabled
          leftPanelSizeEnabled
          relatedProductsEnabled
          footerBannerEnabled
          footerBannerTextColor
          footerBannerBGColor
          recentlyViewedEnabled
          bestsellerProductsEnabled
          sortByFilterEnabled
          plpSliderStyle
          relatedProductSliderStyle
          relatedProductsHeadingEnabled
          relatedProductHeading
          bestSellerProductHeading
          bestSellerProductHeadingEnabled
          bestSellerProductSliderStyle
          recentlyViewedProductSliderStyle
          recentlyViewedBrowsingHistory
          recentlyViewedProductHeading
          recentlyViewedProductHeadingEnabled
          themeName
          themeColor
          categoryDTO
          bestSellerProducts {
            id
            productName
            url
            mainImageUrl
            quantity
            price
            salePrice
            inStock
            minPrice
            maxPrice
            priceVary
          }
          relatedProducts {
            id
            productName
            url
            mainImageUrl
            quantity
            price
            salePrice
            inStock
            minPrice
            maxPrice
            priceVary
          }
          recentlyViewedProducts {
            id
            productName
            url
            mainImageUrl
            quantity
            price
            salePrice
            inStock
            minPrice
            maxPrice
            priceVary
          }
          products {
            id
            productName
            url
            mainImageUrl
            quantity
            price
            salePrice
            inStock
            minPrice
            maxPrice
            priceVary
          }
        }
      }`
    form.append('query',query);
    return this.http.post(this.BASE_URL,form)
  }

  getPdpContentBySiteUrl(siteUrl: string):Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData()
    const query = `
    query {
        getPdpContentBySiteUrl(siteUrl: "${siteUrl}") {
        id
        businessDetailsEntityId
        pdpLayout
        gridProductCount
        showWarranty
        showReviews
        showVarients
        showProductDescription
        showProductSpecifications
        showSKU
        showAvailability
        showProductType
        showRating
        showWishlist
        classicDesign
        cartButtonRedis
        showProductInfo
        productInfoDesign
        showRelatedProducts
        relatedProductSliderStyle
        showCustomerReviews
        customerReviewsDesign
        customerReviewsSliderHeading
        customerReviewsRowCount
        breadcrumbsDesign
        showProductPrice
        showAddToCart
        showColor
        showSize
        showBestSellingProducts
        showRecentlyViewedProducts
        themeName
        themeColor
        showBestSellingHeading
        bestSellingHeading
        bestSellingSlider
        showRelatedProductsHeading
        relatedProductsHeading
        showRecentlyViewedBrowseHistory
        recentlyViewedSlider
        recentlyViewedHeading
        showRecentlyViewedHeading
        showCustomerReviewsHeading
        bestSellerProducts {
            id
            productName
            mainImageUrl
            quantity
            price
            salePrice
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        pdpRecentlyViewedProducts {
            id
            productName
            mainImageUrl
            quantity
            price
            salePrice
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        pdpRelatedProducts {
            id
            productName
            mainImageUrl
            quantity
            price
            salePrice
            reviewCount
            averageRating
            url
            inStock
            minPrice
            maxPrice
            priceVary
        }
        customerReviewDTOS {
            reviewId
            reviewImage
            comment
            customerName
            rating
            customerReviewsDesign
            showCustomerReviews
            customerReviewsSliderHeading
            customerReviewsRowCount
        }
    }
    }`
    form.append('query',query);
    return this.http.post(this.BASE_URL,form)
  }

  getLanguageBySiteUrl(siteUrl: string):Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData()
    const query = `query {  getLanguageBySiteUrl(siteUrl: "${siteUrl}")}`
    form.append('query',query);
    return this.http.post(this.BASE_URL,form)
  }

  getSlpContentBySiteUrl(siteUrl: string):Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData()
    const query = `query {
    getSlpContentBySiteUrl(siteUrl: "${siteUrl}") {
        themeName
        themeColor
        showPerPageFilter
        showResultFilter
        productsPerPage
        design
        paginationAlignment
        leftPanelEnabled
        leftPanelCategoriesEnabled
        leftPanelPriceEnabled
        leftPanelReviewEnabled
        leftPanelBrandEnabled
        sortByFilterEnabled
        productsCols
        productQuickViewEnabled
        announcementBar {
            id
            description
            textColor
            backGroungColor
            scrollDown
            createDate
            updateDate
            annoucementBarStatus
        }
        footer {
            id
            footerDesign
            textColor
            backgroundColor
            logoImage
            description
            showYoutube
            aboutUs
            faq
            location
            unsubscribe
            contactUs
            youtubeAccount
            showTwitter
            twitterAccount
            showFacebook
            facebookAccount
            showFazealSocial
            fazealSocialAccount
            showLinkedin
            linkedinAccount
            showInstagram
            instagramAccount
            showPinterest
            pinterestAccount
            contactUsPosition
            unsubscribePosition
            locationPosition
            faqPosition
            aboutUsPosition
            createdDate
            updatedDate
        }
    }
    }`
    form.append('query',query);
    return this.http.post(this.BASE_URL,form)
  }

}
