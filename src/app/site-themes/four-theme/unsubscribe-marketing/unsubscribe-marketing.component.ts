<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  selector: 'app-unsubscribe-marketing',
  templateUrl: './unsubscribe-marketing.component.html',
  styleUrls: ['./unsubscribe-marketing.component.css']
})
export class UnsubscribeMarketingComponent implements OnInit {
  email: string = '';
  emailInvalid: boolean = false;
  businessId = Number(this.tokenStorageService.getBusinessID()!);

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UnsubscribeMarketingComponent>,
    private businessSettingService: BusinessSettingService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  }

  async unSubscribe() {
    if(!this.email || this.email.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}/)){
      this.emailInvalid = true;
    }
    (await this.businessSettingService.unSubscribe(this.email, this.businessId)).subscribe(
      data => {
        if (data?.data?.unsubscribe != null) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'EMAIL_REMOVED_SUCCESS' } });
          this.dialogRef.close({ event: 'close'});
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

=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unsubscribe-marketing',
  template: '<p>unsubscribe-marketing works!</p>',
  standalone: true,
  imports: [CommonModule],
})
export class UnsubscribeMarketingComponent {
  constructor(public dialogRef: MatDialogRef<UnsubscribeMarketingComponent>) {}
>>>>>>> main
}
