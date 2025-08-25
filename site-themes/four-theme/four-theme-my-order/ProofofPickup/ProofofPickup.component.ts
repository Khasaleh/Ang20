import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ProofofPickup',
  templateUrl: './ProofofPickup.component.html',
  styleUrls: ['./ProofofPickup.component.css']
})
export class ProofofPickupComponent implements OnInit {

  order!: OrderResponse;
  awsUrl = environment.awsKey;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.order = this.data;
  }

  convertUtcToLocal(utcDate: any): string {
    utcDate = utcDate + '.00Z'
    const date = new Date(utcDate);
    return date.toLocaleString();
}

}
