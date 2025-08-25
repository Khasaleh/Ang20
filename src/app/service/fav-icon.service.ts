import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class FaviconService {
  constructor(private router: Router) {}

  setFavicon(faviconUrl: string) {
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
