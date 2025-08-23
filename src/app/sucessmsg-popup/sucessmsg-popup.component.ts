
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sucessmsg-popup',
  templateUrl: './sucessmsg-popup.component.html',
  styleUrls: ['./sucessmsg-popup.component.scss']
})
export class SucessmsgPopupComponent implements OnInit {
  errormessage!: string; 
  constructor(
    private  dialogRef:  MatDialogRef<SucessmsgPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any,
    public translate: TranslateService,
    ) { }

  ngOnInit(): void {
    if(!this.data.title){
      this.data.title = this.translate.instant('SUCCESS')
    }
    setTimeout(() => {
      this.dialogRef.close();
    },7000);

  }

}
