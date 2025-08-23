import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { TokenStorageService } from './TokenStorgeService.service';
import { CookieDataServiceService } from './cookie-data-service.service';
import { SessionResponse } from '../models/SessionResponse';

const AUTH_API = environment.baseURL + 'v1/auth/';
const GRAPHQL_POST_BASE_URL = environment.baseCustomerGraphQlURL;
const GRAPHQL_ADMIN = environment.baseURL;
const GRAPHQL_BUSINESS_ADMIN_BASE_URL = environment.baseCustomerSiteURL;

const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginStatusSubject = new BehaviorSubject<User | undefined | null>(null);
  sessionResponse!: SessionResponse;
  businessId = this.tokenStorageService.getBusinessID();
  rememberMe = this.tokenStorageService.getRememberMe();

  isAuthenticated = false;
  user = this.tokenStorageService.getUser();
  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService, private cookieService: CookieDataServiceService) {
    if(this.businessId &&  cookieService.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieService.getCookie(this.businessId!.toString()));
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'content-type': 'application/json',
     'Authorization': `Bearer ${this.user?.accessToken}`
  }),
  };

  notifyLogoutLoginDetector(user: User | undefined | null) {
    if (user === undefined || user === null) {
      this.loginStatusSubject.next(null);
    } else {
      this.loginStatusSubject.next(user);
    }
  }

  getLoginStatusSubject() {
    return this.loginStatusSubject.asObservable()
  }

  login(username: string, password: string, loginType: string, businessId: number, rememberMe: boolean): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
      authenticateUser(loginRequest:
      {
        email: "${username}",
        password:"${password}",
        loginType: "${loginType}",
        businessId: ${businessId},
        rememberMe: ${rememberMe}
      }){
        accessToken
        refreshToken
        tokenType
        id
        username
        email
        roles
        firstName
        lastName
        theme
        systemLanguageFileName
        activated
        isMarkedForDeleted
        profile
        cover
        phone
        countryCode
        emailVerified
        addressList {
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
      }
        paymentDetails {
        id
        lastFourDigits
        cardType
        expiryDate
        cardHolderName
        isDefault
      }
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BUSINESS_ADMIN_BASE_URL, form);
  }

  setLoggedIn() {
    this.isAuthenticated = true;
  }

  private convertDate(str: any) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  register(firstName: string, lastName: string, username: string, password: string, gender: string, createFamilyAccount: boolean, familyToken: string, email: string, phone: string, dob: string, loyaltyToken: string): Observable<any> {
    let form: FormData = new FormData();
    let query;
    if (phone == null || phone == undefined) {
      phone = '';
    }
    if (email == null || email == undefined) {
      email = '';
    }
    query = `
      mutation{
        registerUser(signUpRequest: {
            username: "${username}"
            email: "${email}"
            password: "${password}"
            firstName: "${firstName}"
            lastName: "${lastName}"
            dob: "${this.convertDate(dob)}"
            gender: "${gender}"
            createFamilyAccount: ${createFamilyAccount}
            familyToken: "${familyToken}"
            phone: "${phone}"
            customGender: "${gender}"
        }, loyaltyToken: "") {
              message
              status
              data
          }
      }`
    form.append('query', query);
    return this.http.post(GRAPHQL_POST_BASE_URL, form);
  }

  async refreshToken(token: string): Promise<Observable<any>> {
    this.sessionResponse = await JSON.parse(this.cookieService.getCookie(this.tokenStorageService.getBusinessID()!.toString()));
    if(this.sessionResponse.userType === 'FAZEAL_REGISTERED'){
     return this.fazealUserRefreshToken(token);
    }
    if (this.sessionResponse.userType === 'STORE_REGISTERED'){
      return this.storeUserRefreshToken(token);
    }
    return new Observable<any>();
  }

  fazealUserRefreshToken(token: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
      refreshToken(refreshToken: "${token}"){
      accessToken
      refreshToken
      tokenType
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_POST_BASE_URL, form);
  }

  storeUserRefreshToken(token: string, ): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
      refreshToken(refreshToken: "${token}", rememberMe: ${this.rememberMe}){
      accessToken
      refreshToken
      tokenType
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_BUSINESS_ADMIN_BASE_URL, form);
  }

  logout(refreshToken: string): Observable<any> {
    this.isAuthenticated = false;
    let form: FormData = new FormData();
    const query = `
    mutation{
      logoutUser(logOutRequest: { refreshToken: "${refreshToken}"}){
        message
        status
        data
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_POST_BASE_URL, form);
  }

  getTokensPoints(userId: number): Observable<User> {
    return this.http.get<User>(
      `${AUTH_API}users/${userId}`
    );
  }

  getUserLoyalty(userId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `query{
        getUserLoyalty(userId : ${userId}){
            userId
            loyaltyToken
            loyaltyPoint
            earned
        }
    }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_POST_BASE_URL, form);
  }

  registerCustomer(businessId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation{
          registerCustomer(businessId : ${businessId}){
              message
          }
      }`;
    form.append('query', query);
    return this.http.post(GRAPHQL_POST_BASE_URL, form);
  }


  subscribeGuestUser(businessId: number, firstName: string, lastName: string,
    email: string, phoneNumber: string, countryCode: string, password: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
      mutation {
        subscribeGuestUser(businessId: ${businessId}, guestCustomerDTO: {
          firstName: "${firstName}",
          lastName: "${lastName}",
          email: "${email}",
          phoneNumber: "${phoneNumber}",
          countryCode: ${countryCode},
          password: "${password}"
        }) {
          message
        }
      }
    `;
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }

  generateEmailVerificationOTP(email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      generateEmailVerificationOTP(email: "${email}")
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }

  verifyUserOTP(otpCode: string, email: string, customerId: number): Observable<any> {
    let form: FormData = new FormData();
    const query = `mutation {
      verifyUserOTP(otpCode: "${otpCode}", email: "${email}", customerId: ${customerId}){
      message
      data
      status
      }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }

  uploadUserProfilePhoto(image: File, customerId: number) {
    let form: FormData = new FormData();
    const query = `mutation {
    uploadProfileImage(customerId: ${customerId}) {
      message,
      data,
      status
    }}`;
    form.append('query', query);
    form.append(`files`, image);
    return this.http.post<any>(GRAPHQL_ADMIN, form);
  }

  generateTokenToResetStoreUserPassword(businessId: number, email: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
    generateTokenToResetStoreUserPassword(businessId: ${businessId}, email:"${email}"){
        message
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }

  getStoreUserByResetToken(businessId: number, token: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
    getStoreUserByResetToken(businessId: ${businessId}, token: "${token}"){
        lastName
        firstName
        profileImageUrl
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }

  updateStoreUserPassword(businessId: number, token: string, password: string): Observable<any> {
    let form: FormData = new FormData();
    const query = `
    mutation{
    updateStoreUserPassword(businessId: ${businessId}, token: "${token}", password: "${password}"){
        message
    }
    }`
    form.append('query', query);
    return this.http.post(GRAPHQL_ADMIN, form);
  }
}
