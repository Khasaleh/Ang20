import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { CartItemResponse } from '../models/CartItemResponse';
import { TokenStorageService } from './TokenStorgeService.service';
import { SessionResponse } from '../models/SessionResponse';
import { CookieDataServiceService } from './cookie-data-service.service';

const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;
const BASE_URL = environment.baseURL;
const CUSTOMER_URL = environment.baseCustomerSiteURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  sessionResponse!: SessionResponse;
  businessId = this.tokenStorage.getBusinessID();

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService) {
      if(this.businessId && cookieService.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
      }
    }

  async addItemToCart(businessId: number, productId: number, skuId: number | null, quantity: number, price: number, promotionId: number | null,
    salePrice: number | null, categoryId: number | null, mainSkuId: number | null): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(businessId.toString()));
    const query = `mutation{
      addItemToCart(cartItemDTO: {
        businessId: ${businessId},
        customerId: ${this.sessionResponse.id},
        productId: ${productId},
        skuId: ${skuId},
        mainSkuId: ${mainSkuId},
        quantity: ${quantity},
        price: ${price},
        promotionId : ${promotionId},
        salePrice: ${salePrice},
        categoryId : ${categoryId},
        userType: ${this.sessionResponse.userType}
      }){
        message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async removeItemFromCart(cartItemId: number, cartId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    const query = `mutation{
      removeItemFromCart(cartItemId: ${cartItemId}, cartId: ${cartId}, customerId: ${this.sessionResponse.id}, userType: ${this.sessionResponse.userType}){
        message
        data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async updateItemQuantity(cartItemId: number, cartId: number, quantity: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    const query = `mutation{
    updateItemQuantity(cartId: ${cartId}, cartItemId: ${cartItemId}, customerId: ${this.sessionResponse.id},
    userType:${this.sessionResponse.userType}, quantity: ${quantity}){
        message
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async listUserCartItems(bsuinessId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `query {
    listUserCartItems(userType: ${this.sessionResponse.userType}, bsuinessId: ${this.businessId}, customerId: ${this.sessionResponse.id}) {
          id
        customerId
        businessId
        totalPrice
        subTotal
        totalSalesTaxes
        totalItemsPrice
        totalDiscount
        discountedShippingCost
        isFixedAmountForShipping
        manualPromoCodes
        paypalRedirectUrl
        shippingCost
        orderPromotionDiscounts
        catalogPromotionDiscounts
        totalPromoitionDiscount
        shippingPromotionDiscountAmount
        shippingPromotionDiscountPercentage
        totalSurchargesTaxes
        totalShippingTaxes
        totalApplicableTaxes
        orderId
        discount
        cartItemResponseList {
            id
            discountedTotal
            customerId
            productId
            skuId
            mainSkuId
            quantity
            price
            discount
            productDescription
            salePrice
            sellerPrice
            customerPrice
            saleTax
            total
            totalSurchargesTaxes
            totalSalesTaxes
            totalShippingTaxes
            finalPrice
            promotionItem
            availableQuantity
            productName
            categoryName
            url
            totalCatalogPromoDiscount
            productBrandName
            itemImage
            itemVariantList {
                attributeName
                attributeValue
            }
            cartItemPromotionResponses {
                promotionId
                totalDiscount
                name
                description
                promoCode
                promotionType
                discountAmount
                discountPercentage
                fixedPrice
            }
        }
        appliedOrderPromotions {
            id
            name
            previousTotalAmount
            discountAmountApplied
            discountPercentageApplied
        }
        appliedShippingPromotions {
            id
            name
            description
            type
            startDate
            endDate
            appliedCount
            fixedShippingRate
            promocode
            maxRedemptions
            allowedWithOther
            thresholdAmount
            priorityLevel
            pickupStore
            targetCustomerIds
            minimumRequirements
            homeShip
            productId
            categoryId
            active
            createdDate
            updatedDate
        }
        appliedCatalogPromotions {
            id
            name
            appliedOnProductIdsInCart
            rewardProductIdsInCart
        }
        cartMessagesResponses {
            message
            from
            to
            productName
            productId
            createdAt
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  placeOrder(bsuinessId: number, cartId: number, paymentType: string, addressId: number | null, orderType: string, paymentToken: string | null, orderId: number,
    pickupPerson: string, pickupTime: string, firstName: string, lastName: string,
    email: string, phoneNumber: string, promotionId: number | null,
    cardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string, cardType: string|null, cardId: number | null,
    tax: number, surcharges: number, address: any|null, userType: string, customerId: number, billingAddress: any|null,
    authorizationId: string, captureAmount: number): Observable<any> {
    let form: FormData = new FormData();
    if(!pickupTime || pickupTime === undefined){
      pickupTime = "";
    }
    if(!firstName || firstName === undefined){
      firstName = `"${firstName}"`;
    } else {
      firstName = `"""${firstName}"""`;
    }
    if(!lastName || lastName === undefined){
      lastName = `"${lastName}"`;
    } else {
      lastName = `"""${lastName}"""`;
    }
    const query = `mutation{
      placeOrder(placeOrderDTO: {
        businessId: ${bsuinessId},
        promotionId : ${promotionId},
        cartId: ${cartId},
        paymentType: "${paymentType}",
        addressId: ${addressId},
        orderType: "${orderType}",
        orderId: ${orderId},
        pickupPerson: "${pickupPerson}",
        pickupTime: "${pickupTime}",
        tax: ${tax},
        surcharges: ${surcharges},
        userType: ${userType},
        customerId: ${customerId},
        authorizationId: "${authorizationId}",
        captureAmount: ${captureAmount},
        pickUpPersonDTO: {
          firstName: ${firstName},
          lastName: ${lastName},
          email: "${email != undefined ? email : ''}",
          phoneNumber: "${phoneNumber != undefined ? phoneNumber : ''}"
        },
        cardInfoDTO: {
          cardId: ${cardId}
          cardNumber: "${cardNumber}",
          expirationMonth: "${expirationMonth}",
          expirationYear: "${expirationYear}",
          securityCode: "${securityCode}",
          cardType: "${cardType}"
        },
        orderAddressDTO: ${address ? `{
          firstName: "${address.firstName != undefined ? address.firstName : ''}"
          lastName: "${address.lastName != undefined ? address.lastName : ''}"
          addressLine1: "${address.addressLine1 != undefined ? address.addressLine1 : ''}"
          country: "${address?.country != undefined ? address.country : ''}"
          city: "${address?.city != undefined ? address.city : ''}"
          state: "${address?.state != undefined ? address.state : ''}"
          postalCode: "${address?.zipCode != undefined ? address.zipCode : ''}"
          email: "${address?.email != undefined ? address.email : ''}"
          phoneNumber: "${address?.phoneNumber != undefined ? address.phoneNumber : ''}"
        }` : null}
        billingAddressDTO: ${billingAddress ? `{
          addressLine1: "${billingAddress.addressLine1 != undefined ? billingAddress.addressLine1 : ''}"
          addressLine2: "${billingAddress.addressLine2 != undefined ? billingAddress.addressLine2 : ''}"
          country: "${billingAddress.country}"
          city: "${billingAddress.city}"
          state: "${billingAddress.state}"
          postalCode: "${billingAddress.zipCode}"
        }` : null}
      }){
        message,
        data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  placeGuestOrder(bsuinessId: number, paymentType: string, orderType: string, orderId: number,
    pickupPerson: string, pickupTime: string, firstName: string, lastName: string,
    email: string, phoneNumber: string,
    cardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string, cardType: string,
    tax: number, surcharges: number, address: Address, cartItems: CartItemResponse[]): Observable<any> {
    let items = '';
    for(let cartItem of cartItems){
      items += `{
        businessId: ${bsuinessId},
        productId: ${cartItem.productId},
        skuId: ${cartItem.skuId},
        mainSkuId: ${cartItem.mainSkuId},
        quantity: ${cartItem.quantity},
        price: ${cartItem.price},
        salePrice: ${cartItem.salePrice},
      }`;
    }
    let form: FormData = new FormData();
    const query = `mutation{
      placeGuestOrder(placeGuestOrderDto: {
        placeOrderDTO: {
          businessId: ${bsuinessId},
          paymentType: "${paymentType}",
          orderType: "${orderType}",
          orderId: ${orderId},
          pickupPerson: "${pickupPerson}",
          pickupTime: "${pickupTime}",
          tax: ${tax},
          surcharges: ${surcharges},
          pickUpPersonDTO: {
            firstName: "${firstName}",
            lastName: "${lastName}",
            email: "${email}",
            phoneNumber: "${phoneNumber}"
          },
          cardInfoDTO: {
            cardNumber: "${cardNumber}",
            expirationMonth: "${expirationMonth}",
            expirationYear: "${expirationYear}",
            securityCode: "${securityCode}",
            cardType: "${cardType}"
          },
          orderAddressDTO: ${address ? `{
            firstName: "${address.firstName}"
            lastName: "${address.lastName}"
            addressLine1: "${address.addressLine1}"
            country: "${address.country}"
            city: "${address.city}"
            state: "${address.state}"
            postalCode: "${address.zipCode}"
            email: "${address.email}"
            phoneNumber: "${address.phoneNumber}"
          }` : null}
        },
        cartItemDTOList: [${items}]
      }){
        message,
        data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }


  applyPromocodeOnCart(businessId: number, cartId: number, promocode: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      applyPromocodeOnCart(cartPromocodeDTO : {
          businessId : ${businessId}
          cartId : ${cartId}
          promocode: "${promocode}"
      }){
          message,
          data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  applyOrderAndShippingPromocodeOnCart(businessId: number, cartId: number, promocode: string, isShippingPromotion: boolean): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      applyOrderAndShippingPromocodeOnCart(cartPromocodeDTO : {
          businessId : ${businessId}
          cartId : ${cartId}
          promocode: "${promocode}"
          isShippingPromotion: ${isShippingPromotion}
      }){
          message,
          data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getOrdersByCustomerAndBusiness(businessId: number, pageNum: number, pageSize: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    const query = `query {
    getOrdersByCustomerAndBusiness(
        customerId: ${this.sessionResponse.id},
        businessId: ${businessId},
        pageNum: ${pageNum},
        pageSize: ${pageSize}
        sortDir: null
        sortField: null
        userType: ${this.sessionResponse.userType}
    ) {
        id
        orderTime
        shippingCost
        shippingType
        subtotal
        tax
        total
        shippingTax
        surcharges
        deliverDate
        paymentMethod
        status
        orderType
        customerId
        orderDetails
        orderId
        qrCodeImage
        pickupPerson
        shelfLocation
        pickupTime
        paymentStatus
        returnOrderStatus
        returnOrderType
        returnedAmount
        noOfReturnedProducts
        promotionId
        promotionName
        discountedTotal
        userType
        businessOrderId
        trackingId
        shipperId
        shipperName
        shipperPhoneNumber
        shipperWebsite
        orderPromotionDiscounts
        catalogPromotionDiscounts
        shippingPromotionDiscountAmount
        totalPromotionDiscount
        carrierDelayReason
        productLostReason
        isCustomerCancelled
        isCustomerAccepted
        noOfPages
        noOfItems
        authorizationId
        instrumentType
        maskedCardNumber
        cardType
        brand
        orderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        orderAddressResponse {
            firstName
            lastName
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
            email
            phoneNumber
        }
        pickUpPersonResponse {
            firstName
            lastName
            phoneNumber
            email
        }
        shippingLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
            fixedAmount
        }
        orderLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
        }
        giftCardResponses {
            giftCardNumber
            amount
        }
        billingAddressResponse {
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getByOrderId(orderId: number, businessId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    const query = `query {
    getOrdersByCustomerAndBusinessAndOrderId(
        orderId: ${orderId},
        businessId: ${businessId},
        customerId: ${this.sessionResponse.id},
        userType: ${this.sessionResponse.userType}
    ) {
        id
        orderTime
        shippingCost
        shippingType
        subtotal
        tax
        total
        shippingTax
        surcharges
        deliverDate
        paymentMethod
        status
        orderType
        customerId
        orderDetails
        orderId
        qrCodeImage
        pickupPerson
        shelfLocation
        pickupTime
        paymentStatus
        returnOrderStatus
        returnOrderType
        returnedAmount
        noOfReturnedProducts
        promotionId
        promotionName
        discountedTotal
        userType
        businessOrderId
        trackingId
        shipperId
        shipperName
        shipperPhoneNumber
        shipperWebsite
        orderPromotionDiscounts
        catalogPromotionDiscounts
        shippingPromotionDiscountAmount
        totalPromotionDiscount
        carrierDelayReason
        productLostReason
        isCustomerCancelled
        isCustomerAccepted
        noOfPages
        noOfItems
        totalDiscount
        refundAmount
        contactCustomerReason
        contactCustomerNeeded
        paymentCustomerNeeded
        billingAddressNeeded
        shippingAddressNeeded
        pickupPersonNeeded
        deliveredOrderImageUrl
        returnResolutionType
        returnDeliveryType
        returnInitiated
        returnOrderId
        returnQrCode
        returnLabelUrl
        productRefund
        restockFeesCharged
        saleTaxRefund
        surchargesRefund
        shippingTaxRefund
        shippingCostRefund
        discountRefund
        refundInitiatedOn
        refundedOn
        authorizationId
        instrumentType
        maskedCardNumber
        cardType
        brand
        orderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        returnOrderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        orderAddressResponse {
            firstName
            lastName
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
            email
            phoneNumber
        }
        pickUpPersonResponse {
            firstName
            lastName
            phoneNumber
            email
        }
        shippingLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
            fixedAmount
        }
        orderLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
        }
        giftCardResponses {
            giftCardNumber
            amount
        }
        billingAddressResponse {
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  removeAppliedPromocodeOnCart(promocode: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      removeAppliedPromocodeOnCart(promocode: "${promocode}"){
          message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  updateCartItem(businessId: number, products: any[]): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      mutation {
        updateCartItem(updateCart:{
          businessId: ${businessId},
          products: [${products.map(product => `
            { id: ${product.id}, skuId: ${product.skuId}, quantity: ${product.quantity} }
          `).join(',')}
          ]})
        {
          id
          customerId
          businessId
          totalPrice
          cartItemResponseList {
            id
            customerId
            productId
            skuId
            mainSkuId
            quantity
            availableQuantity
            price
            discount
            salePrice
            total
            promotionItem
            productName
            productBrandName
            itemImage
            itemVariantList {
                attributeName
                attributeValue
            }
            cartItemPromotionResponses {
                promotionName
                promotionCode
            }
          }
        }
      }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      updateOrderStatus(orderId: ${orderId}, status: "${status}"){
          message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  cartMerge(businessId: number, loggedCustomerId: number, guestCustomerId: number, loggedCustomerType: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      mutation {
        cartMerge(updateCart:{
          businessId: ${businessId},
          loggedCustomerId: ${loggedCustomerId},
          guestCustomerId: ${guestCustomerId},
          loggedCustomerType: ${loggedCustomerType}
        })
        {
          message
        }
      }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  createPaymentIntent(customerId : number, bsuinessId: number, userType: string, paymentType: string, name: string,
    email: string, addressLine1: string, zipCode: string, city: string, state: string, country: string,
    subTotal: number, tax: number, shipping: number): Observable<any>{
    let form: FormData = new FormData();
    const query = `query{
      createPaymentIntent(paymentIntentRequest: {
        customerId:${customerId},
        bsuinessId: ${bsuinessId},
        subTotal: ${subTotal},
        tax: ${tax},
        shipping: ${shipping}
        userType: ${userType},
        paymentType: ${paymentType},
        customerDetail: {
          name: "${name}",
          email: "${email}",
          addressLine1: "${addressLine1}",
          zipCode: "${zipCode}",
          city: "${city}",
          state: "${state}",
          country: "${country}"
      }
      } ){
        paypalRedirectUrl
      }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  completePaypalPayment(payerId: string, paymentId: string, token: string , businessId: number, cartId: number, userId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
      completePaypalPayment(paymentCompleteRequestDTO: {
          payerId: "${payerId}"
          paymentId: "${paymentId}"
          token: "${token}"
          businessId: ${businessId}
          userId: ${userId}
          orderId: ${cartId}
      } ){
     message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getCheckoutCart(orderType: string, state: string, city: string, zipcode: string, shippingId: number, address: string,
    longitude: number, latitude: number, promoCodes: string[]): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const quoteIfDefined = (value: string | undefined): string | null =>
        value === undefined ? null : `"${value}"`;
    state = quoteIfDefined(state)!;
    city = quoteIfDefined(city)!;
    zipcode = quoteIfDefined(zipcode)!;
    address = quoteIfDefined(address)!;
    const promoCodesValue = promoCodes.length > 0
    ? `["${promoCodes.join('","')}"]`
    : "[]";
    const query = `query {
    getCheckoutCart(checkoutRequest:{
        userType: ${this.sessionResponse.userType},
        businessId: ${this.businessId},
        customerId: ${this.sessionResponse.id},
        orderType: ${orderType},
        state:${state},
        city:${city},
        zipcode:${zipcode},
        shippingId: ${shippingId},
        address:${address},
        longitude: ${longitude},
        latitude: ${latitude},
        promoCodes: ${promoCodesValue}
    }) {
         id
        customerId
        businessId
        totalPrice
        subTotal
        totalSalesTaxes
        totalItemsPrice
        totalDiscount
        discountedShippingCost
        isFixedAmountForShipping
        manualPromoCodes
        paypalRedirectUrl
        shippingCost
        orderPromotionDiscounts
        catalogPromotionDiscounts
        totalPromoitionDiscount
        shippingPromotionDiscountAmount
        shippingPromotionDiscountPercentage
        totalSurchargesTaxes
        totalShippingTaxes
        totalApplicableTaxes
        orderId
        discount
        rejectedPromoCodes
        cartItemResponseList {
            id
            discountedTotal
            customerId
            productId
            skuId
            mainSkuId
            quantity
            price
            discount
            productDescription
            salePrice
            sellerPrice
            customerPrice
            saleTax
            total
            totalSurchargesTaxes
            totalSalesTaxes
            totalShippingTaxes
            finalPrice
            promotionItem
            availableQuantity
            productName
            categoryName
            url
            totalCatalogPromoDiscount
            productBrandName
            itemImage
            itemVariantList {
                attributeName
                attributeValue
            }
            cartItemPromotionResponses {
                promotionId
                totalDiscount
                name
                description
                promoCode
                promotionType
                discountAmount
                discountPercentage
                fixedPrice
            }
        }
        appliedOrderPromotions {
            id
            name
            previousTotalAmount
            discountAmountApplied
            discountPercentageApplied
        }
        appliedShippingPromotions {
            id
            name
            description
            type
            startDate
            endDate
            appliedCount
            fixedShippingRate
            promocode
            maxRedemptions
            allowedWithOther
            thresholdAmount
            priorityLevel
            pickupStore
            targetCustomerIds
            minimumRequirements
            homeShip
            productId
            categoryId
            active
            createdDate
            updatedDate
        }
        appliedCatalogPromotions {
            id
            name
            appliedOnProductIdsInCart
            rewardProductIdsInCart
        }
        cartMessagesResponses {
            message
            from
            to
            productName
            productId
            createdAt
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getCartMessages(): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `
      query {
    getCartMessages(userType: ${this.sessionResponse.userType}, businessId: ${this.businessId}, customerId: ${this.sessionResponse.id}) {
        message
        from
        to
        productName
        productId
        createdAt
    }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async actionOnPendingOrder(orderId: number, itemId: number, action: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `
      mutation {
    actionOnPendingOrder(
        orderId: ${orderId}
        itemId: ${itemId}
        customerId: ${this.sessionResponse.id}
        businessId: ${this.businessId}
        userType: ${this.sessionResponse.userType}
        action: ${action}
    ) {
        id
        orderTime
        shippingCost
        shippingType
        subtotal
        tax
        total
        shippingTax
        surcharges
        deliverDate
        paymentMethod
        status
        orderType
        customerId
        orderDetails
        orderId
        qrCodeImage
        pickupPerson
        shelfLocation
        pickupTime
        paymentStatus
        returnOrderStatus
        returnOrderType
        returnedAmount
        noOfReturnedProducts
        promotionId
        promotionName
        discountedTotal
        userType
        businessOrderId
        trackingId
        shipperId
        shipperName
        shipperPhoneNumber
        shipperWebsite
        orderPromotionDiscounts
        catalogPromotionDiscounts
        shippingPromotionDiscountAmount
        totalPromotionDiscount
        carrierDelayReason
        productLostReason
        isCustomerCancelled
        isCustomerAccepted
        noOfPages
        noOfItems
        totalDiscount
        orderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        orderAddressResponse {
            firstName
            lastName
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
            email
            phoneNumber
        }
        pickUpPersonResponse {
            firstName
            lastName
            phoneNumber
            email
        }
        shippingLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
            fixedAmount
        }
        orderLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
        }
        giftCardResponses {
            giftCardNumber
            amount
        }
        billingAddressResponse {
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
        }
    }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async cancelOrder(orderId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `mutation {
      cancelOrder(orderId: ${orderId}, customerId: ${this.sessionResponse.id}, businessId: ${this.businessId}, userType: ${this.sessionResponse.userType}){
          message,
          data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getOrderTracking(businessOrderId: string, email: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    const query = `query {
    getOrderTracking(businessOrderId: "${businessOrderId}", email: "${email}") {
        id
        orderTime
        shippingCost
        shippingType
        subtotal
        tax
        total
        shippingTax
        surcharges
        deliverDate
        paymentMethod
        status
        orderType
        customerId
        orderDetails
        orderId
        qrCodeImage
        pickupPerson
        shelfLocation
        pickupTime
        paymentStatus
        returnOrderStatus
        returnOrderType
        returnedAmount
        noOfReturnedProducts
        promotionId
        promotionName
        discountedTotal
        userType
        businessOrderId
        trackingId
        shipperId
        shipperName
        shipperPhoneNumber
        shipperWebsite
        orderPromotionDiscounts
        catalogPromotionDiscounts
        shippingPromotionDiscountAmount
        totalPromotionDiscount
        carrierDelayReason
        productLostReason
        isCustomerCancelled
        isCustomerAccepted
        noOfPages
        noOfItems
        totalDiscount
        refundAmount
        contactCustomerReason
        contactCustomerNeeded
        paymentCustomerNeeded
        billingAddressNeeded
        shippingAddressNeeded
        pickupPersonNeeded
        deliveredOrderImageUrl
        returnResolutionType
        returnDeliveryType
        returnInitiated
        returnOrderId
        returnQrCode
        returnLabelUrl
        productRefund
        restockFeesCharged
        saleTaxRefund
        surchargesRefund
        shippingTaxRefund
        shippingCostRefund
        discountRefund
        refundInitiatedOn
        refundedOn
        authorizationId
        instrumentType
        maskedCardNumber
        cardType
        brand
        orderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        returnOrderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        orderAddressResponse {
            firstName
            lastName
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
            email
            phoneNumber
        }
        pickUpPersonResponse {
            firstName
            lastName
            phoneNumber
            email
        }
        shippingLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
            fixedAmount
        }
        orderLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
        }
        giftCardResponses {
            giftCardNumber
            amount
        }
        billingAddressResponse {
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }


  async getOrdersByBusinessByFilters(businessId: number, pageNum: number, pageSize: number, orderType: string, status: string, returnStatus: string, date: string,
    endDate: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    const query = `query {
    getOrdersByBusinessByFilters(businessId: ${businessId}, customerId: ${this.sessionResponse.id}, pageNum: ${pageNum}, pageSize: ${pageSize},
     orderType: ${orderType}, status: ${status}, returnStatus: ${returnStatus}, date: "${date}", endDate: "${endDate}", userType: ${this.sessionResponse.userType}) {
        id
        orderTime
        shippingCost
        shippingType
        subtotal
        tax
        total
        shippingTax
        surcharges
        deliverDate
        paymentMethod
        status
        orderType
        customerId
        orderDetails
        orderId
        qrCodeImage
        pickupPerson
        shelfLocation
        pickupTime
        paymentStatus
        returnOrderStatus
        returnOrderType
        returnedAmount
        noOfReturnedProducts
        promotionId
        promotionName
        discountedTotal
        userType
        businessOrderId
        trackingId
        shipperId
        shipperName
        shipperPhoneNumber
        shipperWebsite
        orderPromotionDiscounts
        catalogPromotionDiscounts
        shippingPromotionDiscountAmount
        totalPromotionDiscount
        carrierDelayReason
        productLostReason
        isCustomerCancelled
        isCustomerAccepted
        customerCancelledReturn
        noOfPages
        noOfItems
        totalDiscount
        refundAmount
        contactCustomerReason
        contactCustomerNeeded
        paymentCustomerNeeded
        billingAddressNeeded
        shippingAddressNeeded
        pickupPersonNeeded
        deliveredOrderImageUrl
        returnResolutionType
        returnDeliveryType
        returnInitiated
        returnOrderId
        returnQrCode
        returnLabelUrl
        productRefund
        restockFeesCharged
        saleTaxRefund
        surchargesRefund
        shippingTaxRefund
        shippingCostRefund
        discountRefund
        refundInitiatedOn
        refundedOn
        authorizationId
        instrumentType
        maskedCardNumber
        cardType
        brand
        orderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        returnOrderTracks {
            id
            notes
            updatedTime
            status
            orderId
        }
        orderAddressResponse {
            firstName
            lastName
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
            email
            phoneNumber
        }
        pickUpPersonResponse {
            firstName
            lastName
            phoneNumber
            email
        }
        shippingLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
            fixedAmount
        }
        orderLevelPromotionResponses {
            id
            promotionId
            discountAmount
            promotionName
            promotionCode
            promotionType
        }
        giftCardResponses {
            giftCardNumber
            amount
        }
        billingAddressResponse {
            addressLine1
            addressLine2
            country
            city
            state
            postalCode
        }
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async updateShippingAddress(orderId: number, addressLine1: string, addressLine2: string, country: string, city: string,
    state: string, postalCode: string, phoneNumber: string
  ): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `mutation {
    updateShippingAddress(
        id: ${orderId}
        businessId: ${this.businessId}
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
        addressDTO: {
            addressLine1: "${addressLine1 !== undefined ? addressLine1 : ''}"
            country: "${country}"
            city: "${city}"
            addressLine2: "${addressLine2 !== undefined ? addressLine2 : ''}"
            state: "${state}"
            postalCode: "${postalCode}"
            phoneNumber: "${phoneNumber}"
        }
    ) {
        status
        message
        data
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async updateBillingAddress(orderId: number, addressLine1: string, addressLine2: string, country: string, city: string,
    state: string, postalCode: string
  ): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const safeAddressLine1 = addressLine1?.trim() ? `"${addressLine1}"` : `null`;
    const safeAddressLine2 = addressLine2?.trim() ? `"${addressLine2}"` : `null`;
    const query = `mutation {
    updateBillingAddress(
        id: ${orderId}
        businessId: ${this.businessId}
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
        addressDTO: {
            addressLine1: ${safeAddressLine1}
            country: "${country}"
            city: "${city}"
            addressLine2: ${safeAddressLine2}
            state: "${state}"
            postalCode: "${postalCode}"
        }
    ) {
        status
        message
        data
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }


  async updatePickUpInfo(orderId: number, firstName: string, lastName: string, phoneNumber: string, email: string, dateTime: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `mutation {
    updatePickUpInfo(
        id: ${orderId}
        businessId: ${this.businessId}
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
        pickUpInfoDTO: {
            firstName: "${firstName}"
            lastName: "${lastName}"
            phoneNumber: "${phoneNumber}"
            email: "${email}"
            dateTime: "${dateTime}"
        }
    ) {
        status
        message
        data
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async updateCustomerInfo(orderId: number, firstName: string, lastName: string, phoneNumber: string, email: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `mutation {
    updateCustomerInfo(
        id: ${orderId}
        businessId: ${this.businessId}
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
        customerInfoDTO: { firstName: "${firstName}", lastName: "${lastName}", phoneNumber: "${phoneNumber}", email: "${email}" }
    ) {
        status
        message
        data
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }


  async initiateReturnRequest(orderId: number, returnProducts: any[], resolutionType: string, deliveryType: string): Promise<Observable<any>> {
    const form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if (this.sessionResponse.userType === undefined) {
      return new Observable();
    }
    const returnProductsPayload = returnProducts?.map((prod, index) => `
      {
        id: ${prod.id},
        quantity: ${prod.quantity},
        reason: ${prod.reason},
        packaging: ${prod.packaging},
        detailedInfo: """${prod.detailedInfo}"""
      }
    `).join(',');
    const query = `
      mutation {
        initiateReturnRequest(
          customerId: ${this.sessionResponse.id},
          businessId: ${this.businessId},
          userType: ${this.sessionResponse.userType},
          returnRequest: {
            id: ${orderId},
            returnProducts: [${returnProductsPayload}],
            resolutionType: ${resolutionType},
            deliveryType: ${deliveryType}
          }
        ) {
          status
          message
          data
        }
      }
    `;
    form.append('query', query);
    for (let prod of returnProducts) {
      if (prod.images.length > 0) {
        prod?.images?.forEach((image: File) => form.append('item' + returnProducts.indexOf(prod), image));
      }
    }
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async cancelItemReturn(orderId: number, itemId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `mutation {
    cancelItemReturn(
        id: ${orderId}
        itemId: ${itemId}
        businessId: ${this.businessId}
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
    ) {
        status
        message
        data
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getReturnResolutionTypes(orderId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `
      query {
        getReturnResolutionTypes(id: ${orderId}, businessId: ${this.businessId})
      }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getOnboardingFormLink(): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `query{
    getOnboardingFormLinkForCustomer(businessId: ${this.businessId}){
      id
      onBoardingFormId
      expiresAt
      linkUrl
      businessId
      applicationId
      merchantId
      paymentInstrumentId
      status
    }
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async createFinixIdentity(city: string, country: string, email: string, firstName: string, lastName: string, line1: string,
    line2: string, phone: string, postalCode: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    const query = `
      mutation{
      createFinixIdentity(finixIdentityDTO: {
          city: "${city}"
          country: "${country}"
          email: "${email}"
          first_name: "${firstName}"
          last_name: "${lastName}"
          line1: "${line1}"
          line2: "${line2}"
          phone: "${phone}"
          postal_code: "${postalCode}"
          region: ""
      } )
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async createPaymentInstruments(token: string, type: string, identity: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `
      mutation {
   createPaymentInstruments(finixPaymentInstrumentRequest: {
          token: "${token}"
          type: "${type}"
          identity: "${identity}"
          attempt_bank_account_validation_check: false
      },  businessId: ${this.businessId}
      )
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async createAuthorization(amount: number, currency: string, merchant: string, source: string, fraudSessionId: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    const query = `
      mutation {
    createAuthorization(finixAuthorizationRequest: {
          amount: ${amount}
          currency: "${currency}"
          fraud_session_id: "${fraudSessionId}"
          merchant: "${merchant}"
          source: "${source}"
      })
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

   async updatePaymentValidation(id: number, paymentId: string, token: string, payerId: string, paymentMethod: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `
      mutation {
        updatePaymentValidation(id: ${id},
        businessId: ${this.businessId},
        customerId: ${this.sessionResponse.id}
        userType: ${this.sessionResponse.userType}
        paymentId: "${paymentId}", token: "${token}", payerId: "${payerId}", paymentMethod: ${paymentMethod}){
        message
        data
        }
      }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async createPaymentIntentForUpdatePayment(orderId: number, paymentType: string, name: string,
    email: string, addressLine1: string, zipCode: string, city: string, state: string, country: string,
    subTotal: number, tax: number, shipping: number): Promise<Observable<any>>{
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `query{
      createPaymentIntentForUpdatePayment(orderId: ${orderId}, paymentIntentRequest: {
        customerId: ${this.sessionResponse.id},
        bsuinessId: ${this.businessId},
        subTotal: ${subTotal},
        tax: ${tax},
        shipping: ${shipping}
        userType: ${this.sessionResponse.userType},
        paymentType: ${paymentType},
        customerDetail: {
          name: "${name}",
          email: "${email}",
          addressLine1: "${addressLine1}",
          zipCode: "${zipCode}",
          city: "${city}",
          state: "${state}",
          country: "${country}"
      }
      } ){
        paypalRedirectUrl
      }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async isTimeAvailable(dateTime: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `
      query {
        isTimeAvailable(dateTime: "${dateTime}", businessId: ${this.businessId}){
        timeAvailable
        }
      }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async firstOrderDateTime(): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!.toString()));
    if(this.sessionResponse.userType === undefined){
      return new Observable;
    }
    const query = `query {
       firstOrderDateTime(businessId: ${this.businessId}, customerId: ${this.sessionResponse.id}, userType: ${this.sessionResponse.userType})
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getCheckoutUserTypeByEmail(email:string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `query{
    getCheckoutUserTypeByEmail(email:"${email}", businessId: ${this.businessId})
    }`;
    form.append('query', query);
    return this.http.post(CUSTOMER_URL, form);
  }

  async isShipEngineEnabled(): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `query{
    isShipEngineEnabled(businessId: ${this.businessId})
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async validateShipEngineAddressForCst(name: string,
  phone: string,
  addressLine1: string,
  addressLine2: string,
  city: string,
  state: string,
  zip: string,
  country: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const safePhone = phone?.trim() ? `"${phone}"` : `null`;
    const safeAddressLine1 = addressLine1?.trim() ? `"${addressLine1}"` : `null`;
    const safeAddressLine2 = addressLine2?.trim() ? `"${addressLine2}"` : `null`;
    const safeZip = zip?.trim() ? `"${zip}"` : `null`;
    const query = `mutation {
    validateShipEngineAddressForCst(businessId: ${this.businessId},
        address: {
        name: "${name}"
        phone: ${safePhone}
        addressLine1: ${safeAddressLine1}
        addressLine2: ${safeAddressLine2}
        city: "${city}"
        state: "${state}"
        zip: ${safeZip}
        country: "${country}"
      }
    )
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  async getShipEngineOrderTrackingByTrackingNumberAndBusinessId(trackingNumber: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    const query = `query{
    getShipEngineOrderTrackingByTrackingNumberAndBusinessId(trackingNumber:"${trackingNumber}",businessId: ${this.businessId})
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }
}
