import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redeem-products-popup',
  templateUrl: './redeem-products-popup.component.html',
  styleUrls: ['./redeem-products-popup.component.css']
})
export class RedeemProductsPopupComponent implements OnInit {

  showQuickView: boolean = true;
  showDelivery: boolean = false;
  showRedeemGift: boolean = false;
  quantity = 1;
  selectAddress: string = "";
  RedeemGiftValidation: boolean = false;
  RedeemGiftSuccessfull: boolean = false;
  mobileOtpCode: string[] = ['', '', '', '', '', ''];


  constructor() { }

  ngOnInit() {
  }


  redeemtoDelivery() {
    this.showQuickView = false;
    this.showRedeemGift = false;
    this.showDelivery = true;
    this.RedeemGiftValidation = false;
  }

  backtoQuickView(){
    this.showQuickView = true;
    this.showRedeemGift = false;
    this.showDelivery = false;
    this.RedeemGiftValidation = false;
  }

  redeemtoGiftProduct(){
    this.showQuickView = false;
    this.showDelivery = false;
    this.showRedeemGift = true;
    this.RedeemGiftValidation = false;
  }

  redeemtoGiftValidate() {
    this.showQuickView = false;
    this.showDelivery = false;
    this.showRedeemGift = false;
    this.RedeemGiftValidation = true;
  }

  redeemGiftotpValidate(){
    this.showQuickView = false;
    this.showDelivery = false;
    this.showRedeemGift = false;
    this.RedeemGiftValidation = false;
    this.RedeemGiftSuccessfull = true;
  }

  backtoGiftProduct() {
    this.showRedeemGift = true;
    this.showQuickView = false;
    this.showDelivery = false;
    this.RedeemGiftValidation = false;
    this.RedeemGiftSuccessfull = false;
  }


  onMobileOtpCodeChange(event: any, index: number) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length < 2) {
        this.mobileOtpCode[index - 1] = event.target.value;
      }
    }
  }

}
