import { A11yModule } from '@angular/cdk/a11y';\nimport { CdkStepperModule } from '@angular/cdk/stepper';\nimport { CdkTableModule } from '@angular/cdk/table';\nimport { CdkTreeModule } from '@angular/cdk/tree';\nimport { ClipboardModule } from '@angular/cdk/clipboard';\nimport { CommonModule } from '@angular/common';\nimport { DragDropModule } from '@angular/cdk/drag-drop';\nimport { FormsModule } from '@angular/forms';\nimport { MatButtonToggleModule } from '@angular/material/button-toggle';\nimport { MatCardModule } from '@angular/material/card';\nimport { MatCheckboxModule } from '@angular/material/checkbox';\nimport { MatChipsModule } from '@angular/material/chips';\nimport { MatDatepickerModule } from '@angular/material/datepicker';\nimport { MatDialogModule } from '@angular/material/dialog';\nimport { MatExpansionModule } from '@angular/material/expansion';\nimport { MatFormFieldModule } from '@angular/material/form-field';\nimport { MatGridListModule } from '@angular/material/grid-list';\nimport { MatIconModule } from '@angular/material/icon';\nimport { MatInputModule } from '@angular/material/input';\nimport { MatListModule } from '@angular/material/list';\nimport { MatMenuModule } from '@angular/material/menu';\nimport { MatNativeDateModule } from '@angular/material/core';\nimport { MatPaginatorModule } from '@angular/material/paginator';\nimport { MatProgressBarModule } from '@angular/material/progress-bar';\nimport { MatProgressSpinnerModule } from '@angular/material/progress-spinner';\nimport { MatRadioModule } from '@angular/material/radio';\nimport { MatSelectModule } from '@angular/material/select';\nimport { MatSidenavModule } from '@angular/material/sidenav';\nimport { MatSlideToggleModule } from '@angular/material/slide-toggle';\nimport { MatSliderModule } from '@angular/material/slider';\nimport { MatSnackBarModule } from '@angular/material/snack-bar';\nimport { MatSortModule } from '@angular/material/sort';\nimport { MatStepperModule } from '@angular/material/stepper';\nimport { MatTableModule } from '@angular/material/table';\nimport { MatTabsModule } from '@angular/material/tabs';\nimport { MatToolbarModule } from '@angular/material/toolbar';\nimport { MatTooltipModule } from '@angular/material/tooltip';\nimport { OverlayModule } from '@angular/cdk/overlay';\nimport { PortalModule } from '@angular/cdk/portal';\nimport { ReactiveFormsModule } from '@angular/forms';\nimport { ScrollingModule } from '@angular/cdk/scrolling';\nimport { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenStorageService } from './service/TokenStorgeService.service';
import { SiteSettings } from './models/SiteSettings';
import { RtlService } from './service/rtl.service';
import { TranslateSiteService } from './service/translate-site.service';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

\1
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
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
