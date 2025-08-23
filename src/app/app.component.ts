import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class AppComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    public translate: TranslateService,
    public rtlService: RtlService,
    public translateSite: TranslateSiteService,
    private titleService: Title,
    ) {
  }
  title = 'Fazeal Ecommerce Store';
  theme = 'FourthTheme';
  siteSetting!: SiteSettings;
  currencySymbol : string = '';
  storeName = this.tokenStorage.getBStoreName();

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
        window.scrollTo(0, 0);
      }
    });

    if(environment.env !== 'local'){
      const host = window.location.hostname;
      const subdomain = host.split('.')[0];
      this.route.queryParams.subscribe(async params => {
        const orderId = params['orderId'];
        const paymentId = params['paymentId'];
        const token = params['token'];
        const payerId = params['PayerID'];

        if (paymentId && token && payerId) {
          console.log("paymentId==", paymentId);
          let businessURL = this.tokenStorage.getBusinessURL()!;
          console.log("businessURL==", businessURL);
          if (businessURL.endsWith('/')) {
            businessURL = businessURL?.slice(0, -1);
          }
          if(this.router.url.includes('order-details')){
            this.router.navigate([`/order-details/`, orderId], {
              queryParams: { paymentId, token, payerId }
            });
          } else{
          console.log('Navigating to:', `/process-payment?paymentId=${paymentId}&token=${token}&payerId=${payerId}`);
          this.router.navigate([`/process-payment`], {
            queryParams: { paymentId, token, payerId }
          });
          }
        } else {
          console.log(subdomain, 'subdomain handling');

          if (!this.tokenStorage.getBusinessURL()) {
            await this.tokenStorage.saveBusinessData(host, this.router.url.substring(1));
          }

          this.titleService.setTitle(this.storeName ?? 'Fazeal Ecommerce Store');
          console.log(this.storeName,"checking storename current")
          if (this.router.url === '/' || this.router.url === '') {
          //  this.router.navigateByUrl('/home');
          }
        }
      });
    } else {
      const path = window.location.pathname;
      const subdomain = path.split('/')[1];
      this.route.queryParams.subscribe(async params => {
      const orderId = params['orderId'];
      const paymentId = params['paymentId'];
      const token = params['token'];
      const payerId = params['PayerID'];
      if (paymentId && token && payerId) {
          console.log("paymentId==", paymentId);
          let businessURL = this.tokenStorage.getBusinessURL()!;
          console.log("businessURL==", businessURL);
          if (businessURL.endsWith('/')) {
            businessURL = businessURL?.slice(0, -1);
          }
          if(this.router.url.includes('order-details')){
            console.log('Navigating to:', `/order-details/${orderId}/?paymentId=${paymentId}&token=${token}&payerId=${payerId}`);
            this.router.navigate([`/order-details/`, orderId], {
            queryParams: { paymentId, token, payerId }
          });
          } else{
          console.log('Navigating to:', `/process-payment?paymentId=${paymentId}&token=${token}&payerId=${payerId}`);
          this.router.navigate([`/process-payment`], {
            queryParams: { paymentId, token, payerId }
          });
          }
        }else if(subdomain){
        if(!this.tokenStorage.getBusinessURL()!){
          await this.tokenStorage.saveBusinessData(subdomain, this.router.url.substring(1));
        }
        this.titleService.setTitle(this.storeName ?? 'Fazeal Ecommerce Store');
        console.log(this.storeName,"checking storename current")
        // this.router.navigateByUrl(subdomain + '/home');
      }
    });
    }
  }

  // async ngOnInit() {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       console.log('NavigationEnd:', event);
  //       window.scrollTo(0, 0);
  //     }
  //   });
  //   const subdomain = this.route.snapshot.params['subdomain'];
  //   this.route.queryParams.subscribe(async params => {
  //     const paymentId = params['paymentId'];
  //     const token = params['token'];
  //     const payerId = params['PayerID'];
  //     if (paymentId && token && payerId) {
  //       console.log("paymentId==",paymentId);
  //       let businessURL = this.tokenStorage.getBusinessURL()!;
  //       if (businessURL.endsWith('/')) {
  //         businessURL = businessURL.slice(0, -1);
  //       }
  //       this.router.navigate([`${businessURL}/process-payment`], {
  //         queryParams: { paymentId: paymentId, token: token, payerId: payerId }
  //       });
  //     }else if(subdomain){
  //       if(!this.tokenStorage.getBusinessURL()!){
  //         await this.tokenStorage.saveBusinessData(subdomain, this.router.url.substring(1));
  //       }
  //       this.titleService.setTitle(subdomain);
  //       this.router.navigateByUrl(subdomain + '/home');
  //     }
  //   });

  // }

}
