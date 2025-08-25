import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FaviconService {
  isBrowser: boolean;
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setFavicon(faviconUrl: string) {
    if (this.isBrowser) {
      const faviconLink = document.querySelector("link[rel~='shortcut icon']");
      if (faviconLink !== null) {
        faviconLink.setAttribute('href', faviconUrl);
      } else {
        const newLink = document.createElement('link');
        newLink.rel = 'shortcut icon';
        newLink.href = faviconUrl;
        document.head.appendChild(newLink);
      }
    }
  }
}
