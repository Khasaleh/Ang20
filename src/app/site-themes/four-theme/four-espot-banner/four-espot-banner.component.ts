import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-four-espot-banner',
  templateUrl: './four-espot-banner.component.html',
  styleUrls: ['./four-espot-banner.component.scss']
})
export class FourEspotBannerComponent implements OnInit {
  @Input() data:any;
  @Input() design:any;
  @Input() activeTheme!: string;
  @Input() subdomain!: string;
  awsUrl = environment.awsKey;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.subdomain = this.route.snapshot.params['subdomain'];
    if(environment.env !== 'local'){
      this.subdomain = '';
    } else {
      this.subdomain = '/'+this.subdomain;
    }

    if(this.data){
      for(let slide of this.data.data){
        if(!slide.imageUrl.includes('http')){
          slide.imageUrl = this.awsUrl + slide.imageUrl;
        }
      }
    }
  }


  navigateTODetail(){
    // if(environment.env !== 'local'){
    //   this.router.navigateByUrl('product/' +  this.product.url + '/' + this.product?.id || this.product?.productId);
    // } else {
    //   this.router.navigateByUrl(this.subdomain, '/product/' + this.product.url + '/' + this.product?.id || this.product?.productId);
    // }
  }

}
