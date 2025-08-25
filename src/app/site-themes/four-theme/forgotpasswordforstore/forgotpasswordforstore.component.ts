import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-forgotpasswordforstore',
  templateUrl: './forgotpasswordforstore.component.html',
  styleUrls: ['./forgotpasswordforstore.component.css']
})
export class ForgotpasswordforstoreComponent implements OnInit {

  hidenewpassword: boolean = true;
  hideconfirmpassword: boolean = true;
  email: string = '';
  emailInvalid: boolean = false;
  otpGenerated: boolean = false;
  correctOTP = '123456';
  receivedResponse: boolean = false;
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
  businessId = Number(this.tokenStorage.getBusinessID());

  constructor(private authService: AuthService, public dialog: MatDialog, private tokenStorage: TokenStorageService,) { }

  ngOnInit() {
  }

  verifyEmail() {
    this.emailInvalid = false;
    if(!this.email || !this.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/)){
       this.emailInvalid = true;
       return;
    }
    this.authService.generateTokenToResetStoreUserPassword(this.businessId, this.email).subscribe(
      data => {
        if (data?.data?.generateTokenToResetStoreUserPassword != null) {
          this.otpGenerated = true;
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS', message: 'VERIFY_EMAIL_SUCCESS' } });
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
          });
        }
      }
    );
  }

  checkValid() {
    this.authService.getStoreUserByResetToken(this.businessId, this.token).subscribe(
      data => {
        if (data?.data?.getStoreUserByResetToken) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS', message: 'VERIFY_TOKEN' } });
          this.otpGenerated = false;
          this.emailVerified = true;
        } else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: 'ERROR', message: data?.errors[0]?.errorMessage }
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
    this.authService.updateStoreUserPassword(this.businessId, this.token, this.newPassword).subscribe(
      data => {
        if (data?.data?.updateStoreUserPassword) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS', message: 'CHANGED_PASSWORD_SUCCESS' } });
          this.changedPassword = true;
          this.successMessageShow = true;
        } else {
          const error = data?.errors[0];
          if (error?.errorCode == 'PROVIDE_NEW_PASS') {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: 'NEW_PASSWORD_CANNOT_BE_AN_USED_PASSWORD' }
            });
          } else {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: error?.errorMessage }
            });
          }

        }
      }
    );
  }

}

