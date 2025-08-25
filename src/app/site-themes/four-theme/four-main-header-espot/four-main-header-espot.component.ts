import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'app-four-main-header-espot',
  templateUrl: './four-main-header-espot.component.html',
  styleUrls: ['./four-main-header-espot.component.scss']
})
export class FourMainHeaderEspotComponent implements OnInit {
  @Input() data:any;
  @Input() design:any;
  @Input() activeTheme!: string;
  awsURL = environment.awsKey;
  @Input() subdomain!: string;



  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    console.log(this.data,"header espot data")
  }
}
