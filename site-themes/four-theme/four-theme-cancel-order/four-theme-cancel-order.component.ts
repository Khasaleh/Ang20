import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-four-theme-cancel-order',
  templateUrl: './four-theme-cancel-order.component.html',
  styleUrls: ['./four-theme-cancel-order.component.scss']
})
export class FourThemeCancelOrderComponent implements OnInit {
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
