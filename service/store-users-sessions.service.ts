import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { TokenStorageService } from './TokenStorgeService.service';
import { SessionResponse } from '../models/SessionResponse';
import { CookieDataServiceService } from './cookie-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class StoreUsersSessionsService {

  private BASE_URL = environment.baseURL;
  businessId = this.tokenStorage.getBusinessID();
  sessionResponse!: SessionResponse;
  constructor(private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private cookieService: CookieDataServiceService) { }

  async setUserSession(ipAddress : string, businessId: number): Promise<Observable<any>> {
    let form: FormData = new FormData();
    this.sessionResponse = await this.cookieService.getCookie(businessId!.toString()) != '' ? JSON.parse(this.cookieService.getCookie(businessId!.toString())): null;
    console.log(this.sessionResponse)
    let userType;
    if(this.sessionResponse){
     userType = `"${this.sessionResponse.userType}"`;
    } else{
      userType = null;
    }
    const query = `
    mutation {
      setUserSession(ipAddress : "${ipAddress}", businessId : ${businessId}, id: ${this.sessionResponse ? this.sessionResponse.id : null},
      userType: ${userType})
    }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  async setLoggedUserSession(ipAddress : string, businessId: number, userId: number, userType: string): Promise<Observable<any>> {
    let form: FormData = new FormData();
    const query = `
    mutation {
      setUserSession(ipAddress : "${ipAddress}", businessId : ${businessId}, id: ${userId}, userType: "${userType}")
    }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

  getUserIpAddress(): Promise<string> {
    return axios.get('https://api.ipify.org?format=json')
      .then(response => response.data.ip)
      .catch(error => {
        console.error('Error fetching user IP address:', error);
        return null;
      });
  }


  getCustomerByEmail(businessId: number, email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    query {
      getCustomerByEmail(businessId : ${businessId}, email : "${email}"){
        id,
        firstName,
        lastName,
        phoneNumber,
        email
      }
    }`
    form.append('query', query);
    return this.http.post(this.BASE_URL, form);
  }

}
