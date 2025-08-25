import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    TranslateModule
  ],
  selector: 'app-subscribe-marketing',
  templateUrl: './subscribe-marketing.component.html',
  styleUrls: ['./subscribe-marketing.component.css']
})
export class SubscribeMarketingComponent implements OnInit {
  email: string = '';
  emailInvalid: boolean = false;
  businessId = Number(this.tokenStorageService.getBusinessID()!);

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SubscribeMarketingComponent>,
    private businessSettingService: BusinessSettingService, private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit() {
  }

  async subscribe() {
    if(!this.email || this.email.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&]).{8,}/)){
      this.emailInvalid = true;
    }
    (await this.businessSettingService.subscribe(this.email, this.businessId)).subscribe(
      data => {
        if (data?.data?.subscribe != null) {
          this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess', data: { title: 'SUCCESS', message: 'EMAIL_ADDED_SUCCESS' } });
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
}
