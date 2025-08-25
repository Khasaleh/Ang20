import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-four-theme-write-edit-reviews',
  templateUrl: './four-theme-write-edit-reviews.component.html',
  styleUrls: ['./four-theme-write-edit-reviews.component.scss']
})
export class FourThemeWriteEditReviewsComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  constructor() { }

  ngOnInit(): void {
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }

}
