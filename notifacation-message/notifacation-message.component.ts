import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifacation-message',
  templateUrl: './notifacation-message.component.html',
  styleUrls: ['./notifacation-message.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class NotifacationMessageComponent implements OnInit {
  errormessage!: string;
  constructor(private dialogRef: MatDialogRef<NotifacationMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public translate: TranslateService,) { }

  public closeMe() {
    this.dialogRef.close(this.data);
  }


  ngOnInit(): void {
    if (!this.data.title) {
      this.data.title = this.translate.instant('ERROR')
    }
    setTimeout(() => {
      this.dialogRef.close();
    }, 7000);
  }


}
