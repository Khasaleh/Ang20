import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-brand-logos-slider',
  templateUrl: './four-brand-logos-slider.component.html',
  styleUrls: ['./four-brand-logos-slider.component.scss']
})
export class FourBrandLogosSliderComponent implements OnInit {
  @Input() data:any=[];
  awsUrl = environment.awsKey;
  arrowleft:any = '../../../../../../assets/img/slider-icon-left.svg';
  arrowright:any = '../../../../../../assets/img/slider-icon-right.svg';


  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    margin: 20, 
    nav: true, // Add this option to enable navigation arrows
    dots: true,
    navSpeed: 700,
    navText: [`<img src="${this.arrowleft}" alt="LEFT">`, `<img src="${this.arrowright}" alt="RIGHT">`],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 5
      }
    },
  }
  ngOnInit() {

  }

}
