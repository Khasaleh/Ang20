import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  updateTitle(title: string) {}
  updateMetaTags(description: string, keywords: string, ogTitle: string, ogDescription: string, ogImage: string, ogUrl: string) {}
}
