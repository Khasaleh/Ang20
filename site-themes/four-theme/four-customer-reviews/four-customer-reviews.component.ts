import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-customer-reviews',
  templateUrl: './four-customer-reviews.component.html',
  styleUrls: ['./four-customer-reviews.component.scss']
})
export class FourCustomerReviewsComponent implements OnInit {
  title='Customer Reviews'
  @Input()data:any;
  @Input()sliderStyle:any;
  design: any; 
  awsUrl = environment.awsKey;
   
  arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
  arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';

  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,  
    dots: true,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      }
    },
  }


  constructor() { }

  ngOnInit() {
    if(this.data.data && this.data.data.length > 0){
      this.design = this.data.data[0].customerReviewsDesign; 
      
    }
    console.log(this.data,"checking customer")
  }

}
