import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redeem-point-validation-popup',
  templateUrl: './redeem-point-validation-popup.component.html',
  styleUrls: ['./redeem-point-validation-popup.component.css']
})
export class RedeemPointValidationPopupComponent implements OnInit {


  mobileOtpCode: string[] = ['', '', '', '', '', ''];


  constructor() { }

  ngOnInit() {
  }

  onMobileOtpCodeChange(event: any, index: number) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length < 2) {
        this.mobileOtpCode[index - 1] = event.target.value;
      }
    }
  }

}
