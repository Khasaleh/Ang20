import { AuthService } from 'src/app/service/auth.service';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { Country } from 'src/app/models/country';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AddressService } from 'src/app/service/Address.service';
import { OtpEmailMobileService } from 'src/app/service/otp-email-mobile.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-modal-checkout',
  templateUrl: './signup-modal-checkout.component.html',
  styleUrls: ['./signup-modal-checkout.component.scss']
})
export class SignupModalCheckoutComponent implements OnInit {
  signUpForm!: FormGroup;
  searchText: string = '';
  phoneCode: string = '1';
  verifyEmail: boolean = false;
  verifyNumber: boolean = false;
  phoneNumber!: number
  email: string = ''
  emailOtpCodeVerified: boolean = false
  phoneOtpCodeVerified: boolean = false
  countries: Country[] = [];
  errormessage: any;
  password: string = '';
  showPassword: boolean = false;
  prevEmail: string = '';
  prevPhoneNumber: string = '';
  prevPhoneCode: string = '';
  prevEmailOtpCodeVerified: boolean = false;
  prevPhoneOtpCodeVerified: boolean = false;
  businessId = Number(this.tokenStorage.getBusinessID());
  hidepasswordfield: boolean = true;
  hideconfirmpasswordfield: boolean = true;
  emailOtpCode: string[] = ['', '', '', '', '', ''];
  mobileOtpCode: string[] = ['', '', '', '', '', ''];

  constructor(
    private formBuilder: FormBuilder,
    public addressService: AddressService,
    private cdr: ChangeDetectorRef,
    private otpService: OtpEmailMobileService,
    public dialog: MatDialog,
    private translate: TranslateService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private dialogRef: MatDialogRef<SignupModalCheckoutComponent>
  ) { }

  async ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/), Validators.minLength(2), Validators.maxLength(12)]],
      lastName: ['', [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9]*$/), Validators.minLength(2), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{9,15}$/),
        this.numbersOnlyValidator()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required],
      emailOtpNumber: ['', Validators.required]
    }, { validator: this.matchPasswords });
    await this.loadCountries();
    this.signUpForm.get('email')?.valueChanges.subscribe(value => {
      this.email = value;
      if (this.email !== this.prevEmail && this.emailOtpCodeVerified) {
        this.emailOtpCodeVerified = false;
        this.verifyEmail = false;
      }
    });
    this.signUpForm.get('phoneNumber')?.valueChanges.subscribe(value => {
      this.phoneNumber = value;
    });
    if(!this.businessId){
      const subdomain = this.route.snapshot.params['subdomain'];
      this.tokenStorage.saveBusinessData(subdomain, subdomain.substring(1));
    }
  }


