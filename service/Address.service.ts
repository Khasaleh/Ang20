import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstimateShippingResponse } from '../models/EstimateShippingResponse';

const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;
const BASE_URL = environment.baseURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getUsersAddress(): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getUsersAddress {
        addressId
        addressDescription
        country
        state
        city
        addressLine1
        addressLine2
        zipCode
        streetNumber
        defaultBilling
        defaultShipping
        latitude
        longitude
        addressInstructions
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  getUsersCards(): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getUserCCs {
        id
        lastFourDigits
        cardType
        expiryDate
        cardHolderName
        isDefault
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  getTaxByCityAndStateAndZipCode(businessId: number, taxRule: string, city: string, state: string, zipCode: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getTaxByCityAndStateAndZipCode(businessId: ${businessId}, taxRule: ${taxRule}, city: "${city}", state: "${state}", zipCode: "${zipCode}") {
          id
          taxRule
          taxRate
          active
          createdDate
          updatedDate
          countryEntity {
              id
              shortName
              name
              code
          }
          statesTaxEntity {
              id
              stateEntity {
                  id
                  name
              }
          }
          cityTaxResponse {
              id
              cityResponse {
                  id
                  name
              }
          }
          zipCodeTaxResponse {
              id
              zipCode
          }
          categoryTaxesEntity {
              id
              categoryId
              categoryName
          }
      }
   }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  getAllCountriesForBusiness(): Observable<any>{
    let form: FormData = new FormData();
    const query = `
    query{
    getAllCountries{
        id
        name
        shortName
        code
        countryKey
    }
     }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  listAllShippingRatesByStateNameAndBusinessId(businessId: number, stateName: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      listAllShippingRatesByStateNameAndBusinessId(businessId: ${businessId}, stateName: "${stateName}") {
        id
        countryName
        shippingRate
        baseRates
        distanceRate
        distanceUnit
        weightRate
        weightUnit
        sizeRate
        sizeUnit
        shippingType
        shippingDays
        rating
        businessDetailsId
        status
        createdDate
        updatedDate
        stateResponses {
            id
            name
        }
        cityResponses {
            id
            name
        }
      }
   }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  getEstimateShipping(shippingRateId: number, longitude: number|null, latitude: number|null, address: string, products: {productId: number, skuId: number|null}[], businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
      getEstimateShipping(shippingRateId: ${shippingRateId}, longitude: ${longitude}, latitude: ${latitude}, address: "${address}", businessId: ${businessId},
      products: [
        ${products.map(product => `{productId: ${product.productId}, skuId: ${product.skuId}}`).join(',')}
      ]){
        shippingRate
      }
     }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  updateShippingCostForCartItem(cartItems: EstimateShippingResponse[]): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      updateShippingCostForCartItem(cartItems: [${cartItems.map(item => `
      { productId: ${item.productId}, itemId: ${item.itemId}, rate: ${item.shippingRate} }
      `).join(',')}
      ]){
        message
      }
     }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  saveAddress(
    addressDescription:string,
    addressLine1: string,
    addressLine2: string,
    country: any,
    state: any,
    city: any,
    zipCode: string,
    streetNumber:string,
    defaultBilling: boolean,
    defaultShipping: boolean,
    customerId: number,
    businessId: number,
    fazealUserId: boolean,
    latitude: number | null,
    longitude: number| null,
    addressInstructions: string
  ): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      saveAddress(addressAddPojo: {
        addressDescription: "${addressDescription}"
        addressLine1: "${addressLine1}"
        addressLine2: "${addressLine2}"
        country: "${country}"
        state: "${state}"
        city: "${city}"
        zipCode: "${zipCode}"
        streetNumber: "${streetNumber}"
        defaultBilling: ${defaultBilling}
        defaultShipping: ${defaultShipping}
        customerId: ${customerId}
        businessId: ${businessId}
        fazealUserId: ${fazealUserId}
        longitude: ${longitude}
        latitude: ${latitude}
        addressInstructions: "${addressInstructions}"
      }) {
        message
        data
      }
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  getUserAllAddresses(businessId: number, customerId: number, fazealUserId: boolean): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
    getAddress(businessId: ${businessId}, customerId: ${customerId}, fazealUserId: ${fazealUserId}) {
        addressId
        addressDescription
        country
        state
        city
        addressLine1
        addressLine2
        zipCode
        streetNumber
        defaultBilling
        defaultShipping
        customerId
        businessId
        fazealUserId
        longitude
        latitude
        addressInstructions
    }
    }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  updateAddress(
    addressId: number,
    addressDescription:string,
    addressLine1: string,
    addressLine2: string,
    country: any,
    state: any,
    city: any,
    zipCode: string,
    streetNumber:string,
    customerId: number,
    businessId: number,
    fazealUserId: boolean,
    latitude: number | null,
    longitude: number| null,
    addressInstructions: string
  ): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      updateAddress(addressId: ${addressId}, updateAddressDTO: {
        addressDescription: "${addressDescription}"
        addressLine1: "${addressLine1}"
        addressLine2: "${addressLine2}"
        country: "${country}"
        state: "${state}"
        city: "${city}"
        zipCode: "${zipCode}"
        streetNumber: "${streetNumber}"
        customerId: ${customerId}
        businessId: ${businessId}
        fazealUserId: ${fazealUserId}
        longitude: ${longitude}
        latitude: ${latitude}
        addressInstructions: "${addressInstructions}"
      }) {
        message
        data
      }
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  deleteAddress(addressId: number, customerId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      deleteAddress(addressId: ${addressId}, customerId: ${customerId}) {
        message
        data
      }
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  deletePayment(ccId: number, customerId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      deleteCreditCardInfo(ccId: ${ccId}, customerId: ${customerId}) {
        message
        data
      }
    }`;
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  addPayment(cardHolderName: string, cardNumber: string, expiryDate: string, cardType: string, isDefault: boolean, cvv: String, addressId: number,
    customerId: number, businessId: number
  ): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
        saveCreditCardInfo(creditCardInfoDTO: {
          cardHolderName: "${cardHolderName}",
          cardNumber: "${cardNumber}",
          expiryDate: "${expiryDate}",
          cardType: "${cardType}",
          addressId: ${addressId},
          cvv: "${cvv}",
          isDefault: ${isDefault}
          customerId: ${customerId}
          businessId: ${businessId}
          fazealUserId: false
        }) {
          id
          cardHolderName
          expiryDate
          cardType
          lastFourDigits
          createdAt
          isDefault
          customerId
          businessId
          fazealUserId
        }
      }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  getAllStatesOfCountry(countryId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
    getAllStatesOfCountry(countryId: ${countryId}) {
        id
        name
        shortName
    }
    }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }

  getAllCitiesOfState(stateId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query {
    getAllCitiesOfState(stateId: ${stateId}) {
        id
        name
    }
    }`
    form.append('query', query);
    return this.http.post(BASE_URL, form);
  }
}
