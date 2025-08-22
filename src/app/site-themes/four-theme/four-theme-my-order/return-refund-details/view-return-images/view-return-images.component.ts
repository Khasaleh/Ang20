import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-return-images',
  templateUrl: './view-return-images.component.html',
  styleUrls: ['./view-return-images.component.css']
})
export class ViewReturnImagesComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: false, // Add this option to enable navigation arrows
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items:1
      },
      940: {
        items: 1
      }
    },
  }

  awsURL = environment.awsKey;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }

}
