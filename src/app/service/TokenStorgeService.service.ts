import { TranslateSiteService } from 'src/app/service/translate-site.service';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { isPlatformBrowser } from '@angular/common';
import { CurrencyResponse } from '../models/CurrencyResponse';
import { ThemeDashboardContent } from '../models/ThemeDashboardContent';
import { PdpContent } from '../models/PdpContent';
import { CatalogServiceService } from './CatalogService.service';
import { SiteSettings } from '../models/SiteSettings';
import { BusinessSettingService } from './business-setting.service';
import { OrderIdFormatResponse } from '../models/OrderIdFormatResponse';
import { PlaceOrderDto } from '../models/PlaceOrderDto';
import { ChatUserResponse } from './chatServices/rest-api/chat-rest-api.service';
import { ChatEmployeeInfoAfterConnect } from './chatServices/socket/socket.service';
import { OrderResponse } from '../models/OrderResponse';
import { environment } from 'src/environments/environment';

const FAMILY_USER_KEY = 'family-user';
const FAMILY_FRIENDS_KEY = 'family-friend';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';
const LANGUAGE_KEY = 'language-key';
const SYSTEM_LANGUAGES_KEY = 'FAZEAL_LANGUAGES';
const BUSINESSID_KEY = 'BUSINESSID_KEY';
const BUSINESSURL_KEY = 'BUSINESSURL_KEY';
const CURRENCY_KEY = 'currency-key';
const THEME_DASHBOARD = 'theme-dashboard';
const PDP = 'pdp';
const ORDER_FORMAT = 'order-format';
const BROWSER_LANGUAGES_KEY = 'browser-languages';
const STORE_NAME = 'store-name';
const USER_ID = 'user-id';
const USER_TYPE = 'user-type';
const REMEMBER_ME_KEY = 'rememberMe';
const COOKIES_KEY = 'COOKIES_KEY';
const RETURN_ORDER = 'return-order';
const PRINT_ORDER = 'print-order';
const ORDER_DETAILS = 'order-details';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  isRememberMe = false;
  theme = 'DefaultTheme';
  siteSetting!: SiteSettings;
  currencySymbol: string = '';
  orderIdFormat!: OrderIdFormatResponse;
  private isBrowser: boolean;
  constructor(
    private router: Router,private route: ActivatedRoute,
    private catalogService: CatalogServiceService,
    private businessSettingService: BusinessSettingService,
    private translateService: TranslateSiteService,
    @Inject(PLATFORM_ID) private platformId: object
  ) { this.isBrowser = isPlatformBrowser(this.platformId); }

  signOut(): void {
    if (this.isBrowser) {
      let storeKey;
      if (environment.env !== 'local') {
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(TOKEN_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(USER_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(REFRESHTOKEN_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(COOKIES_KEY + `_${storeKey}`);

      this.removeStorage(TOKEN_KEY + `_${storeKey}`);
      this.removeStorage(USER_KEY + `_${storeKey}`);
      this.removeStorage(REFRESHTOKEN_KEY + `_${storeKey}`);
      this.removeStorage(COOKIES_KEY + `_${storeKey}`);
      window.dispatchEvent(new StorageEvent('storage', {
        key: TOKEN_KEY + `_${storeKey}`,
        oldValue: 'some_value',
        newValue: null,
        storageArea: sessionStorage
      }));
    }
}

  clearSessionData(): void {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(TOKEN_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(USER_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(REFRESHTOKEN_KEY + `_${storeKey}`);
      window.sessionStorage.removeItem(COOKIES_KEY + `_${storeKey}`);

      this.removeStorage(TOKEN_KEY + `_${storeKey}`);
      this.removeStorage(USER_KEY + `_${storeKey}`);
      this.removeStorage(REFRESHTOKEN_KEY + `_${storeKey}`);
      this.removeStorage(COOKIES_KEY + `_${storeKey}`);
      window.dispatchEvent(new StorageEvent('storage', {
        key: TOKEN_KEY + `_${storeKey}`,
        oldValue: 'some_value',
        newValue: null,
        storageArea: sessionStorage
      }));
    }
  }

  public saveToken(token: string) {
    if (this.isBrowser) {
      if(environment.env !== 'local'){
        const storeKey = window.location.hostname;
        window.sessionStorage.removeItem(TOKEN_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(TOKEN_KEY+`_${storeKey}`, token);
        this.setStorage(TOKEN_KEY+`_${storeKey}`, token);
      } else {
        const path = window.location.pathname;
        const storeKey = path.split('/')[1];
        window.sessionStorage.removeItem(TOKEN_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(TOKEN_KEY+`_${storeKey}`, token);
        this.setStorage(TOKEN_KEY+`_${storeKey}`, token);
      }
    }
  }

  public saveThemeDashboard(theme: ThemeDashboardContent) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(THEME_DASHBOARD+`_${storeKey}`);
      window.sessionStorage.setItem(THEME_DASHBOARD+`_${storeKey}`, JSON.stringify(theme));
    }
  }

  public getThemeDashboard(): ThemeDashboardContent | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      if (window.sessionStorage.getItem(THEME_DASHBOARD+`_${storeKey}`) == null) {
        return null;
      }
      return JSON.parse(window.sessionStorage.getItem(THEME_DASHBOARD+`_${storeKey}`)!);
    }
    return null;
  }

  public savePdp(theme: PdpContent) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(PDP+`_${storeKey}`);
      window.sessionStorage.setItem(PDP+`_${storeKey}`, JSON.stringify(theme));
    }
  }

  public getPdp(): PdpContent | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      if (window.sessionStorage.getItem(PDP+`_${storeKey}`) == null) {
        return null;
      }
      return JSON.parse(window.sessionStorage.getItem(PDP+`_${storeKey}`)!);
    }
    return null;
  }

  public saveBusinessURL(url: string) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(BUSINESSURL_KEY+`_${storeKey}`);
      window.sessionStorage.setItem(BUSINESSURL_KEY+`_${storeKey}`, url);
      this.setStorage(BUSINESSURL_KEY+`_${storeKey}`, url);
    }
  }

  public getBusinessURL(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return window.sessionStorage.getItem(BUSINESSURL_KEY+`_${storeKey}`);
    }
    return null;
  }

  public getBusinessURLFromLocalStorage(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
      storeKey = path.split('/')[1];
      }
      return window.localStorage.getItem(BUSINESSURL_KEY+`_${storeKey}`);
    }
    return null;
  }

  public saveBusinessID(id: string) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
      storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(BUSINESSID_KEY+`_${storeKey}`);
      window.sessionStorage.setItem(BUSINESSID_KEY+`_${storeKey}`, id);
    }
  }

  public getBusinessID(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
      storeKey = path.split('/')[1];
      }
      return window.sessionStorage.getItem(BUSINESSID_KEY+`_${storeKey}`);
    }
    return null;
  }

  public saveCookiesonBrowser(cookie: string) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
      storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(COOKIES_KEY+`_${storeKey}`);
      window.sessionStorage.setItem(COOKIES_KEY+`_${storeKey}`, cookie);
    }
  }

  public getCookies(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return window.sessionStorage.getItem(COOKIES_KEY+`_${storeKey}`);
    }
    return null;
  }

  public saveStoreName(id: string) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(STORE_NAME+`_${storeKey}`);
      window.sessionStorage.setItem(STORE_NAME+`_${storeKey}`, id);
    }
  }

  public getBStoreName(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const storeName = window.sessionStorage.getItem(STORE_NAME+`_${storeKey}`);
      return storeName ? this.toTitleCase(storeName) : null;
    }
    return null;
  }

  private toTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

  public saveCurrency(currency: CurrencyResponse) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(CURRENCY_KEY+`_${storeKey}`);
      window.sessionStorage.setItem(CURRENCY_KEY+`_${storeKey}`, JSON.stringify(currency));
    }
  }
  public getCurrency(): CurrencyResponse | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const currency = window.sessionStorage.getItem(CURRENCY_KEY+`_${storeKey}`)!;
      return JSON.parse(currency);
    }
    return null;
  }
  public saveOrderFormat(format: OrderIdFormatResponse) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(ORDER_FORMAT+`_${storeKey}`);
      window.sessionStorage.setItem(ORDER_FORMAT+`_${storeKey}`, JSON.stringify(format));
    }
  }
  public getOrderFormat(): OrderIdFormatResponse | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const format = window.sessionStorage.getItem(ORDER_FORMAT+`_${storeKey}`)!;
      return JSON.parse(format);
    }
    return null;
  }
  public saveUser(user: User, isRememberMe: boolean) {
    if (this.isBrowser) {
      this.isRememberMe = isRememberMe;
      if(environment.env !== 'local'){
        const storeKey = window.location.hostname;
        window.sessionStorage.removeItem(USER_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(USER_KEY+`_${storeKey}`, JSON.stringify(user));
        this.setStorage(USER_KEY+`_${storeKey}`, JSON.stringify(user));
      } else {
        const path = window.location.pathname;
        const storeKey = path.split('/')[1];
        window.sessionStorage.removeItem(USER_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(USER_KEY+`_${storeKey}`, JSON.stringify(user));
        this.setStorage(USER_KEY+`_${storeKey}`, JSON.stringify(user));
      }
    }
  }

  public saveRememberMe(rememberMe: boolean) {
    if (this.isBrowser) {
      if(environment.env !== 'local'){
        const storeKey = window.location.hostname;
        window.sessionStorage.removeItem(REMEMBER_ME_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(REMEMBER_ME_KEY+`_${storeKey}`, JSON.stringify(rememberMe));
        this.setStorage(REMEMBER_ME_KEY+`_${storeKey}`, JSON.stringify(rememberMe));
      } else {
        const path = window.location.pathname;
        const storeKey = path.split('/')[1];
        window.sessionStorage.removeItem(REMEMBER_ME_KEY+`_${storeKey}`);
        window.sessionStorage.setItem(REMEMBER_ME_KEY+`_${storeKey}`, JSON.stringify(rememberMe));
        this.setStorage(REMEMBER_ME_KEY+`_${storeKey}`, JSON.stringify(rememberMe));
      }
    }
  }

  public getRememberMe(): boolean {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const rememberMe = window.localStorage.getItem(REMEMBER_ME_KEY+`_${storeKey}`);
      return rememberMe === 'true';
    }
    return false;
  }

  public saveUserOrderInfo(order: PlaceOrderDto) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem('order-info'+`_${storeKey}`);
      window.sessionStorage.setItem('order-info'+`_${storeKey}`, JSON.stringify(order));
    }
  }

  public getUserOrderInfo(): PlaceOrderDto | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const order = window.sessionStorage.getItem('order-info'+`_${storeKey}`)!;
      return JSON.parse(order);
    }
    return null;
  }

  public savePlaceOrderInfoPaypal(order: OrderResponse) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem('order-info-paypal'+`_${storeKey}`);
      window.sessionStorage.setItem('order-info-paypal'+`_${storeKey}`, JSON.stringify(order));
    }
  }

  public getPlaceOrderInfoPaypal(): OrderResponse | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const order = window.sessionStorage.getItem('order-info-paypal'+`_${storeKey}`)!;
      return JSON.parse(order);
    }
    return null;
  }

  public getToken(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return window.localStorage.getItem(TOKEN_KEY+`_${storeKey}`);
    }
    return null;
  }

  public getUser(): User | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      const localuser = window.localStorage.getItem(USER_KEY+`_${storeKey}`)!;
      return JSON.parse(localuser);
    }
    return null;
  }

  public setUserTheme(color: string) {
    if (this.isBrowser) {
      let user = this.getUser();
      if(user){
        user.theme = color;
        this.saveUser(user, this.isRememberMe);
      }
    }
  }

  public saveRefreshToken(token: string): void {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(REFRESHTOKEN_KEY+`_${storeKey}`);
      window.sessionStorage.setItem(REFRESHTOKEN_KEY+`_${storeKey}`, token);
      this.setStorage(REFRESHTOKEN_KEY+`_${storeKey}`, token);
    }
  }

  public getRefreshToken(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return window.localStorage.getItem(REFRESHTOKEN_KEY+`_${storeKey}`)!;
    }
    return null;
  }

  public saveUserID(id: number): void {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(USER_ID+`_${storeKey}`);
      window.sessionStorage.setItem(USER_ID+`_${storeKey}`, id.toString());
      this.setStorage(USER_ID+`_${storeKey}`, id.toString());
    }
  }

  public getUserID(): number | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return Number(window.localStorage.getItem(USER_ID+`_${storeKey}`)!);
    }
    return null;
  }

  public saveUserType(id: string): void {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem(USER_TYPE+`_${storeKey}`);
      window.sessionStorage.setItem(USER_TYPE+`_${storeKey}`, id);
      this.setStorage(USER_TYPE+`_${storeKey}`, id.toString());
    }
  }

  public getUserType(): string | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return window.localStorage.getItem(USER_TYPE+`_${storeKey}`)!;
    }
    return null;
  }

  public saveBrowserLanguage(language: string) {
    if (this.isBrowser) {
      window.localStorage.removeItem(LANGUAGE_KEY);
      window.localStorage.setItem(LANGUAGE_KEY, language);
      this.setStorage(LANGUAGE_KEY, language);
    }
  }

  public getBrowserLanguage(): string | null {
    if (this.isBrowser) {
      return window.localStorage.getItem(LANGUAGE_KEY)!;
    }
    return null;
  }

  public saveReturnOrder(order: OrderResponse): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(RETURN_ORDER);
      window.sessionStorage.setItem(RETURN_ORDER, JSON.stringify(order));
    }
  }

  public getReturnOrder(): OrderResponse | null {
    if (this.isBrowser) {
      return JSON.parse(window.sessionStorage.getItem(RETURN_ORDER)!);
    }
    return null;
  }

  public saveOrderForPrint(order: OrderResponse): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(PRINT_ORDER);
      window.sessionStorage.setItem(PRINT_ORDER, JSON.stringify(order));
    }
  }

  public getOrderForPrint(): OrderResponse | null {
    if (this.isBrowser) {
      return JSON.parse(window.sessionStorage.getItem(PRINT_ORDER)!);
    }
    return null;
  }

  public saveOrderForOrderDetails(order: OrderResponse): void {
    if (this.isBrowser) {
      window.sessionStorage.removeItem(ORDER_DETAILS);
      window.sessionStorage.setItem(ORDER_DETAILS, JSON.stringify(order));
    }
  }

  public getOrderForOrderDetails(): OrderResponse | null {
    if (this.isBrowser) {
      return JSON.parse(window.sessionStorage.getItem(ORDER_DETAILS)!);
    }
    return null;
  }

  private setStorage(key: string, value: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key);
      window.localStorage.setItem(key, value);
    }
  }

  private removeStorage(key: string): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(key);
    }
  }

  getFazealLanguages() {
    if (this.isBrowser) {
      return JSON.parse(window.localStorage.getItem(SYSTEM_LANGUAGES_KEY)!);
    }
    return null;
  }

  public savePlaceOrderRequest(orderDetails: any){
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      window.sessionStorage.removeItem('place-order-request'+`_${storeKey}`);
      window.sessionStorage.setItem('place-order-request'+`_${storeKey}`, JSON.stringify(orderDetails));
      this.setStorage('place-order-request'+`_${storeKey}`, JSON.stringify(orderDetails));
    }
  }

  public getPlaceOrderRequest(): any {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
        storeKey = path.split('/')[1];
      }
      return JSON.parse(window.localStorage.getItem('place-order-request'+`_${storeKey}`)!);
    }
    return null;
  }

  async saveBusinessData(subdomain: string, param: any) {
    if (this.isBrowser) {
      if(environment.env !== 'local'){
        subdomain = window.location.hostname;
      } else {
        const path = window.location.pathname;
        subdomain = path.split('/')[1];
      }
      if (subdomain) {
        this.saveBusinessURL(subdomain);
        await this.catalogService.getBusinessThemeSettings(subdomain).toPromise().then(
          async data => {
            this.siteSetting = data?.data?.getBusinessThemeSettings;
            this.theme = this.siteSetting?.themeName;
            await this.getStoreCurrencyByBusinessId(this.siteSetting.businessId);
            await this.getOrderIdFormatByBusinessId(this.siteSetting.businessId);
            this.saveBusinessID(this.siteSetting.businessId.toString());
            this.saveStoreName(data?.data?.getBusinessThemeSettings?.storeName);
            this.translateService.setSiteLanguage(subdomain);
          }
        );
      }
    }
  }

  public getStoreCurrencyByBusinessId(businessID: number) {
    if (this.isBrowser) {
      this.businessSettingService.getStoreCurrencyByBusinessId(businessID).subscribe(
        data => {
          if (data?.data?.getStoreCurrencyByBusinessId) {
            this.currencySymbol = data?.data?.getStoreCurrencyByBusinessId?.symbol;
            this.saveCurrency(data?.data?.getStoreCurrencyByBusinessId);
          }
        }
      );
    }
  }

  getOrderIdFormatByBusinessId(businessID: number) {
    if (this.isBrowser) {
      this.catalogService.getOrderIdFormatByBusinessId(businessID).subscribe(
        data => {
          if (data?.data?.getOrderIdFormatByBusinessId != null) {
            this.orderIdFormat = data?.data?.getOrderIdFormatByBusinessId;
            this.saveOrderFormat(this.orderIdFormat);
          }
        }
      );
    }
  }

  getChatUserFromSession(): ChatUserResponse | null {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
   storeKey = path.split('/')[1];
      }
      const userData = sessionStorage.getItem(`chatUserData_${storeKey}`);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  saveChatUser(user: ChatUserResponse | null) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
   storeKey = path.split('/')[1];
      }
      sessionStorage.setItem(`chatUserData_${storeKey}`, JSON.stringify(user));
    }
  }

  saveEmpInfo(employeeInfo: any) {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
   storeKey = path.split('/')[1];
      }
      sessionStorage.setItem(`chatEmployeeData_${storeKey}`, JSON.stringify(employeeInfo));
      this.setStorage(`chatEmployeeData_${storeKey}`, JSON.stringify(employeeInfo));
    }
  }

  getEmpInfo() {
    if (this.isBrowser) {
      let storeKey;
      if(environment.env !== 'local'){
        storeKey = window.location.hostname;
      } else {
        const path = window.location.pathname;
   storeKey = path.split('/')[1];
      }
      const userData = localStorage.getItem(`chatEmployeeData_${storeKey}`);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

}
