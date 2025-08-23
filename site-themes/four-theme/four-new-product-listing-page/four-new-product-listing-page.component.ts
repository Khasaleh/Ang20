import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlpResponse } from 'src/app/models/PlpResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ThemeService } from 'src/app/service/theme.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-four-new-product-listing-page',
  templateUrl: './four-new-product-listing-page.component.html',
  styleUrls: ['./four-new-product-listing-page.component.scss']
})
export class FourNewProductListingPageComponent implements OnInit {
  plpResponse!: PlpResponse;
  loading: boolean = true; 
  private routeSub!: Subscription;
  subdomain: string = '';
  skeletonArray = new Array(9);  

  constructor(
    private route: ActivatedRoute,
    private themeService: ThemeService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    ) { }

    async ngOnInit() {
      if(environment.env !== 'local'){
        this.subdomain = window.location.hostname;
      } else {
        this.subdomain = this.route.snapshot.params['subdomain'];
      }
      this.routeSub = this.route.params.subscribe(async routeParam => {
        const businessURL = await this.tokenStorage.getBusinessURL();
        if (this.subdomain && !businessURL) {
          this.tokenStorage.saveBusinessData(this.subdomain, this.router.url.substring(1));
        }
        await this.loadPlp(this.subdomain, routeParam['id']);
      });
    }

  loadPlp(siteUrl: string, id: number){
    if (id)
      this.themeService.getBusinessProductListingPageContentBySiteUrl(siteUrl, id).subscribe(
        data => {
          if (data?.data?.getBusinessProductListingPageContentBySiteUrl) {
            this.plpResponse = data?.data?.getBusinessProductListingPageContentBySiteUrl;
          }
        }
      );
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
