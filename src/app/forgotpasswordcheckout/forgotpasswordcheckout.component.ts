import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { BusinessSettingService } from '../service/business-setting.service';
import { SucessmsgPopupComponent } from '../sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from '../notifacation-message/notifacation-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forgotpasswordcheckout',
  templateUrl: './forgotpasswordcheckout.component.html',
  styleUrls: ['./forgotpasswordcheckout.component.css']
})
export class ForgotpasswordcheckoutComponent implements OnInit {


  mobileOtpCode: string[] = ['', '', '', '', '', ''];
  hidenewpassword: boolean = true;
  hideconfirmpassword: boolean = true;
  email: string = '';
  emailInvalid: boolean = false;
  otpGenerated: boolean = false;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  correctOTP = '123456';
  otp = ['', '', '', '', '', ''];
  receivedResponse: boolean = false;
  otpCalled = false;
  otpNotValid: boolean = false;
  emailVerified: boolean = false;
  verifyTokenNotValid: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  token: string = '';
  errorMessage: any;
  showErrors: boolean = false;
  changedPassword: boolean = false;
  successMessageShow: boolean = false;

  constructor(private businessService: BusinessSettingService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  handleInput(event: Event, index: number, isLast: boolean): void {
    const inputValue = (event.target as HTMLInputElement).value;
    if (/^[0-9]$/.test(inputValue)) {
      this.otp[index] = inputValue;
      if (isLast && this.otp.join('') === this.correctOTP) {

      } else if (inputValue && index < this.otpInputs.length - 1) {
        const nextInput = this.otpInputs.toArray()[index + 1].nativeElement;
        nextInput.focus();
      }
    }
  }
  handleKeydown(event: KeyboardEvent, index: number): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
    if (!/^[0-9]$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  verifyEmail() {
    this.emailInvalid = false;
    if(!this.email || !this.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/)){
       this.emailInvalid = true;
       return;
    }
    this.businessService.verifyEmailForResetPassword(this.email).subscribe(
      data => {
        if (data?.data?.forgotPassword != null) {
          this.otpGenerated = true;
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'VERIFY_EMAIL_SUCCESS' } });
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: data.errors[0].errorMessage }
          });
        }
      }
    );
  }

  checkValid() {
    this.businessService.checkToken(this.token).subscribe(
      data => {
        if (data?.data?.verifyResetToken) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'VERIFY_TOKEN' } });
          this.otpGenerated = false;
          this.emailVerified = true;
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: data.errors[0].errorMessage }
          });
        }
      }
    );
  }

  checkPasswords(confirmpwd: any) {
    if (confirmpwd === '' || confirmpwd === null) {
      this.passwordMismatch = false;
    } else {
      this.passwordMismatch = this.newPassword !== this.confirmPassword;
    }
  }

  validateAndResetPassword() {
    this.showErrors = true;
    if (!this.newPassword || !this.confirmPassword || this.passwordMismatch) {
      return;
    }
    if (this.newPassword.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}/) && this.confirmPassword.match(this.newPassword)) {
      this.resetPassword();
    }
  }

  resetPassword() {
    this.businessService.resetPassword(this.token, this.newPassword).subscribe(
      data => {
        if (data?.data?.resetPassword) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'CHANGED_PASSWORD_SUCCESS' } });
          this.changedPassword = true;
          this.successMessageShow = true;
        } else {
          const error = data.errors[0];  // Assuming errors is an array and you need to access the first element
          if (error.errorCode == 'PROVIDE_NEW_PASS') {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: 'NEW_PASSWORD_CANNOT_BE_AN_USED_PASSWORD' }
            });
          } else {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: error.errorMessage }
            });
          }

        }
      }
    );
  }

}
