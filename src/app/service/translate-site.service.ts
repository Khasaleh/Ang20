import { Injectable, Inject, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './theme.service';
import { TokenStorageService } from './TokenStorgeService.service';
import { environment } from 'src/environments/environment';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class TranslateSiteService {
  public rtlFlag = new BehaviorSubject<boolean>(false);

constructor( public translate: TranslateService,@Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService,private ngZone: NgZone,
    public tokenStorage: TokenStorageService) { }


 setSiteLanguage(siteUrl: string) :boolean{
  const htmlTag = this.document.documentElement;
  let storeKey;
  if (environment.env !== 'local') {
    storeKey = window.location.hostname;
  } else {
    const path = window.location.pathname;
    storeKey = path.split('/')[1];
  }
  let lang='en';
  this.themeService.getLanguageBySiteUrl(siteUrl).subscribe(
    data => {
      if(data?.data?.getLanguageBySiteUrl){
        lang = data?.data?.getLanguageBySiteUrl;
        lang = lang.toLowerCase().slice(0, 2);
      }
      localStorage.setItem('selectedLang'+`_${storeKey}`, lang);
      this.loadGoogleTranslate(lang);
      this.translate.use(lang);
      const rtlLangs = ['ur', 'ar', 'fa', 'ps', 'ku', 'sd', 'yi', 'am'];
      if(rtlLangs.includes(lang)){
        this.rtlFlag.next(true);
        htmlTag.setAttribute('lang', lang);
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.classList.add('rtl');
      }else{
        this.rtlFlag.next(false);
        htmlTag.setAttribute('lang', lang);
        htmlTag.removeAttribute('dir');
        htmlTag.classList.remove('rtl');
      }
    }
  );
  return true
}

setDefaultLanguage() {
  const htmlTag = this.document.documentElement;
  this.translate.use('en');
    htmlTag.setAttribute('lang', 'en');
    htmlTag.removeAttribute('dir');
    htmlTag.classList.remove('rtl');

  return true
}

getShortBrowserLanguage() {
  if (window.navigator.language.includes('-')) {
   return window.navigator.language.split('-')[0];
}else{
  return window.navigator.language;
}
}

loadGoogleTranslate(pageLanguage: string): void {
  if (!document.getElementById('google-translate-script')) {
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.defer = true;
    script.onload = () => this.initGoogleTranslate(pageLanguage);
    document.body.appendChild(script);
  } else {
    this.initGoogleTranslate(pageLanguage);
  }
}

private initGoogleTranslate(pageLanguage: string) {
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      if (typeof google !== 'undefined' && google.translate) {
        new google.translate.TranslateElement(
          {
            pageLanguage: pageLanguage,
            includedLanguages: 'af,az,sq,ar,bn,bs,ca,hr,cs,da,nl,tl,et,fi,fr,de,en,el,gu,hi,hu,id,it,ja,kn,km,la,lv,lt,ml,mr,ne,pl,pt,pa,ro,ru,si,sk,sl,es,sw,sv,ta,te,th,tr,uk,ur,vi,cy,zu,he,zh-CN,zh-TW,ko,am,hy,eu,be,bg,ceb,co,eo,fy,gl,ka,ht,ha,haw,hmn,is,ig,ga,jv,kk,rw,ku,ky,lo,lb,mk,mg,ms,mt,mi,mn,my,no,ny,or,ps,fa,sm,gd,sr,st,sn,sd,so,su,tg,tt,tk,ug,uz,xh,yi,yo',
            layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      } else {
        console.error('Google Translate is not available.');
      }
    }, 2000);
  });
}
}
