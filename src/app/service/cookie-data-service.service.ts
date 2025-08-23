import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CookieDataServiceService {

  constructor(private cookieService: CookieService) { }

  setCookie(name: string, value: string, expires: number, path: string = '/') {
    let storeKey;
    if(environment.env !== 'local'){
      storeKey = window.location.hostname;
    } else {
      const path = window.location.pathname;
      storeKey = path.split('/')[1];
    }
    const cookieName = `${storeKey}`+'<'+name+'>';
    this.deleteCookie(cookieName);
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    const expiresDate = date.toUTCString();
    const cookieValue = encodeURIComponent(value) + '; expires=' + expiresDate + '; path=' + path + '; SameSite=Strict';
    document.cookie = cookieName + '=' + cookieValue;
  }

  getCookie(name: string): string {
    let storeKey;
    if(environment.env !== 'local'){
      storeKey = window.location.hostname;
    } else {
      const path = window.location.pathname;
      storeKey = path.split('/')[1];
    }
    const cookieName = `${storeKey}`+'<'+name+'>';
    console.log(cookieName)
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return decodeURIComponent(cookie.substring(cookieName.length + 1));
      }
    }
    return '';
  }

  deleteCookie(name: string, path: string = '/') {
    if(this.getCookie(name)){
      this.setCookie(name, '', -1, path);
    }
  }

  setUserCookie(value: string, expires: number, path: string = '/') {
    let storeKey;
    if(environment.env !== 'local'){
      storeKey = window.location.hostname;
    } else {
      const path = window.location.pathname;
      storeKey = path.split('/')[1];
    }
    const cookieName = `${storeKey}`+'user';
    this.deleteUserCookie(cookieName, path);
    const date = new Date();
    date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
    const expiresDate = date.toUTCString();
    const cookieValue = encodeURIComponent(value) + '; expires=' + expiresDate + '; SameSite=Strict; Path=' + path;
    document.cookie = cookieName + '=' + cookieValue + ';';
}



getUserCookie(name: string): string {
  let storeKey;
  if(environment.env !== 'local'){
    storeKey = window.location.hostname;
  } else {
    const path = window.location.pathname;
    storeKey = path.split('/')[1];
  }
  const cookieName = `${storeKey}`+name + '=';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName)) {
          return decodeURIComponent(cookie.substring(cookieName.length));
      }
  }
  return '';
}

deleteCurrentCookie(name: string, path: string = '/') {
  let storeKey;
  if(environment.env !== 'local'){
    storeKey = window.location.hostname;
  } else {
    const path = window.location.pathname;
    storeKey = path.split('/')[1];
  }
  const cookieName = `${storeKey}`+'<'+name+'>';
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=' + path + '; SameSite=Strict';
}


deleteUserCookie(name: string, path: string = '/') {
  let storeKey;
  if(environment.env !== 'local'){
    storeKey = window.location.hostname;
  } else {
    const path = window.location.pathname;
    storeKey = path.split('/')[1];
  }
  const date = new Date();
  date.setTime(date.getTime() - 1);
  const expiresDate = date.toUTCString();
  document.cookie = `${storeKey}`+name + '=; expires=' + expiresDate + '; SameSite=Strict; Path=' + path + ';';
}

}
