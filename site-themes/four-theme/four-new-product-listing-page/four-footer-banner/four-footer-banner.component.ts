import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-footer-banner',
  templateUrl: './four-footer-banner.component.html',
  styleUrls: ['./four-footer-banner.component.scss']
})
export class FourFooterBannerComponent implements OnInit {
  @Input() data:any
  @Input() activeTheme:string=''
  constructor() { }

  ngOnInit() {
  }

}
