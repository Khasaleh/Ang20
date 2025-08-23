import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private BASE_URL = environment.baseURL;
  constructor(private http: HttpClient) { }

  getPromotionByProduct(productId : number,businessDetailId : number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query {
      getPromotionByProduct(productId : ${productId},businessDetailId : ${businessDetailId}){
          id,
          quantity
          type
          description
          promocode
          discountAmount
          discountPercentage
          appliedCount
          limit
          quantity
          startDate
          endDate
          freeProductId
      }
  }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getCatalogPromotionByProduct(productId : number,businessDetailsId : number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query {
      getCatalogPromotionByProduct(productId : ${productId},businessDetailsId : ${businessDetailsId}){
          id,
          type
          name
          description
          promocode
          amountOff
          percentageOff
          appliedCount
          startDate
          endDate
      }
  }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getByPromocodeAndBusinessDetailId(promocode : string,businessDetailId : number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query {
      getByPromocodeAndBusinessDetailId(promocode : "${promocode}", businessDetailId : ${businessDetailId}){
          id,
          quantity
          type
          description
          promocode
          discountAmount
          discountPercentage
          appliedCount
          limit
          quantity
          startDate
          endDate
          freeProductId
      }
  }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getOrderPromotionByPromocodeAndBusinessDetailId(promocode : string,businessDetailId : number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query {
      getOrderPromotionByPromocodeAndBusinessId(promocode : "${promocode}", businessDetailsId : ${businessDetailId}){
        id
        type
        activeStatus
        description

        promocode

        appliedCount

        redemptionOption

        startDate

        endDate

        maxRedemptions

        allowedWithOther

        thresholdAmount

        amountOff

        percentageOff

        priorityLevel

        giftProductId

        targetCustomerIds

        promotionTarget
      }
  }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  increaseAppliedCount(id : number,businessDetailId : number): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      increaseAppliedCount(id : ${id}, businessDetailsId : ${businessDetailId})
  }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }
}
