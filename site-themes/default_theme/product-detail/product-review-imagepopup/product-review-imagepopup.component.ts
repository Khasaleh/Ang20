import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-review-imagepopup',
  templateUrl: './product-review-imagepopup.component.html',
  styleUrls: ['./product-review-imagepopup.component.css']
})
export class ProductReviewImagepopupComponent implements OnInit {
  imageUrl! : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { image: string}) { }

  ngOnInit() {
    this.imageUrl = this.data.image;
  }

}
