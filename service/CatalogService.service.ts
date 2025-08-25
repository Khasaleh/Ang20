import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionResponse } from '../models/SessionResponse';
import { TokenStorageService } from './TokenStorgeService.service';
import { CookieDataServiceService } from './cookie-data-service.service';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  private BASE_URL = environment.baseURL;
  sessionResponse!: SessionResponse;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  private getSiteUrl(siteUrl: string): string {
    if (this.isBrowser && environment.env !== 'local') {
      return window.location.hostname;
    } else if (!this.isBrowser && this.request) {
      return this.request.hostname;
    }
    return siteUrl;
  }

  listAttributesByCategory(businessId: number, categoryName: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      listAttributesForPlp(businessId: ${businessId}, query: "${categoryName}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  findAllCategoryBySiteUrl(siteUrl: string): Observable<any> {
    siteUrl = this.getSiteUrl(siteUrl);
    let form: FormData = new FormData();
    const query = `query {
      findAllCategoryBySiteUrl(siteUrl: "${siteUrl}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByCategoryId(categoryIds: number, businessIds: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByCategoryId(categoryIds: [${categoryIds}], businessIds: [${businessIds}]){
        id
        name
        active
        barcode
        quantity
        description
        productTypeStatus
        brandName
        selfGenProductId
        productWeight
        price
        keywords
        sizeChartImage
        isChildItem
        discount
        costPrice
        salePrice
        url
        productDimentions
        createdDate
        updatedDate
        seo {
            description
            title
        }
        identifiers {
            isbn
            mpn
            ean
            upc
        }
        priceHistory {
            id
            price
            salePrice
        }
        shoppingCategoryL1 {
            id
            name
            businessType
        }
        shoppingCategoryL2 {
            id
            name
            businessType
        }
        shoppingCategoryL3 {
            id
            name
            businessType
        }
        businessDetails {
            tagLine
            siteUrl
            email
            companyId
            weightUnit
            unitSystem
            copyRight
            policies
            timeZone
            contactNumber
            about
            id
            logoName
            country
            businessName
            currency {
                id
                code
                displayName
                symbol
                format
            }
            address {
                addressLineOne
                locationName
                phoneNumberOne
                active
                city
                phoneNumberTwo
                state
                addressType
                description
                poBox
                addressLineTwo
                streetNumber
                country
                zipCode
                location{
                    lat
                    lon
                }
            }
            shipping {
                countryId
                stateIds
                countryShortName
                onedayShippingRate
                expiditedShippingRate
                countryName
                shippingRateId
                countryCode
                status
                standaredShippingRate
                stateNames
            }
        }
        productSpecification {
            id
            name
            value
        }
        categoryL1 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL2 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL3 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        mainSku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        sku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        images {
            id
            name
            mainImage
        }
        mainImageUrl
        catalogPromotionProduct {
          id
          type
          maxRedemptions
          active
          catalogPurchaseCondition
          catalogPromotionRequirementId
          catalogPromotionId
          categoryProductQuantity
          description
          endDate
          promotionTarget
          productQuantity
          percentageOff
          activeStatus
          amountOff
          categoryId
      }
      reviews {
          updatedBy
          rating
          active
          updatedDate
          disagreeCount
          userName
          replyTime
          createdDate
          createdBy
          agreeCount
          imageUrl
          userEmail
          customerID
          votes
          comment
          id
          reply
          headline
          profileImageUrl
          reviewTime
      }
      reviewCount
      averageReview
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByCategoryAndPrice(categoryId: number, businessIds: number, gte: number, lte: number, from: number, size: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByCategoryAndPrice(businessIds: ${businessIds}, categoryId: ${categoryId},
      gte: ${gte}, lte: ${lte}){
        id
        name
        active
        barcode
        quantity
        description
        productTypeStatus
        brandName
        selfGenProductId
        productWeight
        price
        keywords
        sizeChartImage
        isChildItem
        discount
        costPrice
        salePrice
        url
        productDimentions
        createdDate
        updatedDate
        seo {
            description
            title
        }
        identifiers {
            isbn
            mpn
            ean
            upc
        }
        priceHistory {
            id
            price
            salePrice
        }
        shoppingCategoryL1 {
            id
            name
            businessType
        }
        shoppingCategoryL2 {
            id
            name
            businessType
        }
        shoppingCategoryL3 {
            id
            name
            businessType
        }
        businessDetails {
            tagLine
            siteUrl
            email
            companyId
            weightUnit
            unitSystem
            copyRight
            policies
            timeZone
            contactNumber
            about
            id
            logoName
            country
            businessName
            currency {
                id
                code
                displayName
                symbol
                format
            }
            address {
                addressLineOne
                locationName
                phoneNumberOne
                active
                city
                phoneNumberTwo
                state
                addressType
                description
                poBox
                addressLineTwo
                streetNumber
                country
                zipCode
                location{
                    lat
                    lon
                }
            }
            shipping {
                countryId
                stateIds
                countryShortName
                onedayShippingRate
                expiditedShippingRate
                countryName
                shippingRateId
                countryCode
                status
                standaredShippingRate
                stateNames
            }
        }
        productSpecification {
            id
            name
            value
        }
        categoryL1 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL2 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL3 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        mainSku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        sku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        images {
            id
            name
            mainImage
        }
        mainImageUrl
        catalogPromotionProduct {
          id
          type
          maxRedemptions
          active
          catalogPurchaseCondition
          catalogPromotionRequirementId
          catalogPromotionId
          categoryProductQuantity
          description
          endDate
          promotionTarget
          productQuantity
          percentageOff
          activeStatus
          amountOff
          categoryId
      }
      reviews {
          updatedBy
          rating
          active
          updatedDate
          disagreeCount
          userName
          replyTime
          createdDate
          createdBy
          agreeCount
          imageUrl
          userEmail
          customerID
          votes
          comment
          id
          reply
          headline
          profileImageUrl
          reviewTime
      }
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByAttributeName(attributeName: string, attributeValueName: string, businessIds: number, from: number, size: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByAttributeName(  attributeName: ["${attributeName}"],
      attributeValueName: ["${attributeValueName}"],
      businessId: [${businessIds}], from: ${from}, size: ${size}){
        id
        name
        active
        barcode
        quantity
        description
        productTypeStatus
        brandName
        selfGenProductId
        productWeight
        price
        keywords
        sizeChartImage
        isChildItem
        discount
        costPrice
        salePrice
        url
        productDimentions
        createdDate
        updatedDate
        seo {
            description
            title
        }
        identifiers {
            isbn
            mpn
            ean
            upc
        }
        priceHistory {
            id
            price
            salePrice
        }
        shoppingCategoryL1 {
            id
            name
            businessType
        }
        shoppingCategoryL2 {
            id
            name
            businessType
        }
        shoppingCategoryL3 {
            id
            name
            businessType
        }
        businessDetails {
            tagLine
            siteUrl
            email
            companyId
            weightUnit
            unitSystem
            copyRight
            policies
            timeZone
            contactNumber
            about
            id
            logoName
            country
            businessName
            currency {
                id
                code
                displayName
                symbol
                format
            }
            address {
                addressLineOne
                locationName
                phoneNumberOne
                active
                city
                phoneNumberTwo
                state
                addressType
                description
                poBox
                addressLineTwo
                streetNumber
                country
                zipCode
                location{
                    lat
                    lon
                }
            }
            shipping {
                countryId
                stateIds
                countryShortName
                onedayShippingRate
                expiditedShippingRate
                countryName
                shippingRateId
                countryCode
                status
                standaredShippingRate
                stateNames
            }
        }
        productSpecification {
            id
            name
            value
        }
        categoryL1 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL2 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL3 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        mainSku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        sku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        images {
            id
            name
            mainImage
        }
        mainImageUrl
        catalogPromotionProduct {
          id
          type
          maxRedemptions
          active
          catalogPurchaseCondition
          catalogPromotionRequirementId
          catalogPromotionId
          categoryProductQuantity
          description
          endDate
          promotionTarget
          productQuantity
          percentageOff
          activeStatus
          amountOff
          categoryId
      }
      reviews {
          updatedBy
          rating
          active
          updatedDate
          disagreeCount
          userName
          replyTime
          createdDate
          createdBy
          agreeCount
          imageUrl
          userEmail
          customerID
          votes
          comment
          id
          reply
          headline
          profileImageUrl
          reviewTime
      }
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByAttributeNameSku(attributeName: string, attributeValueName: string, businessIds: number, from: number, size: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByAttributeNameSku(  attributesName: ["${attributeName}"],
      attributesValueName: ["${attributeValueName}"],
      businessId: [${businessIds}], from: ${from}, size: ${size}){
        id
        name
        active
        barcode
        quantity
        description
        productTypeStatus
        brandName
        selfGenProductId
        productWeight
        price
        keywords
        sizeChartImage
        isChildItem
        discount
        costPrice
        salePrice
        url
        productDimentions
        createdDate
        updatedDate
        seo {
            description
            title
        }
        identifiers {
            isbn
            mpn
            ean
            upc
        }
        priceHistory {
            id
            price
            salePrice
        }
        shoppingCategoryL1 {
            id
            name
            businessType
        }
        shoppingCategoryL2 {
            id
            name
            businessType
        }
        shoppingCategoryL3 {
            id
            name
            businessType
        }
        businessDetails {
            tagLine
            siteUrl
            email
            companyId
            weightUnit
            unitSystem
            copyRight
            policies
            timeZone
            contactNumber
            about
            id
            logoName
            country
            businessName
            currency {
                id
                code
                displayName
                symbol
                format
            }
            address {
                addressLineOne
                locationName
                phoneNumberOne
                active
                city
                phoneNumberTwo
                state
                addressType
                description
                poBox
                addressLineTwo
                streetNumber
                country
                zipCode
                location{
                    lat
                    lon
                }
            }
            shipping {
                countryId
                stateIds
                countryShortName
                onedayShippingRate
                expiditedShippingRate
                countryName
                shippingRateId
                countryCode
                status
                standaredShippingRate
                stateNames
            }
        }
        productSpecification {
            id
            name
            value
        }
        categoryL1 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL2 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL3 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        mainSku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        sku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        images {
            id
            name
            mainImage
        }
        mainImageUrl
        catalogPromotionProduct {
          id
          type
          maxRedemptions
          active
          catalogPurchaseCondition
          catalogPromotionRequirementId
          catalogPromotionId
          categoryProductQuantity
          description
          endDate
          promotionTarget
          productQuantity
          percentageOff
          activeStatus
          amountOff
          categoryId
      }
      reviews {
          updatedBy
          rating
          active
          updatedDate
          disagreeCount
          userName
          replyTime
          createdDate
          createdBy
          agreeCount
          imageUrl
          userEmail
          customerID
          votes
          comment
          id
          reply
          headline
          profileImageUrl
          reviewTime
      }
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByCategoryAndBrand(queryText: string, businessId: number, from: number, size: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByCategoryAndBrand(  queryText: "${queryText}",
      businessId: ${businessId},
      from: ${from}, size: ${size}){
        totalResponses
        id
        name
        active
        barcode
        quantity
        description
        productTypeStatus
        brandName
        selfGenProductId
        productWeight
        price
        keywords
        sizeChartImage
        isChildItem
        discount
        costPrice
        salePrice
        url
        productDimentions
        createdDate
        updatedDate
        seo {
            description
            title
        }
        identifiers {
            isbn
            mpn
            ean
            upc
        }
        priceHistory {
            id
            price
            salePrice
        }
        shoppingCategoryL1 {
            id
            name
            businessType
        }
        shoppingCategoryL2 {
            id
            name
            businessType
        }
        shoppingCategoryL3 {
            id
            name
            businessType
        }
        businessDetails {
            tagLine
            siteUrl
            email
            companyId
            weightUnit
            unitSystem
            copyRight
            policies
            timeZone
            contactNumber
            about
            id
            logoName
            country
            businessName
            currency {
                id
                code
                displayName
                symbol
                format
            }
            address {
                addressLineOne
                locationName
                phoneNumberOne
                active
                city
                phoneNumberTwo
                state
                addressType
                description
                poBox
                addressLineTwo
                streetNumber
                country
                zipCode
                location{
                    lat
                    lon
                }
            }
            shipping {
                countryId
                stateIds
                countryShortName
                onedayShippingRate
                expiditedShippingRate
                countryName
                shippingRateId
                countryCode
                status
                standaredShippingRate
                stateNames
            }
        }
        productSpecification {
            id
            name
            value
        }
        categoryL1 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL2 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        categoryL3 {
            shippingType
            seoKeywords
            active
            url
            longDescription
            description
            name
            id
            seoTitle
            imageName
            seoDescription
            orderType
        }
        mainSku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        sku {
            isDefault
            active
            price
            partNumber
            quantity
            id
            barcode
            discountPrice
            attribute {
                id
                businessDetailsId
                name
                isColor
            }
            images {
                id
                name
                mainImage
            }
            attributeValue {
                attributeImageUrl
                id
                name
                value
            }
        }
        images {
            id
            name
            mainImage
        }
        mainImageUrl
        catalogPromotionProduct {
          id
          type
          maxRedemptions
          active
          catalogPurchaseCondition
          catalogPromotionRequirementId
          catalogPromotionId
          categoryProductQuantity
          description
          endDate
          promotionTarget
          productQuantity
          percentageOff
          activeStatus
          amountOff
          categoryId
      }
      reviews {
          updatedBy
          rating
          active
          updatedDate
          disagreeCount
          userName
          replyTime
          createdDate
          createdBy
          agreeCount
          imageUrl
          userEmail
          customerID
          votes
          comment
          id
          reply
          headline
          profileImageUrl
          reviewTime
      }
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByAllFiltersForSlpByBusiness(queryText: string, businessId: number, from: number, size: number, brandName: string[],
    skuAttributeValueName: string[], reviewRating: number | null, gte: number | null, lte: number | null, sortField: string, sortBy: string): Observable<any> {
    let form: FormData = new FormData();
    const brandsString = brandName?.map(brand => `"${brand}"`).join(',');
    const attrsString = skuAttributeValueName?.map(attr => `"${attr}"`).join(',');

    const query = `query {
    slpSearch(dto: {
        businessId: ${businessId},
        queryText: "${queryText}",
        brandName: [${brandsString}],
        skuAttributeValueName: [${attrsString}],
        reviewRating: ${reviewRating}
        gte: ${gte},
        lte: ${lte},
        from: ${from},
        size: ${size},
        sortField:${sortField}
        sortBy:${sortBy}
      }){
        brandNames
        attributeNames
        attributeValues
        minPrice
        maxPrice
        avgRating
        totalCount
        products {
            id
            name
            active
            barcode
            variablePrice
            quantity
            description
            productTypeStatus
            brandName
            selfGenProductId
            productWeight
            price
            keywords
            sizeChartImage
            isChildItem
            discount
            costPrice
            salePrice
            inStock
            minPrice
            maxPrice
            url
            productDimentions
            createdDate
            updatedDate
            mainImageUrl
            totalResponses
            reviewCount
            averageRating
            seo {
                description
                title
            }
            identifiers {
                isbn
                mpn
                ean
                upc
            }
            priceHistory {
                id
                price
                salePrice
            }
            shoppingCategoryL1 {
                id
                name
                businessType
            }
            shoppingCategoryL2 {
                id
                name
                businessType
            }
            shoppingCategoryL3 {
                id
                name
                businessType
            }
            businessDetails {
                tagLine
                siteUrl
                email
                companyId
                weightUnit
                unitSystem
                copyRight
                policies
                timeZone
                contactNumber
                about
                id
                logoName
                country
                businessName
                currency {
                    id
                    code
                    displayName
                    symbol
                    format
                }
                address {
                    addressLineOne
                    locationName
                    phoneNumberOne
                    active
                    city
                    phoneNumberTwo
                    state
                    addressType
                    description
                    poBox
                    addressLineTwo
                    streetNumber
                    country
                    zipCode
                    location {
                        lon
                        lat
                    }
                }
                shipping {
                    countryId
                    stateIds
                    countryShortName
                    onedayShippingRate
                    expiditedShippingRate
                    countryName
                    shippingRateId
                    countryCode
                    status
                    standaredShippingRate
                    stateNames
                }
            }
            productSpecification {
                id
                name
                value
            }
            categoryL1 {
                shippingType
                seoKeywords
                active
                url
                longDescription
                description
                name
                id
                seoTitle
                imageName
                seoDescription
                orderType
            }
            categoryL2 {
                shippingType
                seoKeywords
                active
                url
                longDescription
                description
                name
                id
                seoTitle
                imageName
                seoDescription
                orderType
            }
            categoryL3 {
                shippingType
                seoKeywords
                active
                url
                longDescription
                description
                name
                id
                seoTitle
                imageName
                seoDescription
                orderType
            }
            mainSku {
                isDefault
                active
                price
                partNumber
                quantity
                id
                barcode
                discountPrice
                attribute {
                    id
                    businessDetailsId
                    name
                    isColor
                }
                images {
                    id
                    name
                    mainImage
                }
                attributeValue {
                    attributeImageUrl
                    id
                    name
                    value
                }
            }
            sku {
                isDefault
                active
                price
                partNumber
                quantity
                id
                barcode
                discountPrice
                attribute {
                    id
                    businessDetailsId
                    name
                    isColor
                }
                images {
                    id
                    name
                    mainImage
                }
                attributeValue {
                    attributeImageUrl
                    id
                    name
                    value
                }
            }
            images {
                id
                name
                mainImage
            }
            catalogPromotionProduct {
                id
                name
                type
                maxRedemptions
                active
                catalogPurchaseCondition
                catalogPromotionRequirementId
                catalogPromotionId
                categoryProductQuantity
                description
                startDate
                endDate
                redemptionOption
                promotionTarget
                productQuantity
                percentageOff
                activeStatus
                amountOff
                categoryId
            }
            reviews {
                updatedBy
                rating
                active
                updatedDate
                disagreeCount
                userName
                replyTime
                createdDate
                createdBy
                agreeCount
                imageUrl
                userEmail
                customerID
                votes
                comment
                id
                reply
                headline
                profileImageUrl
                reviewTime
            }
        }
    }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }


  listPdpAttributesByProduct(productId: number, mainAttributeId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
    listPdpAttributesByProduct(productId:${productId}, mainAttributeId:${mainAttributeId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  listPdpAttributesByProductAndAttribute(productId: number, mainAttributeId: number, attributeId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
    listPdpAttributesByProductAndAttribute(productId:${productId}, mainAttributeId:${mainAttributeId}, attributeId:${attributeId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

}
