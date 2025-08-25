import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/Pages';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  page!: Page;
  isLoading: boolean = true; 
  businessId = Number(this.tokenStorage.getBusinessID())!;

  constructor(private businessSetting: BusinessSettingService, private tokenStorage: TokenStorageService,private sanitizer: DomSanitizer) { }

  async ngOnInit() {
    await this.getAllPages();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  async getAllPages() {
    this.isLoading = true; 
    this.businessSetting.getAllStorePages(this.businessId).subscribe(data => {
      if (data?.data?.getAllStorePages) {
        this.page = data?.data?.getAllStorePages?.find((p: any) => p?.pageType === 'ABOUT_US'); 
        console.log(this.page.content,"about us page content")
      }
      this.isLoading = false;  
    }, error => { 
      this.isLoading = false;  
    });
  }
  
  isContentEmpty(): boolean {
  if (!this.page || !this.page.content) return true;

  // Remove white spaces
  const cleaned = this.page.content.replace(/\s/g, '');

  // Check if it contains meaningful tags like img or text content
  const hasImage = /<img\s+[^>]*src=['"]([^'"]+)['"][^>]*>/i.test(this.page.content);
  const hasText = this.page.content.replace(/<[^>]*>/g, '').trim().length > 0;

  return !(hasImage || hasText);
}

 get sanitizedPageContent() {
  let content = this.page?.content || '';

  // Remove <pre> tags if they exist
  content = content.replace(/<pre[^>]*>/gi, '').replace(/<\/pre>/gi, '');

  // Decode HTML entities
  const txt = document.createElement('textarea');
  txt.innerHTML = content;
  const decoded = txt.value;

  return this.sanitizer.bypassSecurityTrustHtml(decoded);
}


  
}
