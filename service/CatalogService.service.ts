import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionResponse } from '../models/SessionResponse';
import { TokenStorageService } from './TokenStorgeService.service';
import { CookieDataServiceService } from './cookie-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  private BASE_URL= environment.baseURL;
  sessionResponse!: SessionResponse;

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService) {
   }

  listAttributesByCategory(businessId: number, categoryName: string): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      listAttributesForPlp(businessId: ${businessId}, query: "${categoryName}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  findAllCategoryBySiteUrl(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      findAllCategoryBySiteUrl(siteUrl: "${siteUrl}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByCategoryId(categoryIds: number, businessIds: number): Observable<any>{
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

  searchProductsByCategoryAndPrice(categoryId: number, businessIds: number, gte: number, lte: number, from: number, size: number): Observable<any>{
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

  searchProductsByAttributeName(attributeName: string,attributeValueName: string, businessIds: number, from: number, size: number): Observable<any>{
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

  searchProductsByAttributeNameSku(attributeName: string,attributeValueName: string, businessIds: number, from: number, size: number): Observable<any>{
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

  searchProductsByCategoryAndBrand(queryText: string,businessId: number, from: number, size: number): Observable<any>{
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

  searchProductsByAllFiltersForSlpByBusiness(queryText: string,businessId: number, from: number, size: number, brandName: string[],
    skuAttributeValueName: string[], reviewRating: number|null, gte: number|null, lte: number|null, sortField: string, sortBy: string): Observable<any>{
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

  searchProductsBySearchTermAndBrandName(queryText: string,businessId: number, brandName: string[], from: number, size: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByCategoryAndBrand(  queryText: "${queryText}",
      businessId: ${businessId},
      brandName: ["${brandName}"]
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

  searchProductsByVariant(queryText: string,businessId: number, from: number, size: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByVariant(queryText: "${queryText}", businessId: ${businessId}, from: ${from}, size: ${size}) {
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

  searchProductByPriceAndAttributeValuesName(queryText: string,businessId: number, from: number, size: number, gte: number, lte: number, mainAttrValue: string, attrValue: string): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      searchProductByPriceAndAttributeValuesName(businessId:${businessId},queryText:"${queryText}",gte:${gte},lte:${lte},mainSkuAttributeValueName:["${mainAttrValue}"],skuAttributeValueName:["${attrValue}"],from:${from},size:${size}){
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

  filterProductsByRatingForSpecificCategory(categoryName: string,businessId: number, from: number, size: number, gte: number, lte: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      filterProductsByRatingForSpecificCategory(businessId:${businessId},categoryName:"${categoryName}",gte:${gte},lte:${lte},from:${from},size:${size}){
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

  filterProductsByBrandsForSpecificCategory(businessId: number, brandNames: string[], categoryName: string, from: number, size: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      filterProductsByBrandsForSpecificCategory(businessId:${businessId},brandNames: [${brandNames}], categoryName: "${categoryName}", from: ${from}, size: ${size}){
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

  searchProductsByReviewRating(businessId: number, gte: number, lte: number, from: number, size: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      searchProductsByReviewRating(businessId:${businessId},gte:${gte},lte:${lte}, from: ${from}, size: ${size}){
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

  findAllProductBySiteUrl(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      findAllProductBySiteUrl(siteUrl: "${siteUrl}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  findAllAttributesBySiteUrl(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      findAllAttributesBySiteUrl(siteUrl: "${siteUrl}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  listAttributesBySearchQuery(businessId: number, squery: string): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      listAttributesBySearchQuery(businessId: ${businessId}, query: "${squery}")
  }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  findAllBrandsBySiteUrl(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      findAllBrandsBySiteUrl(siteUrl: "${siteUrl}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  listAllBrandsByCategoryName(businessId: number, categoryName: string): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      listAllBrandsByCategoryName(businessId:${businessId},categoryName:"${categoryName}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getBusinessThemeSettings(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      getBusinessThemeSettings(siteUrl: "${siteUrl}"){
        id,
        businessId,
        themeName,
        storeName,
        imageResponses{
            id,
            imageUrl,
            categoryId,
            isMainBanner,
            description
        }
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getProductById(id: number, businessId: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      getProductByIdAndBusinessId(id: ${id}, businessId: ${businessId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getProductByIdAndBusinessIdAndFilters(id: number, businessId: number, filters: string[]): Observable<any>{
    let form: FormData = new FormData();
    const filtersValue = filters?.length > 0
    ? `["${filters.join('","')}"]`
    : "[]";
    const query = `query {
    getProductByIdAndBusinessIdAndFilters(businessId: ${businessId}, id: ${id}, filters: ${filtersValue})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getCategory(id: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      getCategory(id: ${id})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  findAllSearchedProduct(businessId: number, keyword: string): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      findAllSearchedProduct(businessId: ${businessId}, keyword: "${keyword}")
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  updateLastOrderId(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      updateLastOrderId(businessId: ${businessId}){
        message
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getOrderIdFormatByBusinessId(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getOrderIdFormatByBusinessId(businessId: ${businessId}){
        id,
        prefix,
        suffix,
        lastOrderId
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getCustomer(id: number, businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getCustomer(id: ${id}, businessId: ${businessId}){
          id,
          firstName,
          lastName,
          phoneNumber,
          email,
          enabled,
          countryId,
        }
      }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  listOfCategoryProducts(categoryId: number, businessId: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query {
      listOfCategoryProducts(categoryId: ${categoryId}, businessId: ${businessId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getFaviconImageBySiteUrl(siteUrl: string): Observable<any>{
    if(environment.env !== 'local'){
      siteUrl = window.location.hostname;
    }
    let form: FormData = new FormData();
    const query = `query {
      getFaviconImageBySiteUrl(siteUrl: "${siteUrl}"){
        id
        businessId
        themeName
        favicornImage
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  async listReviewsByCustomerIdAndBusiness(customerId : number,businessId: number, pageNum: number, pageSize: number):Promise<Observable<any>>{
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(businessId!?.toString()));
    const query = `query {
      listReviewsByCustomerIdAndBusinessAndUserType(customerId: ${customerId}, businessId: ${businessId}, userType: ${this.sessionResponse.userType},
      pageNum: ${pageNum}, pageSize: ${pageSize}, sortField: null, sortDir: null) {
        id
        comment
        rating
        customerId
        reviewTime
        userName
        productImage
        userEmail
        imageUrl
        productName
        productId
        reply
        replyTime
        agreeCount
        disagreeCount
        profileImageUrl
        productPrice
        salePrice
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  searchProductsByAllFiltersByBusiness(
    businessId: number,
    queryText: string,
    brandName: string[],
    skuAttributeValueName: string[],
    reviewRating: number,
    gte: number,
    lte: number,
    from: number,
    size: number
  ): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      searchProductsByAllFiltersByBusiness(
        plpProductSearchDTO: {
          businessId: ${businessId},
          queryText: "${queryText}",
          brandName: ${JSON.stringify(brandName)},
          skuAttributeValueName: ${JSON.stringify(skuAttributeValueName)},
          reviewRating: ${reviewRating},
          gte: ${gte},
          lte: ${lte},
          from: ${from},
          size: ${size}
        }
      ) {
        id
        totalResponses
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
            location {
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

  filterProductsOnPLP(businessId: number, queryText: string, from: number, size: number, sortField: string, sortBy: string,
     reviewRating: number|null, gte: number|null, lte: number|null, brandName: string[],
     skuAttributeValueName: string[]): Observable<any>{
    let form: FormData = new FormData();
    const brandsString = brandName?.map(brand => `"${brand}"`).join(',');
    const attrsString = skuAttributeValueName?.map(attr => `"${attr}"`).join(',');

    const query = `query {
    plpSearch(dto: {
        businessId: ${businessId},
        queryText: "${queryText}",
        brandName: [${brandsString}],
        skuAttributeValueName: [${attrsString}],
        reviewRating: ${reviewRating}
        gte: ${gte},
        lte: ${lte},
        from: ${from},
        size: ${size}
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


  listPdpAttributesByProduct(productId: number, mainAttributeId: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
    listPdpAttributesByProduct(productId:${productId}, mainAttributeId:${mainAttributeId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  listPdpAttributesByProductAndAttribute(productId: number, mainAttributeId: number, attributeId: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
    listPdpAttributesByProductAndAttribute(productId:${productId}, mainAttributeId:${mainAttributeId}, attributeId:${attributeId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

}
