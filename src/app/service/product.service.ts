import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionResponse } from '../models/SessionResponse';
import { TokenStorageService } from './TokenStorgeService.service';
import { CookieDataServiceService } from './cookie-data-service.service';

const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService
  ) {
    if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
    }
  }

  sessionResponse!: SessionResponse;
  businessId = this.tokenStorage.getBusinessID();


  async createProductBrowseHistory(businessId: number, productId: number): Promise<Observable<any>> {
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
    const mutation = `
      mutation {
        createProductBrowseHistory(customerId: ${this.sessionResponse.id}, businessId: ${businessId}, productId: ${productId}, userType: ${this.sessionResponse.userType}) {
          message
        }
      }
    `;
    return this.executeQuery(mutation);
  }

  async listUserProductsBrowseHistory(
    businessId: number,
    pageNum: number,
    pageSize: number,
    sortField: string,
    sortDir: string,
    timeFrame: string
  ): Promise<Observable<any>> {
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
    const query = `
      query {
        listUserProductsBrowseHistory(
          customerId: ${this.sessionResponse.id}
          businessId: ${businessId}
          pageNum: ${pageNum}
          pageSize: 30
          sortField: "${sortField}"
          sortDir: "${sortDir}"
          timeFrame: ${timeFrame}
          userType: ${this.sessionResponse.userType}
        ) {
          id
          customerId
          businessId
          addedDate
          productResponse {
            id
            productName
            mainImageUrl
            quantity
            price
            salePrice
            averageReview
            reviewsCount
            reviewsResponse {
              reviewResponses {
                id
                headline
                comment
                rating
                customerId
                reviewTime
                userName
                profileImageUrl
                userEmail
                imageUrl
                productName
              }
            }
          }
        }
      }
    `;

    return this.executeQuery(query);
  }

  private executeQuery(query: string): Observable<any> {
    const form = new FormData();
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

}
