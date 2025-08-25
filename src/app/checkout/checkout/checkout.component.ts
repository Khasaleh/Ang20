import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutShippingComponent } from '../checkout-shipping/checkout-shipping.component';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CheckoutAddressComponent,
    CheckoutShippingComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    TranslateModule,
  ],
})
export class CheckoutComponent implements OnInit {
  public currentStep: number = 0;
  public steps: any[] = [
    {
      label: 'Address',
      component: 'app-checkout-address',
    },
    {
      label: 'Shipping',
      component: 'app-checkout-shipping',
    },
    {
      label: 'Payment',
      component: 'app-checkout-payment',
    },
    {
      label: 'Review',
      component: 'app-checkout-review',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onStepChange(event: number): void {
    this.currentStep = event;
  }
}
