import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    RouterModule
  ],
  selector: 'app-four-theme-cancel-order-return-refund',
  templateUrl: './four-theme-cancel-order-return-refund.component.html',
  styleUrls: ['./four-theme-cancel-order-return-refund.component.scss']
})
export class FourThemeCancelOrderReturnRefundComponent implements OnInit {
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  constructor() { }

  ngOnInit(): void {
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

}
