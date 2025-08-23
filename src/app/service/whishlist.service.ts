import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './TokenStorgeService.service';
import { SessionResponse } from '../models/SessionResponse';
import { CookieDataServiceService } from './cookie-data-service.service';


const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {

  sessionResponse!: SessionResponse;
  businessId = this.tokenStorage.getBusinessID();

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService) {
      if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
        this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
      }
  }

  async addItemToWishList(businessId: number, itemId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
    const query = `mutation{
      addItemToWishList(businessId: ${Number(this.tokenStorage.getBusinessID()!)}, itemId: ${itemId}, customerId: ${this.sessionResponse.id}, userType: ${this.sessionResponse.userType}){
        message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async removeItemFromWishList(businessId: number, itemId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.businessId!?.toString()));
    const query = `mutation{
      removeItemFromWishList(businessId: ${Number(this.tokenStorage.getBusinessID()!)}, itemId: ${itemId}, customerId: ${this.sessionResponse.id}, userType: ${this.sessionResponse.userType}){
        message
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async getCustomerWishList(): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.businessId = await this.tokenStorage.getBusinessID();
    if (this.businessId) {
      const cookieData = this.cookieService.getCookie(this.businessId.toString());
      if (!cookieData) {
        return new Observable();
      }
      try {
        this.sessionResponse = JSON.parse(cookieData);
      } catch (error) {
        return new Observable();
      }
      if (!this.sessionResponse?.userType) {
        return new Observable();
      }
      const query = `query {
        getCustomerWishList(customerId: ${this.sessionResponse.id},
          businessId: ${Number(this.businessId)},
          userType: ${this.sessionResponse.userType})
      }`;

      form.append('query', query);
    }
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

}
