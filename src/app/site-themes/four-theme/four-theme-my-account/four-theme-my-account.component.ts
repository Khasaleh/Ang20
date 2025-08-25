import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Country } from 'src/app/models/country';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { AddressService } from 'src/app/service/Address.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { UnsubscribedwarningComponent } from './unsubscribedwarning/unsubscribedwarning.component';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { environment } from 'src/environments/environment';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { AuthService } from 'src/app/service/auth.service';
import { SharedService } from 'src/app/service/shared-service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address, CCInfo } from 'src/app/models/user';

@Component({
  selector: 'app-four-theme-my-account',
  templateUrl: './four-theme-my-account.component.html',
  styleUrls: ['./four-theme-my-account.component.css']
})
export class FourThemeMyAccountComponent implements OnInit {

  newImageSrc: string | ArrayBuffer | null = '';
  subdomain!: string;
  phoneCode: string = '1';
  phoneOtpCodeVerified: boolean = false;
  emailOtpCodeVerified: boolean = false;
  verifyNumber: boolean = false;
  verifyEmail: boolean = false;
  countries: Country[] = [];
  searchText: string = '';
  phoneNumber!: number;
  email: string = ''
  emailOtpCode: string[] = ['', '', '', '', '', ''];
  mobileOtpCode: string[] = ['', '', '', '', '', ''];

  showaddAddress: boolean = false;
  showaddPayment: boolean = false;

  isSubscribed: boolean = false;
  user = this.tokenStorageService.getUser();
  businessId = Number(this.tokenStorageService.getBusinessID()!);
  awsUrl = environment.awsKey;
  profileImage!: File;
  imageSrc!: string | ArrayBuffer;
  uploadImageFile!: File;
  correctOTP = '123456';
  otp = ['', '', '', '', '', ''];
  validateemailshow: boolean = false;
  verifyToken: string = '';
  otpRequired: boolean = false;
  emailRequired: boolean = false;
  resetEmailOtp: boolean = false;
  obsecuredEmail: string = '';
  receivedResponse: boolean = false;
  otpCalled = false;
  otpNotValid: boolean = false;
  emailVerified: boolean = false;
  verifyTokenNotValid: boolean = false;
  emailNotProvided: boolean = false;
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;
  verifyButton: boolean = false;
  emailButton: boolean = false;
  private userDataSubscription!: Subscription;
  emailChanged: boolean = false;
  currentEmail = this.user?.email;
  emailNotCorrect:boolean = false;
  addresses: any[] = this.user?.addressList;


  constructor(private cdr: ChangeDetectorRef,public addressService: AddressService,public dialog: MatDialog, private authService: AuthService,
    private businessSettingService: BusinessSettingService, private tokenStorageService: TokenStorageService, private ng2ImgMax: Ng2ImgMaxService,
    private sharedService: SharedService,private router: Router,
    private route: ActivatedRoute,
  ) { }

 async ngOnInit() {
  this.subdomain = this.route.snapshot.params['subdomain'];
  if (environment.env !== 'local') {
    this.subdomain = '';
  }
  if(!this.user){
    this.router.navigate([this.subdomain ? `/${this.subdomain}/home` : '/home']);
    return;
  }
   this.getUpdatedUserData();
   this.addresses = this.user?.addressList
   if(this.user && this.user?.userType === 'FAZEAL_REGISTERED') {
    this.loadAddresses(true);
   }
   if(this.user && this.user?.userType === 'STORE_REGISTERED') {
    this.loadAddresses(false);
   }
   await this.loadCountries();
   await this.getSubscribedStatus();
      setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  loadAddresses(fazealUser: boolean) {
    this.addressService.getUserAllAddresses(this.businessId, this.user.id, fazealUser).subscribe(
      data => {
        if(data?.errors){
          return;
        }
        this.addresses = data?.data?.getAddress;
        this.user.addressList = this.addresses;
        this.tokenStorageService.saveUser(this.user, this.tokenStorageService.isRememberMe);
      }
    );
}

  getUpdatedUserData() {
    this.userDataSubscription = this.sharedService.getUserData().subscribe(data => {
      if(data.id){
        this.user = data;
        this.loadAddresses(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  selectCode(code: string) {
    this.phoneCode = code;
    this.phoneOtpCodeVerified = false;
    this.verifyNumber = false;
  }

  async loadCountries() {
    const response = await firstValueFrom(this.addressService.getAllCountriesForBusiness())
    this.countries = response?.data?.getAllCountries;
    this.cdr.detectChanges();
  }

  onMenuItemClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  onMenuClosedCountry() {
    this.searchText = '';
  }
  openVerifyNumber() {
    this.verifyNumber = true;
    this.verifyEmail = false;
  }

  onMobileOtpCodeChange(event: any, index: number) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length < 2) {
        this.mobileOtpCode[index - 1] = event.target.value;
      }
    }
  }

  onEmailOtpCodeChange(event: Event, index: number) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.length < 2) {
        this.emailOtpCode[index - 1] = event.target.value;
      }
    }
  }

  openAddAddress() {
    this.showaddAddress = true;
  }