onEmailOtpCodeChange(event: Event, index: number, otpInput: HTMLInputElement) {
  if (event.target instanceof HTMLInputElement) {
    const value = event.target.value;
    this.emailOtpCode[index] = value;
    if (value.length === 1 && index < 5) {
      const nextInput = document.querySelector(`input[data-index='${index + 1}']`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }
}


onEmailOtpCodeKeydown(event: KeyboardEvent, index: number, otpInput: HTMLInputElement) {
  const inputElement = event.target as HTMLInputElement;
  if (event.key === 'Backspace' && inputElement.value === '') {
    const previousInput = document.querySelector(`input[data-index='${index - 1}']`) as HTMLInputElement;
    if (previousInput) {
      previousInput.focus();
    }
  }
}


onMobileOtpCodeChange(event: any, index: number) {
  if (event.target instanceof HTMLInputElement) {
    if (event.target.value.length < 2) {
      this.mobileOtpCode[index - 1] = event.target.value;
    }
  }
}

  numbersOnlyValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\d+$/.test(control.value);
      return valid ? null : { numbersOnly: true };
    };
  }

  matchPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  onMenuClosedCountry() {
    this.searchText = '';
  }

  onSubmit(): void {
    if (this.signUpForm?.invalid || !this.emailOtpCodeVerified) {
      return;
    }
    const fName = this.signUpForm.get('firstName')?.value
    const lName = this.signUpForm.get('lastName')?.value
    const email = this.signUpForm.get('email')?.value
    const password = this.signUpForm.get('password')?.value
    if (!email || !this.emailOtpCodeVerified) {
      this.popupMessagenotefication(this.translate.instant('ERROR'), this.translate.instant('EMAIL_NOT_VERIFIED'));
      return;
    }
    this.authService.subscribeGuestUser(this.businessId, fName, lName, email,
      `${this.phoneNumber}`, this.phoneCode, password).subscribe(
      r => {
        if (r?.errors) {
          this.popupMessagenotefication('ERROR', r?.errors[0]?.errorCode)
          return;
        }
        this.sucessMessage('SUCCESS', r?.data?.subscribeGuestUser?.message);
        this.dialogRef.close({event: true, email: email, password: password});
      })
  }

  async loadCountries() {
    const response = await firstValueFrom(this.addressService.getAllCountriesForBusiness())
    this.countries = response?.data?.getAllCountries;
    this.cdr.detectChanges();
  }

  selectCode(code: string) {
    this.phoneCode = code;
    this.phoneOtpCodeVerified = false;
    this.verifyNumber = false;
  }

  createEmailOTP() {
    if (this.email.length === 0) {
      this.signUpForm.get('emailOtpNumber')?.setErrors({ 'required': true });
      return
    }
    this.signUpForm.get('emailOtpNumber')?.reset();
    this.signUpForm.get('emailOtpNumber')?.setErrors(null);
    this.otpService.generateStoreEmailVerificationCode(this.email, this.businessId).subscribe(
      data => {
        if (data?.errors) return;
        this.verifyEmail = true;
        this.emailOtpCodeVerified = false;
        this.prevEmail = '' + `${this.email}`;
        this.sucessMessage(this.translate.instant('SUCCESS'), this.translate.instant('PLEASE_CHECK_YOUR_EMAIL_FOR_OTP'));
      }
    )
  }

  verifyEmailOtpCode() {
    const code = this.emailOtpCode.join('');
    if (code || code.trim().length === 6) {
      this.otpService.verifyStoreEmail(this.email, code, this.businessId).subscribe(
        res => {
          if (res?.data?.verifyStoreEmail?.status == 'approved') {
            this.sucessMessage('SUCCESS', this.translate.instant('EMAIL_VERFIED'));
            this.emailOtpCodeVerified = true;
            this.prevEmailOtpCodeVerified = true;
            this.prevEmail = '' + `${this.email}`;
            this.cdr.detectChanges();
          } else {
            this.popupMessagenotefication(this.translate.instant('ERROR'), this.translate.instant('FILL_CORRECT_OTP'));
          }
        });
    }
  }

  createMobileOTP() {
    this.phoneNumber = this.signUpForm.get('phoneNumber')?.value
    if (!this.phoneNumber) {
      this.signUpForm.get('phoneNumber')?.setErrors({ 'required': true });
      return
    }
    let phone = +(this.phoneCode + this.phoneNumber)
    this.otpService.generateVerificationOTP(phone, "whatsapp").subscribe(
      data => {
        if (data?.errors) return;
        this.verifyNumber = true;
        this.phoneOtpCodeVerified = false;
        this.prevPhoneCode = `${this.phoneCode}`;
        this.prevPhoneNumber = `${this.phoneNumber}`;
        this.sucessMessage(this.translate.instant('SUCCESS'), this.translate.instant('CHECK_MOBILE_OTP'));
      }
    )
  }

  verifyPhoneOtpCode() {
    const mobileCode = this.mobileOtpCode.join('');
    if (mobileCode || mobileCode.length === 6) {
      this.otpService.verifyOTP(+(this.phoneCode + this.phoneNumber), mobileCode).subscribe(
        res => {
          if (res?.data?.verifyOTP?.status === 'approved') {
            this.phoneOtpCodeVerified = true;
            this.prevPhoneOtpCodeVerified = true;
            this.prevPhoneCode = `${this.phoneCode}`;
            this.prevPhoneNumber = `${this.phoneNumber}`;
            this.sucessMessage('SUCCESS', this.translate.instant('MOBILE_VERFIED'));
          } else {
            this.popupMessagenotefication('ERROR', this.translate.instant('FILL_CORRECT_OTP'));
          }
        });
    }
  }

  public sucessMessage(title: string, message: string) {
    this.dialog.open(SucessmsgPopupComponent, {
      backdropClass: 'notificationmodal-popup-sucess',
      width: '450px',
      data: { title: title, message: message },
    });
  }

  public popupMessagenotefication(title: string, message: string) {
    this.dialog.open(NotifacationMessageComponent, {
      backdropClass: 'notificationmodal-popup',
      width: '450px',
      data: { title: title, message: message },
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}


export function numbersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const numericValue = control.value;
    if (numericValue && isNaN(numericValue)) {
      return { 'numbersOnly': true };
    }
    return null;
  };
}
