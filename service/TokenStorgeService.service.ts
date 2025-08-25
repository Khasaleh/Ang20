import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
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
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';

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
    private storeKey: string = '';
    private storage: Map<string, any> = new Map();

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private catalogService: CatalogServiceService,
        private businessSettingService: BusinessSettingService,
        @Inject(PLATFORM_ID) private platformId: object,
        @Optional() @Inject(REQUEST) private request: Request,
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
            if (environment.env !== 'local') {
                this.storeKey = window.location.hostname;
            } else {
                const path = window.location.pathname;
                this.storeKey = path.split('/')[1];
            }
        } else if (this.request) {
            this.storeKey = this.request.hostname.split('.')[0];
        }
    }

    private getItem(key: string): any {
        if (this.isBrowser) {
            return localStorage.getItem(key);
        }
        return this.storage.get(key);
    }

    private setItem(key: string, value: any): void {
        if (this.isBrowser) {
            localStorage.setItem(key, value);
        } else {
            this.storage.set(key, value);
        }
    }

    private removeItem(key: string): void {
        if (this.isBrowser) {
            localStorage.removeItem(key);
        } else {
            this.storage.delete(key);
        }
    }

    private getSessionItem(key: string): any {
        if (this.isBrowser) {
            return sessionStorage.getItem(key);
        }
        return this.storage.get(key);
    }

    private setSessionItem(key: string, value: any): void {
        if (this.isBrowser) {
            sessionStorage.setItem(key, value);
        } else {
            this.storage.set(key, value);
        }
    }

    private removeSessionItem(key: string): void {
        if (this.isBrowser) {
            sessionStorage.removeItem(key);
        } else {
            this.storage.delete(key);
        }
    }

    signOut(): void {
        this.removeSessionItem(TOKEN_KEY + `_${this.storeKey}`);
        this.removeSessionItem(USER_KEY + `_${this.storeKey}`);
        this.removeSessionItem(REFRESHTOKEN_KEY + `_${this.storeKey}`);
        this.removeSessionItem(COOKIES_KEY + `_${this.storeKey}`);

        this.removeItem(TOKEN_KEY + `_${this.storeKey}`);
        this.removeItem(USER_KEY + `_${this.storeKey}`);
        this.removeItem(REFRESHTOKEN_KEY + `_${this.storeKey}`);
        this.removeItem(COOKIES_KEY + `_${this.storeKey}`);
        if (this.isBrowser) {
            window.dispatchEvent(new StorageEvent('storage', {
                key: TOKEN_KEY + `_${this.storeKey}`,
                oldValue: 'some_value',
                newValue: null,
                storageArea: sessionStorage
            }));
        }
    }

    clearSessionData(): void {
        this.signOut();
    }

    public saveToken(token: string) {
        this.removeSessionItem(TOKEN_KEY + `_${this.storeKey}`);
        this.setSessionItem(TOKEN_KEY + `_${this.storeKey}`, token);
        this.setItem(TOKEN_KEY + `_${this.storeKey}`, token);
    }

    public saveThemeDashboard(theme: ThemeDashboardContent) {
        this.removeSessionItem(THEME_DASHBOARD + `_${this.storeKey}`);
        this.setSessionItem(THEME_DASHBOARD + `_${this.storeKey}`, JSON.stringify(theme));
    }

    public getThemeDashboard(): ThemeDashboardContent | null {
        const theme = this.getSessionItem(THEME_DASHBOARD + `_${this.storeKey}`);
        return theme ? JSON.parse(theme) : null;
    }

    public savePdp(theme: PdpContent) {
        this.removeSessionItem(PDP + `_${this.storeKey}`);
        this.setSessionItem(PDP + `_${this.storeKey}`, JSON.stringify(theme));
    }

    public getPdp(): PdpContent | null {
        const pdp = this.getSessionItem(PDP + `_${this.storeKey}`);
        return pdp ? JSON.parse(pdp) : null;
    }

    public saveBusinessURL(url: string) {
        this.removeSessionItem(BUSINESSURL_KEY + `_${this.storeKey}`);
        this.setSessionItem(BUSINESSURL_KEY + `_${this.storeKey}`, url);
        this.setItem(BUSINESSURL_KEY + `_${this.storeKey}`, url);
    }

    public getBusinessURL(): string | null {
        return this.getSessionItem(BUSINESSURL_KEY + `_${this.storeKey}`);
    }

    public getBusinessURLFromLocalStorage(): string | null {
        return this.getItem(BUSINESSURL_KEY + `_${this.storeKey}`);
    }

    public saveBusinessID(id: string) {
        this.removeSessionItem(BUSINESSID_KEY + `_${this.storeKey}`);
        this.setSessionItem(BUSINESSID_KEY + `_${this.storeKey}`, id);
    }

    public getBusinessID(): string | null {
        return this.getSessionItem(BUSINESSID_KEY + `_${this.storeKey}`);
    }

    public saveCookiesonBrowser(cookie: string) {
        this.removeSessionItem(COOKIES_KEY + `_${this.storeKey}`);
        this.setSessionItem(COOKIES_KEY + `_${this.storeKey}`, cookie);
    }

    public getCookies(): string | null {
        return this.getSessionItem(COOKIES_KEY + `_${this.storeKey}`);
    }

    public saveStoreName(id: string) {
        this.removeSessionItem(STORE_NAME + `_${this.storeKey}`);
        this.setSessionItem(STORE_NAME + `_${this.storeKey}`, id);
    }

    public getBStoreName(): string | null {
        const storeName = this.getSessionItem(STORE_NAME + `_${this.storeKey}`);
        return storeName ? this.toTitleCase(storeName) : null;
    }

    private toTitleCase(str: string): string {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    public saveCurrency(currency: CurrencyResponse) {
        this.removeSessionItem(CURRENCY_KEY + `_${this.storeKey}`);
        this.setSessionItem(CURRENCY_KEY + `_${this.storeKey}`, JSON.stringify(currency));
    }

    public getCurrency(): CurrencyResponse {
        const currency = this.getSessionItem(CURRENCY_KEY + `_${this.storeKey}`);
        return currency ? JSON.parse(currency) : null;
    }

    public saveOrderFormat(format: OrderIdFormatResponse) {
        this.removeSessionItem(ORDER_FORMAT + `_${this.storeKey}`);
        this.setSessionItem(ORDER_FORMAT + `_${this.storeKey}`, JSON.stringify(format));
    }

    public getOrderFormat(): OrderIdFormatResponse {
        const format = this.getSessionItem(ORDER_FORMAT + `_${this.storeKey}`);
        return format ? JSON.parse(format) : null;
    }

    public saveUser(user: User, isRememberMe: boolean) {
        this.isRememberMe = isRememberMe;
        this.removeSessionItem(USER_KEY + `_${this.storeKey}`);
        this.setSessionItem(USER_KEY + `_${this.storeKey}`, JSON.stringify(user));
        this.setItem(USER_KEY + `_${this.storeKey}`, JSON.stringify(user));
    }

    public saveRememberMe(rememberMe: boolean) {
        this.removeSessionItem(REMEMBER_ME_KEY + `_${this.storeKey}`);
        this.setSessionItem(REMEMBER_ME_KEY + `_${this.storeKey}`, JSON.stringify(rememberMe));
        this.setItem(REMEMBER_ME_KEY + `_${this.storeKey}`, JSON.stringify(rememberMe));
    }

    public getRememberMe(): boolean {
        const rememberMe = this.getItem(REMEMBER_ME_KEY + `_${this.storeKey}`);
        return rememberMe === 'true';
    }

    public saveUserOrderInfo(order: PlaceOrderDto) {
        this.removeSessionItem('order-info' + `_${this.storeKey}`);
        this.setSessionItem('order-info' + `_${this.storeKey}`, JSON.stringify(order));
    }

    public getUserOrderInfo(): PlaceOrderDto {
        const order = this.getSessionItem('order-info' + `_${this.storeKey}`);
        return order ? JSON.parse(order) : null;
    }

    public savePlaceOrderInfoPaypal(order: OrderResponse) {
        this.removeSessionItem('order-info-paypal' + `_${this.storeKey}`);
        this.setSessionItem('order-info-paypal' + `_${this.storeKey}`, JSON.stringify(order));
    }

    public getPlaceOrderInfoPaypal(): OrderResponse {
        const order = this.getSessionItem('order-info-paypal' + `_${this.storeKey}`);
        return order ? JSON.parse(order) : null;
    }

    public getToken(): string | null {
        return this.getItem(TOKEN_KEY + `_${this.storeKey}`);
    }

    public getUser(): User {
        const localuser = this.getItem(USER_KEY + `_${this.storeKey}`);
        return localuser ? JSON.parse(localuser) : null;
    }

    public setUserTheme(color: string) {
        let user = this.getUser();
        if (user) {
            user.theme = color;
            this.saveUser(user, this.isRememberMe);
        }
    }

    public saveRefreshToken(token: string): void {
        this.removeSessionItem(REFRESHTOKEN_KEY + `_${this.storeKey}`);
        this.setSessionItem(REFRESHTOKEN_KEY + `_${this.storeKey}`, token);
        this.setItem(REFRESHTOKEN_KEY + `_${this.storeKey}`, token);
    }

    public getRefreshToken(): string {
        return this.getItem(REFRESHTOKEN_KEY + `_${this.storeKey}`);
    }

    public saveUserID(id: number): void {
        this.removeSessionItem(USER_ID + `_${this.storeKey}`);
        this.setSessionItem(USER_ID + `_${this.storeKey}`, id.toString());
        this.setItem(USER_ID + `_${this.storeKey}`, id.toString());
    }

    public getUserID(): number {
        const userId = this.getItem(USER_ID + `_${this.storeKey}`);
        return userId ? Number(userId) : 0;
    }

    public saveUserType(id: string): void {
        this.removeSessionItem(USER_TYPE + `_${this.storeKey}`);
        this.setSessionItem(USER_TYPE + `_${this.storeKey}`, id);
        this.setItem(USER_TYPE + `_${this.storeKey}`, id.toString());
    }

    public getUserType(): string {
        return this.getItem(USER_TYPE + `_${this.storeKey}`);
    }

    public saveBrowserLanguage(language: string) {
        this.removeItem(LANGUAGE_KEY);
        this.setItem(LANGUAGE_KEY, language);
    }

    public getBrowserLanguage(): string {
        return this.getItem(LANGUAGE_KEY);
    }

    public saveReturnOrder(order: OrderResponse): void {
        this.removeSessionItem(RETURN_ORDER);
        this.setSessionItem(RETURN_ORDER, JSON.stringify(order));
    }

    public getReturnOrder(): OrderResponse {
        const order = this.getSessionItem(RETURN_ORDER);
        return order ? JSON.parse(order) : null;
    }

    public saveOrderForPrint(order: OrderResponse): void {
        this.removeSessionItem(PRINT_ORDER);
        this.setSessionItem(PRINT_ORDER, JSON.stringify(order));
    }

    public getOrderForPrint(): OrderResponse {
        const order = this.getSessionItem(PRINT_ORDER);
        return order ? JSON.parse(order) : null;
    }

    public saveOrderForOrderDetails(order: OrderResponse): void {
        this.removeSessionItem(ORDER_DETAILS);
        this.setSessionItem(ORDER_DETAILS, JSON.stringify(order));
    }

    public getOrderForOrderDetails(): OrderResponse {
        const order = this.getSessionItem(ORDER_DETAILS);
        return order ? JSON.parse(order) : null;
    }

    getFazealLanguages() {
        const languages = this.getItem(SYSTEM_LANGUAGES_KEY);
        return languages ? JSON.parse(languages) : null;
    }

    public savePlaceOrderRequest(orderDetails: any) {
        this.removeSessionItem('place-order-request' + `_${this.storeKey}`);
        this.setSessionItem('place-order-request' + `_${this.storeKey}`, JSON.stringify(orderDetails));
        this.setItem('place-order-request' + `_${this.storeKey}`, JSON.stringify(orderDetails));
    }

    public getPlaceOrderRequest(): any {
        const request = this.getItem('place-order-request' + `_${this.storeKey}`);
        return request ? JSON.parse(request) : null;
    }

    async saveBusinessData(subdomain: string, param: any) {
        if (this.isBrowser) {
            if (environment.env !== 'local') {
                subdomain = window.location.hostname;
            } else {
                const path = window.location.pathname;
                subdomain = path.split('/')[1];
            }
        }

        if (subdomain) {
            this.saveBusinessURL(subdomain);
            await this.catalogService.getBusinessThemeSettings(subdomain).toPromise().then(
                async (data: any) => {
                    this.siteSetting = data?.data?.getBusinessThemeSettings;
                    this.theme = this.siteSetting?.themeName;
                    await this.getStoreCurrencyByBusinessId(this.siteSetting.businessId);
                    await this.getOrderIdFormatByBusinessId(this.siteSetting.businessId);
                    this.saveBusinessID(this.siteSetting.businessId.toString());
                    this.saveStoreName(data?.data?.getBusinessThemeSettings?.storeName);
                }
            );
        }
    }

    public getStoreCurrencyByBusinessId(businessID: number) {
        this.businessSettingService.getStoreCurrencyByBusinessId(businessID).subscribe(
            (data: any) => {
                if (data?.data?.getStoreCurrencyByBusinessId) {
                    this.currencySymbol = data?.data?.getStoreCurrencyByBusinessId?.symbol;
                    this.saveCurrency(data?.data?.getStoreCurrencyByBusinessId);
                }
            }
        );
    }

    getOrderIdFormatByBusinessId(businessID: number) {
        this.catalogService.getOrderIdFormatByBusinessId(businessID).subscribe(
            (data: any) => {
                if (data?.data?.getOrderIdFormatByBusinessId != null) {
                    this.orderIdFormat = data?.data?.getOrderIdFormatByBusinessId;
                    this.saveOrderFormat(this.orderIdFormat);
                }
            }
        );
    }

    getChatUserFromSession(): ChatUserResponse | null {
        const userData = this.getSessionItem(`chatUserData_${this.storeKey}`);
        return userData ? JSON.parse(userData) : null;
    }

    saveChatUser(user: ChatUserResponse | null) {
        this.setSessionItem(`chatUserData_${this.storeKey}`, JSON.stringify(user));
    }

    saveEmpInfo(employeeInfo: any) {
        this.setSessionItem(`chatEmployeeData_${this.storeKey}`, JSON.stringify(employeeInfo));
        this.setItem(`chatEmployeeData_${this.storeKey}`, JSON.stringify(employeeInfo));
    }

    getEmpInfo() {
        const userData = this.getItem(`chatEmployeeData_${this.storeKey}`);
        return userData ? JSON.parse(userData) : null;
    }
}
