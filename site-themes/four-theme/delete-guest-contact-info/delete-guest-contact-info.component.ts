import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-guest-contact-info',
  templateUrl: './delete-guest-contact-info.component.html',
  styleUrls: ['./delete-guest-contact-info.component.scss']
})
export class DeleteGuestContactInfoComponent implements OnInit {

  constructor( public translate: TranslateService,
    private dialogRef: MatDialogRef<DeleteGuestContactInfoComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close(true);

  }

}
