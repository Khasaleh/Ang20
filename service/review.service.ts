import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './TokenStorgeService.service';
import { CookieDataServiceService } from './cookie-data-service.service';
import { SessionResponse } from '../models/SessionResponse';

const GRAPHQL_BASE_URL = environment.baseCustomerGraphQlURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  sessionResponse!: SessionResponse;
  businessId = this.tokenStorage.getBusinessID();

  constructor(private http: HttpClient,private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService) {
    if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
    }
   }

  async createReview(comment: string, rating: number, productId: number, userName: string,
    userEmail: string, fileImage: File):Promise<Observable<any>>{
      let form: FormData = new FormData();
      this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
      const query = `mutation {
      createReview(customerId: ${this.sessionResponse.id},
        userType: ${this.sessionResponse.userType},
        reviewDTO: {
        comment: """${comment}"""
        rating: ${rating}
        productId: ${productId}
        userName: "${userName}"
        userEmail: "${userEmail}"
        }
        ){
        message
        }
      }`;
      if(fileImage !== undefined){
        form.append('files', fileImage);
      }
      form.append('query', query);
      return this.http.post(GRAPHQL_BASE_URL, form);
  }

  getAllReviewOfProduct(productId : number, pageNum : number, pageSize : number):Observable<any>{
      let form: FormData = new FormData();
      const query = `query {
        getAllReviewOfProduct(productId : ${productId}, pageNum : ${pageNum}, pageSize : ${pageSize},sortField : "reviewTime", sortDir : "desc"){
            id,
            customerId,
            comment,
            rating,
            reviewTime,
            imageUrl,
            userName,
            productName
            profileImageUrl
            agreeCount
            disagreeCount,
            reply
        }
    }`;
      form.append('query', query);
      return this.http.post(GRAPHQL_BASE_URL, form);
  }
  async getReviewByProductAndCustomer(productId : number):Promise<Observable<any>>{
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
    const query = `query {
      getReviewByProductIdAndCustomerIdAndUserType(productId : ${productId}, customerId: ${this.sessionResponse.id},
        userType: ${this.sessionResponse.userType}){
        id,
        comment,
        rating,
        userName,
        userEmail,
        imageUrl,
        productName,
        reviewTime,
        reply
      }
  }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
}

 async agreeOnReview(reviewEntityId : number):Promise<Observable<any>>{
  let form: FormData = new FormData();
  this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
  const query = `mutation{
    agreeOnReview(userType: ${this.sessionResponse.userType}, customerId: ${this.sessionResponse.id}, reviewVotesDto: {
        reviewEntityId: ${reviewEntityId}
    }){
        message
    }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
  }

  async disagreeOnReview(reviewEntityId : number):Promise<Observable<any>>{
    let form: FormData = new FormData();
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorage.getBusinessID()!?.toString()));
    const query = `mutation{
    disagreeOnReview(userType: ${this.sessionResponse.userType}, customerId: ${this.sessionResponse.id}, reviewVotesDto:{
        reviewEntityId: ${reviewEntityId}
    }){
        message
    }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_BASE_URL, form);
    }

}
