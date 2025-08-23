import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { TokenStorageService } from './TokenStorgeService.service';

@Injectable({
  providedIn: 'root'
})
export class RtlService {
  public rtlFlag = new BehaviorSubject<boolean>(false);

  constructor(@Inject(DOCUMENT) private document: Document,public tokenStorageService: TokenStorageService) { }
  public isRTL(): boolean {
    const htmlTag = this.document.documentElement;
    let lang=this.tokenStorageService.getBrowserLanguage();
    const rtlLangs = ['ur', 'ar', 'fa', 'ps', 'ku', 'sd', 'yi', 'am'];
    if(rtlLangs.includes(lang)){
      this.rtlFlag.next(true);
      htmlTag.setAttribute('lang', lang);
      htmlTag.setAttribute('dir', 'rtl');
      htmlTag.classList.add('rtl');
      return true
    }else{
      this.rtlFlag.next(false);
      htmlTag.setAttribute('lang', lang);
      htmlTag.removeAttribute('dir');
      htmlTag.classList.remove('rtl');
      return false;
    }
  }
}
