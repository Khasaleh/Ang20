import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RedeemPointProductComponent } from './redeem-point-product/redeem-point-product.component';
import { RedeemVoucherBoxComponent } from './redeem-voucher-box/redeem-voucher-box.component';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    RedeemPointProductComponent,
    RedeemVoucherBoxComponent,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-redeem-points',
  templateUrl: './redeem-points.component.html',
  styleUrls: ['./redeem-points.component.css']
})
export class RedeemPointsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }




}
