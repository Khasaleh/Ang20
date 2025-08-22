import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryPath } from 'src/app/models/CategoryPath';

@Component({
  selector: 'app-four-breadcrums',
  templateUrl: './four-breadcrums.component.html',
  styleUrls: ['./four-breadcrums.component.scss']
})
export class FourBreadcrumsComponent implements OnInit {
    @Input() data:any;
    @Input() product:any;
    // @Input() activeTheme:string=''
    @Input() categoryPath: CategoryPath[] = [];
    subdomain = '';
    hideL2 = false;
    hideL3 = false;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    if(this.product && this.product.categoryL1 && this.product.categoryL1.id == this.data.categoryDTO.id){
      this.hideL2 = true;
      this.hideL3 = true;
    }
    if(this.product && this.product.categoryL2 && this.product.categoryL2.id == this.data.categoryDTO.id){
      this.hideL3 = true;
    }
  }

}
