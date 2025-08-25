import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-return-refund-step-form',
  templateUrl: './return-refund-step-form.component.html',
  styleUrls: ['./return-refund-step-form.component.scss']
})
export class ReturnRefundStepFormComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  checkBoxChecked: boolean = false;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  def:any = 0;

  constructor() { }

  ngOnInit(): void {
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

}
