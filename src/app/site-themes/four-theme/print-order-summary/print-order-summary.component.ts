import { Component, Inject, OnInit ,  Renderer2} from '@angular/core';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { ActivatedRoute,  Router, NavigationStart } from '@angular/router';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';
import { OrderTrackResponse } from 'src/app/models/OrderTrackResponse';
import { DOCUMENT } from '@angular/common';
import { Subject, Subscription, firstValueFrom, take} from 'rxjs';
 
@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-print-order-summary',
  templateUrl: './print-order-summary.component.html',
  styleUrls: ['./print-order-summary.component.css']
})
export class PrintOrderSummaryComponent implements OnInit {

  private routerSubscription!: Subscription;
  reloadSubscription!: Subscription;
  errorMessage = '';
  logoImage = '';
  subdomain: string = '';
  businessId = Number(this.tokenStorage.getBusinessID()!);
  order!: OrderResponse;
  user = this.tokenStorage.getUser();
  orderId!: number;
  orderPrefix = this.tokenStorage.getOrderFormat()?.prefix;
  orderSuffix = this.tokenStorage.getOrderFormat()?.suffix;
  awsUrl = environment.awsKey;
  assetsAwsKey = environment.assetsAwsKey;
  currency = this.tokenStorage.getCurrency()?.symbol;
  shippingTracks!: OrderTrackResponse;
  qrCodeImage!: string;

  constructor(private businessSetting: BusinessSettingService, private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document, private renderernew: Renderer2,
    public shoppingCart: ShoppingCartService,private router: Router,
    public tokenStorage: TokenStorageService,
  ) { }

  async ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    this.order = this.tokenStorage.getOrderForPrint();
    if(!this.order){
      this.router.navigate([this.subdomain+'/home']);
    }
    this.orderId = this.route.snapshot.params['id'];
    this.getStoreLogo();
    this.qrCodeImage = this.generateQRCode(this.order.qrCodeImage);
    this.shippingTracks = this.order?.orderTracks?.filter(track => track?.status === 'SHIPPING')[0];
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  

     this.renderernew.addClass(this.document.body, 'printorder-optimized');
        this.routerSubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            this.renderernew.removeClass(this.document.body, 'printorder-optimized');
          }
        });
  }

   ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    this.renderernew.removeClass(this.document.body, 'checkout-optimized');
  }


  printInvoice(): void {
    window.print();
  }

  getStoreLogo() {
    this.businessSetting.getStoreLogoBySiteUrl(this.subdomain).subscribe(
      data => {
        if (data.data?.getStoreLogoBySiteUrl == null) {
          this.errorMessage = data?.errors[0]?.errorMessage;
          return;
        }
        this.logoImage = data.data?.getStoreLogoBySiteUrl
      }
    );
  }

  generateQRCode(qrCodebase64: any): string {
    return `data:image/png;base64,${qrCodebase64}`;
  }

}
