import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookieDataServiceService {
  private isBrowser: boolean;
  private storeKey: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private request: Request
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

  setCookie(name: string, value: string, expires: number, path: string = '/') {
    if (this.isBrowser) {
      const cookieName = `${this.storeKey}<${name}>`;
      this.deleteCookie(cookieName);
      const date = new Date();
      date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
      const expiresDate = date.toUTCString();
      const cookieValue = encodeURIComponent(value) + '; expires=' + expiresDate + '; path=' + path + '; SameSite=Strict';
      document.cookie = cookieName + '=' + cookieValue;
    }
  }

  getCookie(name: string): string {
    if (this.isBrowser) {
      const cookieName = `${this.storeKey}<${name}>`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
    }
    return '';
  }

  deleteCookie(name: string, path: string = '/') {
    if (this.isBrowser) {
      if (this.getCookie(name)) {
        this.setCookie(name, '', -1, path);
      }
    }
  }

  setUserCookie(value: string, expires: number, path: string = '/') {
    if (this.isBrowser) {
      const cookieName = `${this.storeKey}user`;
      this.deleteUserCookie(cookieName, path);
      const date = new Date();
      date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
      const expiresDate = date.toUTCString();
      const cookieValue = encodeURIComponent(value) + '; expires=' + expiresDate + '; SameSite=Strict; Path=' + path;
      document.cookie = cookieName + '=' + cookieValue + ';';
    }
  }

  getUserCookie(name: string): string {
    if (this.isBrowser) {
      const cookieName = `${this.storeKey}${name}=`;
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName)) {
          return decodeURIComponent(cookie.substring(cookieName.length));
        }
      }
    }
    return '';
  }

  deleteCurrentCookie(name: string, path: string = '/') {
    if (this.isBrowser) {
      const cookieName = `${this.storeKey}<${name}>`;
      document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + '; SameSite=Strict';
    }
  }

  deleteUserCookie(name: string, path: string = '/') {
    if (this.isBrowser) {
      const date = new Date();
      date.setTime(date.getTime() - 1);
      const expiresDate = date.toUTCString();
      document.cookie = `${this.storeKey}${name}=; expires=${expiresDate}; SameSite=Strict; Path=${path};`;
    }
  }
}
