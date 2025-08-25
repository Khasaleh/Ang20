import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-theme-textslider-espot',
  templateUrl: './four-theme-textslider-espot.component.html',
  styleUrls: ['./four-theme-textslider-espot.component.scss']
})
export class FourThemeTextsliderEspotComponent implements OnInit {
  @Input() data:any=[];
  @Input() activeTheme!: string;
  constructor() { }

  ngOnInit() {
    console.log(this.data,"text slider data")
  }

}
