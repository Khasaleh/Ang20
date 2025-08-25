import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-thanks-forlogin-modal',
  templateUrl: './thanks-forlogin-modal.component.html',
  styleUrls: ['./thanks-forlogin-modal.component.scss']
})
export class ThanksForloginModalComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  closemodal(){
    this.dialog.closeAll();
  }

}
