import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderDetailPrintModalComponent } from '../order-detail-print-modal/order-detail-print-modal.component';
@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.scss']
})
export class ReturnDetailComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

  printmodal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'print_modal_parent';
    const dialogRef = this.dialog.open(OrderDetailPrintModalComponent,dialogConfig);
  }

}