  addAddressPopup(){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddAddressComponent,{ panelClass: 'modal-x-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.data) {
        this.user?.addressList.push(result.data);
        this.tokenStorageService.saveUser(this.user, true);
      }
    });
  }

  addPaymentPopup(){
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddPaymentComponent,{ panelClass: 'modal-medium-width' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.result) {
        this.user?.paymentDetails.push(result.result);
        this.tokenStorageService.saveUser(this.user, true);
      }
    });
  }

  onToggleChange(): void {
    if (!this.isSubscribed) {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(UnsubscribedwarningComponent,{ panelClass: 'modal-small-width' });
      dialogRef.afterClosed().subscribe((result) => {
        if(result.data && result.data !== undefined){
          this.unSubscribe();
        } else{
          this.isSubscribed = true;
        }
      });
    } else {
      this.subscribe();
    }
  }

  uploadProfileImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
      this.profileImage = file;
      this.uploadUserProfile(this.profileImage);
    }
  }

  uploadUserProfile(image: File){
    this.authService.uploadUserProfilePhoto(image, this.user.id).subscribe(
      (response: any) => {
        if (response?.errors && response?.errors[0]) {
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: 'ERROR', message: response?.errors[0]?.errorMessage }
            });
            return;
        } else {
          this.user.profile = response?.data?.uploadProfileImage?.data;
          this.tokenStorageService.saveUser(this.user, true);
          this.sharedService.setUserData(this.user);
          this.dialog.open(SucessmsgPopupComponent, {
            backdropClass: 'notificationmodal-popup-sucess',
             data: { title: 'SUCCESS', message: 'IMAGE_UPLOAD_SUCCESS'
              }
             });
        }
      });
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

  async openVerifyEmail() {
    this.resetEmailOtp = true;
    setTimeout(() => {
      this.resetEmailOtp = false;
    }, 20000);
    const pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$";
    if (!this.user?.email || !this.user?.email?.match(pattern)) {
      this.emailRequired = true;
      return;
    }
    await this.generateEmailOtp(this.user?.email);

  }

  async generateEmailOtp(email: string) {
    this.emailButton = true;
    await this.authService.generateEmailVerificationOTP(email).toPromise().then(response => {
      if (response?.errors){
        this.emailButton = false;
        return;
      }
      this.dialog.open(SucessmsgPopupComponent, {
        backdropClass: 'notificationmodal-popup-sucess',
        data: { title: 'SUCCESS', message: 'OTP_GENERATED_SUCCESSFULLY'
      }
      });
      this.verifyEmail = true;
      this.emailRequired = false;
      this.emailVerified = false;
      this.validateemailshow = true;
    });
  }

  verifyUserEmail() {
    this.verifyButton = true;
    this.otpCalled = true;
    this.receivedResponse = false;
    let verifyToken = this.otp.join('');
    if (verifyToken?.length < 6) {
      this.verifyTokenNotValid = true;
      return;
    }
    this.verifyTokenNotValid = false;

    let email = this.user?.email;
    if (!this.user?.email) {
      this.emailNotProvided = true;
      return;
    }
    this.authService.verifyUserOTP(verifyToken, email, this.user?.id).subscribe(r => {
      if (r?.errors){
        this.verifyButton = false;
        return;
      }
      this.dialog.open(SucessmsgPopupComponent, {
        backdropClass: 'notificationmodal-popup-sucess',
         data: { title: 'SUCCESS', message: 'EMAIL_VERIFIED_SUCCESSFULLY'
          }
         });
      this.emailChanged = false;
      this.receivedResponse = true;
      this.emailVerified = r?.data?.verifyUserOTP;
      this.user.email = email;
      this.user.emailVerified = true;
      this.tokenStorageService.saveUser(this.user, true);
      this.sharedService.setUserData(this.user);
      this.otp = [""];
      this.validateemailshow = false;
    })
  }

  changingEmail(){
    this.emailNotCorrect = false;
    if (!this.user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/)) {
      this.emailNotCorrect = true;
    }
    if(this.user.email === this.currentEmail){
      this.emailChanged = false;
    } else{
      this.emailChanged = true;
    }
  }


  async subscribe() {
    (await this.businessSettingService.subscribe(this.user?.email, this.businessId)).subscribe(
      data => {
        if (data?.data?.subscribe != null) {
          this.isSubscribed = true;
          this.user.isSubscribed = true;
          this.tokenStorageService.saveUser(this.user, true);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'EMAIL_ADDED_SUCCESS' } });
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

  async unSubscribe() {
    (await this.businessSettingService.unSubscribe(this.user?.email, this.businessId)).subscribe(
      data => {
        if (data?.data?.unsubscribe != null) {
          this.isSubscribed = false;
          this.user.isSubscribed = false;
          this.tokenStorageService.saveUser(this.user, true);
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'EMAIL_REMOVED_SUCCESS' } });
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

    onAddressDeleted(addressData: Address){
      const indexToRemove = this.user?.addressList?.indexOf(addressData);
      if (indexToRemove !== -1) {
        this.user.addressList.splice(indexToRemove, 1);
      }
      this.tokenStorageService.saveUser(this.user, true);
      this.sharedService.setUserData(this.user);
    }

    onPaymentDeleted(paymentData: CCInfo){
      const indexToRemove = this.user?.paymentDetails?.indexOf(paymentData);
      if (indexToRemove !== -1) {
        this.user?.paymentDetails.splice(indexToRemove, 1);
      }
      this.tokenStorageService.saveUser(this.user, true);
      this.sharedService.setUserData(this.user);
    }

    getSubscribedStatus() {
      if(this.user){
        this.businessSettingService.getSubscribeStatus(this.businessId, this.user?.email).subscribe(data => {
          this.isSubscribed = data?.data?.getSubscribeStatus;
          this.user.isSubscribed = data?.data?.getSubscribeStatus;
          this.tokenStorageService.saveUser(this.user, true);
        });
      }
    }
}
