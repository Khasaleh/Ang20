import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

@Injectable({
  providedIn: 'root'
})
export class BusinessSettingService {

  private BASE_URL = environment.baseURL;
  private SOCIAL_URL = environment.baseCustomerGraphQlURL;
  private CUSTOMER_URL = environment.baseCustomerSiteURL;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private request: Request
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  getStoreLogoBySiteUrl(siteUrl: string): Observable<any> {
    if (this.isBrowser && environment.env !== 'local') {
      siteUrl = window.location.hostname;
    } else if (!this.isBrowser && this.request) {
      siteUrl = this.request.hostname;
    }
    let form: FormData = new FormData();
    const query = `
      query {
        getStoreLogoBySiteUrl(url : "${siteUrl}")
      }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getStoreCurrencyByBusinessId(id: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getStoreCurrencyByBusinessId(id : ${id}){
        code,
        displayName,
        symbol
    }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getBusinessAddressesByBusinessId(id: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getBusinessAddressesByBusinessId(businessId:"${id}") {
          id,
          locationName,
          addressDescription,
          addressLineOne,
          addressLineTwo
          country
          state
          city
          zipCode
          streetNumber
          poBox
          phoneNumberOne
          phoneNumberTwo
          addressType
          longitude
          latitude
        }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getCheckOutTypeById(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{ getCheckOutTypeById(businessId: ${businessId}){
      orderOnlinePickupFromStore
      orderOnlineShipHome
      reserveOnlineOrTryInStore
    } }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getBusinessDetailsById(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
    getBusinessDetailsById(businessId: ${businessId}){
        businessName
        contactNo
        email
        about
        country
        copyright
        siteTagline
        tollFree
        fax
        longitude
        latitude
        businessContacts{
        contactHeading
        businessContactInfo {
          id
          firstName
          lastName
          email
          landlineCountryCode
          landlineNumber
          phoneCountryCode
          phoneNumber
          streetAddress
          city
          state
          country
          isDefault
        }
    }
    }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getBusinessPaymentMethodsForCustomerSide(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
      getBusinessPaymentMethodsForCustomerSide(businessId:${businessId})
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  subscribe(email: string, storeId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      subscribe(request: {
        email: "${email}",
        storeId: ${storeId}
      }) {
        message
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  unSubscribe(email: string, storeId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      unsubscribe(request: {
        email: "${email}",
        storeId: ${storeId}
      }) {
        message
      }
    }`;
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  verifyEmailForResetPassword(email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
      forgotPassword(email: "${email}") {
          message
          status
          data
      }
    }`
    form.append('query', query);
    return this.http.post(this.SOCIAL_URL, form);
  }

  checkToken(token: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query{
      verifyResetToken (token: "${token}"){
          message
          status
          data
      }
    }`
    form.append('query', query);
    return this.http.post(this.SOCIAL_URL, form);
  }

  verifyUserOTP(otpCode: string, email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      verifyUserOTP(otpCode: "${otpCode}", email: "${email}")
    }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  resetPassword(token: string, password: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
      resetPassword(token:"${token}", password:"${password}"){
          message
          status
          data
      }
    }`
    form.append('query', query);
    return this.http.post(this.SOCIAL_URL, form);
  }

  getAllStorePages(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
        getAllStorePages(businessId: ${businessId}) {
          id
          businessId
          pageType
          content
        }
      }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getEnablePickInStoreAddressStatus(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      query {
        getEnablePickInStoreAddressStatus(businessId: ${businessId})
      }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getSubscribeStatus(businessId: number, email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      query{
        getSubscribeStatus(businessId:${businessId}, email:"${email}")
      }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getCookiesDataByBusiness(businessId: number): Observable<any> {
    let form: FormData = new FormData()
    const query = `query{
      getBusinessCookiesByBusinessId(businessId: ${businessId}) {
          id
          bannerText
          enabled
          enabledCloseButton
          position
          theme
          createdDate
          updatedDate
        }
        }`
    form.append('query', query)
    return this.http.post(this.BASE_URL, form)
  }

  getBusinessHoursOfOperation(businessId: number): Observable<any> {
    let form: FormData = new FormData()
    const query = `query {
          getBusinessHoursOfOperation(businessId: ${businessId}) {
          id
          days
          isOpen
          startingHours
          startingMinute
          endingHours
          endingMinute
          amORPmStartingHours
          amORPmEndingHours
          allDay
      }
    }`
    form.append('query', query)
    return this.http.post(this.BASE_URL, form)
  }
}
