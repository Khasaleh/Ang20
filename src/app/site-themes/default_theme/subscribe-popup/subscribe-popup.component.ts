import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { RtlService } from 'src/app/service/rtl.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  selector: 'app-subscribe-popup',
  templateUrl: './subscribe-popup.component.html',
  styleUrls: ['./subscribe-popup.component.css']
})
export class SubscribePopupComponent implements OnInit {

  message!: string;
  errorMessage!: string;
  subscribeDisabled: boolean = false;
  agreeTerms: boolean = false;
  agreeTermsRequired: boolean= false;

  constructor(private authService: AuthService,
  private tokenStorage: TokenStorageService,
  public rtlService: RtlService,
  private dialogRef: MatDialogRef<SubscribePopupComponent>,
  @Inject(MAT_DIALOG_DATA) public data: string,
  public dialog: MatDialog){ }

  ngOnInit() {
  }

  onSubmit(){
    this.agreeTermsRequired = false;
    if(!this.agreeTerms){
      this.agreeTermsRequired = true;
      return;
    }
    this.subscribeDisabled = true;
    this.authService.registerCustomer(Number(this.tokenStorage.getBusinessID())).subscribe(
      data => {
        if(data?.errors){
          this.errorMessage = data?.errors[0]?.errorMessage;
          this.subscribeDisabled = false;
          return;
        }
        if(data?.data?.registerCustomer != null){
          this.message = data?.data?.registerCustomer?.message;
          this.subscribeDisabled = true;
          setTimeout(() => {
            this.dialogRef.close(true);
             }, 1000);
        }
      }
    );

  }

  closemodal(){
    this.dialog.closeAll();
  }

}
