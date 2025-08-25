import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  selector: 'app-cookiesbar',
  templateUrl: './cookiesbar.component.html',
  styleUrls: ['./cookiesbar.component.css']
})
export class CookiesbarComponent implements OnInit {

  ShowCookiesBar: boolean = true;
  cookiesData: any;
  browserCookies = this.tokenStorage.getCookies();

  constructor(private businessSettingService: BusinessSettingService, private tokenStorage: TokenStorageService) { }

  async ngOnInit() {
    await this.getCookies();
  }

  hideCookiesBar() {
    this.cookiesData.enabled = false;
  }

  async getCookies(){
    (await this.businessSettingService.getCookiesDataByBusiness(Number(this.tokenStorage.getBusinessID()))).subscribe(
      data => {
       if(data?.data?.getBusinessCookiesByBusinessId != null) {
        this.cookiesData = data?.data?.getBusinessCookiesByBusinessId;
       }
      })
  }

  saveCookies(){
    this.tokenStorage.saveCookiesonBrowser(this.cookiesData?.bannerText);
    this.cookiesData.enabled = false;
  }
}
