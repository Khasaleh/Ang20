import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Finix: any; // Declare Finix for TypeScript

@Component({
  selector: 'app-finix-payment-checkout',
  templateUrl: './finix-payment-checkout.component.html',
  styleUrls: ['./finix-payment-checkout.component.css']
})
export class FinixPaymentCheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('finixFormContainer', { static: false }) finixFormContainer!: ElementRef;
  @Input() finixApplicationId!: string;
  @Input() merchantId!: string;
  @Output() tokenEmitter = new EventEmitter<any>();
  @Output() finixSessionKeyEmitter = new EventEmitter<any>();
  mode: string = '';

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (typeof Finix === 'undefined') {
      console.error('Finix SDK not loaded. Ensure it is included in index.html');
      return;
    }
    if(environment.env === 'prod'){
      this.mode = 'live';
    } else {
      this.mode = 'sandbox';
    }
    const FinixAuth = Finix.Auth(this.mode, this.merchantId);
    const form = Finix.CardTokenForm('finix-form', {
      showAddress: true,
      onSubmit: () => {
        form.submit(this.mode, this.finixApplicationId, (err: any, res: any) => {
          if (err) {
            console.error('Error:', err);
            return;
          }
          const token = res?.data?.id;
          const sessionKey = FinixAuth.getSessionKey();
          this.tokenEmitter.emit(res.data);
          this.finixSessionKeyEmitter.emit(sessionKey);
          console.log(res,"checking response of token")
        });
      }
    });
  }
}
