import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './service/TokenStorgeService.service';
import { SiteSettings } from './models/SiteSettings';
import { RtlService } from './service/rtl.service';
import { TranslateSiteService } from './service/translate-site.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent implements OnInit {
  title = 'Fazeal Ecommerce Store';
  theme = 'FourthTheme';
  siteSetting!: SiteSettings;
  currencySymbol: string = '';
  storeName: string | null = null;
  private isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public translate: TranslateService,
    public rtlService: RtlService,
    public translateSite: TranslateSiteService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.storeName = this.tokenStorage.getBStoreName();
    }
  }

  async ngOnInit() {
    if (this.isBrowser) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      });

      if (environment.env !== 'local') {
        const host = window.location.hostname;
        const subdomain = host.split('.')[0];
        this.handleClientSideRouting(subdomain, host);
      } else {
        const path = window.location.pathname;
        const subdomain = path.split('/')[1];
        this.handleClientSideRouting(subdomain, subdomain);
      }
    }
  }

  private handleClientSideRouting(subdomain: string, host: string) {
    this.route.queryParams.subscribe(async params => {
      const orderId = params['orderId'];
      const paymentId = params['paymentId'];
      const token = params['token'];
      const payerId = params['PayerID'];

      if (paymentId && token && payerId) {
        let businessURL = this.tokenStorage.getBusinessURL()!;
        if (businessURL.endsWith('/')) {
          businessURL = businessURL?.slice(0, -1);
        }
        if (this.router.url.includes('order-details')) {
          this.router.navigate([`/order-details/`, orderId], {
            queryParams: { paymentId, token, payerId }
          });
        } else {
          this.router.navigate([`/process-payment`], {
            queryParams: { paymentId, token, payerId }
          });
        }
      } else if (subdomain) {
        if (!this.tokenStorage.getBusinessURL()!) {
          await this.tokenStorage.saveBusinessData(host, this.router.url.substring(1));
        }
        this.storeName = this.tokenStorage.getBStoreName();
        this.titleService.setTitle(this.storeName ?? 'Fazeal Ecommerce Store');
      }
    });
  }
}
