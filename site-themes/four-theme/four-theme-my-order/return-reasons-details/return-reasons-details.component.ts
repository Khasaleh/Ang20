import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-return-reasons-details',
  templateUrl: './return-reasons-details.component.html',
  styleUrls: ['./return-reasons-details.component.css']
})
export class ReturnReasonsDetailsComponent implements OnInit {

  order!: OrderResponse;
  awsUrl = environment.awsKey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.order = this.data;
  }

}
