import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proofofdelivery',
  templateUrl: './proofofdelivery.component.html',
  styleUrls: ['./proofofdelivery.component.css']
})
export class ProofofdeliveryComponent implements OnInit {
  order!: OrderResponse;
  awsUrl = environment.awsKey;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.order = this.data;
  }

}
