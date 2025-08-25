import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Address, CCInfo } from 'src/app/models/user';
import { AddressService } from 'src/app/service/Address.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  cardType!: string | undefined;
  cardHolderName!: string;
  cardNumber: string = '';
  expiryDate: string = '';
  isDefault: boolean = false;
  expirationDateNotValid: boolean = true;
  cvvNotValid: boolean = false;
  cvv: string = '';
  ccErrorMessage: string = '';
  cardNameValidation: string = '';
  message: string = '';
  showAddBillingForm: boolean = false;
  addresses: Address[]=[];
  selectedAddressId!: number;
  invalidCardNumber = false;
  user = this.tokenStorageService.getUser();
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  payment!: CCInfo;
  paymentButton: boolean = false;

  constructor(private dialogRef: MatDialogRef<AddPaymentComponent>,private tokenStorageService: TokenStorageService,
    public addressService:AddressService, private translate: TranslateService) { }

    ngOnInit() {
      this.getUsersAllAddress();
    }

    onOptionSelected(event: any) {
      this.selectedAddressId = event.value;
    }

    addPayment() {
      this.ccErrorMessage = '';
      this.cardNameValidation = '';
      if(!this.expirationDateNotValid){
        return;
      }
      this.validateInputs();
      if (this.ccErrorMessage) {
        return;
      }
      if(this.cardNameValidation){
        return
      }
      if (this.invalidCardNumber) {
        return;
      }
      const cardNumberWithoutSpaces = this.cardNumber.replace(/\s+/g, '');
      this.paymentButton = true;
      this.addressService.addPayment(this.cardHolderName, cardNumberWithoutSpaces, this.expiryDate, this.cardType!, this.isDefault == undefined ? false : this.isDefault,
        this.cvv, this.selectedAddressId, this.user.id, this.businessId).subscribe(response => {
        if (response?.errors) {
          this.ccErrorMessage = this.translate.instant(response?.errors[0]?.errorCode);
          this.resetMessages();
          this.paymentButton = false;
          return;
        }
        this.payment = response?.data?.saveCreditCardInfo;
        this.message = this.translate.instant('CC_CREATED_SUCCESS');
        this.user.paymentDetails.push(this.payment);
        this.tokenStorageService.saveUser(this.user, true);
        this.resetMessages();
        setTimeout(() => {
          this.dialogRef.close({ event: 'close', result: response?.data?.saveCreditCardInfo });
        }, 3000);
      });
    }

    hasTwoWords(inputString: string): boolean {
      const pattern = /\b\w+\s\w+\b/;
      return pattern.test(inputString);
    }

    validateInputs() {
      this.ccErrorMessage = '';
      this.cardNameValidation = '';
      if ( !this.cardNumber || !this.expirationDateNotValid || this.cardType == 'no_value' || !this.cvv || !this.selectedAddressId) {
        this.ccErrorMessage = 'PLEASE_FILL_IN_ALL_REQUIRED_FIELDS';
        return;
      }
      if (!this.hasTwoWords(this.cardHolderName) || this.cardHolderName === undefined) {
        this.cardNameValidation = 'CARD_HOLDER_NAME_SHOULD_BE_FULLNAME'
        return;
      }
      if (!this.validateExpirationDate(this.expiryDate)) {
        this.ccErrorMessage = this.translate.instant('EXPIRY_DATE_NOT_VALID')
        return;
      }
      if(this.cardNumber?.length === 0 || this.cardNumber?.length < 13 || this.cardNumber?.length > 19){
        this.invalidCardNumber = true;
        return;
      }
    }

    resetMessages() {
      setTimeout(() => {
        this.ccErrorMessage = '';
        this.message = '';
        this.cardNameValidation = '';
      }, 3000);
    }

    onExpirationDateInputChange(event: any) {
      let inputVal: string = event.target.value;
      inputVal = inputVal?.replace(/\D/g, '');
      if (inputVal.length > 6) {
        inputVal = inputVal?.substring(0, 6);
      }
      if (inputVal.length > 2) {
        inputVal = inputVal?.substring(0, 2) + '/' + inputVal?.substring(2);
      }
      this.expiryDate = inputVal;
      this.expirationDateNotValid = this.validateExpirationDate(inputVal);
    }

    validateExpirationDate(expirationDateString: string): boolean {
      const currentDate = new Date();
      const expirationDateComponents = expirationDateString.split('/');
      if (expirationDateComponents.length !== 2) {
        return false;
      }
      const expMonth = parseInt(expirationDateComponents[0], 10);
      let expYear = parseInt(expirationDateComponents[1], 10);

      if(expYear.toString().length < 4){
        return false;
      }
      if (isNaN(expMonth) || isNaN(expYear)) {
        return false;
      }
      if (expirationDateComponents[1].length === 2) {
        expYear = expYear + 2000;
      }
      if (expYear < currentDate.getFullYear()) {
        return false;
      }
      if (expYear === currentDate.getFullYear() && expMonth <= currentDate.getMonth()) {
        return false;
      }
      return true;
    }

    checkCardType(){
      this.cardType = creditCardType(this.cardNumber);
    }

    formatCardNumber(event: any) {
      let inputVal: string = event.target.value;
      inputVal = inputVal?.replace(/\D/g, '');
      inputVal = inputVal?.slice(0, 19);
      inputVal = inputVal?.replace(/(\d{4})(?=\d)/g, '$1 ');
      this.cardNumber = inputVal;
      this.checkCardType();
    }

    getUsersAllAddress(){
      this.addresses = this.user?.addressList?.filter(address => address?.defaultBilling);
    }
  }

  export function creditCardType(cc: string) {
    cc = cc.replace(/\s/g, '');
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup = new RegExp('^62[0-9]{14}$');
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
    let disco1 = new RegExp('^6011[0-9]{12}$');
    let disco2 = new RegExp('^64[4-9][0-9]{13}$');
    let disco3 = new RegExp('^65[0-9]{14}$');
    let diners = new RegExp('^3(?:0[0-5]|[68][0-9])[0-9]{11}$');
    let jcb = new RegExp('^35(?:2[89]|[3-8][0-9])[0-9]{12}$');
    let elo = new RegExp('^((636368)|(438935)|(504175)|(451416)|(509048)|(509067)|(509049)|(509069)|(509050)|(509074)|(509068)|(509040)|(509045)|(509060)|(509057)|(509042)|(509046)|(509066)|(509047)|(509062)|(509040)|(509043)|(509064)|(509040))\\d{10,12}$');

    if (visa.test(cc)) {
      return 'VISA';
    }
    if (amex.test(cc)) {
      return 'AMEX';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return 'DISCOVER';
    }
    if (diners.test(cc)) {
      return 'DINERS';
    }
    if (jcb.test(cc)) {
      return 'JCB';
    }
    if (cup.test(cc)) {
      return 'CHINA_UNION_PAY';
    }
    if (elo.test(cc)) {
      return 'ELO';
    }
    return undefined;
  }
